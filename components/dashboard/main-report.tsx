"use client";
import { initialProducts } from "@/tests/dummy-data";
import { TProduct } from "@/types/product-t";
import {
  HomeIcon as IconHome,
  CubeIcon as IconBox,
  ShoppingCartIcon as IconShoppingCart,
} from "@heroicons/react/24/outline";
import { useState } from "react";
export const MainReport = () => {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<TProduct[]>([]);

  const [products] = useState(initialProducts);
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase())
  );
  const subtotal = cart.reduce((s, c) => s + c.stockQuantity * c.price, 0);

  return (
    <main className="p-4">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <div className="text-sm text-slate-500">Total Sales</div>
          <div className="text-2xl font-semibold">$12,430</div>
          <div className="text-xs text-green-600">+6.4% vs last week</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <div className="text-sm text-slate-500">Active Orders</div>
          <div className="text-2xl font-semibold">18</div>
          <div className="text-xs text-slate-500">Processing</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <div className="text-sm text-slate-500">Low Stock Items</div>
          <div className="text-2xl font-semibold">3</div>
          <div className="text-xs text-amber-600">Reorder suggested</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border">
          <div className="text-sm text-slate-500">Customers Today</div>
          <div className="text-2xl font-semibold">46</div>
          <div className="text-xs text-slate-500">Store visits</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Inventory table (wide) */}
        <div className="lg:col-span-2 bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Inventory</h2>
            <div className="text-sm text-slate-500">
              {filtered.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-slate-500">
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
                  <tr key={p._id} className="border-t">
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
                      <button className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200">
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* POS / Quick sale */}
        <aside className="bg-white border rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">POS — Quick Sale</h3>
          <div className="grid grid-cols-2 gap-2 mb-3 max-h-48 overflow-auto">
            {products.map((p) => (
              <button
                key={p._id}
                className="p-2 border rounded-md text-left hover:bg-slate-50"
              >
                <div className="font-medium text-sm truncate">{p.name}</div>
                <div className="text-xs text-slate-500">
                  ${p.price.toFixed(2)} • {p.stockQuantity} left
                </div>
              </button>
            ))}
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-600">Subtotal</div>
              <div className="font-semibold">${subtotal.toFixed(2)}</div>
            </div>
            <div className="space-y-2 mb-3 max-h-36 overflow-auto">
              {cart.length === 0 ? (
                <div className="text-xs text-slate-500">Cart is empty</div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="text-sm truncate">{item.name}</div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="w-14 text-right border rounded px-1"
                        value={item.stockQuantity}
                      />
                      <div className="w-16 text-right">
                        ${(item.price * item.stockQuantity).toFixed(2)}
                      </div>
                      <button className="text-xs text-rose-600">Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-md bg-emerald-600 text-white">
                Pay
              </button>
              <button
                className="py-2 px-3 rounded-md border"
                onClick={() => setCart([])}
              >
                Clear
              </button>
            </div>
          </div>
        </aside>
      </section>

      {/* Mobile bottom nav (only visible on small screens) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 md:hidden w-[92%] bg-white border rounded-xl shadow-lg flex items-center justify-around py-2">
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
      </nav>
    </main>
  );
};
