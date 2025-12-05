"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import {
  Button,
  Listbox,
  ListboxItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { errorToast } from "@/utils/toaster";
import { GoArrowSwitch } from "react-icons/go";
import { MaterialColors } from "@/utils/colors";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { CurrencyPair, useCompanyStore } from "@/stores/companies-store";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import NormalError from "@/components/errors/normal-errror";
import { MistDivider } from "@/components/layouts/mist-divider";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { UniversalDeleteModel } from "../layouts/universal-delete-modal";
import { decodeFromAxios } from "@/utils/errors";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const RatesView = () => {
  const navigation = useNavigation();
  const session = useSessionState();
  const company = useCompanyStore();
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyPair | null>();
  useEffect(() => {
    company.fetchCompany(session.company);
  }, [session.company]);
  if (company.loading) {
    return <NormalLoader />;
  }
  if (!company.loaded) {
    return <NormalError message="failed to Store" />;
  }
  return (
    <Fragment>
      <UniversalDeleteModel
        onCloseModal={() => setSelectedCurrency(null)}
        title={"Delete Currency Pair"}
        show={selectedCurrency != null}
        summary={`delete currency ${selectedCurrency?.key}`}
        isLoading={company.loading}
        onDelete={async () => {
          try {
            await company.deleteCurrency(selectedCurrency!);
            company.fetchCompany(session.company);
            setSelectedCurrency(null);
          } catch (e) {
            return errorToast(decodeFromAxios(e).message);
          }
        }}
      />
      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex flex-wrap items-center text-foreground justify-between">
            <h2 className="font-semibold">Currencies</h2>
          </div>
          <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
            <ListboxItem description={session.baseCurrence ?? "USD"}>
              Current Selected Currency
            </ListboxItem>
            <ListboxItem description={company.company?.name}>
              Company
            </ListboxItem>
          </Listbox>
          <MistDivider />

          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Currencies</h2>
            <div className="text-sm text-foreground flex items-center gap-2">
              (
              {(company.company?.exchangeRates?.rates != null &&
                Object.keys(company.company?.exchangeRates?.rates).length) ??
                0}
              )
              <Button
                color="primary"
                onPress={() => {
                  navigation.setPage("addCurrency");
                }}
              >
                Add Currency
              </Button>
            </div>
          </div>
          {company.company?.exchangeRates?.rates == null && (
            <NormalError message="failed to load rates" />
          )}
          {company.company?.exchangeRates?.rates != null && (
            <div className="p-4 overflow-x-auto">
              <Table
                aria-label="Example static collection table max-w"
                className="text-sm table-auto w-max sm:w-full"
              >
                <TableHeader>
                  <TableColumn>Symbol</TableColumn>
                  <TableColumn>Rate</TableColumn>
                  <TableColumn>Switch</TableColumn>
                  <TableColumn>Edit</TableColumn>
                  <TableColumn>Delete</TableColumn>
                </TableHeader>
                <TableBody>
                  {Object.keys({
                    ...company.company?.exchangeRates?.rates,
                    USD: 12,
                  }).map((key, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="p-2">{key}</TableCell>
                        <TableCell className="p-2">
                          {company.company?.exchangeRates?.rates[key] ?? "1"}
                        </TableCell>
                        <TableCell>
                          <Button
                            isIconOnly
                            variant="bordered"
                            color={
                              session.baseCurrence == key.toString()
                                ? "primary"
                                : "default"
                            }
                            disabled={session.switching}
                            isLoading={session.switchId == key.toString()}
                            onPress={() => {
                              if (key.toString() == session.baseCurrence) {
                                return;
                              }
                              session.switchToCurrence(key.toString());
                            }}
                          >
                            {session.baseCurrence == key.toString() ? (
                              <IoMdCheckmarkCircleOutline
                                color={MaterialColors.MaterialGreen}
                              />
                            ) : (
                              <GoArrowSwitch />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          {key.toLowerCase().trim() == "usd" ? (
                            ""
                          ) : (
                            <Button
                              isIconOnly
                              onPress={() => {
                                if (key.toLowerCase().trim() == "usd") {
                                  return errorToast(
                                    "cant edit the base currency"
                                  );
                                }
                                company.setSelectedCurrencyPair({
                                  key,
                                  value:
                                    company.company?.exchangeRates?.rates[
                                      key
                                    ] ?? 1,
                                });
                                navigation.setPage("editRate");
                              }}
                            >
                              <BiEdit />
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {key.toLowerCase().trim() == "usd" ? (
                            ""
                          ) : (
                            <Button
                              isIconOnly
                              onPress={() =>
                                setSelectedCurrency({
                                  key,
                                  value:
                                    company.company?.exchangeRates?.rates[
                                      key
                                    ] ?? 1,
                                })
                              }
                            >
                              <LuDelete />
                            </Button>
                          )}
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
    </Fragment>
  );
};
