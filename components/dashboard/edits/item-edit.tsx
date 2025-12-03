"use client";
import { TProduct } from "@/types/product-t";
import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { useProductsStore } from "@/stores/product-stores";
import { useCategoriesStore } from "@/stores/categories-store";
import { toBaseCurrence, toLocalCurrency } from "@/utils/currencies";
import { MistDivider } from "@/components/layouts/mist-divider";

export const ItemModelEdit: FC = () => {
  const categories = useCategoriesStore();
  const selectedProduct = useProductsStore();
  const [localProduct, setLocalProduct] = useState<TProduct | null>(
    selectedProduct.focusedProduct || null
  );
  const initializeLocalProduct = (productProp?: TProduct | null) => {
    if (productProp) {
      setLocalProduct({ ...productProp });
    } else {
      setLocalProduct(null);
    }
  };
  useEffect(() => {
    initializeLocalProduct(selectedProduct.focusedProduct);
  }, [selectedProduct.focusedProduct]);
  return (
    <div className="w-full flex items-center justify-center">
      {localProduct == null && "Something went wrong"}
      {localProduct && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <div className="font-bold text-xl"> {localProduct.name}</div>
          <Input
            label="Item Name"
            value={localProduct.name}
            onChange={(e) =>
              setLocalProduct({
                ...localProduct!,
                name: e.target.value,
              })
            }
          />
          <Checkbox
            isSelected={localProduct.isForSale}
            onValueChange={(e) => {
              setLocalProduct({
                ...localProduct!,
                isForSale: e,
              });
            }}
          >
            Item Is Available For Sale
          </Checkbox>
          <Select className="w-full" label="Select Category">
            {categories.list.map((category) => (
              <SelectItem key={category._id}>{category.name}</SelectItem>
            ))}
          </Select>
          <div>
            Sold By
            <div className="flex flex-wrap items-center gap-3">
              <Checkbox
                isSelected={localProduct.soldBy == "Each"}
                onValueChange={(e) => {
                  setLocalProduct({
                    ...localProduct!,
                    soldBy: e ? "Each" : "Weight",
                  });
                }}
              >
                Each
              </Checkbox>
              <Checkbox
                isSelected={localProduct.soldBy == "Weight"}
                onValueChange={(e) => {
                  setLocalProduct({
                    ...localProduct!,
                    soldBy: !e ? "Each" : "Weight",
                  });
                }}
              >
                Weight
              </Checkbox>
              <Input
                value={toLocalCurrency(localProduct.price)}
                label="Price"
                onChange={(e) => {
                  setLocalProduct({
                    ...localProduct!,
                    price: toBaseCurrence(parseFloat(e.target.value)),
                  });
                }}
              />
              {!localProduct.isCompositeItem && (
                <Input
                  value={toLocalCurrency(localProduct.cost)}
                  label="Cost"
                  onChange={(e) => {
                    setLocalProduct({
                      ...localProduct!,
                      cost: toBaseCurrence(parseFloat(e.target.value)),
                    });
                  }}
                />
              )}
              <Input
                value={localProduct.sku}
                label="SKU"
                onChange={(e) => {
                  setLocalProduct({
                    ...localProduct!,
                    sku: e.target.value,
                  });
                }}
              />
              <Input
                value={localProduct.barcode}
                label="Bar Code"
                onChange={(e) => {
                  setLocalProduct({
                    ...localProduct!,
                    barcode: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <MistDivider />
          Inventory Management
          <Checkbox
            isSelected={localProduct.isCompositeItem}
            onValueChange={(e) => {
              setLocalProduct({
                ...localProduct!,
                isCompositeItem: e,
              });
            }}
          >
            Is Composite Item
          </Checkbox>
          {localProduct.isCompositeItem && (
            <Fragment>
              <Checkbox
                isSelected={localProduct.useProduction}
                onValueChange={(e) => {
                  setLocalProduct({
                    ...localProduct!,
                    useProduction: e,
                  });
                }}
              >
                Use Productions
              </Checkbox>
            </Fragment>
          )}
          <Checkbox
            isSelected={localProduct.trackStock}
            onValueChange={(e) => {
              setLocalProduct({
                ...localProduct!,
                trackStock: e,
              });
            }}
          >
            Track Inventory
          </Checkbox>
          {localProduct.trackStock &&
            (!(localProduct.isCompositeItem && !localProduct.useProduction) ||
              !localProduct.isCompositeItem) && (
              <Fragment>
                <Input
                  label="Stock Quantity"
                  value={localProduct.stockQuantity.toString()}
                  onChange={(e) =>
                    setLocalProduct({
                      ...localProduct!,
                      stockQuantity: parseFloat(e.target.value),
                    })
                  }
                />
                <Input
                  label="Reorder Level"
                  value={localProduct.lowStockThreshold.toString()}
                  onChange={(e) =>
                    setLocalProduct({
                      ...localProduct!,
                      lowStockThreshold: parseFloat(e.target.value),
                    })
                  }
                />
              </Fragment>
            )}
          {localProduct.isCompositeItem && (
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>Tony Reichert</TableCell>
                  <TableCell>CEO</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};
