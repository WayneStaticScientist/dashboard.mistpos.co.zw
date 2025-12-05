"use client";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { CurrencyPair, useCompanyStore } from "@/stores/companies-store";
import { Button, Input, Navbar, NavbarBrand, NumberInput } from "@heroui/react";

export const EditCurrencyNav: FC = () => {
  const stores = useCompanyStore();
  const navigation = useNavigation();
  const [localCurrencyPair, setLocalCurrencyPair] =
    useState<CurrencyPair | null>();
  const initializeLocalCurrencyPair = (currencyProp?: CurrencyPair | null) => {
    if (currencyProp) {
      setLocalCurrencyPair({ ...currencyProp });
    } else {
      setLocalCurrencyPair(null);
    }
  };
  useEffect(() => {
    initializeLocalCurrencyPair(stores.selectedCurrencyPair);
  }, [stores.selectedCurrencyPair]);
  return (
    <div className="w-full flex items-center justify-center">
      {localCurrencyPair == null && "Something went wrong"}
      {localCurrencyPair && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand
              className=" cursor-pointer select-none"
              onClick={() => navigation.back()}
            >
              <IoIosArrowBack />
              <p className="font-bold text-inherit ml-3">
                Update Currency Pair
              </p>
            </NavbarBrand>
          </Navbar>
          <div className="font-bold text-xl"> {localCurrencyPair.key}</div>
          <Input
            disabled
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
            onPress={() => stores.updateCurrency(localCurrencyPair)}
          >
            Update Currency
          </Button>
        </div>
      )}
    </div>
  );
};
