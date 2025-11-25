"use client";
import { useState } from "react";
import Header from "@/components/layouts/header";
import SideBar from "@/components/layouts/side-bar";
import { MistNavigation } from "@/router/page-navigation";

export default function Dashboard() {
  const [page, setPage] = useState("main");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <SideBar sidebarOpen={sidebarOpen} />
        <div className="flex-1 min-h-screen md:pl-64">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <MistNavigation path={page} />
        </div>
      </div>
    </div>
  );
}
