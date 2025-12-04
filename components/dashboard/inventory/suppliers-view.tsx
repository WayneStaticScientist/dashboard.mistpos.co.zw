"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
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
import { TSupplier } from "@/types/supplier-t";
import { useNavigation } from "@/stores/use-navigation";
import { useSupplierStore } from "@/stores/suppliers-store";
import NormalError from "@/components/errors/normal-errror";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { UniversalDeleteModel } from "@/components/layouts/universal-delete-modal";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const SuppliersNav = () => {
  const navigation = useNavigation();
  const suppliers = useSupplierStore();
  const [selectedSupplier, setSelectedSupplier] = useState<TSupplier | null>(
    null
  );
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    suppliers.fetchSuppliers(1);
  }, []);
  if (suppliers.loading) {
    return <NormalLoader />;
  }
  if (!suppliers.loaded) {
    return <NormalError message="failed to load Suppliers" />;
  }
  return (
    <Fragment>
      <UniversalDeleteModel
        onCloseModal={() => setSelectedSupplier(null)}
        title={"Delete Supplier"}
        show={selectedSupplier != null}
        summary={`delete supplier ${selectedSupplier?.name}`}
        isLoading={suppliers.loading}
        onDelete={async () => {
          try {
            await suppliers.deleteSupplier(selectedSupplier!);
            suppliers.fetchSuppliers(1);
            setSelectedSupplier(null);
          } catch (e) {
            return errorToast(decodeFromAxios(e).message);
          }
        }}
      />
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search Suppliers"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            suppliers.fetchSuppliers(1, searchInput);
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
          <div className="p-4 border-b border-[#e6e6e610] flex flex-wrap items-center text-foreground justify-between">
            <h2 className="font-semibold">Suppliers</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {suppliers.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createSupplier")}
              >
                Add Supplier
              </Button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <Table
              aria-label="Example static collection table max-w"
              className="text-sm table-auto w-max sm:w-full"
            >
              <TableHeader>
                <TableColumn>Supplier Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {suppliers.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-1">
                        {e.name}
                      </TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            suppliers.setSupplierForEdit(e);
                            navigation.setPage("editSupplier");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => setSelectedSupplier(e)}
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
        onChange={(page) => suppliers.fetchSuppliers(page)}
        isDisabled={suppliers.loading}
        initialPage={suppliers.page}
        total={suppliers.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
