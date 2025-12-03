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
import { TCategory } from "@/types/category-t";
import { useNavigation } from "@/stores/use-navigation";
import { useCategoriesStore } from "@/stores/categories-store";
import { DeleteCategoryModal } from "../layouts/delete-category-modal";
import { MaterialColors } from "@/utils/colors";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const CategoriesNav = () => {
  const navigation = useNavigation();
  const categories = useCategoriesStore();
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    categories.fetchCategories(1);
  }, []);
  if (categories.loading) {
    return <NormalLoader />;
  }
  if (!categories.loaded) {
    return <NormalError message="failed to load sales report" />;
  }
  return (
    <Fragment>
      <DeleteCategoryModal
        category={selectedCategory}
        onCloseModal={() => setSelectedCategory(null)}
      />
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search Categories"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            categories.fetchCategories(1, searchInput);
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
            <h2 className="font-semibold">Categories</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {categories.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createCategory")}
              >
                Add Category
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
                <TableColumn>Fill</TableColumn>
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {categories.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-1">
                        {e.name}
                      </TableCell>
                      <TableCell>
                        <div
                          className="w-12 h-6 rounded-2xl"
                          style={{
                            backgroundColor:
                              e.color > 0
                                ? MaterialColors.intToHexARGB(e.color)
                                : undefined,
                          }}
                        ></div>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            categories.setCategoryForEdit(e);
                            navigation.setPage("editCategory");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => setSelectedCategory(e)}
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
        onChange={(page) => categories.fetchCategories(page)}
        isDisabled={categories.loading}
        initialPage={categories.page}
        total={categories.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
