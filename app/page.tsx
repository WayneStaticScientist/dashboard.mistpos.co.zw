import React, { useState } from "react";
// Using Heroicons (outline) which are compatible with most Next.js sandboxes
import {
  Bars3Icon as IconMenu,
  HomeIcon as IconHome,
  CubeIcon as IconBox,
  UserGroupIcon as IconUsers,
  ShoppingCartIcon as IconShoppingCart,
  MagnifyingGlassIcon as IconSearch,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  // Mock inventory
  const initialProducts = [
    { id: 1, sku: "SKU-001", name: "Wireless Mouse", stock: 24, price: 19.99 },
    {
      id: 2,
      sku: "SKU-002",
      name: "Mechanical Keyboard",
      stock: 12,
      price: 79.5,
    },
    { id: 3, sku: "SKU-003", name: "USB-C Hub", stock: 5, price: 29.0 },
    { id: 4, sku: "SKU-004", name: "Laptop Stand", stock: 0, price: 34.99 },
  ];
  const [products] = useState(initialProducts);

  // Filtering for inventory list
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase())
  );

  const subtotal = cart.reduce((s, c) => s + c.qty * c.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out bg-white border-r`}
        >
          <div className="h-16 flex items-center px-4 border-b">
            <h1 className="font-bold text-lg">StoreFlow</h1>
          </div>
          <nav className="p-4">
            <a
              className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50"
              href="#"
            >
              <IconHome className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a
              className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50"
              href="#"
            >
              <IconBox className="w-5 h-5" />
              <span>Inventory</span>
            </a>
            <a
              className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50"
              href="#"
            >
              <IconShoppingCart className="w-5 h-5" />
              <span>POS</span>
            </a>
            <a
              className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50"
              href="#"
            >
              <IconUsers className="w-5 h-5" />
              <span>Customers</span>
            </a>
          </nav>
          <div className="p-4 mt-auto text-xs text-slate-500">
            v1.0 • Offline demo
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 min-h-screen md:pl-64">
          {/* Topbar */}
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen((s) => !s)}
                  className="md:hidden p-2 rounded-md hover:bg-slate-100"
                  aria-label="Toggle menu"
                >
                  <IconMenu className="w-5 h-5" />
                </button>
                <div className="relative">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search inventory or SKU..."
                    className="pl-10 pr-4 py-2 rounded-md border w-full md:w-72"
                    aria-label="Search inventory"
                  />
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm text-slate-600">
                  Welcome back, Admin
                </div>
                <button
                  className="p-2 rounded-md hover:bg-slate-100"
                  aria-label="Open cart"
                >
                  <IconShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
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
                        <tr key={p.id} className="border-t">
                          <td className="py-3">{p.sku}</td>
                          <td className="py-3">{p.name}</td>
                          <td
                            className={`py-3 text-right ${
                              p.stock === 0
                                ? "text-rose-600"
                                : p.stock < 6
                                ? "text-amber-600"
                                : ""
                            }`}
                          >
                            {p.stock}
                          </td>
                          <td className="py-3 text-right">
                            ${p.price.toFixed(2)}
                          </td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => addToCart(p)}
                              className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
                            >
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
                      key={p.id}
                      onClick={() => addToCart(p)}
                      className="p-2 border rounded-md text-left hover:bg-slate-50"
                    >
                      <div className="font-medium text-sm truncate">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        ${p.price.toFixed(2)} • {p.stock} left
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
                      <div className="text-xs text-slate-500">
                        Cart is empty
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between"
                        >
                          <div className="text-sm truncate">{item.name}</div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              className="w-14 text-right border rounded px-1"
                              value={item.qty}
                              onChange={(e) =>
                                changeQty(item.id, Number(e.target.value))
                              }
                            />
                            <div className="w-16 text-right">
                              ${(item.price * item.qty).toFixed(2)}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-rose-600"
                            >
                              Remove
                            </button>
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
        </div>
      </div>
    </div>
  );
}

/*
Integration notes (copy these into your project README or keep here):

1) Install Tailwind CSS (if not already): https://tailwindcss.com/docs/guides/nextjs

2) Icon library: this file now imports icons from `@heroicons/react/24/outline`. If you prefer `lucide-react` or another set, swap the imports at the top.

3) Place this file in your components/ directory and import into a Next.js page, e.g. pages/dashboard.jsx or app/dashboard/page.jsx.

4) Accessibility & performance:
   - Add proper ARIA attributes for interactive elements.
   - Lazy-load product lists and split heavy charts into separate dynamic imports.

5) Extend features:
   - Hook up real inventory & POS endpoints.
   - Add product image thumbnails and product detail modal.
   - Integrate payment provider and receipts for Pay.

6) Styling tweaks:
   - Use CSS variables or Tailwind theme extensions for brand colors.
   - Consider using shadcn/ui Card/Button components if you prefer prebuilt components.
*/
