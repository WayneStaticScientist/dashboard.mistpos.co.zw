"use client";
import { TDiscount } from "@/types/discount-t";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { useDiscountsStore } from "@/stores/discount-store";
import {
  Button,
  Checkbox,
  Input,
  Navbar,
  NavbarBrand,
  NumberInput,
} from "@heroui/react";
import { MistDivider } from "@/components/layouts/mist-divider";
import { toBaseCurrence, toLocalCurrenceString } from "@/utils/currencies";
import useSessionState from "@/stores/session-store";

export const EditDiscountsNav: FC = () => {
  const session = useSessionState();
  const navigation = useNavigation();
  const discounts = useDiscountsStore();
  const [localDiscount, setLocalDiscount] = useState<TDiscount | null>();
  const initializeLocalDiscount = (discountProp?: TDiscount | null) => {
    if (discountProp) {
      setLocalDiscount({ ...discountProp });
    } else {
      setLocalDiscount(null);
    }
  };

  useEffect(() => {
    initializeLocalDiscount(discounts.focusedDiscount);
  }, [discounts.focusedDiscount]);
  return (
    <div className="w-full flex items-center justify-center">
      {localDiscount == null && "Something went wrong"}
      {localDiscount && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand
              className=" cursor-pointer select-none"
              onClick={() => navigation.back()}
            >
              <IoIosArrowBack />
              <p className="font-bold text-inherit ml-3">Update Discount</p>
            </NavbarBrand>
          </Navbar>
          <div className="font-bold text-xl"> {localDiscount.name}</div>
          <Input
            label="Discount Name"
            value={localDiscount.name}
            onChange={(e) =>
              setLocalDiscount({
                ...localDiscount!,
                name: e.target.value,
              })
            }
          />
          <MistDivider />
          <Checkbox
            isSelected={localDiscount.percentage}
            onValueChange={(e) => {
              setLocalDiscount({
                ...localDiscount!,
                percentage: e,
              });
            }}
          >
            Percentage Evaluation
          </Checkbox>
          <NumberInput
            label={`Discount Value `}
            value={localDiscount.value}
            startContent={
              localDiscount.percentage ? "%" : session.baseCurrence ?? "USD"
            }
            onValueChange={(e) => {
              setLocalDiscount({
                ...localDiscount!,
                value: toBaseCurrence(e),
              });
            }}
          />
          <Button
            color="primary"
            isLoading={discounts.loading}
            onPress={() => discounts.updateDiscount(localDiscount)}
          >
            Update Discount
          </Button>
        </div>
      )}
    </div>
  );
};
