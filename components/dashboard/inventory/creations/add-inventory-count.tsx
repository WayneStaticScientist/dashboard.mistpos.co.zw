"use client";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { errorToast } from "@/utils/toaster";
import { FC, Fragment, useEffect, useState } from "react";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { useCompanyStore } from "@/stores/companies-store";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { TInventoryCounts } from "@/types/inventory-count-t";
import { IoIosArrowBack, IoMdAdd, IoMdClose } from "react-icons/io";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { useInventoryCountsStore } from "@/stores/inventory-counts-stores";
import { MistDivider } from "@/components/layouts/mist-divider";
import { toLocalCurrency } from "@/utils/currencies";

export const AddInventoryCount: FC = () => {
  const invStore = useInvSelect();
  const session = useSessionState();
  const navigation = useNavigation();
  const companies = useCompanyStore();
  const inventoryCount = useInventoryCountsStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [LocalinventoryCount, setLocalinventoryCount] =
    useState<TInventoryCounts>({
      _id: "",
      notes: "",
      label: "",
      company: "",
      senderId: "",
      status: "",
      countBasedOn: "-",
      inventoryItems: [],
      totalDifference: 0,
      totalCalculations: 0,
      totalCostDifference: 0,
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
            <p className="font-bold text-inherit ml-3">New inventoryCount</p>
          </NavbarBrand>
        </Navbar>
        <InvSelectionModal
          open={invSelectorOpen}
          onCloseModal={() => {
            setInvSelectorOpen(false);
          }}
        />
        <Select
          className=" w-full"
          label="Count From"
          defaultSelectedKeys={"-"}
          value={LocalinventoryCount.countBasedOn}
          onChange={(e) => {
            setLocalinventoryCount({
              ...LocalinventoryCount!,
              countBasedOn: e.target.value,
            });
          }}
        >
          <SelectItem key="-">Selected Items</SelectItem>
          <SelectItem key="*">All</SelectItem>
        </Select>
        <Input
          label="Notes"
          value={LocalinventoryCount.notes}
          type="text"
          onChange={(e) =>
            setLocalinventoryCount({
              ...LocalinventoryCount!,
              notes: e.target.value,
            })
          }
        />
        {LocalinventoryCount.countBasedOn !== "*" && (
          <Fragment>
            <MistDivider />
            InventoryCount Items
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Cost</TableColumn>
                <TableColumn>In Stock</TableColumn>
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
                    <TableCell>{item.inStock}</TableCell>
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
        <Button
          color="primary"
          isLoading={inventoryCount.loading}
          onPress={() => {
            if (
              LocalinventoryCount.countBasedOn !== "*" &&
              invStore.list.length
            ) {
              return errorToast("no items for count is selected");
            }
            LocalinventoryCount.inventoryItems = invStore.list;
            inventoryCount.createInventoryCounts(LocalinventoryCount);
          }}
        >
          Create Count
        </Button>
      </div>
    </div>
  );
};
