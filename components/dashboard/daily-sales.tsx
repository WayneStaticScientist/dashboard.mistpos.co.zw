"use client";
import { useDailySalesReport } from "@/stores/daily-sales-store";
import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime";
import { NormalLoader } from "../loaders/normal-loader";
import NormalError from "../errors/normal-errror";
import { toLocalCurrency } from "@/utils/currencies";
import {
  MistTableListHeaders,
  MistTableListRows,
} from "../layouts/table-header";

export const DailySalesReport = () => {
  const dailySales = useDailySalesReport();
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  useEffect(() => {
    const endDateData = new Date();
    setEndDate(
      `${endDateData.getDay()}/${endDateData.getMonth()}/${endDateData.getFullYear()}`
    );
    dailySales.loadDailySalesStats(startDate, new Date().toDateString());
  }, []);
  if (dailySales.loading) {
    return <NormalLoader />;
  }
  if (!dailySales.loaded) {
    return <NormalError message="failed to load admin stats" />;
  }
  return (
    <Fragment>
      <section className=" grid grid-cols-5   gap-4 mb-4 items-center justify-center">
        <Input
          type="date"
          className=" col-span-2"
          label="start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          className=" col-span-2"
          type="date"
          label="end date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button
          color="primary"
          variant="bordered"
          isIconOnly
          onPress={() => {
            dailySales.loadDailySalesStats(startDate, endDate);
          }}
        >
          <BiSearchAlt />
        </Button>
      </section>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm ">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Sales Report</h2>
            <div className="text-sm text-foreground">
              {dailySales.items.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto w-full">
            <table className="text-sm table-auto w-max ">
              <MistTableListHeaders
                headers={["Name", "Total Cost", "Total Sales", "Products Sold"]}
              />
              <tbody>
                {dailySales.items.map((p, index) => (
                  <MistTableListRows
                    key={index}
                    rows={[
                      p.productName,
                      toLocalCurrency(p.totalCosts),
                      toLocalCurrency(p.totalSales),
                      p.totalCount.toString(),
                    ]}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
