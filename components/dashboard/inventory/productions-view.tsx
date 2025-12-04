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
import { useNavigation } from "@/stores/use-navigation";
import NormalError from "@/components/errors/normal-errror";
import { useProductionStore } from "@/stores/productions-store";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { MistDateUtils } from "@/utils/date-utils";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const ProductionsNav = () => {
  const navigation = useNavigation();
  const productions = useProductionStore();

  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    productions.fetchProductions(1);
  }, []);
  if (productions.loading) {
    return <NormalLoader />;
  }
  if (!productions.loaded) {
    return <NormalError message="failed to load productions" />;
  }
  return (
    <Fragment>
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search productions"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            productions.fetchProductions(1, searchInput);
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
            <h2 className="font-semibold">Productions</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {productions.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createProduction")}
              >
                Add Production
              </Button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <Table
              aria-label="Example static collection table max-w"
              className="text-sm table-auto w-max sm:w-full"
            >
              <TableHeader>
                <TableColumn>Label</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Edit</TableColumn>
              </TableHeader>
              <TableBody>
                {productions.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-1">
                        {e.label}
                      </TableCell>
                      <TableCell>
                        {e.createdAt && MistDateUtils.formatDate(e.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            productions.setProductionForEdit(e);
                            navigation.setPage("editProduction");
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
        onChange={(page) => productions.fetchProductions(page)}
        isDisabled={productions.loading}
        initialPage={productions.page}
        total={productions.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
