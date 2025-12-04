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
import { FC, useEffect, useState } from "react";
import { toLocalCurrency } from "@/utils/currencies";
import { useNavigation } from "@/stores/use-navigation";
import { IoIosArrowBack, IoMdAdd, IoMdClose } from "react-icons/io";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { useCompanyStore } from "@/stores/companies-store";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { TTransferOrder } from "@/types/transfer-order-t";
import { useTransferOrderStore } from "@/stores/transfer-order-store";
import useSessionState from "@/stores/session-store";
import { errorToast } from "@/utils/toaster";

export const AddTransferOrder: FC = () => {
  const invStore = useInvSelect();
  const session = useSessionState();
  const navigation = useNavigation();
  const companies = useCompanyStore();
  const transferOrder = useTransferOrderStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [LocaltransferOrder, setLocaltransferOrder] = useState<TTransferOrder>({
    _id: "",
    notes: "",
    label: "",
    company: "",
    senderId: "",
    toCompany: "",
    inventoryItems: [],
  });

  useEffect(() => {
    invStore.setList([]);
    companies.fetchCompanies(1);
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
            <p className="font-bold text-inherit ml-3">New TransferOrder</p>
          </NavbarBrand>
        </Navbar>
        <InvSelectionModal
          open={invSelectorOpen}
          onCloseModal={() => {
            setInvSelectorOpen(false);
          }}
        />
        {companies.loading ? (
          <NormalLoader />
        ) : (
          <Select
            className=" w-full"
            label="Destination Store"
            value={LocaltransferOrder.toCompany}
            onChange={(e) => {
              setLocaltransferOrder({
                ...LocaltransferOrder!,
                toCompany: e.target.value,
              });
            }}
          >
            {companies.list.map((company) => (
              <SelectItem key={company._id}>{company.name}</SelectItem>
            ))}
          </Select>
        )}
        <Input
          label="Notes"
          value={LocaltransferOrder.notes}
          type="text"
          onChange={(e) =>
            setLocaltransferOrder({
              ...LocaltransferOrder!,
              notes: e.target.value,
            })
          }
        />
        transferOrder Items
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>In Stock</TableColumn>
            <TableColumn>Quantity</TableColumn>
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
                <TableCell>{item.inStock}</TableCell>

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
          isLoading={transferOrder.loading}
          onPress={() => {
            if (session.company.trim() == LocaltransferOrder.toCompany.trim()) {
              return errorToast(
                "destination store cant be same as your current store"
              );
            }
            if (LocaltransferOrder.toCompany.trim() == "") {
              return errorToast("destination store cant be empty");
            }
            LocaltransferOrder.inventoryItems = invStore.list;
            transferOrder.createTransferOrder(LocaltransferOrder);
          }}
        >
          Initiate Transfer
        </Button>
      </div>
    </div>
  );
};
