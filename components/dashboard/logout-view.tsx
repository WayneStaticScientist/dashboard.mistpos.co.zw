"use client";
import { Button } from "@heroui/react";
import useSessionState from "@/stores/session-store";

export default function LogoutView() {
  const session = useSessionState();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      Do you want to logout?
      <Button
        color="primary"
        onPress={() => {
          session.logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
