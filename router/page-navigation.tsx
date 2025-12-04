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
import { PurchaseOrdersNav } from "@/components/dashboard/inventory/purchase-orders-view";
import { AddPurchaseOrder } from "@/components/dashboard/inventory/creations/add-purchase-order";
import { ViewPurchaseOrder } from "@/components/dashboard/inventory/edits/view-purchase-order";
import { ReceivePurchaseOrder } from "@/components/dashboard/inventory/edits/receive-purchase-order";
import { StockAdjustmentsNav } from "@/components/dashboard/inventory/stock-adjustments-view";
import { ViewStockAdjustment } from "@/components/dashboard/inventory/edits/view-stock-adjustments";
import { AddStockAdjustment } from "@/components/dashboard/inventory/creations/add-stock-adjustment";
import { SuppliersNav } from "@/components/dashboard/inventory/suppliers-view";
import { EditsupplierNav } from "@/components/dashboard/inventory/edits/supplier-edits";
import { AddSupplierNav } from "@/components/dashboard/inventory/creations/add-supplier";
import { TransferOrdersNav } from "@/components/dashboard/inventory/transfer-orders-view";
import { ViewTransferOrder } from "@/components/dashboard/inventory/edits/view-transger-order";
import { AddTransferOrder } from "@/components/dashboard/inventory/creations/add-transfer-order";
import { InventoryCountsNav } from "@/components/dashboard/inventory/inventory-counts-view";
import { ViewInventoryCount } from "@/components/dashboard/inventory/edits/view-inventory-count";
import { CountInventory } from "@/components/dashboard/inventory/edits/count-inventory";

export const Navigations: Record<string, React.ComponentType<any>> = {
  main: MainReport,
  su: SuppliersNav,
  shifts: ShiftsNav,
  receits: ReceitsNav,
  ta: TransferOrdersNav,
  po: PurchaseOrdersNav,
  products: ProductsNav,
  ic: InventoryCountsNav,
  modifiers: ModifiersNav,
  sa: StockAdjustmentsNav,
  discounts: DiscountsNav,
  categories: CategoriesNav,
  editProduct: ItemModelEdit,
  dailySales: DailySalesReport,
  editModifier: EditModifierNav,
  editCategory: EditCategoryNav,
  createModifier: AddModifierNav,
  editSupplier: EditsupplierNav,
  countInventory: CountInventory,
  createProduct: ItemModelCreate,
  editDiscount: EditDiscountsNav,
  createSupplier: AddSupplierNav,
  createDiscount: AddDiscountsNav,
  createCategory: CreateCategoryNav,
  paymentSales: SalesByPaymentReport,
  employeeSales: SalesByEmployeeReport,
  viewPurchaseOrder: ViewPurchaseOrder,
  viewTransferOrder: ViewTransferOrder,
  createTransferOrder: AddTransferOrder,
  createPurchaseOrder: AddPurchaseOrder,
  viewInventoryCount: ViewInventoryCount,
  viewStockAdjusment: ViewStockAdjustment,
  receivePurchaseOrder: ReceivePurchaseOrder,
  createStockAdjustment: AddStockAdjustment,
};

export const MistNavigation = ({ path }: { path: string }) => {
  const Component = Navigations[path];
  return Component ? <Component /> : <>No Navigations for route {path}</>;
};
