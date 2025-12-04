"use client";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Progress,
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
import { toLocalCurrency } from "@/utils/currencies";
import { useNavigation } from "@/stores/use-navigation";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { TPurchaseOrder } from "@/types/purchase-order-t";
import { useSupplierStore } from "@/stores/suppliers-store";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { usePurchaseOrderStore } from "@/stores/purchase-order-store";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { MistDateUtils } from "@/utils/date-utils";

export const ReceivePurchaseOrder: FC = () => {
  const invStore = useInvSelect();
  const navigation = useNavigation();
  const purchaseOrders = usePurchaseOrderStore();
  const [createdAt, setCreatedAt] = useState("");
  const [expectedAt, setExpectedAt] = useState("");
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [localPurchaseOrder, setLocalPurchaseOrder] =
    useState<TPurchaseOrder | null>();
  const initializeLocalProduct = (
    purchaseOrderProp?: TPurchaseOrder | null
  ) => {
    if (purchaseOrderProp) {
      setLocalPurchaseOrder({ ...purchaseOrderProp });
      setCreatedAt(MistDateUtils.formatDate(purchaseOrderProp.createdAt ?? ""));
      setExpectedAt(MistDateUtils.formatDate(purchaseOrderProp.expectedDate));
    } else {
      setLocalPurchaseOrder(null);
    }
  };

  useEffect(() => {
    invStore.setList(
      purchaseOrders?.focusedPurchaseOrder?.inventoryItems || []
    );
    initializeLocalProduct(purchaseOrders.focusedPurchaseOrder);
  }, [purchaseOrders.focusedPurchaseOrder]);

  return (
    <div className="w-full flex items-center justify-center">
      {localPurchaseOrder == null && "Something went wrong"}
      {localPurchaseOrder && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand>
              <IoIosArrowBack
                className=" cursor-pointer select-none w-auto"
                onClick={() => navigation.back()}
              />
              <p className="font-bold text-inherit ml-3">
                {localPurchaseOrder.label}
              </p>
            </NavbarBrand>
          </Navbar>
          <InvSelectionModal
            open={invSelectorOpen}
            onCloseModal={() => {
              setInvSelectorOpen(false);
            }}
          />
          <div className="flex flex-wrap justify-between items-center">
            Purchase Order Items
            <Button
              onPress={() => {
                const updatedCompositeItems = invStore!.list.map(
                  (compItem) => ({
                    ...compItem,
                    receive: compItem.quantity - compItem.counted,
                  })
                );
                invStore.setList(updatedCompositeItems);
              }}
            >
              Received All
            </Button>
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Ordered</TableColumn>
              <TableColumn>Received</TableColumn>
              <TableColumn>To Receive</TableColumn>
            </TableHeader>
            <TableBody>
              {invStore.list.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.counted}</TableCell>
                  <TableCell>
                    <Input
                      value={item.receive.toString()}
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
                                  receive: Number(newQuantity),
                                }
                              : compItem // Keep other items unchanged
                        );

                        invStore.setList(updatedCompositeItems);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            color="primary"
            isLoading={purchaseOrders.loading}
            onPress={() => {
              localPurchaseOrder.inventoryItems = invStore.list;
              purchaseOrders.completePurchaseOrder(localPurchaseOrder);
            }}
          >
            Complete
          </Button>
        </div>
      )}
    </div>
  );
};
