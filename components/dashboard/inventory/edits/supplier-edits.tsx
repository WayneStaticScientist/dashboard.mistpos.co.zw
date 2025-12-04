"use client";
import { TDiscount } from "@/types/discount-t";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { useSupplierStore } from "@/stores/suppliers-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import { Button, Checkbox, Input, Navbar, NavbarBrand } from "@heroui/react";
import { toBaseCurrence, toLocalCurrenceString } from "@/utils/currencies";
import { TSupplier } from "@/types/supplier-t";

export const EditsupplierNav: FC = () => {
  const session = useSessionState();
  const navigation = useNavigation();
  const suppliers = useSupplierStore();
  const [localSupplier, setLocalSupplier] = useState<TSupplier | null>();
  const initializeLocalSupplier = (supplierProp?: TSupplier | null) => {
    if (supplierProp) {
      setLocalSupplier({ ...supplierProp });
    } else {
      setLocalSupplier(null);
    }
  };

  useEffect(() => {
    initializeLocalSupplier(suppliers.focusedSupplier);
  }, [suppliers.focusedSupplier]);
  return (
    <div className="w-full flex items-center justify-center">
      {localSupplier == null && "Something went wrong"}
      {localSupplier && (
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
            onPress={() => suppliers.updateSupplier(localSupplier)}
          >
            Update Supplier
          </Button>
        </div>
      )}
    </div>
  );
};
