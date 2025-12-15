"use client";
import { Suspense } from "react";
import { CenterLoader } from "@/components/loaders/center-loader";
import { AuthHandler } from "@/components/layouts/auth-handler";
export default function AuthPage() {
  return (
    <Suspense fallback={<CenterLoader />}>
      <AuthHandler />
    </Suspense>
  );
}
