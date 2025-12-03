import { ShiftsNav } from "@/components/dashboard/shifts";
import { MainReport } from "@/components/dashboard/main-report";
import { ReceitsNav } from "@/components/dashboard/receits-view";
import { ProductsNav } from "@/components/dashboard/products-view";
import { DailySalesReport } from "@/components/dashboard/daily-sales";
import { ItemModelEdit } from "@/components/dashboard/edits/item-edit";
import { CategoriesNav } from "@/components/dashboard/categories-view";
import { ItemModelCreate } from "@/components/dashboard/creations/add_item";
import { EditCategoryNav } from "@/components/dashboard/edits/category-edit";
import { SalesByPaymentReport } from "@/components/dashboard/sales-by-payment";
import { SalesByEmployeeReport } from "@/components/dashboard/sales-by-employee";
import { CreateCategoryNav } from "@/components/dashboard/creations/add_category";
import { ModifiersNav } from "@/components/dashboard/modifiers-view";
import { EditModifierNav } from "@/components/dashboard/edits/modifier-edit";
import { AddModifierNav } from "@/components/dashboard/creations/add_modifier";
import { DiscountsNav } from "@/components/dashboard/discounts-view";
import { EditDiscountsNav } from "@/components/dashboard/edits/discounts-edit";
import { AddDiscountsNav } from "@/components/dashboard/creations/add_discount";

export const Navigations: Record<string, React.ComponentType<any>> = {
  main: MainReport,
  shifts: ShiftsNav,
  receits: ReceitsNav,
  products: ProductsNav,
  modifiers: ModifiersNav,
  discounts: DiscountsNav,
  categories: CategoriesNav,
  editProduct: ItemModelEdit,
  dailySales: DailySalesReport,
  editModifier: EditModifierNav,
  editCategory: EditCategoryNav,
  createModifier: AddModifierNav,
  createProduct: ItemModelCreate,
  editDiscount: EditDiscountsNav,
  createDiscount: AddDiscountsNav,
  createCategory: CreateCategoryNav,
  paymentSales: SalesByPaymentReport,
  employeeSales: SalesByEmployeeReport,
};

export const MistNavigation = ({ path }: { path: string }) => {
  const Component = Navigations[path];
  return Component ? <Component /> : <>No Navigations for route {path}</>;
};
