export interface InvItem {
  id: string;
  name: string;
  cost: number;
  quantity: number;
  amount: number;
  sku: string;
  barcode: string;
  receive: number;
  counted: number;
  updated: boolean;
  inStock: number;
}

export interface TPurchaseOrder {
  _id: any;
  createdAt?: string;
  updatedAt?: string;
  expectedDate: string;
  notes: string;
  sellerId: string;
  inventoryItems: InvItem[];
  senderId: string;
  company: string;
  status: string;
  label: string;
}
