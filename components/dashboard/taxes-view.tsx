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
import { TTax } from "@/types/tax-t";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";
import { useTaxesStore } from "@/stores/taxes-store";
import { useNavigation } from "@/stores/use-navigation";
import { UniversalDeleteModel } from "../layouts/universal-delete-modal";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const TaxesNav = () => {
  const taxes = useTaxesStore();
  const navigation = useNavigation();
  const [selectedTax, setSelectedTax] = useState<TTax | null>(null);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    taxes.fetchTaxies(1);
  }, []);
  if (taxes.loading) {
    return <NormalLoader />;
  }
  if (!taxes.loaded) {
    return <NormalError message="failed to load taxes" />;
  }
  return (
    <Fragment>
      <UniversalDeleteModel
        onCloseModal={() => setSelectedTax(null)}
        title={"Delete Tax"}
        show={selectedTax != null}
        summary={`delete tax ${selectedTax?.label}`}
        isLoading={taxes.loading}
        onDelete={async () => {
          try {
            await taxes.deletetaxes(selectedTax!);
            taxes.fetchTaxies(1);
            setSelectedTax(null);
          } catch (e) {
            return errorToast(decodeFromAxios(e).message);
          }
        }}
      />
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search taxes"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            taxes.fetchTaxies(1, searchInput);
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
            <h2 className="font-semibold">Taxes</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {taxes.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createTax")}
              >
                Add Tax
              </Button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <Table
              aria-label="Example static collection table max-w"
              className="text-sm table-auto w-max sm:w-full"
            >
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Rate</TableColumn>
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {taxes.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{e.label}</TableCell>
                      <TableCell>{`${e.value.toFixed(2)}%`}</TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            taxes.setTaxForEdit(e);
                            navigation.setPage("editTax");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button isIconOnly onPress={() => setSelectedTax(e)}>
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
        onChange={(page) => taxes.fetchTaxies(page)}
        isDisabled={taxes.loading}
        initialPage={taxes.page}
        total={taxes.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
