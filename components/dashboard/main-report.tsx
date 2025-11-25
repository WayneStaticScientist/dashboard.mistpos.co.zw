"use client";
import { initialProducts } from "@/tests/dummy-data";
import { TProduct } from "@/types/product-t";
import {
  HomeIcon as IconHome,
  CubeIcon as IconBox,
  ShoppingCartIcon as IconShoppingCart,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { CircularWheelChart } from "../graphs/donut-graph";
import { CardOverview } from "../layouts/card-overview";
import { MistLineGraph } from "../graphs/line-graph";
import { MistBarGraph } from "../graphs/bar-graph";
import { TableProducts } from "../layouts/table-products";
import { ActiveEmployees } from "../layouts/active-employees";
export const MainReport = () => {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<TProduct[]>([]);

  const subtotal = cart.reduce((s, c) => s + c.stockQuantity * c.price, 0);

  return (
    <main className="p-4 bg-background">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <CircularWheelChart
          label={"Sale/Cost"}
          chartData={[
            {
              name: "Sales",
              value: 345,
              color: "#ef4444",
            },
            {
              name: "Costs",
              value: 231,
              color: "#efaa00",
            },
          ]}
        />
        <CircularWheelChart
          label={"Sale/Cost"}
          chartData={[
            {
              name: "Sales",
              value: 345,
              color: "#ef4444",
            },
            {
              name: "Costs",
              value: 231,
              color: "#efaa00",
            },
          ]}
        />
        <CircularWheelChart
          label={"Sale/Cost"}
          chartData={[
            {
              name: "Sales",
              value: 345,
              color: "#ef4444",
            },
            {
              name: "Costs",
              value: 231,
              color: "#efaa00",
            },
          ]}
        />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <CardOverview label={"Inventory Value"} value={"$2332.50"} />
        <CardOverview label={"Inventory Value"} value={"$2332.50"} />
        <CardOverview label={"Inventory Value"} value={"$2332.50"} />
        <CardOverview label={"Inventory Value"} value={"$2332.50"} />
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
    </main>
  );
};
