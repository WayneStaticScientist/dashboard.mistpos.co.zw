"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BiSearchAlt } from "react-icons/bi";
import { toLocalCurrency } from "@/utils/currencies";
import NormalError from "@/components/errors/normal-errror";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { useInventoryEvaluation } from "@/stores/inventory-evalution";
import { MistDivider } from "@/components/layouts/mist-divider";
import { useProductsStore } from "@/stores/product-stores";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const InventoryEvaluation = () => {
  const products = useProductsStore();
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const evaluations = useInventoryEvaluation();
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
    evaluations.fetchInventoryEvaluations(
      startDateData.toISOString(),
      endDateData.toISOString()
    );
    products.fetchProducts(1);
  }, []);
  if (evaluations.loading) {
    return <NormalLoader />;
  }
  if (!evaluations.loaded) {
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
            evaluations.fetchInventoryEvaluations(startDate, endDate);
          }}
        >
          <BiSearchAlt />
        </Button>
      </section>
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex flex-wrap items-center text-foreground justify-between">
            <h2 className="font-semibold">Inventory Evaluation</h2>
          </div>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem
              description={toLocalCurrency(
                evaluations.evalueation?.totalRevenue ?? 0
              )}
            >
              Total Revenue Value
            </ListboxItem>
            <ListboxItem
              description={toLocalCurrency(
                evaluations.evalueation?.totalCost ?? 0
              )}
            >
              Total Retail Value
            </ListboxItem>
            <ListboxItem
              description={toLocalCurrency(
                (evaluations.evalueation?.totalRevenue ?? 0) -
                  (evaluations.evalueation?.totalCost ?? 0)
              )}
            >
              Potential Profit
            </ListboxItem>
            <ListboxItem
              description={
                (
                  ((evaluations.evalueation?.totalCost ?? 0) /
                    (evaluations.evalueation?.totalRevenue ?? 0)) *
                  100
                ).toFixed(2) + "%"
              }
            >
              Margin
            </ListboxItem>
          </Listbox>
          <MistDivider />
          Products ({products.list.length})
          {products.loading && <NormalLoader />}
          {!products.loading && !products.loaded && (
            <NormalError message="failed to load products" />
          )}
          {products.loaded && (
            <div className="p-4 overflow-x-auto">
              <Table
                aria-label="Example static collection table max-w"
                className="text-sm table-auto w-max sm:w-full"
              >
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Quantity</TableColumn>
                  <TableColumn>Cost</TableColumn>
                  <TableColumn>Retail</TableColumn>
                  <TableColumn>Profit</TableColumn>
                  <TableColumn>Margin</TableColumn>
                </TableHeader>
                <TableBody>
                  {products.list.map((e, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="p-2">{e.name}</TableCell>
                        <TableCell>
                          {e.trackStock
                            ? e.isCompositeItem
                              ? e.useProduction
                                ? e.stockQuantity
                                : "production"
                              : e.stockQuantity
                            : "no tracking"}
                        </TableCell>
                        <TableCell className="p-2">
                          {toLocalCurrency(e.cost)}
                        </TableCell>
                        <TableCell className="p-2">
                          {toLocalCurrency(e.price)}
                        </TableCell>
                        <TableCell className="p-2">
                          {e.trackStock
                            ? e.isCompositeItem
                              ? e.useProduction
                                ? toLocalCurrency(
                                    e.stockQuantity * (e.price - e.cost)
                                  )
                                : "production"
                              : toLocalCurrency(
                                  e.stockQuantity * (e.price - e.cost)
                                )
                            : "-"}
                        </TableCell>
                        <TableCell className="p-2">
                          {e.trackStock
                            ? e.isCompositeItem
                              ? e.useProduction
                                ? `${((100 * e.cost) / e.price).toFixed(2)}%`
                                : "production"
                              : `${((100 * e.cost) / e.price).toFixed(2)}%`
                            : "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>
      <Pagination
        page={products.page}
        onChange={(page) => products.fetchProducts(page)}
        isDisabled={products.loading}
        initialPage={products.page}
        total={products.totalPages}
        className=" py-6"
      />
    </Fragment>
  );
};
