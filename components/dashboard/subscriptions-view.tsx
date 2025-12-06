"use client";
import { FC, Fragment, useEffect, useState } from "react";
import NormalError from "../errors/normal-errror";
import useSessionState from "@/stores/session-store";
import { NormalLoader } from "../loaders/normal-loader";
import { useCompanyStore } from "@/stores/companies-store";
import { SubscriptionCard } from "../layouts/subscription-card";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

export const SubscriptionView: FC = () => {
  const session = useSessionState();
  const company = useCompanyStore();
  const [plan, setPlan] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    company.fetchCompany(session.company);
  }, [session.company]);
  if (company.loading) {
    return <NormalLoader />;
  }
  if (!company.loaded || company.company == null) {
    return <NormalError message="failed to load Subscriptions" />;
  }
  function subscribeToPlan(plan: string) {
    if (plan == "trial") {
      return company.subscribeToFreeTrial();
    }
    if (plan == "free") {
      return company.subscribeToFreePlan();
    }
    if (plan == "basic") {
      return company.subscribeToPlan({
        amount: 5,
        plan: "basic",
      });
    }
    if (plan == "pro") {
      return company.subscribeToPlan({
        amount: 10,
        plan: "pro",
      });
    }
    if (plan == "enterprise") {
      return company.subscribeToPlan({
        amount: 15,
        plan: "enterprise",
      });
    }
  }

  return (
    <Fragment>
      <Modal isOpen={message.length > 0 && !company.subscribing}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Subscribe {plan.toUpperCase()}
          </ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setMessage("")}
            >
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => {
                setMessage("");
                subscribeToPlan(plan);
              }}
            >
              Subscribe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <section className="flex flex-wrap items-center gap-3">
        {!company.company.subscriptionType?.hasExhaustedCredits && (
          <SubscriptionCard
            isFeatured={company.company.subscriptionType?.type == "trial"}
            title="Trial Plan"
            description="Trial Plan for 14 days "
            price="$0"
            features={["All Features", "2 Weeks Only"]}
            buttonText="Get Started"
            accentColor="blue"
            isDisabled={company.subscribing}
            isLoading={company.subscribing && plan == "trial"}
            onPress={() => {
              setMessage("Do you want try Trial Mode");
              setPlan("trial");
            }}
          />
        )}
        <SubscriptionCard
          isFeatured={
            company.company.subscriptionType?.type == "free" ||
            company.company.subscriptionType?.type == null
          }
          title="Free Plan"
          price="$0"
          features={["Basic Features", "Limited Support", "Sales Report"]}
          buttonText="Get Started"
          accentColor="blue"
          isDisabled={company.subscribing}
          isLoading={company.subscribing && plan == "free"}
          onPress={() => {
            setMessage("Are you sure to subscribe to free plan");
            setPlan("free");
          }}
        />
        <SubscriptionCard
          title="Basic Plan"
          isFeatured={company.company.subscriptionType?.type == "basic"}
          price="$5/mon"
          features={[
            "Basic Features",
            "Full Support",
            "Sales Report",
            "Manage Employees",
            "Add/Remove Managers",
            "Manage Multiple Stores",
          ]}
          buttonText="Get Started"
          accentColor="blue"
          isDisabled={company.subscribing}
          isLoading={company.subscribing && plan == "basic"}
          onPress={() => {
            setMessage("Subscribe to Basic Plan");
            setPlan("basic");
          }}
        />
        <SubscriptionCard
          title="Pro Plan"
          isFeatured={company.company.subscriptionType?.type == "pro"}
          price="$10/mon"
          features={[
            "Basic Features",
            "Full Support",
            "Sales Report",
            "Manage Employees",
            "Advanced Analytics",
            "Add/Remove Managers",
            "Manage Multiple Stores",
            "Advanced Inventory Management",
          ]}
          buttonText="Get Started"
          accentColor="blue"
          isDisabled={company.subscribing}
          isLoading={company.subscribing && plan == "basic"}
          onPress={() => {
            setMessage("Subscribe to Pro Plan?");
            setPlan("pro");
          }}
        />
        <SubscriptionCard
          title="Enterprise Plan"
          price="$15/mon"
          isFeatured={company.company.subscriptionType?.type == "enterprise"}
          features={[
            "Full Support",
            "Productions",
            "Sales Report",
            "Basic Features",
            "Composite Items",
            "Manage Employees",
            "Advanced Analytics",
            "Add/Remove Managers",
            "Manage Multiple Stores",
            "Advanced Inventory Management",
          ]}
          buttonText="Get Started"
          accentColor="blue"
          isDisabled={company.subscribing}
          isLoading={company.subscribing && plan == "enterprise"}
          onPress={() => {
            setMessage("Subscribe to Enterprise Plan?");
            setPlan("enterprise");
          }}
        />
      </section>
    </Fragment>
  );
};
