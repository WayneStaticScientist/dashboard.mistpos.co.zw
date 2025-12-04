import { InvItem } from "./purchase-order-t";

export interface TransferInvItem {
  id: string;
  name: string;
  cost: number;
  quantity: number;
  amount: number;
  sku: string;
  barcode: string;
  updated: boolean;
}
export interface TTransferOrder {
  _id: any;
  label: string;
  notes: string;
  inventoryItems: InvItem[];
  senderId: string;
  company: string;
  toCompany: string;
  createdAt?: string;
}
