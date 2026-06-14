"use client";
import { useState } from "react";
import { NavBarItem, NavBarMenu } from "@/menu/nav-bar-menu";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useCompanyStore } from "@/stores/companies-store";
import { errorToast } from "@/utils/toaster";

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
  const company = useCompanyStore();
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-72 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out bg-[#0f0f11] border-r border-white/5 shadow-2xl flex flex-col`}
    >
      <div className="h-[72px] flex items-center px-6 border-b border-white/5 justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
            MP
          </div>
          <h1 className="font-bold text-lg text-ui-text-main tracking-tight">MistPOS</h1>
        </div>
        <Button
          isIconOnly
          variant="ghost"
          className="md:hidden text-ui-text-muted hover:text-white hover:bg-white/5 rounded-full"
          onClick={() => setSibeBarOpen(false)}
        >
          <XMarkIcon className="w-5 h-5" />
        </Button>
      </div>
      {company.userCompany && !company.userCompany.verified && (
        <div className="px-3 pt-3">
          <Button
            className="w-full"
            variant="flat"
            onClick={() => {
              if (window) {
                window.location.href = "/verify";
              }
            }}
          >
            Verify Account
          </Button>
        </div>
      )}
      <nav className="p-4 text-ui-text-main overflow-y-auto flex-1 custom-scrollbar">
        {NavBarMenu.map((group, key) => {
          return (
            <div key={key} className="mb-6 last:mb-0">
              <h2 className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ui-text-muted/60">
                {group.group}
              </h2>
              <div className="pl-1 mt-1 space-y-1">
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
> = ({
  name,
  Icon,
  children,
  currentPage,
  setCurrentPage,
  page,
  subscriptionLevels,
}) => {
  const company = useCompanyStore();
  const [isOpen, setIsOpen] = useState(false);
  const isCollapsible = !!children;

  if (isCollapsible) {
    const collapseClasses = isOpen
      ? "max-h-screen opacity-100 pt-1" 
      : "max-h-0 opacity-0";

    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`flex items-center cursor-pointer justify-between w-full p-2.5 text-sm font-medium rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500/50 ${
            isOpen 
              ? "bg-white/[0.03] text-white" 
              : "text-ui-text-muted hover:bg-white/[0.03] hover:text-white"
          }`}
        >
          <div className="flex items-center">
            <Icon
              className={`w-5 h-5 mr-3 transition-colors ${
                isOpen ? "text-blue-500" : "text-ui-text-muted group-hover:text-white"
              }`}
            />
            {name}
          </div>

          <ChevronRightIcon
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              isOpen ? "rotate-90 text-white" : "text-ui-text-muted/50"
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${collapseClasses}`}
        >
          <ul className="ml-5 pl-2 border-l border-white/5 space-y-1 mt-1">
            {parseChildrens(children, currentPage, setCurrentPage)}
          </ul>
        </div>
      </div>
    );
  }

  const isActive = currentPage === page;

  return (
    <a
      onClick={() => {
        if (subscriptionLevels != null) {
          const subscriptionType =
            company.userCompany?.subscriptionType?.type ?? "free";
          if (!subscriptionLevels.includes(subscriptionType)) {
            errorToast(
              `Your current subscription ${
                company.userCompany?.subscriptionType?.type.toUpperCase() ??
                "FREE"
              } Plan does not allow you to view ${name.toUpperCase()} current supported subscriptions for this are 
               ${subscriptionLevels
                 .map((e) => e.toUpperCase())
                 .join(", ")
                 .toUpperCase()}`
            );
            return;
          }
        }
        setCurrentPage(page);
      }}
      className={`flex items-center w-full p-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/50 ${
        isActive 
          ? "bg-blue-600/10 text-blue-500 shadow-sm border-l-[3px] border-blue-500" 
          : "text-ui-text-muted hover:bg-white/[0.03] hover:text-white border-l-[3px] border-transparent"
      } ${
        subscriptionLevels != null
          ? subscriptionLevels.find(
              (e) => e === (company.userCompany?.subscriptionType?.type ?? "free")
            )
            ? ""
            : "text-ui-danger opacity-75"
          : ""
      }`}
    >
      <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-blue-500' : 'text-ui-text-muted'}`} />
      {name}
    </a>
  );
};
