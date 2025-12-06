"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layouts/header";
import SideBar from "@/components/layouts/side-bar";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { MistNavigation } from "@/router/page-navigation";
import { useCompanyStore } from "@/stores/companies-store";
import { CenterLoader } from "@/components/loaders/center-loader";

export default function Dashboard() {
  const session = useSessionState();
  const companyStore = useCompanyStore();
  async function initUser() {}
  useEffect(() => {
    session.getSessionState();
    initUser();
  }, []);
  useEffect(() => {
    companyStore.fetchUserCompany();
  }, [session.company]);
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {session.sesionLoading && <CenterLoader />}
      {!session.sesionLoading && session.email.length > 0 && (
        <div className="min-h-screen bg-background text-foreground w-screen">
          <div className="flex">
            <SideBar
              currentPage={navigation.page}
              setCurrentPage={(page) => {
                navigation.setPage(page);
                setSidebarOpen(false);
              }}
              sidebarOpen={sidebarOpen}
              setSibeBarOpen={setSidebarOpen}
            />
            <div className="flex-1 min-h-screen md:pl-72 w-full">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main className="p-4 bg-background h-full w-full overflow-x-auto">
                <MistNavigation path={navigation.page} />
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
