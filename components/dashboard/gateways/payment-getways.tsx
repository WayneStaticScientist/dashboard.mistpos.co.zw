"use client";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { TUser } from "@/types/user-t";
import { BiEdit } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";
import useSessionState from "@/stores/session-store";
import { useNavigation } from "@/stores/use-navigation";
import { useCompanyStore } from "@/stores/companies-store";
import NormalError from "@/components/errors/normal-errror";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { UniversalDeleteModel } from "@/components/layouts/universal-delete-modal";
export const pad = (num: number) => (num < 10 ? "0" + num : num);
export const PaymentGateWays = () => {
  const company = useCompanyStore();
  const session = useSessionState();
  const navigation = useNavigation();
  const [selectedEmployee, setSelectedEmployee] = useState<TUser | null>(null);
  useEffect(() => {
    company.fetchCompany(session.company);
  }, [session.company]);
  if (company.loading) {
    return <NormalLoader />;
  }
  if (!company.loaded) {
    return <NormalError message="Failed to Loaded Getway" />;
  }
  return (
    <Fragment>
      <UniversalDeleteModel
        onCloseModal={() => setSelectedEmployee(null)}
        title={"Disable Gateway"}
        show={selectedEmployee != null}
        summary={`disable  gateway `}
        isLoading={company.loading}
        onDelete={async () => {
          try {
            await company.disableGateway(selectedEmployee!);
            company.fetchCompany(session.company);
            setSelectedEmployee(null);
          } catch (e) {
            return errorToast(decodeFromAxios(e).message);
          }
        }}
      />

      <section>
        <div className="lg:col-span-2 bg-background border border-[#e6e6e610] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e6e6e610] flex items-center text-foreground justify-between">
            <h2 className="font-semibold">Payment Gateways</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <Table
              aria-label="Example static collection table max-w"
              className="text-sm table-auto w-max sm:w-full"
            >
              <TableHeader>
                <TableColumn>Gateway</TableColumn>
                <TableColumn>Activated</TableColumn>
                <TableColumn>Edit</TableColumn>
                <TableColumn>Delete</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Paynow</TableCell>
                  <TableCell>
                    {company.company?.paynow?.registered ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      onPress={() => {
                        navigation.setPage("editPaynow");
                      }}
                    >
                      <BiEdit />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      onPress={() => {
                        //setSelectedEmployee(e)
                      }}
                    >
                      <LuDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
