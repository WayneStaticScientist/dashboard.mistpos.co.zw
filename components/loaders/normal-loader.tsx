import { SyncLoader } from "react-spinners";

export const NormalLoader = () => {
  return (
    <div className="w-full h-full  z-50 bg-background flex items-center justify-center">
      <SyncLoader
        color="#aa00bb"
        loading={true}
        size={14}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
