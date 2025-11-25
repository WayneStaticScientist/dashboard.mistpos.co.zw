export interface InventoryChildCount {
  id: string;
  name: string;
  count: number;
  cost: number;
  counted: number;
  difference: number;
  costDifference: number;
}

export interface TInventoryCounts {
  label: string;
  notes: string;
  status: string;
  company: string;
  senderId: string;
  countBasedOn: string;
  totalCalculations: number;
  totalDifference: number;
  totalCostDifference: number;
  inventoryItems: InventoryChildCount[];
}
