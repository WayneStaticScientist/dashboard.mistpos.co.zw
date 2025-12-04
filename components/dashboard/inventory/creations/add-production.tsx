"use client";
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
import { FC, useEffect, useState } from "react";
import { TProduction } from "@/types/production-t";
import { toLocalCurrency } from "@/utils/currencies";
import { useNavigation } from "@/stores/use-navigation";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { useProductionStore } from "@/stores/productions-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import { IoIosArrowBack, IoMdAdd, IoMdClose } from "react-icons/io";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";

export const AddProductions: FC = () => {
  const invStore = useInvSelect();
  const navigation = useNavigation();
  const productions = useProductionStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [Localproductions, setLocalproductions] = useState<TProduction>({
    _id: "",
    label: "",
    company: "",
    senderId: "",
    compositeItems: [],
  });
  useEffect(() => {
    invStore.setList([]);
  }, []);
  return (
    <div className="w-full flex items-center justify-center">
      <div className=" max-w-2xl w-full gap-4 flex flex-col">
        <Navbar>
          <NavbarBrand>
            <IoIosArrowBack
              className=" cursor-pointer select-none w-auto"
              onClick={() => navigation.back()}
            />
            <p className="font-bold text-inherit ml-3">Create New Production</p>
          </NavbarBrand>
        </Navbar>
        <InvSelectionModal
          compositesOnly
          open={invSelectorOpen}
          onCloseModal={() => {
            setInvSelectorOpen(false);
          }}
        />
        <div className="font-bold text-xl"> {Localproductions.label}</div>
        <Input
          label="Label"
          value={Localproductions.label}
          onChange={(e) =>
            setLocalproductions({
              ...Localproductions!,
              label: e.target.value,
            })
          }
        />
        <MistDivider />
        Productions Composites
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Total Cost</TableColumn>
            <TableColumn>
              <Button
                isIconOnly
                color="primary"
                variant="bordered"
                onPress={() => setInvSelectorOpen(true)}
              >
                <IoMdAdd />
              </Button>
            </TableColumn>
          </TableHeader>
          <TableBody>
            {invStore.list.map((item, key) => (
              <TableRow key={key}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{toLocalCurrency(item.cost)}</TableCell>
                <TableCell>
                  <Input
                    value={item.quantity.toString()}
                    onChange={(e) => {
                      let newQuantity = e.target.value;
                      if (isNaN(Number(newQuantity))) {
                        newQuantity = "0";
                      }
                      const updatedCompositeItems = invStore!.list.map(
                        (compItem) =>
                          compItem.id === item.id
                            ? {
                                ...compItem,
                                quantity: Number(newQuantity),
                              }
                            : compItem // Keep other items unchanged
                      );

                      invStore.setList(updatedCompositeItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  {toLocalCurrency(item.cost * item.quantity)}
                </TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    onPress={() => {
                      invStore.setList(
                        invStore.list.filter((i) => i.id !== item.id)
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
          isLoading={productions.loading}
          onPress={() => {
            Localproductions.compositeItems = invStore.list;
            productions.createProductions(Localproductions);
          }}
        >
          Create Item
        </Button>
      </div>
    </div>
  );
};
