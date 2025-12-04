"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosDoneAll } from "react-icons/io";
import { MistDateUtils } from "@/utils/date-utils";
import { toLocalCurrency } from "@/utils/currencies";
import { InventoryConstants } from "@/utils/inventory";
import { useNavigation } from "@/stores/use-navigation";
import { useProductsStore } from "@/stores/product-stores";
import NormalError from "@/components/errors/normal-errror";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { convertProductToInvItem } from "@/utils/inv-converter";
import { MistDivider } from "@/components/layouts/mist-divider";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { useProductionStore } from "@/stores/productions-store";
import { TProduction } from "@/types/production-t";
import { MdNearbyError } from "react-icons/md";

export const ViewProductions: FC = () => {
  const invStore = useInvSelect();
  const items = useProductsStore();
  const navigation = useNavigation();
  const productions = useProductionStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [Localproductions, setLocalproductions] =
    useState<TProduction | null>();
  const initializeLocalProduct = async (
    productionsProp?: TProduction | null
  ) => {
    if (productionsProp) {
      setLocalproductions({ ...productionsProp });
      invStore.setList(productionsProp.compositeItems);
    } else {
      setLocalproductions(null);
    }
  };

  useEffect(() => {
    initializeLocalProduct(productions.focusedProductions);
  }, [productions.focusedProductions]);

  return (
    <div className="w-full flex items-center justify-center">
      {Localproductions == null && "Something went wrong"}
      {Localproductions && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand>
              <IoIosArrowBack
                className=" cursor-pointer select-none w-auto"
                onClick={() => navigation.back()}
              />
              <p className="font-bold text-inherit ml-3">
                {Localproductions.label}
              </p>
            </NavbarBrand>
          </Navbar>
          <InvSelectionModal
            open={invSelectorOpen}
            onCloseModal={() => {
              setInvSelectorOpen(false);
            }}
          />
          <div className="font-bold text-xl"> {Localproductions.label}</div>
          {Localproductions.createdAt && (
            <div>
              Date :
              <span>
                {MistDateUtils.formatDate(Localproductions.createdAt)}
              </span>
            </div>
          )}
          <MistDivider />
          Productions Composites
          {items.loading && <NormalLoader />}
          {items.loaded && (
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Total Cost</TableColumn>
                <TableColumn>Processed</TableColumn>
              </TableHeader>
              <TableBody>
                {invStore.list.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{toLocalCurrency(item.cost)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {toLocalCurrency(item.cost * item.quantity)}
                    </TableCell>
                    <TableCell>
                      {item.updated ? (
                        <IoIosDoneAll color="#00ff00" />
                      ) : (
                        <MdNearbyError color="#ff0000" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!items.loaded && !items.loading && (
            <NormalError message={"Fail to Load inv items"} />
          )}
        </div>
      )}
    </div>
  );
};
