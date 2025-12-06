"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCompanyStore } from "@/stores/companies-store";
import { CenterError } from "@/components/errors/normal-errror";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { CheckCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import { errorToast } from "@/utils/toaster";
export default function SubscriptionVerification() {
  const params = useParams<{ slug: string[] }>();
  const [count, setCount] = useState(0);
  const company = useCompanyStore();
  const slugArray = params.slug || [];
  const id1 = slugArray[0] || "";
  useEffect(() => {
    setCount((prev) => prev + 1);
    if (!id1) {
      count > 1 && errorToast("invalid url");
    } else {
      company.verifySubscription(id1);
    }
  }, [id1]);
  if (company.subscribing) {
    return <NormalLoader />;
  }
  if (!company.paymentSuccess) {
    return <CenterError message="Payment Failed" />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-md w-full bg-background rounded-xl shadow-2xl p-6 sm:p-8 text-center border-t-8 border-green-500 transform transition-all duration-300 hover:shadow-lg">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-foreground mb-2">
          Payment Successful!
        </h2>

        <p className="text-foreground mb-6">
          Thank you for your Subscription. Your order has been being processed.
        </p>
        <button
          onProgress={() => {
            if (window) {
              window.location.href = "/";
            }
          }}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-md transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Go to Home Page
        </button>
      </div>
    </div>
  );
}
