import { Spinner } from "@heroui/react";

export const CenterLoader = () => {
  return (
    <div className="w-screen h-screen z-50 bg-background flex items-center justify-center">
      <Spinner
        classNames={{ label: "text-foreground mt-4" }}
        label="loading"
        variant="wave"
      />
    </div>
  );
};
