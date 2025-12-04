"use client";
import {
  Accordion,
  AccordionItem,
  Button,
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
import { MistDateUtils } from "@/utils/date-utils";
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

export const ViewPurchaseOrder: FC = () => {
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
  const totalItems =
    localPurchaseOrder?.inventoryItems.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    ) || 0;
  const countedItems =
    localPurchaseOrder?.inventoryItems.reduce(
      (acc, item) => acc + item.counted,
      0
    ) ?? 0;
  const percentageCompletion =
    totalItems > 0 ? (countedItems / totalItems) * 100 : 0;
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
            <NavbarContent justify="end">
              {localPurchaseOrder.status != "accepted" && (
                <NavbarItem>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => {
                      navigation.setPage("receivePurchaseOrder");
                    }}
                  >
                    RECEIVE
                  </Button>
                </NavbarItem>
              )}
            </NavbarContent>
          </Navbar>
          <InvSelectionModal
            open={invSelectorOpen}
            onCloseModal={() => {
              setInvSelectorOpen(false);
            }}
          />
          <div className="font-bold text-xl"> {localPurchaseOrder.label}</div>
          <div>
            Date :<span>{createdAt}</span>
          </div>
          <div>
            Expected On :<span>{expectedAt}</span>
          </div>
          <Progress
            aria-label="Loading..."
            className="max-w-md"
            value={percentageCompletion}
            label={`Completion ${percentageCompletion.toFixed(2)}%`}
          />
          <div>
            Status : <span>{localPurchaseOrder.status}</span>
          </div>
          {localPurchaseOrder.notes.trim().length > 0 && (
            <div>
              <span>{localPurchaseOrder.notes}</span>
            </div>
          )}
          <MistDivider />
          Supplier
          {suppliers.loading && <NormalLoader />}
          {!suppliers.loading && suppliers.supplier && (
            <Accordion>
              <AccordionItem
                key="1"
                aria-label={suppliers.supplier.name}
                title={suppliers.supplier.name}
              >
                <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                  <ListboxItem description={suppliers.supplier.name}>
                    Name
                  </ListboxItem>
                  <ListboxItem description={suppliers.supplier.address1}>
                    Address
                  </ListboxItem>
                  <ListboxItem description={suppliers.supplier.email}>
                    Email
                  </ListboxItem>
                  <ListboxItem description={suppliers.supplier.phoneNumber}>
                    Phone
                  </ListboxItem>
                  <ListboxItem description={suppliers.supplier.country}>
                    Country
                  </ListboxItem>
                </Listbox>
              </AccordionItem>
            </Accordion>
          )}
          <MistDivider />
          Purchase Order Items
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Cost</TableColumn>
              <TableColumn>Ordered</TableColumn>
              <TableColumn>Received</TableColumn>
              <TableColumn>Amount</TableColumn>
            </TableHeader>
            <TableBody>
              {invStore.list.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{toLocalCurrency(item.cost)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.counted}</TableCell>
                  <TableCell>
                    {toLocalCurrency(item.cost * item.quantity)}
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
