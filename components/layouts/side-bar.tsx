import {
  Bars3Icon as IconMenu,
  HomeIcon as IconHome,
  CubeIcon as IconBox,
  UserGroupIcon as IconUsers,
  ShoppingCartIcon as IconShoppingCart,
  MagnifyingGlassIcon as IconSearch,
} from "@heroicons/react/24/outline";
export default function SideBar({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-64 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out bg-white border-r`}
    >
      <div className="h-16 flex items-center px-4 border-b">
        <h1 className="font-bold text-lg">MistPOS</h1>
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
  );
}
