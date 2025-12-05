import { ShiftsNav } from "@/components/dashboard/shifts";
import { MainReport } from "@/components/dashboard/main-report";
import { ReceitsNav } from "@/components/dashboard/receits-view";
import { ProductsNav } from "@/components/dashboard/products-view";
import { DailySalesReport } from "@/components/dashboard/daily-sales";
import { ModifiersNav } from "@/components/dashboard/modifiers-view";
import { ItemModelEdit } from "@/components/dashboard/edits/item-edit";
import { CategoriesNav } from "@/components/dashboard/categories-view";
import { ItemModelCreate } from "@/components/dashboard/creations/add_item";
import { EditCategoryNav } from "@/components/dashboard/edits/category-edit";
import { SalesByPaymentReport } from "@/components/dashboard/sales-by-payment";
import { SalesByEmployeeReport } from "@/components/dashboard/sales-by-employee";
import { CreateCategoryNav } from "@/components/dashboard/creations/add_category";
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
import { AddInventoryCount } from "@/components/dashboard/inventory/creations/add-inventory-count";
import { ProductionsNav } from "@/components/dashboard/inventory/productions-view";
import { ViewProductions } from "@/components/dashboard/inventory/edits/view-productions";
import { AddProductions } from "@/components/dashboard/inventory/creations/add-production";
import { InventoryHistoryNav } from "@/components/dashboard/inventory/inventory-history";
import { InventoryEvaluation } from "@/components/dashboard/inventory/inventory-evaluation";
import { EmployeesNav } from "@/components/dashboard/employees-view";
import { EditEmployeeNav } from "@/components/dashboard/edits/employee-edit";
import { AddEmployeeNav } from "@/components/dashboard/creations/add_employee";
import { CustomersNav } from "@/components/dashboard/customers-view";
import { EditCustomerNav } from "@/components/dashboard/edits/edit-customer";
import { AddCustomerNav } from "@/components/dashboard/creations/add_customer";
import { StoresNav } from "@/components/dashboard/stores-view";
import { EditStoreNav } from "@/components/dashboard/edits/store-edit";
import { AddStoreNav } from "@/components/dashboard/creations/add_store";
import { RatesView } from "@/components/dashboard/rates-view";
import { EditCurrencyNav } from "@/components/dashboard/edits/currence-edit";
import { AddCurrencyNav } from "@/components/dashboard/creations/add_currency";

export const Navigations: Record<string, React.ComponentType<any>> = {
  rates: RatesView,
  main: MainReport,
  su: SuppliersNav,
  shifts: ShiftsNav,
  stores: StoresNav,
  receits: ReceitsNav,
  ta: TransferOrdersNav,
  po: PurchaseOrdersNav,
  products: ProductsNav,
  ic: InventoryCountsNav,
  editStore: EditStoreNav,
  employees: EmployeesNav,
  ih: InventoryHistoryNav,
  editRate: EditCurrencyNav,
  createStore: AddStoreNav,
  modifiers: ModifiersNav,
  customers: CustomersNav,
  sa: StockAdjustmentsNav,
  iv: InventoryEvaluation,
  discounts: DiscountsNav,
  categories: CategoriesNav,
  editProduct: ItemModelEdit,
  productions: ProductionsNav,
  dailySales: DailySalesReport,
  addCurrency: AddCurrencyNav,
  editCustomer: EditCustomerNav,
  createEmployee: AddEmployeeNav,
  editModifier: EditModifierNav,
  editCategory: EditCategoryNav,
  createModifier: AddModifierNav,
  editSupplier: EditsupplierNav,
  countInventory: CountInventory,
  createProduct: ItemModelCreate,
  editDiscount: EditDiscountsNav,
  createSupplier: AddSupplierNav,
  createCustomer: AddCustomerNav,
  editEmployee: EditEmployeeNav,
  editProduction: ViewProductions,
  createDiscount: AddDiscountsNav,
  createProduction: AddProductions,
  createCategory: CreateCategoryNav,
  paymentSales: SalesByPaymentReport,
  employeeSales: SalesByEmployeeReport,
  viewPurchaseOrder: ViewPurchaseOrder,
  viewTransferOrder: ViewTransferOrder,
  createTransferOrder: AddTransferOrder,
  createPurchaseOrder: AddPurchaseOrder,
  viewInventoryCount: ViewInventoryCount,
  viewStockAdjusment: ViewStockAdjustment,
  createInventoryCount: AddInventoryCount,
  receivePurchaseOrder: ReceivePurchaseOrder,
  createStockAdjustment: AddStockAdjustment,
};

export const MistNavigation = ({ path }: { path: string }) => {
  const Component = Navigations[path];
  return Component ? <Component /> : <>No Navigations for route {path}</>;
};
