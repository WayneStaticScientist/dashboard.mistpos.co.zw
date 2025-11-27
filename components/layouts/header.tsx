"use client";
import {
  Bars3Icon as IconMenu,
  ShoppingCartIcon as IconShoppingCart,
  MagnifyingGlassIcon as IconSearch,
} from "@heroicons/react/24/outline";
import useSessionState from "@/stores/session-store";
export default function Header({
  setSidebarOpen,
  sidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const session = useSessionState();
  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#e6e6e617] bg-[#e6e6e617]"
            aria-label="Toggle menu"
          >
            <IconMenu className="w-5 h-5 text-foreground" />
          </button>
          <div className="relative bg-[#e6e6e617] rounded-2xl">
            <input
              placeholder="Search inventory or SKU..."
              className="pl-10 pr-4 py-2 rounded-md  w-full md:w-72 text-foreground active:border-0 focus:border-0  outline-0
               active:outline-1 focus:outline-0"
              aria-label="Search inventory"
            />
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground!" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm text-foreground">
            Welcome back, {session.fullName}
          </div>
          <button
            className="p-2 rounded-md hover:bg-[#e6e6e617]"
            aria-label="Open cart"
          >
            <IconShoppingCart className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
