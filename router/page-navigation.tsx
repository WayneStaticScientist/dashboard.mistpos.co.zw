import { DailySalesReport } from "@/components/dashboard/daily-sales";
import { MainReport } from "@/components/dashboard/main-report";
import { SalesByEmployeeReport } from "@/components/dashboard/sales-by-employee";

export const Navigations: Record<string, React.ComponentType<any>> = {
  main: MainReport,
  dailySales: DailySalesReport,
  employeeSales: SalesByEmployeeReport,
};

export const MistNavigation = ({ path }: { path: string }) => {
  const Component = Navigations[path];
  return Component ? <Component /> : <>No Navigations for route {path}</>;
};
