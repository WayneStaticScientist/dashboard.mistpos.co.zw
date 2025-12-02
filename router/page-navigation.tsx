import { ShiftsNav } from "@/components/dashboard/shifts";
import { MainReport } from "@/components/dashboard/main-report";
import { ReceitsNav } from "@/components/dashboard/receits-view";
import { ProductsNav } from "@/components/dashboard/products-view";
import { DailySalesReport } from "@/components/dashboard/daily-sales";
import { ItemModelEdit } from "@/components/dashboard/edits/item-edit";
import { SalesByPaymentReport } from "@/components/dashboard/sales-by-payment";
import { SalesByEmployeeReport } from "@/components/dashboard/sales-by-employee";

export const Navigations: Record<string, React.ComponentType<any>> = {
  main: MainReport,
  shifts: ShiftsNav,
  receits: ReceitsNav,
  products: ProductsNav,
  editProduct: ItemModelEdit,
  dailySales: DailySalesReport,
  paymentSales: SalesByPaymentReport,
  employeeSales: SalesByEmployeeReport,
};

export const MistNavigation = ({ path }: { path: string }) => {
  const Component = Navigations[path];
  return Component ? <Component /> : <>No Navigations for route {path}</>;
};
