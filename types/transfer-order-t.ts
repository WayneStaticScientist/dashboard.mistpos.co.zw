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
  label: string;
  notes: string;
  inventoryItems: TransferInvItem[];
  senderId: string;
  company: string;
  toCompany: string;
}
