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
import { useProductsStore } from "@/stores/product-stores";
import { TInventoryCounts } from "@/types/inventory-count-t";
import NormalError from "@/components/errors/normal-errror";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { convertProductToInvItem } from "@/utils/inv-converter";
import { MistDivider } from "@/components/layouts/mist-divider";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { useInventoryCountsStore } from "@/stores/inventory-counts-stores";

export const ViewInventoryCount: FC = () => {
  const invStore = useInvSelect();
  const items = useProductsStore();
  const navigation = useNavigation();
  const inventoryCount = useInventoryCountsStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [LocalinventoryCount, setLocalinventoryCount] =
    useState<TInventoryCounts | null>();
  const initializeLocalProduct = async (
    inventoryCountProp?: TInventoryCounts | null
  ) => {
    if (inventoryCountProp) {
      setLocalinventoryCount({ ...inventoryCountProp });
      if (
        inventoryCountProp.countBasedOn == "*" &&
        inventoryCountProp.status == "pending"
      ) {
        invStore.setList([]);
        invStore.setList(
          (await items.fetchProductsAsync(1, 100)).map((e) =>
            convertProductToInvItem(e)
          )
        );
      } else {
        invStore.setList(inventoryCountProp.inventoryItems);
      }
    } else {
      setLocalinventoryCount(null);
    }
  };

  useEffect(() => {
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
          {items.loading && <NormalLoader />}
          {items.loaded && (
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
                    <TableCell>
                      {toLocalCurrency(item.costDifference)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!items.loaded && !items.loading && (
            <NormalError message={"Fail to Load inv items"} />
          )}
        </div>
      )}
    </div>
  );
};
