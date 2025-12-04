"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { MagnifyingGlassIcon as IconSearch } from "@heroicons/react/24/outline";
import {
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
  TableColumn,
  TableHeader,
  Chip,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { MistDateUtils } from "@/utils/date-utils";
import { toLocalCurrency } from "@/utils/currencies";
import { InventoryConstants } from "@/utils/inventory";
import { useNavigation } from "@/stores/use-navigation";
import NormalError from "@/components/errors/normal-errror";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { useInventoryCountsStore } from "@/stores/inventory-counts-stores";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const InventoryCountsNav = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState("");
  const inventoryCounts = useInventoryCountsStore();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    inventoryCounts.fetchInventoryCounts(1);
  }, []);
  if (inventoryCounts.loading) {
    return <NormalLoader />;
  }
  if (!inventoryCounts.loaded) {
    return <NormalError message="failed to Inventory Counts" />;
  }
  return (
    <Fragment>
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search Inventory Counts"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            inventoryCounts.fetchInventoryCounts(1, searchInput, status);
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-md  w-full md:w-72 text-foreground active:border-0 focus:border-0  outline-0
               active:outline-1 focus:outline-0"
          aria-label="Search Receit"
        />
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground!" />
      </div>
      <div className="my-3 flex w-full overflow-x-auto items-center gap-2 cursor-pointer select-none">
        {InventoryConstants.inventoryCountStatus.map((state, index) => (
          <Chip
            color={status == state.value ? "primary" : "default"}
            key={index}
            onClick={() => {
              setStatus(state.value);
              inventoryCounts.fetchInventoryCounts(1, searchInput, state.value);
            }}
          >
            {state.label}
          </Chip>
        ))}
      </div>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 flex-wrap border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Inventory Counts</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {inventoryCounts.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createInventoryCount")}
              >
                New InventoryCount
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
                <TableColumn>Date</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Cost Difference</TableColumn>
                <TableColumn>Operations</TableColumn>
              </TableHeader>
              <TableBody>
                {inventoryCounts.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{e.label}</TableCell>
                      <TableCell>
                        {MistDateUtils.formatDate(e.createdAt)}
                      </TableCell>
                      <TableCell>
                        {InventoryConstants.inventoryCountStatusObject[e.status]
                          ?.label ?? "-"}
                      </TableCell>
                      <TableCell>
                        {toLocalCurrency(e.totalCostDifference)}
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            inventoryCounts.setInventoryCountsForEdit(e);
                            navigation.setPage("viewInventoryCount");
                          }}
                        >
                          <BiEdit />
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
          inventoryCounts.fetchInventoryCounts(page, searchInput, status)
        }
        isDisabled={inventoryCounts.loading}
        initialPage={inventoryCounts.page}
        total={inventoryCounts.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
