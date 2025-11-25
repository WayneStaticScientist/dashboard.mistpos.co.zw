export interface InvItemStock {
  id: string;
  sku: string;
  cost: number;
  name: string;
  amount: number;
  barcode: string;
  quantity: number;
}
export interface TStockAdjustment {
  notes: string;
  label: string;
  reason: string;
  company: string;
  senderId: string;
  inventoryItems: InvItemStock[];
}
