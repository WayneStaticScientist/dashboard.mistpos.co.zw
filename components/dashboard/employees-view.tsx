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
import { useEmployeesStore } from "@/stores/employees-store";
import { TUser } from "@/types/user-t";
import { UniversalDeleteModel } from "../layouts/universal-delete-modal";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";
import useSessionState from "@/stores/session-store";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const EmployeesNav = () => {
  const session = useSessionState();
  const navigation = useNavigation();
  const employees = useEmployeesStore();
  const [selectedEmployee, setSelectedEmployee] = useState<TUser | null>(null);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    employees.fetchEmployees(1);
  }, []);
  if (employees.loading) {
    return <NormalLoader />;
  }
  if (!employees.loaded) {
    return <NormalError message="failed to load Employees" />;
  }
  return (
    <Fragment>
      <UniversalDeleteModel
        onCloseModal={() => setSelectedEmployee(null)}
        title={"Delete Employee"}
        show={selectedEmployee != null}
        summary={`delete employee ${selectedEmployee?.fullName}`}
        isLoading={employees.loading}
        onDelete={async () => {
          try {
            await employees.deleteEmployee(selectedEmployee!);
            employees.fetchEmployees(1);
            setSelectedEmployee(null);
          } catch (e) {
            return errorToast(decodeFromAxios(e).message);
          }
        }}
      />
      <div className="relative bg-[#e6e6e617] rounded-2xl w-full  md:w-72 my-3">
        <input
          placeholder="Search employees"
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            e.preventDefault();
            employees.fetchEmployees(1, searchInput);
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
            <h2 className="font-semibold">Employees</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {employees.list.length} items
              <Button
                color="primary"
                onPress={() => navigation.setPage("createEmployee")}
              >
                Add Employee
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
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                {employees.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {e.email == session.email && "(YOU)"} {e.fullName}
                      </TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => {
                            employees.setEmployeeForEdit(e);
                            navigation.setPage("editEmployee");
                          }}
                        >
                          <BiEdit />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          onPress={() => setSelectedEmployee(e)}
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
        onChange={(page) => employees.fetchEmployees(page)}
        isDisabled={employees.loading}
        initialPage={employees.page}
        total={employees.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
