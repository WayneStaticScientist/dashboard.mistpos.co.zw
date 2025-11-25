export type TReceitItem = {
  name: string;
  cost: number;
  count: number;
  price: number;
  itemId: string;
  addenum: number;
  discount: number;
  discountId: string;
  refunded: boolean;
  originalCount: number;
  rejectedReason: string;
  percentageDiscount: boolean;
};
export type EmbeddedDiscount = {
  name: string;
  discount: number;
  discountId: string;
  percentageDiscount: boolean;
};
export type MiniTax = {
  label: string;
  value: number;
  sumOfItems: number;
};
export type TReceitModel = {
  tax: number;
  amount: number;
  seller: string;
  company: string;
  cashier: string;
  synced: boolean;
  total: number;
  label: string;
  change: number;
  payment: string;
  createdAt: string;
  totalSold: number;
  totalCosts: number;
  customerId: string;
  totalAddenums: number;
  totalDiscount: number;
  miniTax: MiniTax[];
  items: TReceitItem[];
  discounts: EmbeddedDiscount[];
};
