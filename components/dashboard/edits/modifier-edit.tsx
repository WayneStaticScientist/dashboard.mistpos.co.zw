"use client";
import { ModifiersOptions, TModifier } from "@/types/modefier-t";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack, IoMdAdd, IoMdClose } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { useMofiersStore } from "@/stores/modifiers-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import useSessionState from "@/stores/session-store";
import { toBaseCurrence, toLocalCurrenceString } from "@/utils/currencies";

export const EditModifierNav: FC = () => {
  const session = useSessionState();
  const navigation = useNavigation();
  const modifiers = useMofiersStore();
  const [localModifier, setLocalModifier] = useState<TModifier | null>();
  const initializelocalModifier = (modifierProp?: TModifier | null) => {
    if (modifierProp) {
      setLocalModifier({ ...modifierProp });
    } else {
      setLocalModifier(null);
    }
  };

  useEffect(() => {
    initializelocalModifier(modifiers.focusedMofier);
  }, [modifiers.focusedMofier]);
  return (
    <div className="w-full flex items-center justify-center">
      {localModifier == null && "Something went wrong"}
      {localModifier && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand
              className=" cursor-pointer select-none"
              onClick={() => navigation.back()}
            >
              <IoIosArrowBack />
              <p className="font-bold text-inherit ml-3">Edit Modifier</p>
            </NavbarBrand>
          </Navbar>
          <div className="font-bold text-xl"> {localModifier.name}</div>
          <Input
            label="Category Name"
            value={localModifier.name}
            onChange={(e) =>
              setLocalModifier({
                ...localModifier!,
                name: e.target.value,
              })
            }
          />
          <MistDivider />
          <div className="flex justify-between items-center">
            Options
            <Button
              onPress={() => {
                const newOption: ModifiersOptions = {
                  value: 1,
                  key: "New Price",
                };
                modifiers.updateLocalMofierList([
                  ...localModifier!.list,
                  newOption,
                ]);
              }}
            >
              <IoMdAdd />
            </Button>
          </div>
          <Table
            aria-label="Example static collection table max-w"
            className="text-sm table-auto w-max sm:w-full"
          >
            <TableHeader>
              <TableColumn>Option Name</TableColumn>
              <TableColumn>Value</TableColumn>
              <TableColumn>Remove</TableColumn>
            </TableHeader>
            <TableBody>
              {localModifier.list.map((e, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Input
                      value={e.key}
                      onChange={(target) => {
                        const updatedOptions: ModifiersOptions[] =
                          localModifier!.list.map(
                            (option) =>
                              option.key === e.key
                                ? {
                                    ...option,
                                    key: target.target.value,
                                  }
                                : option // Keep other items unchanged
                          );
                        modifiers.updateLocalMofierList(updatedOptions);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      startContent={session.baseCurrence ?? "USD"}
                      value={toLocalCurrenceString(e.value)}
                      onChange={(target) => {
                        let newQuantity = target.target.value;
                        if (isNaN(Number(newQuantity))) {
                          newQuantity = "0";
                        }
                        const updatedOptions: ModifiersOptions[] =
                          localModifier!.list.map(
                            (option) =>
                              option.key === e.key
                                ? {
                                    ...option,
                                    value: toBaseCurrence(Number(newQuantity)),
                                  }
                                : option // Keep other items unchanged
                          );
                        modifiers.updateLocalMofierList(updatedOptions);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      onPress={() => {
                        modifiers.updateLocalMofierList(
                          localModifier!.list.filter(
                            (option) => option.key !== e.key
                          )
                        );
                      }}
                    >
                      <IoMdClose />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            color="primary"
            isLoading={modifiers.loading}
            onPress={() => modifiers.updateModifier(localModifier)}
          >
            Update Modifier
          </Button>
        </div>
      )}
    </div>
  );
};
