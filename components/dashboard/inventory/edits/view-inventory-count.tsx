"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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
import { InventoryConstants } from "@/utils/inventory";
import { useNavigation } from "@/stores/use-navigation";
import { TInventoryCounts } from "@/types/inventory-count-t";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { useInventoryCountsStore } from "@/stores/inventory-counts-stores";

export const ViewInventoryCount: FC = () => {
  const invStore = useInvSelect();
  const navigation = useNavigation();
  const inventoryCount = useInventoryCountsStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [LocalinventoryCount, setLocalinventoryCount] =
    useState<TInventoryCounts | null>();
  const initializeLocalProduct = (
    inventoryCountProp?: TInventoryCounts | null
  ) => {
    if (inventoryCountProp) {
      setLocalinventoryCount({ ...inventoryCountProp });
    } else {
      setLocalinventoryCount(null);
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
      {LocalinventoryCount == null && "Something went wrong"}
      {LocalinventoryCount && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand>
              <IoIosArrowBack
                className=" cursor-pointer select-none w-auto"
                onClick={() => navigation.back()}
              />
              <p className="font-bold text-inherit ml-3">
                {LocalinventoryCount.label}
              </p>
            </NavbarBrand>
            <NavbarContent justify="end">
              {LocalinventoryCount.status != "completed" && (
                <NavbarItem>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => {
                      navigation.setPage("countInventory");
                    }}
                  >
                    COUNT
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
          <div className="font-bold text-xl"> {LocalinventoryCount.label}</div>
          {LocalinventoryCount.createdAt && (
            <div>
              Date :
              <span>
                {MistDateUtils.formatDate(LocalinventoryCount.createdAt)}
              </span>
            </div>
          )}
          <div>
            Status :
            <span>
              {InventoryConstants.inventoryCountStatusObject[
                LocalinventoryCount.status
              ]?.label ?? ""}
            </span>
          </div>
          {LocalinventoryCount.notes.trim().length > 0 && (
            <div>
              <span>{LocalinventoryCount.notes}</span>
            </div>
          )}
          <MistDivider />
          InventoryCount Items
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
                  <TableCell>{item.counted}</TableCell>
                  <TableCell>{item.difference}</TableCell>
                  <TableCell>{toLocalCurrency(item.costDifference)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
