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
import { TCompany } from "@/types/company-t";
import { errorToast } from "@/utils/toaster";
import { GoArrowSwitch } from "react-icons/go";
import { decodeFromAxios } from "@/utils/errors";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { useCompanyStore } from "@/stores/companies-store";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { UniversalDeleteModel } from "../layouts/universal-delete-modal";
import { MaterialColors } from "@/utils/colors";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const StoresNav = () => {
  const stores = useCompanyStore();
  const session = useSessionState();
  const navigation = useNavigation();
  const [selectedStore, setSelectedStore] = useState<TCompany | null>(null);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    stores.fetchCompanies(1);
  }, []);
  if (stores.loading) {
    return <NormalLoader />;
  }
  if (!stores.loaded) {
    return <NormalError message="failed to load stores" />;
  }
  return (
    <Fragment>
      <UniversalDeleteModel
        onCloseModal={() => setSelectedStore(null)}
        title={"Delete Store"}
        show={selectedStore != null}
        summary={`delete store ${selectedStore?.name}`}
        isLoading={stores.loading}
        onDelete={async () => {
          try {
            await stores.deleteCompany(selectedStore!);
            stores.fetchCompanies(1);
            setSelectedStore(null);
          } catch (e) {
            return errorToast(decodeFromAxios(e).message);
          }
        }}
      />
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search stores"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            stores.fetchCompanies(1, searchInput);
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
            <h2 className="font-semibold">stores</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {stores.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createStore")}
              >
                Add Store
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
                <TableColumn>Edit</TableColumn>
                <TableColumn>Switch</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {stores.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {e.owner == session._id && "(You)"} {e.name}
                      </TableCell>

                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            stores.seTCompanyForEdit(e);
                            navigation.setPage("editStore");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          variant="bordered"
                          color={
                            session.company == e._id ? "primary" : "default"
                          }
                          disabled={session.switching}
                          isLoading={session.switchId == e._id}
                          onPress={() => {
                            if (e._id == session.company) {
                              return;
                            }
                            session.switchToACompany(e._id);
                          }}
                        >
                          {session.company == e._id ? (
                            <IoMdCheckmarkCircleOutline
                              color={MaterialColors.MaterialGreen}
                            />
                          ) : (
                            <GoArrowSwitch />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button isIconOnly onPress={() => setSelectedStore(e)}>
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
        onChange={(page) => stores.fetchCompanies(page)}
        isDisabled={stores.loading}
        initialPage={stores.page}
        total={stores.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
