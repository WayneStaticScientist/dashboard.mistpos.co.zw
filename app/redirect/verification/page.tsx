"use client";
import { FC, Suspense, useEffect } from "react";
import { CenterLoader } from "@/components/loaders/center-loader";
import { useSearchParams } from "next/navigation";
export default function AuthPage() {
  return (
    <Suspense fallback={<CenterLoader />}>
      <RedirectHandler />
    </Suspense>
  );
}
const RedirectHandler: FC = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("id");
    const device = searchParams.get("device");
    if (id && device) {
      localStorage.setItem("refreshToken", id);
      localStorage.setItem("deviceId", device);
      window.location.href = "/verify";
    }
  }, [searchParams]);

  return <CenterLoader />;
};
