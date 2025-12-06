import { FC, Fragment, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { useCompanyStore } from "@/stores/companies-store";
import { Navbar, NavbarBrand, Input, Button } from "@heroui/react";
import { Paynow } from "@/types/company-t";
import useSessionState from "@/stores/session-store";
import { NormalLoader } from "@/components/loaders/normal-loader";
import NormalError from "@/components/errors/normal-errror";
import { MistDivider } from "@/components/layouts/mist-divider";
import { CardSteps } from "@/components/layouts/cards-steps";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { PaymentGateWays } from "../payment-getways";
import { PaymentGatwaysConstants } from "@/utils/payment-getways-utils";

export const EditPaynowGateWay: FC = () => {
  const router = useRouter();
  const session = useSessionState();
  const company = useCompanyStore();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [paynowGetWay, setPaynowGetWay] = useState<Paynow | null>(null);
  useEffect(() => {
    company.fetchCompany(session.company);
  }, [session.company]);
  useEffect(() => {
    setPaynowGetWay(
      company.company?.paynow ?? {
        registered: false,
        integrationId: "",
        integrationKey: "",
      }
    );
  }, [company.company]);
  if (company.loading) {
    return <NormalLoader />;
  }
  if (!company.loaded) {
    return <NormalError message="Company Data Failed to Load" />;
  }
  return (
    <Fragment>
      {!paynowGetWay && (
        <NormalError message="Something went wrong in initializing keys, please try again" />
      )}
      {paynowGetWay && (
        <div className="w-full flex items-center justify-center">
          <div className=" max-w-2xl w-full gap-4 flex flex-col">
            <Navbar>
              <NavbarBrand
                className=" cursor-pointer select-none"
                onClick={() => navigation.back()}
              >
                <IoIosArrowBack />
                <p className="font-bold text-inherit ml-3">Edit Paynow</p>
              </NavbarBrand>
            </Navbar>
            <div className="font-bold text-xl"> Paynow</div>
            <Input
              label="Integration Id"
              value={paynowGetWay.integrationId}
              onChange={(e) =>
                setPaynowGetWay({
                  ...paynowGetWay!,
                  integrationId: e.target.value,
                })
              }
            />
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Integration Key"
              type={isVisible ? "text" : "password"}
              value={paynowGetWay.integrationKey}
              onChange={(e) =>
                setPaynowGetWay({
                  ...paynowGetWay!,
                  integrationKey: e.target.value,
                })
              }
            />
            <MistDivider />
            Dont have Keys ?
            <div className="flex gap-2">
              <CardSteps
                label={"Register Paynow"}
                description={"Step 1"}
                onPress={() => {
                  if (window) {
                    window.location.href =
                      PaymentGatwaysConstants.paynowRegistration;
                  }
                }}
              />
              <CardSteps
                label={"Obtain Keys"}
                description={"Step 2"}
                onPress={() => {
                  if (window) {
                    window.location.href =
                      PaymentGatwaysConstants.paynowCreateApiIntegrations;
                  }
                }}
              />
            </div>
            <Button
              color="primary"
              isLoading={company.registeringPaynow}
              onPress={() => company.registerPaynow(paynowGetWay)}
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
};
