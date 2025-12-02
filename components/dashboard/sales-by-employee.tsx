"use client";
import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime";
import NormalError from "../errors/normal-errror";
import { toLocalCurrency } from "@/utils/currencies";
import { NormalLoader } from "../loaders/normal-loader";
import { useDailySalesReport } from "@/stores/daily-sales-store";
import { useEmployeeSalesReport } from "@/stores/employee-sales-store";

export const SalesByEmployeeReport = () => {
  const employeeSalesReport = useEmployeeSalesReport();
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  useEffect(() => {
    const endDateData = new Date();
    const startDateData = new Date(endDateData.getTime() - 3600000 * 24 * 7);
    setStartDate(
      `${startDateData.getDate()}/${startDateData.getMonth()}/${startDateData.getFullYear()}`
    );
    setEndDate(
      `${endDateData.getDate()}/${endDateData.getMonth()}/${endDateData.getFullYear()}`
    );
    employeeSalesReport.loadEmployeeSalesStats(
      startDateData.toISOString(),
      endDateData.toISOString()
    );
  }, []);
  if (employeeSalesReport.loading) {
    return <NormalLoader />;
  }
  if (!employeeSalesReport.loaded) {
    return <NormalError message="failed to load sales report" />;
  }
  return (
    <Fragment>
      {startDate}==============={endDate}
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
            employeeSalesReport.loadEmployeeSalesStats(startDate, endDate);
          }}
        >
          <BiSearchAlt />
        </Button>
      </section>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Employees Report</h2>
            <div className="text-sm text-foreground">
              {employeeSalesReport.list.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-foreground">
                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-right py-2">Gross Sales</th>
                  <th className="text-right py-2">Average Sales</th>
                  <th className="text-right py-2">Discounts</th>
                  <th className="text-center py-2">Refunds</th>
                  <th className="text-center py-2">Customers</th>
                </tr>
              </thead>
              <tbody>
                {employeeSalesReport.list.map((p, id) => (
                  <tr
                    key={id}
                    className="border-t text-foreground! border-[#e6e6e640]"
                  >
                    <td className="py-3">{p.sellerName}</td>
                    <td className={`py-3 text-right`}>
                      {toLocalCurrency(p.grossSales)}
                    </td>
                    <td className="py-3 text-right">
                      {toLocalCurrency(p.averageSales)}
                    </td>
                    <td className="py-3 text-right">
                      {toLocalCurrency(p.discounts)}
                    </td>
                    <td className="py-3 text-right">
                      {toLocalCurrency(p.refunds)}
                    </td>
                    <td className="py-3 text-center">
                      {p.uniqueCustomerCount}
                    </td>
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
