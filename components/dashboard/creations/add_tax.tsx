"use client";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NumberInput,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { toLocalCurrency } from "@/utils/currencies";
import { useTaxesStore } from "@/stores/taxes-store";
import { useNavigation } from "@/stores/use-navigation";
import { useProductsStore } from "@/stores/product-stores";
import { FC, Fragment, useEffect, useState } from "react";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import NormalError from "@/components/errors/normal-errror";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { convertProductToInvItem } from "@/utils/inv-converter";
import { MistDivider } from "@/components/layouts/mist-divider";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { TTax } from "@/types/tax-t";

export const AddTax: FC = () => {
  const taxes = useTaxesStore();
  const invStore = useInvSelect();
  const items = useProductsStore();
  const navigation = useNavigation();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [Localtaxes, setLocaltaxes] = useState<TTax>({
    _id: "",
    label: "",
    value: 1,
    company: "",
    activated: true,
    selectedIds: [],
  });

  useEffect(() => {
    invStore.setList([]);
  }, [taxes.fetchTaxies]);

  return (
    <div className="w-full flex items-center justify-center">
      {Localtaxes == null && "Something went wrong"}
      {Localtaxes && (
        <Form
          className=" max-w-2xl w-full gap-4 flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            Localtaxes.selectedIds = invStore.list.map((e) => e.id);
            taxes.createtaxes(Localtaxes);
          }}
        >
          <Navbar>
            <NavbarBrand>
              <IoIosArrowBack
                className=" cursor-pointer select-none w-auto"
                onClick={() => navigation.back()}
              />
              <p className="font-bold text-inherit ml-3">Create Tax</p>
            </NavbarBrand>
          </Navbar>
          <InvSelectionModal
            open={invSelectorOpen}
            onCloseModal={() => {
              setInvSelectorOpen(false);
            }}
          />
          <div className="font-bold text-xl"> {Localtaxes.label}</div>
          <MistDivider />
          <Input
            isRequired
            label="Tax Label"
            value={Localtaxes.label}
            onChange={(e) =>
              setLocaltaxes({
                ...Localtaxes!,
                label: e.target.value,
              })
            }
          />
          <NumberInput
            isRequired
            label="Tax"
            minValue={0}
            maxValue={100}
            startContent={"%"}
            value={Localtaxes.value}
            onValueChange={(e) =>
              setLocaltaxes({
                ...Localtaxes!,
                value: e,
              })
            }
          />
          <Checkbox
            isSelected={Localtaxes.activated}
            onValueChange={(e) => {
              setLocaltaxes({
                ...Localtaxes!,
                activated: e,
              });
            }}
          >
            Enable Tax
          </Checkbox>
          {items.loading && Localtaxes.selectedIds.length > 0 && (
            <NormalLoader />
          )}
          {(items.loaded || Localtaxes.selectedIds.length == 0) && (
            <Fragment>
              <div className="p-4 border-b border-[#e6e6e610] flex-wrap flex w-full items-center text-foreground justify-between">
                <h2 className="font-semibold">Affected Items</h2>
                <div className="text-sm text-foreground flex items-center gap-2">
                  {invStore.list.length} items
                  <Button
                    color="primary"
                    onPress={() => setInvSelectorOpen(true)}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Cost</TableColumn>
                  <TableColumn>Cost After</TableColumn>
                  <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                  {invStore.list.map((item, key) => (
                    <TableRow key={key}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{toLocalCurrency(item.cost)}</TableCell>
                      <TableCell>
                        {toLocalCurrency(
                          item.cost * (Localtaxes.value / 100) + item.cost
                        )}
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
            </Fragment>
          )}
          {!items.loaded && !items.loading && (
            <NormalError message={"Fail to Load inv items"} />
          )}
          {!items.loading && invStore.list.length == 0 && (
            <div className="text-red-400">
              If no items are selected , tax will affect all products sold
            </div>
          )}
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={taxes.loading}
          >
            Create Tax
          </Button>
        </Form>
      )}
    </div>
  );
};
