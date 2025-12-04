"use client";
import { TProduct } from "@/types/product-t";
import {
  Button,
  Checkbox,
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
import useSessionState from "@/stores/session-store";
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

export const AddPurchaseOrder: FC = () => {
  const invStore = useInvSelect();
  const session = useSessionState();
  const navigation = useNavigation();
  const suppliers = useSupplierStore();
  const purchaseOrders = usePurchaseOrderStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [localPurchaseOrder, setLocalPurchaseOrder] = useState<TPurchaseOrder>({
    _id: "",
    notes: "",
    status: "",
    label: "",
    company: "",
    senderId: "",
    sellerId: "",
    expectedDate: "",
    inventoryItems: [],
  });
  useEffect(() => {
    invStore.setList([]);
    suppliers.fetchSuppliers(1);
  }, []);
  return (
    <div className="w-full flex items-center justify-center">
      <div className=" max-w-2xl w-full gap-4 flex flex-col">
        <Navbar>
          <NavbarBrand
            className=" cursor-pointer select-none"
            onClick={() => navigation.back()}
          >
            <IoIosArrowBack />
            <p className="font-bold text-inherit ml-3">Create Purchase Order</p>
          </NavbarBrand>
        </Navbar>
        <InvSelectionModal
          open={invSelectorOpen}
          onCloseModal={() => {
            setInvSelectorOpen(false);
          }}
        />
        <div className="font-bold text-xl"> New Purchase Order</div>
        {suppliers.loading && <NormalLoader />}
        {!suppliers.loading && (
          <Select
            className=" w-full"
            label="Supplier Name"
            value={localPurchaseOrder.sellerId}
            onChange={(e) => {
              setLocalPurchaseOrder({
                ...localPurchaseOrder!,
                sellerId: e.target.value,
              });
            }}
          >
            {suppliers.list.map((supplier) => (
              <SelectItem key={supplier._id}>{supplier.name}</SelectItem>
            ))}
          </Select>
        )}
        <Input
          label="Expected On"
          value={localPurchaseOrder.expectedDate}
          type="date"
          onChange={(e) =>
            setLocalPurchaseOrder({
              ...localPurchaseOrder!,
              expectedDate: e.target.value,
            })
          }
        />
        <Input
          label="Notes"
          value={localPurchaseOrder.notes}
          type="text"
          onChange={(e) =>
            setLocalPurchaseOrder({
              ...localPurchaseOrder!,
              notes: e.target.value,
            })
          }
        />
        <MistDivider />
        Purchase Order Items
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Cost</TableColumn>
            <TableColumn>Quantity</TableColumn>
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
                <TableCell>{toLocalCurrency(item.cost)}</TableCell>
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
                <TableCell>{""}</TableCell>
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
    </div>
  );
};
