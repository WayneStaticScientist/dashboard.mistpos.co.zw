"use client";
import {
  Accordion,
  AccordionItem,
  Button,
  colors,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MistDateUtils } from "@/utils/date-utils";
import { toLocalCurrency } from "@/utils/currencies";
import { useNavigation } from "@/stores/use-navigation";
import { useSupplierStore } from "@/stores/suppliers-store";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { TStockAdjustment } from "@/types/stock-ajustement-t";
import { MistDivider } from "@/components/layouts/mist-divider";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { useStockAdjustmentStore } from "@/stores/stockadjument-store";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { InventoryConstants } from "@/utils/inventory";

export const ViewStockAdjustment: FC = () => {
  const invStore = useInvSelect();
  const navigation = useNavigation();
  const suppliers = useSupplierStore();
  const stockAdjustment = useStockAdjustmentStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [LocalStockAdjustment, setLocalStockAdjustment] =
    useState<TStockAdjustment | null>();
  const initializeLocalProduct = (
    stockAdjustmentProp?: TStockAdjustment | null
  ) => {
    if (stockAdjustmentProp) {
      setLocalStockAdjustment({ ...stockAdjustmentProp });
    } else {
      setLocalStockAdjustment(null);
    }
  };

  useEffect(() => {
    invStore.setList(
      stockAdjustment?.focusedStockAdjustment?.inventoryItems || []
    );
    initializeLocalProduct(stockAdjustment.focusedStockAdjustment);
  }, [stockAdjustment.focusedStockAdjustment]);

  return (
    <div className="w-full flex items-center justify-center">
      {LocalStockAdjustment == null && "Something went wrong"}
      {LocalStockAdjustment && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand>
              <IoIosArrowBack
                className=" cursor-pointer select-none w-auto"
                onClick={() => navigation.back()}
              />
              <p className="font-bold text-inherit ml-3">
                {LocalStockAdjustment.label}
              </p>
            </NavbarBrand>
          </Navbar>
          <InvSelectionModal
            open={invSelectorOpen}
            onCloseModal={() => {
              setInvSelectorOpen(false);
            }}
          />
          <div className="font-bold text-xl"> {LocalStockAdjustment.label}</div>
          {LocalStockAdjustment.createdAt && (
            <div>
              Date :
              <span>
                {MistDateUtils.formatDate(LocalStockAdjustment.createdAt)}
              </span>
            </div>
          )}
          <div>
            Reason :
            <span>
              {InventoryConstants.adjustStockReasonsMainObject[
                LocalStockAdjustment.reason
              ]?.label ?? ""}
            </span>
          </div>
          {LocalStockAdjustment.notes.trim().length > 0 && (
            <div>
              <span>{LocalStockAdjustment.notes}</span>
            </div>
          )}
          StockAdjustment Items
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>In Stock</TableColumn>
              {["add", "loss", "damaged"].includes(
                LocalStockAdjustment.reason
              ) ? (
                <TableColumn>
                  {LocalStockAdjustment.reason == "add"
                    ? "Added  Stock"
                    : "Removed Stock"}
                </TableColumn>
              ) : (
                <TableColumn className="w-0"> {""}</TableColumn>
              )}
              {LocalStockAdjustment.reason == "count" ? (
                <TableColumn>Counted</TableColumn>
              ) : (
                <TableColumn>
                  {["loss", "damaged"].includes(LocalStockAdjustment.reason)
                    ? "Loss"
                    : "Cost"}
                </TableColumn>
              )}
              <TableColumn>Stock After</TableColumn>
            </TableHeader>
            <TableBody>
              {invStore.list.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.inStock}</TableCell>
                  {["add", "loss", "damaged"].includes(
                    LocalStockAdjustment.reason
                  ) ? (
                    <TableCell
                      style={{
                        color:
                          LocalStockAdjustment.reason == "loss" ||
                          LocalStockAdjustment.reason == "damaged"
                            ? "#ff0000"
                            : undefined,
                      }}
                    >
                      {item.quantity}
                    </TableCell>
                  ) : (
                    <TableCell className="w-0">{""}</TableCell>
                  )}
                  {LocalStockAdjustment.reason != "count" ? (
                    <TableCell
                      style={{
                        color:
                          LocalStockAdjustment.reason == "loss" ||
                          LocalStockAdjustment.reason == "damaged"
                            ? "#ff0000"
                            : undefined,
                      }}
                    >
                      {" "}
                      {toLocalCurrency(item.cost * item.quantity)}
                    </TableCell>
                  ) : (
                    <TableCell>{item.quantity}</TableCell>
                  )}

                  <TableCell>
                    {LocalStockAdjustment.reason == "damaged" ||
                      (LocalStockAdjustment.reason == "loss" &&
                        item.inStock - item.quantity)}
                    {LocalStockAdjustment.reason == "add" &&
                      item.inStock + item.quantity}
                    {LocalStockAdjustment.reason == "count" && item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
