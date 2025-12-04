"use client";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack, IoMdAdd, IoMdClose } from "react-icons/io";
import { toLocalCurrency } from "@/utils/currencies";
import { InventoryConstants } from "@/utils/inventory";
import { useNavigation } from "@/stores/use-navigation";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { TStockAdjustment } from "@/types/stock-ajustement-t";
import { useStockAdjustmentStore } from "@/stores/stockadjument-store";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";

export const AddStockAdjustment: FC = () => {
  const invStore = useInvSelect();
  const navigation = useNavigation();
  const stockAdjustment = useStockAdjustmentStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [LocalStockAdjustment, setLocalStockAdjustment] =
    useState<TStockAdjustment>({
      _id: "",
      notes: "",
      label: "",
      reason: "",
      company: "",
      senderId: "",
      inventoryItems: [],
    });

  useEffect(() => {
    invStore.setList([]);
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className=" max-w-2xl w-full gap-4 flex flex-col">
        <Navbar>
          <NavbarBrand>
            <IoIosArrowBack
              className=" cursor-pointer select-none w-auto"
              onClick={() => navigation.back()}
            />
            <p className="font-bold text-inherit ml-3">New StockAdjustment</p>
          </NavbarBrand>
        </Navbar>
        <InvSelectionModal
          open={invSelectorOpen}
          onCloseModal={() => {
            setInvSelectorOpen(false);
          }}
        />
        <Select
          className=" w-full"
          label="Reason"
          value={LocalStockAdjustment.reason}
          onChange={(e) => {
            setLocalStockAdjustment({
              ...LocalStockAdjustment!,
              reason: e.target.value,
            });
          }}
        >
          {InventoryConstants.adjustStockReasons.map((reason) => (
            <SelectItem key={reason.value}>{reason.label}</SelectItem>
          ))}
        </Select>
        <Input
          label="Notes"
          value={LocalStockAdjustment.notes}
          type="text"
          onChange={(e) =>
            setLocalStockAdjustment({
              ...LocalStockAdjustment!,
              notes: e.target.value,
            })
          }
        />
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
            <TableColumn>
              <Button
                isIconOnly
                color="primary"
                variant="bordered"
                onPress={() => setInvSelectorOpen(true)}
              >
                <IoMdAdd />
              </Button>
            </TableColumn>
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
                    <Input
                      value={item.quantity.toString()}
                      onChange={(e) => {
                        let newQuantity = e.target.value;
                        if (isNaN(Number(newQuantity))) {
                          newQuantity = "0";
                        }
                        const updatedCompositeItems = invStore!.list.map(
                          (compItem) =>
                            compItem.id === item.id
                              ? {
                                  ...compItem,
                                  quantity: Number(newQuantity),
                                }
                              : compItem // Keep other items unchanged
                        );

                        invStore.setList(updatedCompositeItems);
                      }}
                    />
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
                    {toLocalCurrency(item.cost * item.quantity)}
                  </TableCell>
                ) : (
                  <TableCell>
                    <Input
                      value={item.quantity.toString()}
                      onChange={(e) => {
                        let newQuantity = e.target.value;
                        if (isNaN(Number(newQuantity))) {
                          newQuantity = "0";
                        }
                        const updatedCompositeItems = invStore!.list.map(
                          (compItem) =>
                            compItem.id === item.id
                              ? {
                                  ...compItem,
                                  quantity: Number(newQuantity),
                                }
                              : compItem // Keep other items unchanged
                        );

                        invStore.setList(updatedCompositeItems);
                      }}
                    />
                  </TableCell>
                )}

                <TableCell>
                  {LocalStockAdjustment.reason == "damaged" ||
                    (LocalStockAdjustment.reason == "loss" &&
                      item.inStock - item.quantity)}
                  {LocalStockAdjustment.reason == "add" &&
                    item.inStock + item.quantity}
                  {LocalStockAdjustment.reason == "count" && item.quantity}
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    onPress={() => {
                      invStore.setList(
                        invStore.list.filter((i) => i.id !== item.id)
                      );
                    }}
                  >
                    <IoMdClose />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          color="primary"
          isLoading={stockAdjustment.loading}
          onPress={() => {
            LocalStockAdjustment.inventoryItems = invStore.list;
            stockAdjustment.createStockAdjustment(LocalStockAdjustment);
          }}
        >
          Adjust Stock
        </Button>
      </div>
    </div>
  );
};
