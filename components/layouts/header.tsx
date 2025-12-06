"use client";
import {
  Bars3Icon as IconMenu,
  ShoppingCartIcon as IconShoppingCart,
  MagnifyingGlassIcon as IconSearch,
} from "@heroicons/react/24/outline";
import useSessionState from "@/stores/session-store";
import { useCompanyStore } from "@/stores/companies-store";
import { Spinner } from "@heroui/react";
import { MistDateUtils } from "@/utils/date-utils";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { VscUnverified } from "react-icons/vsc";
import { Fragment } from "react/jsx-runtime";
export default function Header({
  setSidebarOpen,
  sidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const company = useCompanyStore();
  const session = useSessionState();
  const numeric = MistDateUtils.fromSubscription(
    company.userCompany?.subscriptionType
  );
  return (
    <header className="sticky top-0 z-10 bg-background border-b w-full border-[#e8e8e820]">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#e6e6e617] bg-[#e6e6e617]"
            aria-label="Toggle menu"
          >
            <IconMenu className="w-5 h-5 text-foreground" />
          </button>
          <div className="relative ">
            {company.fetchingUserCompany && (
              <Spinner variant="dots" color="secondary" />
            )}
            {!company.fetchingUserCompany && company.userCompany && (
              <Fragment>
                <span className="flex items-center gap-1">
                  {company.userCompany?.name ?? ""}
                  {company.userCompany?.verified ? (
                    <GoVerified className="text-green-400" size={24} />
                  ) : (
                    <VscUnverified className="text-red-400" size={24} />
                  )}
                </span>
                {!numeric.ignore && (
                  <div
                    className={`hidden md:flex gap-1 items-center text-xs 
                  ${numeric.daysLeft > 10 && "text-green-500"} 
                   ${
                     numeric.daysLeft > 1 &&
                     numeric.daysLeft <= 10 &&
                     "text-orange-400"
                   } 
                    ${numeric.daysLeft <= 1 && "text-red-500"}`}
                    style={{}}
                  >
                    <FaRegCalendarAlt /> {numeric.label}{" "}
                    {company.userCompany?.subscriptionType?.type.toUpperCase()}
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm text-foreground">
            Welcome back, {session.fullName}
          </div>
          {!numeric.ignore && (
            <div
              className={`md:hidden flex flex-col gap-1 items-center text-xs 
                  ${numeric.daysLeft > 10 && "text-green-500"} 
                   ${
                     numeric.daysLeft > 1 &&
                     numeric.daysLeft <= 10 &&
                     "text-orange-400"
                   } 
                    ${numeric.daysLeft <= 1 && "text-red-500"}`}
              style={{}}
            >
              <span className="flex items-center  gap-1">
                <FaRegCalendarAlt /> {numeric.label}
              </span>
              {company.userCompany?.subscriptionType?.type.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
