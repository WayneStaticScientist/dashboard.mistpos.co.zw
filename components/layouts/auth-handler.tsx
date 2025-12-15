// AuthHandler.jsx
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Use the loader component you already have
import { CenterLoader } from "@/components/loaders/center-loader";

export function AuthHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    const device = searchParams.get("device");

    // Ensure both parameters exist before processing
    if (id && device) {
      localStorage.setItem("refreshToken", id);
      localStorage.setItem("deviceId", device);
      window.location.href = "/";
    }
  }, [searchParams]);

  return <CenterLoader />;
}
