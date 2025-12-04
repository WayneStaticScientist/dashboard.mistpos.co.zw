import { Spinner } from "@heroui/react";

export const NormalLoader = () => {
  return (
    <div className="w-full h-full  z-50 bg-background my-6 flex items-center justify-center">
      <Spinner classNames={{ label: "text-foreground mt-4" }} variant="wave" />
    </div>
  );
};
