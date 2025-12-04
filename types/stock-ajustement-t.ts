import { InvItem } from "./purchase-order-t";

export interface TStockAdjustment {
  _id: any;
  notes: string;
  label: string;
  reason: string;
  company: string;
  senderId: string;
  createdAt?: string;
  updatedAt?: string;
  inventoryItems: InvItem[];
}
