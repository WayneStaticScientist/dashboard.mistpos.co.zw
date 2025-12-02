import { ShiftsNav } from "@/components/dashboard/shifts";
import { MainReport } from "@/components/dashboard/main-report";
import { DailySalesReport } from "@/components/dashboard/daily-sales";
import { SalesByPaymentReport } from "@/components/dashboard/sales-by-payment";
import { SalesByEmployeeReport } from "@/components/dashboard/sales-by-employee";
import { ReceitsNav } from "@/components/dashboard/receits-view";

export const Navigations: Record<string, React.ComponentType<any>> = {
  main: MainReport,
  shifts: ShiftsNav,
  receits: ReceitsNav,
  dailySales: DailySalesReport,
  paymentSales: SalesByPaymentReport,
  employeeSales: SalesByEmployeeReport,
};

export const MistNavigation = ({ path }: { path: string }) => {
  const Component = Navigations[path];
  return Component ? <Component /> : <>No Navigations for route {path}</>;
};
