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
import { IoIosArrowBack } from "react-icons/io";
import { FC, useEffect, useState } from "react";
import { useNavigation } from "@/stores/use-navigation";
import { useSupplierStore } from "@/stores/suppliers-store";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { TInventoryCounts } from "@/types/inventory-count-t";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { useInventoryCountsStore } from "@/stores/inventory-counts-stores";
import { toLocalCurrency } from "@/utils/currencies";

export const CountInventory: FC = () => {
  const invStore = useInvSelect();
  const navigation = useNavigation();
  const inventoryCount = useInventoryCountsStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [localPurchaseOrder, setLocalPurchaseOrder] =
    useState<TInventoryCounts | null>();
  const initializeLocalProduct = (
    purchaseOrderProp?: TInventoryCounts | null
  ) => {
    if (purchaseOrderProp) {
      setLocalPurchaseOrder({ ...purchaseOrderProp });
    } else {
      setLocalPurchaseOrder(null);
    }
  };

  useEffect(() => {
    invStore.setList(
      inventoryCount?.focusedInventoryCounts?.inventoryItems || []
    );
    initializeLocalProduct(inventoryCount.focusedInventoryCounts);
  }, [inventoryCount.focusedInventoryCounts]);

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
            Inventory Counts Items
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Stock</TableColumn>
              <TableColumn>Counted</TableColumn>
              <TableColumn>Difference</TableColumn>
              <TableColumn>Cost Difference</TableColumn>
            </TableHeader>
            <TableBody>
              {invStore.list.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{toLocalCurrency(item.cost)}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <Input
                      value={item.counted.toString()}
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
                                  counted: Number(newQuantity),
                                  difference: item.count - Number(newQuantity),
                                  costDifference:
                                    item.cost *
                                    (item.count - Number(newQuantity)),
                                }
                              : compItem
                        );

                        invStore.setList(updatedCompositeItems);
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.counted - item.count}</TableCell>
                  <TableCell>
                    {toLocalCurrency(item.cost * (item.counted - item.count))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            color="primary"
            isLoading={inventoryCount.loading}
            onPress={() => {
              localPurchaseOrder.inventoryItems = invStore.list;
              inventoryCount.updateInventoryCounts(localPurchaseOrder);
            }}
          >
            Complete
          </Button>
        </div>
      )}
    </div>
  );
};
