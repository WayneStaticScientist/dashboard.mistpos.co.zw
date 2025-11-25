import React from "react";
import {
  Bars3Icon as IconMenu,
  HomeIcon as IconHome,
  CubeIcon as IconBox,
  UserGroupIcon as IconUsers,
  ShoppingCartIcon as IconShoppingCart,
  MagnifyingGlassIcon as IconSearch,
} from "@heroicons/react/24/outline";
export default function Header({
  setSidebarOpen,
  sidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <IconMenu className="w-5 h-5" />
          </button>
          <div className="relative">
            <input
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
  );
}
