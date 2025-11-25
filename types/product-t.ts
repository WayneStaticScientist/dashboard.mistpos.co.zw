import type { InvItem } from "./purchase-order-t";

export type TProduct = {
  _id: string;
  sku: string;
  color: number;
  cost: number;
  name: string;
  price: number;
  shape: string;
  soldBy: string;
  avatar: string;
  seller: string;
  company: string;
  category: string;
  barcode: string;
  isForSale: boolean;
  syncOnline: boolean;
  trackStock: boolean;
  modifiers: string[];
  stockQuantity: number;
  useProduction: boolean;
  isCompositeItem: boolean;
  compositeItems: InvItem[];
  lowStockThreshold: number;
};
