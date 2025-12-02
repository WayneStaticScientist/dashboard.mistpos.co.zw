"use client";
import { TProduct } from "@/types/product-t";
import {
  HomeIcon as IconHome,
  CubeIcon as IconBox,
  ShoppingCartIcon as IconShoppingCart,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
import NormalError from "../errors/normal-errror";
import { MistBarGraph } from "../graphs/bar-graph";
import { MistLineGraph } from "../graphs/line-graph";
import { NormalLoader } from "../loaders/normal-loader";
import { CardOverview } from "../layouts/card-overview";
import { TableProducts } from "../layouts/table-products";
import { CircularWheelChart } from "../graphs/donut-graph";
import { ActiveEmployees } from "../layouts/active-employees";
import { useMainReportStore } from "@/stores/main-report-store";
import { MaterialColors } from "@/utils/colors";
import { toLocalCurrency } from "@/utils/currencies";
import { BiSearchAlt } from "react-icons/bi";
import { errorToast } from "@/utils/toaster";
export const MainReport = () => {
  const report = useMainReportStore();
  const [query, setQuery] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  useEffect(() => {
    report.loadAdminStats();
  }, []);
  if (report.loading) {
    return <NormalLoader />;
  }
  if (!report.loaded) {
    return <NormalError message="failed to load admin stats" />;
  }
  const revenueMargin =
    (report.productStats.totalRevenue - report.productStats.totalCost) /
    (Math.abs(report.productStats.totalRevenue) > 0
      ? Math.abs(report.productStats.totalRevenue)
      : 1);
  const stockAverage =
    report.productStats.totalCost /
    (Math.abs(report.productStats.totalStock) > 0
      ? Math.abs(report.productStats.totalStock)
      : 1);

  const productAverage =
    (report.productStats.totalCost - report.totalProducts) /
    (Math.abs(report.productStats.totalStock) > 0
      ? Math.abs(report.productStats.totalStock)
      : 1);
  const profitMargin =
    (report.salesStates.totalSalesValue - report.salesStates.totalLossValue) /
    (Math.abs(report.salesStates.totalSalesValue) > 0
      ? Math.abs(report.salesStates.totalSalesValue)
      : 1);
  return (
    <>
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
            report.loadAdminStats(startDate, endDate, weekEndDate);
          }}
        >
          <BiSearchAlt />
        </Button>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 items-center justify-center">
        <CircularWheelChart
          className=""
          label={"Total Sales/Cost/Discounts"}
          chartData={[
            {
              name: "Sales ",
              value: report.salesStates.totalSalesValue,
              color: MaterialColors.MaterialGreen,
            },
            {
              name: "Costs",
              value: report.salesStates.totalCosts,
              color: MaterialColors.MaterialBlue,
            },
            {
              name: "Discounts",
              value: report.salesStates.totalDiscounts,
              color: MaterialColors.MaterialPink,
            },
          ]}
        />
        <CircularWheelChart
          label={"Inventory StockValue/Revenue"}
          chartData={[
            {
              name: "Stock",
              value: report.productStats.totalCost,
              color: MaterialColors.MaterialTeal,
            },
            {
              name: "Revenue",
              value: report.productStats.totalRevenue,
              color: MaterialColors.MaterialOrange,
            },
          ]}
        />
        <CircularWheelChart
          label={"Profit/Loss"}
          chartData={[
            {
              name: "Loss",
              value: report.salesStates.totalLossValue,
              color: MaterialColors.MaterialRed,
            },
            {
              name: "Profit",
              value:
                report.salesStates.totalCosts -
                report.salesStates.totalSalesValue,
              color: MaterialColors.MaterialGreen,
            },
          ]}
        />
      </section>
      <span className="flex text-white my-2 mt-4">Products Reports</span>
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <CardOverview
          label={"Total Revenue"}
          increaseValue={`${revenueMargin.toFixed(2)}% margin`}
          positive={revenueMargin > 0}
          value={toLocalCurrency(report.productStats.totalRevenue)}
        />
        <CardOverview
          label={"Stock Value"}
          increaseValue={`${toLocalCurrency(stockAverage)} avg`}
          positive={true}
          value={toLocalCurrency(report.productStats.totalCost)}
        />
        <CardOverview
          label={"Total Stock"}
          increaseValue={`${toLocalCurrency(stockAverage)} avg`}
          positive={report.productStats.totalStock > 0}
          value={report.productStats.totalStock.toString()}
        />
        <CardOverview
          label={"Total Products"}
          positive={report.totalProducts < report.productStats.totalStock}
          increaseValue={`${productAverage.toFixed(2)}% health`}
          value={report.totalProducts.toString()}
        />
      </section>
      <span className="flex text-white my-2 mt-4">Sales Reports</span>
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <CardOverview
          label={"Profit"}
          increaseValue={`${profitMargin.toFixed(2)}% gain`}
          positive={profitMargin > 0}
          value={toLocalCurrency(
            report.salesStates.totalSalesValue - report.salesStates.totalCosts
          )}
        />
        <CardOverview
          label={"Total Sales"}
          value={toLocalCurrency(report.salesStates.totalSalesValue)}
        />
        <CardOverview
          label={"Taxes"}
          value={toLocalCurrency(report.salesStates.totalTaxs)}
        />
        <CardOverview
          label={"Total Discounts"}
          value={toLocalCurrency(report.salesStates.totalDiscounts)}
        />

        <CardOverview
          label={"Total Refunds"}
          value={toLocalCurrency(report.salesStates.totalRefunds)}
        />
        <CardOverview
          label={"Total Loss"}
          color={MaterialColors.MaterialRed}
          value={toLocalCurrency(report.salesStates.totalLossValue)}
        />
        <CardOverview
          label={"Receipts"}
          value={report.salesStates.totalReceipts.toString()}
        />
        <CardOverview
          label={"Active Cashiers"}
          value={report.salesStates.numberOfCashiers.toString()}
        />
      </section>
      <section className="my-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 items-center justify-center">
        <Input
          type="date"
          label="Weekly Report From"
          value={weekEndDate}
          onChange={(e) => setWeekEndDate(e.target.value)}
        />
        <Button
          color="primary"
          variant="bordered"
          isIconOnly
          onPress={() => {
            if (weekEndDate.trim() == "") {
              return errorToast("Anchor date not specified");
            }
            report.loadAdminStats(startDate, endDate, weekEndDate);
          }}
        >
          <BiSearchAlt />
        </Button>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <MistLineGraph label={"Weekly Sales"} />
        <MistBarGraph />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TableProducts query={query} />
        <ActiveEmployees />
      </section>
      {/* Mobile bottom nav (only visible on small screens) */}
      {/* <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 md:hidden w-[92%] bg-white border rounded-xl shadow-lg flex items-center justify-around py-2">
        <button className="flex flex-col items-center text-xs">
          <IconHome className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center text-xs">
          <IconBox className="w-5 h-5" />
          <span>Inventory</span>
        </button>
        <button className="flex flex-col items-center text-xs">
          <IconShoppingCart className="w-5 h-5" />
          <span>POS</span>
        </button>
      </nav> */}
    </>
  );
};
