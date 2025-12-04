"use client";
import { FC, useState } from "react";
import { TSupplier } from "@/types/supplier-t";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { useSupplierStore } from "@/stores/suppliers-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import { Button, Input, Navbar, NavbarBrand } from "@heroui/react";

export const AddSupplierNav: FC = () => {
  const navigation = useNavigation();
  const suppliers = useSupplierStore();
  const [localSupplier, setLocalSupplier] = useState<TSupplier>({
    _id: "",
    name: "",
    city: "",
    notes: "",
    email: "",
    country: "",
    address1: "",
    address2: "",
    postalCode: "",
    company: "",
    phoneNumber: "",
  });

  return (
    <div className="w-full flex items-center justify-center">
      <div className=" max-w-2xl w-full gap-4 flex flex-col">
        <Navbar>
          <NavbarBrand
            className=" cursor-pointer select-none"
            onClick={() => navigation.back()}
          >
            <IoIosArrowBack />
            <p className="font-bold text-inherit ml-3">Update SAupplier</p>
          </NavbarBrand>
        </Navbar>
        <div className="font-bold text-xl"> {localSupplier.name}</div>
        <Input
          label="Supplier Name"
          value={localSupplier.name}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              name: e.target.value,
            })
          }
        />
        <Input
          label="Phone Number"
          value={localSupplier.phoneNumber}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              phoneNumber: e.target.value,
            })
          }
        />
        <Input
          label="Email"
          value={localSupplier.email}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              email: e.target.value,
            })
          }
        />
        <Input
          label="Country"
          value={localSupplier.country}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              country: e.target.value,
            })
          }
        />
        <Input
          label="Address 1"
          value={localSupplier.address1}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              address1: e.target.value,
            })
          }
        />
        <Input
          label="Address 2"
          value={localSupplier.address2}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              address2: e.target.value,
            })
          }
        />
        <Input
          label="City"
          value={localSupplier.city}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              city: e.target.value,
            })
          }
        />
        <Input
          label="Postal Code"
          value={localSupplier.postalCode}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              postalCode: e.target.value,
            })
          }
        />
        <Input
          label="Notes"
          value={localSupplier.notes}
          onChange={(e) =>
            setLocalSupplier({
              ...localSupplier!,
              notes: e.target.value,
            })
          }
        />
        <MistDivider />

        <Button
          color="primary"
          isLoading={suppliers.loading}
          onPress={() => suppliers.createSupplier(localSupplier)}
        >
          Add Supplier
        </Button>
      </div>
    </div>
  );
};
