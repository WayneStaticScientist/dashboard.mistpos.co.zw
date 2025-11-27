import { SyncLoader } from "react-spinners";

export const CenterLoader = () => {
  return (
    <div className="w-screen h-screen z-50 bg-background flex items-center justify-center">
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
