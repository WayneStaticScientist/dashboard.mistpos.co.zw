"use client";
import { initialProducts } from "@/tests/dummy-data";
import { useState } from "react";

export const TableProducts = ({ query }: { query: string }) => {
  const [products] = useState(initialProducts);
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
        <h2 className="font-semibold">Inventory</h2>
        <div className="text-sm text-foreground">{3} items</div>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-foreground">
            <tr>
              <th className="text-left py-2">SKU</th>
              <th className="text-left py-2">Name</th>
              <th className="text-right py-2">Stock</th>
              <th className="text-right py-2">Price</th>
              <th className="text-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p._id}
                className="border-t text-foreground! border-[#e6e6e640]"
              >
                <td className="py-3">{p.sku}</td>
                <td className="py-3">{p.name}</td>
                <td
                  className={`py-3 text-right ${
                    p.stockQuantity === 0
                      ? "text-rose-600"
                      : p.stockQuantity < 6
                      ? "text-amber-600"
                      : ""
                  }`}
                >
                  {p.stockQuantity}
                </td>
                <td className="py-3 text-right">${p.price.toFixed(2)}</td>
                <td className="py-3 text-center">
                  <button className="px-3 py-1 rounded-md bg-primary hover:bg-slate-200">
                    Add to cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
