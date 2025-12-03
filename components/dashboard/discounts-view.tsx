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
import { useNavigation } from "@/stores/use-navigation";
import { TDiscount } from "@/types/discount-t";
import { DeleteDiscountModal } from "../layouts/delete-discount-modal";
import { useDiscountsStore } from "@/stores/discount-store";
import { toLocalCurrency } from "@/utils/currencies";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const DiscountsNav = () => {
  const navigation = useNavigation();
  const discounts = useDiscountsStore();
  const [selectedDiscount, setSelectedDiscount] = useState<TDiscount | null>(
    null
  );
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    discounts.fetchDiscounts(1);
  }, []);
  if (discounts.loading) {
    return <NormalLoader />;
  }
  if (!discounts.loaded) {
    return <NormalError message="failed to load sales report" />;
  }
  return (
    <Fragment>
      <DeleteDiscountModal
        discount={selectedDiscount}
        onCloseModal={() => setSelectedDiscount(null)}
      />
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search discounts"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            discounts.fetchDiscounts(1, searchInput);
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
            <h2 className="font-semibold">discounts</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {discounts.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createDiscount")}
              >
                Add Discount
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
                <TableColumn>Value</TableColumn>
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {discounts.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-1">
                        {e.name}
                      </TableCell>
                      <TableCell>
                        {e.percentage
                          ? `${e.value.toFixed(2)}%`
                          : toLocalCurrency(e.value)}
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            discounts.setDiscountForEdit(e);
                            navigation.setPage("editDiscount");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => setSelectedDiscount(e)}
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
        onChange={(page) => discounts.fetchDiscounts(page)}
        isDisabled={discounts.loading}
        initialPage={discounts.page}
        total={discounts.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
