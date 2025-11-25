import { MainReport } from "@/components/dashboard/main-report";

export const Navigations: Record<string, React.ComponentType<any>> = {
  main: MainReport,
};

export const MistNavigation = ({ path }: { path: string }) => {
  const Component = Navigations[path];
  return Component ? <Component /> : <>No Navigations for route {path}</>;
};
