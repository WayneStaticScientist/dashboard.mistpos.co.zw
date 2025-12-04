export class InventoryConstants {
  static purchaseOrderStatus = [
    { label: "All", value: "" },
    { label: "Drafts", value: "draft" },
    { label: "Pending", value: "pending" },
    { label: "In Process", value: "partial-received" },
    { label: "Declined", value: "declined" },
    { label: "Accepted", value: "accepted" },
  ];
  static adjustStockReasons = [
    { label: "Receive Items", value: "add" },
    { label: "Inventory Count", value: "count" },
    { label: "Loss", value: "loss" },
    { label: "Damaged", value: "damaged" },
  ];
  static adjustStockReasonsMain = [
    { label: "All", value: "" },
    { label: "Receive Items", value: "add" },
    { label: "Inventory Count", value: "count" },
    { label: "Loss", value: "loss" },
    { label: "Damaged", value: "damaged" },
  ];
  static inventoryCountStatus = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "completed" },
  ];
  static adjustStockReasonsMainObject: any = {
    add: { label: "Receive Items", value: "add" },
    count: { label: "Inventory Count", value: "count" },
    loss: { label: "Loss", value: "loss" },
    damaged: { label: "Damaged", value: "damaged" },
  };
  static inventoryCountStatusObject: any = {
    pending: { label: "Pending", value: "pending" },
    completed: { label: "Counted", value: "completed" },
  };
}
