import { TProduct } from "@/types/product-t";
import { InvItem } from "@/types/purchase-order-t";

export const convertProductToInvItem = (product: TProduct): InvItem => {
  return {
    id: product._id,
    name: product.name,
    cost: product.cost,
    quantity: 0,
    count: product.stockQuantity,
    amount: product.price,
    sku: product.sku,
    barcode: product.barcode,
    receive: 0,
    counted: 0,
    updated: false,
    inStock: product.stockQuantity,
    difference: 0,
    costDifference: 0,
  };
};
