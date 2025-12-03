"use client";
import { FC, useState } from "react";
import { TDiscount } from "@/types/discount-t";
import { IoIosArrowBack } from "react-icons/io";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { useDiscountsStore } from "@/stores/discount-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import { toBaseCurrence, toLocalCurrenceString } from "@/utils/currencies";
import { Button, Checkbox, Input, Navbar, NavbarBrand } from "@heroui/react";

export const AddDiscountsNav: FC = () => {
  const session = useSessionState();
  const navigation = useNavigation();
  const discounts = useDiscountsStore();
  const [localDiscount, setLocalDiscount] = useState<TDiscount>({
    _id: "",
    name: "",
    value: 0,
    company: "",
    percentage: true,
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
            <p className="font-bold text-inherit ml-3">Create New Discount</p>
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
        <Input
          label={`Discount Value `}
          value={
            localDiscount.percentage
              ? localDiscount.value.toFixed(2)
              : toLocalCurrenceString(localDiscount.value)
          }
          startContent={
            localDiscount.percentage ? "%" : session.baseCurrence ?? "USD"
          }
          onChange={(e) => {
            setLocalDiscount({
              ...localDiscount!,
              value: toBaseCurrence(parseFloat(e.target.value)),
            });
          }}
        />
        <Button
          color="primary"
          isLoading={discounts.loading}
          onPress={() => discounts.createDiscount(localDiscount)}
        >
          Add Discount
        </Button>
      </div>
    </div>
  );
};
