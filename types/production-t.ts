import type { InvItem } from "./purchase-order-t";

export interface TProduction {
  label: string;
  company: string;
  senderId: string;
  compositeItems: InvItem[];
}
