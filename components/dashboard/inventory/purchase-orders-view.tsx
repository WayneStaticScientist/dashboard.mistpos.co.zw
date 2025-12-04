"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { MagnifyingGlassIcon as IconSearch } from "@heroicons/react/24/outline";
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { useNavigation } from "@/stores/use-navigation";
import NormalError from "@/components/errors/normal-errror";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { usePurchaseOrderStore } from "@/stores/purchase-order-store";
import { InventoryConstants } from "@/utils/inventory";
import { MistDateUtils } from "@/utils/date-utils";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const PurchaseOrdersNav = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState("");
  const purchaseOrders = usePurchaseOrderStore();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    purchaseOrders.fetchPurchaseOrders(1);
  }, []);
  if (purchaseOrders.loading) {
    return <NormalLoader />;
  }
  if (!purchaseOrders.loaded) {
    return <NormalError message="failed to Purchase Orders" />;
  }
  return (
    <Fragment>
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search Purchase Orders"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            purchaseOrders.fetchPurchaseOrders(1, searchInput, status);
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
        {InventoryConstants.purchaseOrderStatus.map((state, index) => (
          <Chip
            color={status == state.value ? "primary" : "default"}
            key={index}
            onClick={() => {
              setStatus(state.value);
              purchaseOrders.fetchPurchaseOrders(1, searchInput, state.value);
            }}
          >
            {state.label}
          </Chip>
        ))}
      </div>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex-wrap flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Purchase Orders</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {purchaseOrders.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createPurchaseOrder")}
              >
                New PurchaseOrder
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
                <TableColumn>Status</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>View</TableColumn>
              </TableHeader>
              <TableBody>
                {purchaseOrders.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{e.label}</TableCell>
                      <TableCell>{e.status}</TableCell>
                      <TableCell>
                        {e.createdAt && MistDateUtils.formatDate(e.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            purchaseOrders.setPurchaseOrderForEdit(e);
                            navigation.setPage("viewPurchaseOrder");
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
          purchaseOrders.fetchPurchaseOrders(page, searchInput, status)
        }
        isDisabled={purchaseOrders.loading}
        initialPage={purchaseOrders.page}
        total={purchaseOrders.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
