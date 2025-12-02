import { Spinner } from "@heroui/react";

export const NormalLoader = () => {
  return (
    <div className="w-full h-full  z-50 bg-background flex items-center justify-center">
      <Spinner
        classNames={{ label: "text-foreground mt-4" }}
        label="loading"
        variant="wave"
      />
    </div>
  );
};
