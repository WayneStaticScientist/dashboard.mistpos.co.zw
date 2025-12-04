"use client";
import { TCustomer } from "@/types/customer-t";
import { IoIosArrowBack } from "react-icons/io";
import { FC, useState } from "react";
import { useNavigation } from "@/stores/use-navigation";
import { useCustomerStore } from "@/stores/customers-store";
import { Button, Input, Navbar, NavbarBrand, NumberInput } from "@heroui/react";

export const AddCustomerNav: FC = () => {
  const navigation = useNavigation();
  const customers = useCustomerStore();
  const [localCustomer, setLocalCustomer] = useState<TCustomer>({
    _id: "",
    email: "",
    city: "",
    notes: "",
    points: 0,
    visits: 0,
    company: "",
    country: "",
    address: "",
    fullName: "",
    phoneNumber: "",
    purchaseValue: 0,
    inboundProfit: 0,
  });

  return (
    <div className="w-full flex items-center justify-center">
      {localCustomer == null && "Something went wrong"}
      {localCustomer && (
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
          <div className="font-bold text-xl"> {localCustomer.fullName}</div>
          <Input
            label="Employee Name"
            value={localCustomer.fullName}
            onChange={(e) =>
              setLocalCustomer({
                ...localCustomer!,
                fullName: e.target.value,
              })
            }
          />

          <Input
            label="Email"
            value={localCustomer.email}
            onChange={(e) =>
              setLocalCustomer({
                ...localCustomer!,
                email: e.target.value,
              })
            }
          />
          <Input
            label="Phone Number"
            value={localCustomer.phoneNumber.toString()}
            onChange={(e) =>
              setLocalCustomer({
                ...localCustomer!,
                phoneNumber: e.target.value,
              })
            }
          />
          <Input
            label="Country"
            value={localCustomer.country.toString()}
            onChange={(e) =>
              setLocalCustomer({
                ...localCustomer!,
                country: e.target.value,
              })
            }
          />
          <Input
            label="City"
            value={localCustomer.city.toString()}
            onChange={(e) =>
              setLocalCustomer({
                ...localCustomer!,
                city: e.target.value,
              })
            }
          />
          <Input
            label="Address"
            value={localCustomer.address.toString()}
            onChange={(e) =>
              setLocalCustomer({
                ...localCustomer!,
                address: e.target.value,
              })
            }
          />
          <Input
            label="Notes"
            value={localCustomer.notes.toString()}
            onChange={(e) =>
              setLocalCustomer({
                ...localCustomer!,
                notes: e.target.value,
              })
            }
          />
          <Button
            color="primary"
            isLoading={customers.loading}
            onPress={() => customers.createCustomer(localCustomer)}
          >
            Create Customers
          </Button>
        </div>
      )}
    </div>
  );
};
