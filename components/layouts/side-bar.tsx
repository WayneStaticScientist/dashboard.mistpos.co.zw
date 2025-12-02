"use client";
import { useState } from "react";
import { NavBarItem, NavBarMenu } from "@/menu/nav-bar-menu";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { CgClose } from "react-icons/cg";

export default function SideBar({
  sidebarOpen,
  currentPage,
  setCurrentPage,
  setSibeBarOpen,
}: {
  currentPage: string;
  sidebarOpen: boolean;
  setCurrentPage: (page: string) => void;
  setSibeBarOpen: (state: boolean) => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-72 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out bg-background shadow-2xl`}
    >
      <div className="h-16 flex items-center px-4 border-b border-[#e6e6e620] justify-between">
        <h1 className="font-bold text-lg text-foreground">MistPOS</h1>
        <Button
          isIconOnly
          variant="bordered"
          onPress={() => setSibeBarOpen(false)}
        >
          <CgClose />
        </Button>
      </div>
      <nav className="p-4 text-foreground! overflow-y-auto h-full">
        {NavBarMenu.map((group) => {
          return (
            <div>
              <h2 className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                {group.group}
              </h2>
              <div className="pl-4">
                {parseChildrens(group.children, currentPage, setCurrentPage)}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function parseChildrens(
  children: NavBarItem[],
  currentPage: string,
  setCurrentPage: (page: string) => void
): import("react").ReactNode {
  return (
    <>
      {children.map((e, index) =>
        parseChild(e, index, currentPage, setCurrentPage)
      )}
    </>
  );
}
function parseChild(
  value: NavBarItem,
  index: number,
  currentPage: string,
  setCurrentPage: (page: string) => void
): unknown {
  return (
    <NavItem
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      key={index}
      {...value}
    />
  );
}

const NavItem: React.FC<
  NavBarItem & { currentPage: string; setCurrentPage: (page: string) => void }
> = ({ name, Icon, children, currentPage, setCurrentPage, page }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCollapsible = !!children;

  if (isCollapsible) {
    const collapseClasses = isOpen
      ? "max-h-screen opacity-100 pt-1" // We add pt-1 for slight spacing at the top
      : "max-h-0 opacity-0";

    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`flex items-center cursor-pointer justify-between w-full p-3 text-sm font-medium text-foreground
              hover:text-primary rounded-lg transition duration-150
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isOpen ? "text-primary" : ""
              }`}
        >
          <div className="flex items-center">
            <Icon
              className={`w-5 h-5 mr-3 ${
                isOpen ? "text-primary" : "text-foreground"
              }`}
            />
            {name}
          </div>

          {/* Arrow Icon (Rotates when open) */}
          <ChevronRightIcon
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              isOpen ? "rotate-90 text-primary" : "rotate-0 text-foreground"
            }`}
          />
        </button>

        {/* Dropdown Content (Collapsible list of children) */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${collapseClasses}`}
        >
          <ul className="ml-4 pl-1 space-y-1">
            {parseChildrens(children, currentPage, setCurrentPage)}
          </ul>
        </div>
      </div>
    );
  }

  // Regular Nav Item (Non-collapsible)
  return (
    <a
      onClick={() => {
        setCurrentPage(page);
      }}
      className={`flex items-center w-full p-2 text-sm font-medium text-foreground cursor-pointer
         hover:text-primary rounded-lg transition duration-150 ${
           currentPage == page ? "bg-[#e6e6e640]" : ""
         }`}
    >
      <Icon className="w-5 h-5 mr-3 text-foreground" />
      {name}
    </a>
  );
};
