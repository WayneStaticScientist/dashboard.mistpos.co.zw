"use client";
import {
  Bars3Icon as IconMenu,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";
import useSessionState from "@/stores/session-store";
import { useCompanyStore } from "@/stores/companies-store";
import { Spinner } from "@/components/ui/spinner";
import { MistDateUtils } from "@/utils/date-utils";
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
    <header className="sticky top-0 z-10 bg-ui-surface/60 backdrop-blur-xl border-b w-full border-white/5 shadow-sm">
      <div className="flex items-center justify-between h-[72px] px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg text-ui-text-muted hover:bg-white/5 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <IconMenu className="w-6 h-6" />
          </button>
          <div className="relative flex items-center">
            {company.fetchingUserCompany && (
              <Spinner className="text-ui-primary w-5 h-5" />
            )}
            {!company.fetchingUserCompany && company.userCompany && (
              <Fragment>
                <div className="flex items-center gap-2 text-ui-text-main font-bold tracking-tight">
                  {company.userCompany?.name ?? ""}
                  {company.userCompany?.verified ? (
                    <CheckBadgeIcon className="text-blue-500 w-5 h-5" />
                  ) : (
                    <ExclamationTriangleIcon className="text-orange-500 w-5 h-5" />
                  )}
                </div>
                {!numeric.ignore && (
                  <div
                    className={`hidden md:flex gap-1.5 items-center text-[11px] uppercase tracking-wider ml-6 px-2.5 py-1 rounded-md font-bold
                  ${numeric.daysLeft > 10 ? "bg-green-500/10 text-green-500 border border-green-500/20" : ""} 
                   ${
                     numeric.daysLeft > 1 &&
                     numeric.daysLeft <= 10 ?
                     "bg-orange-500/10 text-orange-500 border border-orange-500/20" : ""
                   } 
                    ${numeric.daysLeft <= 1 ? "bg-red-500/10 text-red-500 border border-red-500/20" : ""}`}
                  >
                    <CalendarDaysIcon className="w-3.5 h-3.5" /> {numeric.label}{" "}
                    {company.userCompany?.subscriptionType?.type}
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5">
          {!numeric.ignore && (
            <div
              className={`md:hidden flex flex-col gap-0.5 items-end text-[10px] uppercase font-bold tracking-wider
                  ${numeric.daysLeft > 10 ? "text-green-500" : ""} 
                   ${
                     numeric.daysLeft > 1 &&
                     numeric.daysLeft <= 10 ?
                     "text-orange-500" : ""
                   } 
                    ${numeric.daysLeft <= 1 ? "text-red-500" : ""}`}
            >
              <span className="flex items-center gap-1">
                <CalendarDaysIcon className="w-3 h-3" /> {numeric.label}
              </span>
              <span>{company.userCompany?.subscriptionType?.type}</span>
            </div>
          )}
          <div className="hidden md:flex items-center gap-3 pl-5 border-l border-white/5">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-white leading-tight">
                {session.fullName}
              </span>
              <span className="text-xs font-medium text-ui-text-muted">Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-white/10 shadow-inner flex items-center justify-center text-white font-bold tracking-widest text-sm">
              {session.fullName.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
