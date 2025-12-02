"use client";
import { useDailySalesReport } from "@/stores/daily-sales-store";
import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime";
import { NormalLoader } from "../loaders/normal-loader";
import NormalError from "../errors/normal-errror";
import { toLocalCurrency } from "@/utils/currencies";

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
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Sales Report</h2>
            <div className="text-sm text-foreground">
              {dailySales.items.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-foreground">
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-right py-2">Total Cost</th>
                  <th className="text-right py-2">Total Sales</th>
                  <th className="text-center py-2">Products Sold</th>
                </tr>
              </thead>
              <tbody>
                {dailySales.items.map((p) => (
                  <tr
                    key={p.productId}
                    className="border-t text-foreground! border-[#e6e6e640]"
                  >
                    <td className="py-3">{p.productName}</td>
                    <td className={`py-3 text-right`}>
                      {toLocalCurrency(p.totalCosts)}
                    </td>
                    <td className="py-3 text-right">
                      {toLocalCurrency(p.totalSales)}
                    </td>
                    <td className="py-3 text-center">{p.totalCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
