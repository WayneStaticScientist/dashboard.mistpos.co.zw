import { TProduct } from "@/types/product-t";

export const getStockTrackStatus = ({
  product,
}: {
  product: TProduct;
}): {
  display: boolean;
  status: string;
  report: "low" | "warning" | "normal";
} => {
  const trackStock = product.trackStock
    ? product.isCompositeItem
      ? product.useProduction
      : true
    : false;
  return {
    display: trackStock,
    status: product.trackStock
      ? product.isCompositeItem
        ? product.useProduction
          ? product.stockQuantity.toString()
          : "production"
        : product.stockQuantity.toString()
      : "no tracking",
    report: trackStock
      ? product.stockQuantity < 0
        ? "low"
        : product.stockQuantity <= product.lowStockThreshold
        ? "warning"
        : "normal"
      : "normal",
  };
};
