"use client";
import { TUser } from "@/types/user-t";
import { FC, Fragment, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { useEmployeesStore } from "@/stores/employees-store";
import {
  Button,
  Chip,
  Input,
  InputOtp,
  Navbar,
  NavbarBrand,
  Select,
  SelectItem,
} from "@heroui/react";
import { MistDivider } from "@/components/layouts/mist-divider";
import { EmployeeUtils } from "@/utils/employee-utils";

export const EditEmployeeNav: FC = () => {
  const navigation = useNavigation();
  const employees = useEmployeesStore();
  const [localEmployee, setLocalEmployee] = useState<TUser | null>();
  const initializeLocalEmployee = (employeeProp?: TUser | null) => {
    if (employeeProp) {
      setLocalEmployee({ ...employeeProp });
    } else {
      setLocalEmployee(null);
    }
  };

  useEffect(() => {
    initializeLocalEmployee(employees.focusedEmployee);
  }, [employees.focusedEmployee]);
  return (
    <div className="w-full flex items-center justify-center">
      {localEmployee == null && "Something went wrong"}
      {localEmployee && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand
              className=" cursor-pointer select-none"
              onClick={() => navigation.back()}
            >
              <IoIosArrowBack />
              <p className="font-bold text-inherit ml-3">Update Employee</p>
            </NavbarBrand>
          </Navbar>
          <div className="font-bold text-xl"> {localEmployee.fullName}</div>
          <Input
            label="Employee Name"
            value={localEmployee.fullName}
            onChange={(e) =>
              setLocalEmployee({
                ...localEmployee!,
                fullName: e.target.value,
              })
            }
          />
          <Input
            label="Email"
            value={localEmployee.email}
            onChange={(e) =>
              setLocalEmployee({
                ...localEmployee!,
                email: e.target.value,
              })
            }
          />
          <Input
            label="Till Number"
            value={localEmployee.till.toString()}
            onChange={(e) => {
              let newQuantity = e.target.value;
              if (isNaN(Number(newQuantity))) {
                newQuantity = "0";
              }
              setLocalEmployee({
                ...localEmployee!,
                till: Number(newQuantity),
              });
            }}
          />
          <MistDivider />
          <Select
            className="w-full"
            label="Roles"
            defaultSelectedKeys={[localEmployee.role]}
            value={localEmployee.role}
            onChange={(e) => {
              setLocalEmployee({
                ...localEmployee!,
                role: e.target.value,
              });
            }}
          >
            {EmployeeUtils.roles.map((role) => (
              <SelectItem key={role.value}>{role.label}</SelectItem>
            ))}
          </Select>
          {localEmployee.role == "manager" && (
            <Fragment>
              <MistDivider />
              Permissions for Manager
              <div className="my-3 flex w-full flex-wrap items-center gap-2 cursor-pointer select-none">
                {EmployeeUtils.permissions.map((permission, index) => {
                  const inPermissions =
                    localEmployee.permissions?.includes(permission.value) ??
                    false;
                  return (
                    <Chip
                      color={inPermissions ? "primary" : "default"}
                      key={index}
                      onClick={() => {
                        if (inPermissions) {
                          setLocalEmployee({
                            ...(localEmployee ?? []),
                            permissions: localEmployee.permissions.filter(
                              (p) => p != permission.value
                            ),
                          });
                        } else {
                          setLocalEmployee({
                            ...(localEmployee ?? []),
                            permissions: [
                              ...(localEmployee.permissions ?? []),
                              permission.value,
                            ],
                          });
                        }
                      }}
                    >
                      {permission.name}
                    </Chip>
                  );
                })}
              </div>
            </Fragment>
          )}
          Pin
          <InputOtp
            label="Pin"
            length={4}
            value={localEmployee.pin}
            onValueChange={(e) =>
              setLocalEmployee({
                ...localEmployee!,
                pin: e,
              })
            }
          />
          <Button
            color="primary"
            isLoading={employees.loading}
            onPress={() => employees.updateEmployee(localEmployee)}
          >
            Update Employee
          </Button>
        </div>
      )}
    </div>
  );
};
