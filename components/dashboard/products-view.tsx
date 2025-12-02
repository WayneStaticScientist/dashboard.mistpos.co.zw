"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import NormalError from "../errors/normal-errror";
import { NormalLoader } from "../loaders/normal-loader";
import { MagnifyingGlassIcon as IconSearch } from "@heroicons/react/24/outline";

import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { errorToast } from "@/utils/toaster";
import { toLocalCurrency } from "@/utils/currencies";
import { useProductsStore } from "@/stores/product-stores";
import { getStockTrackStatus } from "@/utils/stock-tracking";
import { EditProductModal } from "../layouts/edit-product-modal";
import { TProduct } from "@/types/product-t";
import { useCategoriesStore } from "@/stores/categories-store";
import { useNavigation } from "@/stores/use-navigation";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const ProductsNav = () => {
  const navigation = useNavigation();
  const products = useProductsStore();
  const categories = useCategoriesStore();
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    products.fetchProducts(1);
    categories.fetchCategories(1);
  }, []);
  if (products.loading) {
    return <NormalLoader />;
  }
  if (!products.loaded) {
    return <NormalError message="failed to load sales report" />;
  }
  return (
    <Fragment>
      <EditProductModal
        product={selectedProduct}
        onCloseModal={() => setSelectedProduct(null)}
      />
      <section className=" grid grid-cols-5   gap-4 mb-4 items-center justify-center">
        <div className="relative bg-[#e6e6e617] rounded-2xl">
          <input
            placeholder="Search Receit"
            onKeyDown={(e) => {
              if (e.key != "Enter") return;
              e.preventDefault();
              if (searchInput.trim() != "") {
                products.fetchProducts(1, searchInput);
              } else {
                return errorToast("cant search empty products");
              }
            }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md  w-full md:w-72 text-foreground active:border-0 focus:border-0  outline-0
               active:outline-1 focus:outline-0"
            aria-label="Search Receit"
          />
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground!" />
        </div>
      </section>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Products</h2>
            <div className="text-sm text-foreground">
              {products.list.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <Table
              aria-label="Example static collection table max-w"
              className="text-sm table-auto w-max sm:w-full"
            >
              <TableHeader>
                <TableColumn>Item Name</TableColumn>
                <TableColumn>Item Quantity</TableColumn>
                <TableColumn>Item Cost</TableColumn>
                <TableColumn>Item Price</TableColumn>
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {products.list.map((e, index) => {
                  const stockReport = getStockTrackStatus({ product: e });
                  return (
                    <TableRow key={index}>
                      <TableCell>{e.name}</TableCell>
                      <TableCell
                        className={`${
                          stockReport.report == "warning"
                            ? "text-orange-600"
                            : ""
                        }
                            ${stockReport.report == "low" ? "text-red-600" : ""}
                            `}
                      >
                        {stockReport.status}
                      </TableCell>
                      <TableCell>{toLocalCurrency(e.cost)}</TableCell>
                      <TableCell>{toLocalCurrency(e.price)}</TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            products.setProductForEdit(e);
                            navigation.setPage("editProduct");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button isIconOnly>
                          <LuDelete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      <Pagination
        onChange={(page) => products.fetchProducts(page)}
        isDisabled={products.loading}
        initialPage={products.page}
        total={products.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
