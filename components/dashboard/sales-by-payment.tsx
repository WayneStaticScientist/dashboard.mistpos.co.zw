"use client";
import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime";
import NormalError from "../errors/normal-errror";
import { toLocalCurrency } from "@/utils/currencies";
import { NormalLoader } from "../loaders/normal-loader";
import {
  MistTable,
  MistTableListHeaders,
  MistTableListRows,
} from "../layouts/table-header";
import { usePaymentSalesStore } from "@/stores/payment-sales-store";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const SalesByPaymentReport = () => {
  const paymentSalesStore = usePaymentSalesStore();
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  useEffect(() => {
    const endDateData = new Date();
    const startDateData = new Date(endDateData.getTime() - 3600000 * 24 * 7);
    const formattedStartDate = `${startDateData.getFullYear()}-${pad(
      startDateData.getMonth() + 1
    )}-${pad(startDateData.getDate())}`;
    const formattedEndDate = `${endDateData.getFullYear()}-${pad(
      endDateData.getMonth() + 1
    )}-${pad(endDateData.getDate())}`;

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    paymentSalesStore.loadEmployeeSalesStats(
      startDateData.toISOString(),
      endDateData.toISOString()
    );
  }, []);
  if (paymentSalesStore.loading) {
    return <NormalLoader />;
  }
  if (!paymentSalesStore.loaded) {
    return <NormalError message="failed to load sales report" />;
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
            paymentSalesStore.loadEmployeeSalesStats(startDate, endDate);
          }}
        >
          <BiSearchAlt />
        </Button>
      </section>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Sales Payment Report</h2>
            <div className="text-sm text-foreground">
              {paymentSalesStore.list.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <MistTable>
              <MistTableListHeaders
                headers={[
                  "Payment Method",
                  "Gross Sales",
                  "Average Sales",
                  "Discounts",
                  "Refunds",
                  "Receipts",
                  "Customers",
                ]}
              />
              <tbody>
                {paymentSalesStore.list.map((p, id) => (
                  <MistTableListRows
                    key={id}
                    rows={[
                      p.paymentMethod,
                      toLocalCurrency(p.grossSales),
                      toLocalCurrency(p.averageSalesPerReceipt),
                      toLocalCurrency(p.discounts),
                      toLocalCurrency(p.refunds),
                      p.numberOfReceipts.toString(),
                      p.uniqueCustomerCount.toString(),
                    ]}
                  />
                ))}
              </tbody>
            </MistTable>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
