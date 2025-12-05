"use client";
import { FC, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { CurrencyPair, useCompanyStore } from "@/stores/companies-store";
import { Button, Input, Navbar, NavbarBrand, NumberInput } from "@heroui/react";
import { errorToast } from "@/utils/toaster";

export const AddCurrencyNav: FC = () => {
  const stores = useCompanyStore();
  const navigation = useNavigation();
  const [localCurrencyPair, setLocalCurrencyPair] = useState<CurrencyPair>({
    key: "",
    value: 1,
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
            <p className="font-bold text-inherit ml-3">Update Currency Pair</p>
          </NavbarBrand>
        </Navbar>
        <div className="font-bold text-xl"> {localCurrencyPair.key}</div>
        <Input
          label="Currency Label"
          value={localCurrencyPair.key}
          onChange={(e) =>
            setLocalCurrencyPair({
              ...localCurrencyPair!,
              key: e.target.value,
            })
          }
        />
        <NumberInput
          label="Rate"
          value={localCurrencyPair.value}
          onValueChange={(e) =>
            setLocalCurrencyPair({
              ...localCurrencyPair!,
              value: e,
            })
          }
        />

        <Button
          color="primary"
          isLoading={stores.loading}
          onPress={() => {
            if (localCurrencyPair.key.trim().length == 0) {
              return errorToast("Currency key is required");
            }
            stores.updateCurrency(localCurrencyPair);
          }}
        >
          Update Currency
        </Button>
      </div>
    </div>
  );
};
