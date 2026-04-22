import { Spinner } from "@heroui/react";
import { useEffect } from "react";

export default function Android() {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner />
      <p className="mt-4 text-lg">Loading dashboard...</p>
    </div>
  );
}
