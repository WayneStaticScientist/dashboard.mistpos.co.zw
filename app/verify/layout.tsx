"use client";
import { useEffect } from "react";
import useSessionState from "@/stores/session-store";
import { CenterLoader } from "@/components/loaders/center-loader";
import { Toaster } from "react-hot-toast";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSessionState();
  useEffect(() => {
    session.getSessionState();
  }, []);
  return (
    <>
      <Toaster />
      {session.sesionLoading && <CenterLoader />}
      {!session.sesionLoading && session.email.length > 0 && <>{children}</>}
    </>
  );
}
