"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import NormalError from "../errors/normal-errror";
import { NormalLoader } from "../loaders/normal-loader";
import { MagnifyingGlassIcon as IconSearch } from "@heroicons/react/24/outline";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { errorToast } from "@/utils/toaster";
import { TProduct } from "@/types/product-t";
import { MaterialColors } from "@/utils/colors";
import { toLocalCurrency } from "@/utils/currencies";
import { TfiExport, TfiImport } from "react-icons/tfi";
import { useProductsStore } from "@/stores/product-stores";
import { getStockTrackStatus } from "@/utils/stock-tracking";
import { ImportListModel } from "../layouts/imported-items-list";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const ExportOrImportProduct = () => {
  const products = useProductsStore();
  const [limit, setLimit] = useState(50);
  const [fileName, setFileName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    products.fetchProducts(1, searchInput, {
      limit: limit,
    });
  }, []);
  if (products.loading) {
    return <NormalLoader />;
  }
  if (!products.loaded) {
    return <NormalError message="failed to load sales report" />;
  }

  // 2. Function to handle the file selection once a file is chosen
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target!.files;
    if (files && files.length > 0) {
      try {
        const jsonData = JSON.parse(await files[0].text());
        if (!Array.isArray(jsonData)) {
          return errorToast("Error parsing : The data seems corrupted");
        }
        const arrayed = jsonData as TProduct[];
        if (arrayed.length == 0) {
          return errorToast("Error parsing , no items found");
        }
        products.setImportList(arrayed);
      } catch (e) {
        errorToast("There was error parsing this mist file");
      } finally {
        event.target.value = "";
      }
    }
  };

  const triggerFileSelect = () => {
    fileInputRef?.current?.click();
  };
  return (
    <Fragment>
      <ImportListModel />
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Export File
              </ModalHeader>
              <ModalBody>
                <Input
                  value={fileName}
                  label="File Name"
                  variant="bordered"
                  placeholder="Enter File Name"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (fileName.trim().length == 0)
                      return errorToast("File name should not be empty");
                    products.exportProductsToExternal({ fileName });
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search Product"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            products.fetchProducts(1, searchInput, {
              limit: limit,
            });
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-md  w-full md:w-72 text-foreground active:border-0 focus:border-0  outline-0
               active:outline-1 focus:outline-0"
          aria-label="Search Receit"
        />
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground!" />
      </div>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Export</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              <Button
                color="secondary"
                variant="bordered"
                isLoading={products.uploadingImportedItems}
                onPress={triggerFileSelect}
              >
                <TfiImport className="m-2" /> Import
              </Button>
              <Button color="primary" variant="bordered" onPress={onOpen}>
                <TfiExport className="m-2" /> Export
              </Button>
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
                <TableColumn>Remove</TableColumn>
              </TableHeader>
              <TableBody>
                {products.list.map((e, index) => {
                  const stockReport = getStockTrackStatus({ product: e });
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-1">
                        <div
                          dangerouslySetInnerHTML={{ __html: e.shape }}
                          style={{
                            color: MaterialColors.intToHexARGB(e.color),
                          }}
                        />
                        {e.name}
                      </TableCell>
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
                            products.setList(
                              products.list.filter((i) => i._id !== e._id)
                            );
                          }}
                        >
                          <IoMdClose />
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
        onChange={(page) =>
          products.fetchProducts(page, searchInput, {
            limit: limit,
          })
        }
        isDisabled={products.loading}
        initialPage={products.page}
        total={products.totalPages}
        className=" py-6"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        // Optional: Add 'accept' for specific file types, e.g., accept=".pdf,.doc"
      />
    </Fragment>
  );
};
