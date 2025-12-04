"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import NormalError from "../errors/normal-errror";
import { NormalLoader } from "../loaders/normal-loader";
import { MagnifyingGlassIcon as IconSearch } from "@heroicons/react/24/outline";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { useCustomerStore } from "@/stores/customers-store";
import { UniversalDeleteModel } from "../layouts/universal-delete-modal";
import { TCustomer } from "@/types/customer-t";
import { toLocalCurrency } from "@/utils/currencies";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const CustomersNav = () => {
  const session = useSessionState();
  const navigation = useNavigation();
  const customers = useCustomerStore();
  const [selectedCustomer, setSelectedCustomer] = useState<TCustomer | null>(
    null
  );
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    customers.fetchCustomers(1);
  }, []);
  if (customers.loading) {
    return <NormalLoader />;
  }
  if (!customers.loaded) {
    return <NormalError message="failed to load Customers" />;
  }
  return (
    <Fragment>
      <UniversalDeleteModel
        onCloseModal={() => setSelectedCustomer(null)}
        title={"Delete Customer"}
        show={selectedCustomer != null}
        summary={`delete customer ${selectedCustomer?.fullName}`}
        isLoading={customers.loading}
        onDelete={async () => {
          try {
            await customers.deleteCustomer(selectedCustomer!);
            customers.fetchCustomers(1);
            setSelectedCustomer(null);
          } catch (e) {
            return errorToast(decodeFromAxios(e).message);
          }
        }}
      />
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search customers"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            customers.fetchCustomers(1, searchInput);
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-md  w-full md:w-72 text-foreground active:border-0 focus:border-0  outline-0
               active:outline-1 focus:outline-0"
          aria-label="Search Receit"
        />
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground!" />
      </div>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Customers</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {customers.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createCustomer")}
              >
                Add Customer
              </Button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <Table
              aria-label="Example static collection table max-w"
              className="text-sm table-auto w-max sm:w-full"
            >
              <TableHeader>
                <TableColumn>Employee</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Points</TableColumn>
                <TableColumn>Visits</TableColumn>
                <TableColumn>Total Purchase</TableColumn>
                <TableColumn>Est Profit</TableColumn>
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {customers.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {e.email == session.email && "(YOU)"} {e.fullName}
                      </TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.points.toFixed(2)}</TableCell>
                      <TableCell>{e.visits.toFixed(0)}</TableCell>
                      <TableCell>{toLocalCurrency(e.purchaseValue)}</TableCell>
                      <TableCell>{toLocalCurrency(e.inboundProfit)}</TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            customers.setCustomerForEdit(e);
                            navigation.setPage("editCustomer");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => setSelectedCustomer(e)}
                        >
                          <LuDelete />
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
        onChange={(page) => customers.fetchCustomers(page)}
        isDisabled={customers.loading}
        initialPage={customers.page}
        total={customers.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
