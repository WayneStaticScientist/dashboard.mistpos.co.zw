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
  const suppliers = useSupplierStore();
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
      suppliers.fetchSupplier(purchaseOrderProp.sellerId);
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
          Purchase Order Items
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Cost</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody>
              {invStore.list.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{toLocalCurrency(item.cost)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {toLocalCurrency(item.cost * item.quantity)}
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
              purchaseOrders.createPurchaseOrder(localPurchaseOrder);
            }}
          >
            Create Item
          </Button>
        </div>
      )}
    </div>
  );
};
