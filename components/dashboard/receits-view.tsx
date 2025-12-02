"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import NormalError from "../errors/normal-errror";
import { toLocalCurrency } from "@/utils/currencies";
import { NormalLoader } from "../loaders/normal-loader";
import { MagnifyingGlassIcon as IconSearch } from "@heroicons/react/24/outline";
import {
  MistTable,
  MistTableListHeaders,
  MistTableListRows,
} from "../layouts/table-header";
import { useReceitsStore } from "@/stores/receits-store";
import { Button, Pagination } from "@heroui/react";
import { errorToast } from "@/utils/toaster";
import { TReceitModel } from "@/types/receit-type";
import { ReceitModal } from "../layouts/receit-modal";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const ReceitsNav = () => {
  const receits = useReceitsStore();
  const [selectedReceit, setSelectedReceit] = useState<TReceitModel | null>(
    null
  );
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    receits.fetchReceits(1);
  }, []);
  if (receits.loading) {
    return <NormalLoader />;
  }
  if (!receits.loaded) {
    return <NormalError message="failed to load sales report" />;
  }
  return (
    <Fragment>
      <ReceitModal
        receit={selectedReceit}
        onCloseModal={() => setSelectedReceit(null)}
      />
      <section className=" grid grid-cols-5   gap-4 mb-4 items-center justify-center">
        <div className="relative bg-[#e6e6e617] rounded-2xl">
          <input
            placeholder="Search Receit"
            onKeyDown={(e) => {
              if (e.key != "Enter") return;
              e.preventDefault();
              if (searchInput.trim() != "") {
                receits.fetchReceits(1, searchInput);
              } else {
                return errorToast("cant search empty receits");
              }
            }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md  w-full md:w-72 text-foreground active:border-0 focus:border-0  outline-0
               active:outline-1 focus:outline-0"
            aria-label="Search Receit"
          />
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground!" />
        </div>
      </section>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Receits</h2>
            <div className="text-sm text-foreground">
              {receits.list.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <MistTable>
              <MistTableListHeaders
                headers={["Receit", "Date", "Total", "Actions"]}
              />
              <tbody>
                {receits.list.map((p, id) => (
                  <MistTableListRows
                    key={id}
                    rows={[p.label, p.createdAt, toLocalCurrency(p.total), ""]}
                    action={
                      <Button
                        variant="bordered"
                        color="primary"
                        onPress={() => setSelectedReceit(p)}
                      >
                        View
                      </Button>
                    }
                  />
                ))}
              </tbody>
            </MistTable>
          </div>
        </div>
      </section>
      <Pagination
        onChange={(page) => receits.fetchReceits(page)}
        isDisabled={receits.loading}
        initialPage={receits.page}
        total={receits.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
