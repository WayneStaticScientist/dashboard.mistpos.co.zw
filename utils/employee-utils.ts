export class EmployeeUtils {
  static roles: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Cashier",
      value: "cashier",
    },
    {
      label: "Manager",
      value: "manager",
    },
    {
      label: "Admin",
      value: "admin",
    },
  ];
  static permissions: PermissionStructure[] = [
    { name: "Add Inventory Items", value: "inventory-add" },
    {
      name: "Add/Approve Inventory Items",
      value: "inventory-*",
    },
    { name: "Add/Update/Delete products", value: "product" },
    {
      name: "Add/Update/Delete categories",
      value: "categories",
    },
    {
      name: "Add/Update/Delete Employees",
      value: "employement",
    },
    { name: "Add/Update/Delete Suppliers", value: "supplier" },
    { name: "View Admin Statistics", value: "statistics" },
    { name: "Add/Update/Delete company", value: "company" },
    {
      name: "Add/Update/Delete modifiers",
      value: "modifiers",
    },
    {
      name: "Add/Update/Delete discounts",
      value: "discounts",
    },
    { name: "Delete Customers", value: "customer-*" },
    { name: "Have Cashier Capabilites", value: "cashier" },
    { name: "Payment Integrations", value: "payment" },
    { name: "Add/Remove and manage taxes", value: "tax" },
    { name: "Subscribe to paid plans", value: "subscribe" },
  ];
}

export interface PermissionStructure {
  name: string;
  value: string;
}
