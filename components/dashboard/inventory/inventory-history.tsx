"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BiSearchAlt } from "react-icons/bi";
import { MistDateUtils } from "@/utils/date-utils";
import NormalError from "@/components/errors/normal-errror";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { useInventoryHistoryStore } from "@/stores/inventory-history-stores";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const InventoryHistoryNav = () => {
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const productions = useInventoryHistoryStore();
  useEffect(() => {
    const endDateData = new Date();
    const startDateData = new Date(endDateData.getTime() - 3600000 * 24 * 31);
    const formattedStartDate = `${startDateData.getFullYear()}-${pad(
      startDateData.getMonth() + 1
    )}-${pad(startDateData.getDate())}`;
    const formattedEndDate = `${endDateData.getFullYear()}-${pad(
      endDateData.getMonth() + 1
    )}-${pad(endDateData.getDate())}`;

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    productions.fetchInventoryHistory(
      startDateData.toISOString(),
      endDateData.toISOString()
    );
  }, []);
  if (productions.loading) {
    return <NormalLoader />;
  }
  if (!productions.loaded) {
    return <NormalError message="failed to load productions" />;
  }
  return (
    <Fragment>
      <section className=" grid grid-cols-5   gap-4 mb-4 items-center justify-center">
        <Input
          type="date"
          className=" col-span-2"
          label="start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          className=" col-span-2"
          type="date"
          label="end date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button
          color="primary"
          variant="bordered"
          isIconOnly
          onPress={() => {
            productions.fetchInventoryHistory(startDate, endDate);
          }}
        >
          <BiSearchAlt />
        </Button>
      </section>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex flex-wrap items-center text-foreground justify-between">
            <h2 className="font-semibold">Inventory History</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              {productions.list.length} items
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <Table
              aria-label="Example static collection table max-w"
              className="text-sm table-auto w-max sm:w-full"
            >
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Document Type</TableColumn>
                <TableColumn>Quantity Change</TableColumn>
              </TableHeader>
              <TableBody>
                {productions.list.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="p-2">{e.itemName}</TableCell>
                      <TableCell>
                        {e.createdAt && MistDateUtils.formatDate(e.createdAt)}
                      </TableCell>
                      <TableCell className="p-2">{e.documentType}</TableCell>
                      <TableCell className="p-2">{e.quantityChange}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
