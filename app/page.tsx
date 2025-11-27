"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layouts/header";
import SideBar from "@/components/layouts/side-bar";
import useSessionState from "@/stores/session-store";
import { MistNavigation } from "@/router/page-navigation";
import { CenterLoader } from "@/components/loaders/center-loader";

export default function Dashboard() {
  const session = useSessionState();
  useEffect(() => {
    session.getSessionState();
  }, []);
  const [page, setPage] = useState("main");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {session.sesionLoading && <CenterLoader />}
      {!session.sesionLoading && session.email.length > 0 && (
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <div className="flex">
            <SideBar sidebarOpen={sidebarOpen} />
            <div className="flex-1 min-h-screen md:pl-72">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <MistNavigation path={page} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
