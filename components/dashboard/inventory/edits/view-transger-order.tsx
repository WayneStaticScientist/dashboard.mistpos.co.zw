"use client";
import {
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
import { MdNearbyError } from "react-icons/md";
import { MistDateUtils } from "@/utils/date-utils";
import { useNavigation } from "@/stores/use-navigation";
import { TTransferOrder } from "@/types/transfer-order-t";
import { useCompanyStore } from "@/stores/companies-store";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { IoIosArrowBack, IoIosDoneAll } from "react-icons/io";
import { useTransferOrderStore } from "@/stores/transfer-order-store";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { MistDivider } from "@/components/layouts/mist-divider";

export const ViewTransferOrder: FC = () => {
  const invStore = useInvSelect();
  const navigation = useNavigation();
  const company = useCompanyStore();
  const transferOrder = useTransferOrderStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [LocaltransferOrder, setLocaltransferOrder] =
    useState<TTransferOrder | null>();
  const initializeLocalProduct = (
    transferOrderProp?: TTransferOrder | null
  ) => {
    if (transferOrderProp) {
      company.fetchCompany(transferOrderProp.toCompany);
      setLocaltransferOrder({ ...transferOrderProp });
    } else {
      setLocaltransferOrder(null);
    }
  };

  useEffect(() => {
    invStore.setList(transferOrder?.focusedTransferOrder?.inventoryItems || []);
    initializeLocalProduct(transferOrder.focusedTransferOrder);
  }, [transferOrder.focusedTransferOrder]);

  return (
    <div className="w-full flex items-center justify-center">
      {LocaltransferOrder == null && "Something went wrong"}
      {LocaltransferOrder && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand>
              <IoIosArrowBack
                className=" cursor-pointer select-none w-auto"
                onClick={() => navigation.back()}
              />
              <p className="font-bold text-inherit ml-3">
                {LocaltransferOrder.label}
              </p>
            </NavbarBrand>
          </Navbar>
          <InvSelectionModal
            open={invSelectorOpen}
            onCloseModal={() => {
              setInvSelectorOpen(false);
            }}
          />
          <div className="font-bold text-xl"> {LocaltransferOrder.label}</div>
          {LocaltransferOrder.createdAt && (
            <div>
              Date :
              <span>
                {MistDateUtils.formatDate(LocaltransferOrder.createdAt)}
              </span>
            </div>
          )}
          {company.loading ? (
            <NormalLoader />
          ) : (
            <div>
              Transfer To :<span>{company.company?.name}</span>
            </div>
          )}
          {LocaltransferOrder.notes.trim().length > 0 && (
            <div>
              <span>{LocaltransferOrder.notes}</span>
            </div>
          )}
          <MistDivider />
          Transfer Order Items
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Quantiy</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {invStore.list.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
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
        </div>
      )}
    </div>
  );
};
