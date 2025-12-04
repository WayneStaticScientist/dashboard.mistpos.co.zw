import type { InvItem } from "./purchase-order-t";

export interface TProduction {
  _id: any;
  label: string;
  company: string;
  senderId: string;
  createdAt?: string;
  compositeItems: InvItem[];
}
