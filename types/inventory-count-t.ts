import { InvItem } from "./purchase-order-t";

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
  _id: any;
  label: string;
  notes: string;
  status: string;
  createdAt?: any;
  company: string;
  senderId: string;
  countBasedOn: string;
  totalCalculations: number;
  totalDifference: number;
  totalCostDifference: number;
  inventoryItems: InvItem[];
}
