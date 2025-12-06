"use client";

import { useEffect, useState } from "react";
import { Button, InputOtp } from "@heroui/react";
import useSessionState from "@/stores/session-store";
import { CheckCircleIcon, MailIcon } from "lucide-react";
import { useCompanyStore } from "@/stores/companies-store";
import { CenterError } from "@/components/errors/normal-errror";
import { CenterLoader } from "@/components/loaders/center-loader";

export default function Verification() {
  const session = useSessionState();
  const company = useCompanyStore();
  const [otp, setOtp] = useState("");
  useEffect(() => {
    company.fetchUserCompany();
  }, [session.company]);
  if (company.fetchingUserCompany) return <CenterLoader />;
  if (!company.userCompany)
    return <CenterError message="Failed to load Company Info" />;
  if (company.userCompany.verified)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
        You are already verified.
        <div>
          <Button
            onPress={() => {
              window.location.href = "/";
            }}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-lg bg-background shadow-2xl ring-1 ring-background rounded-3xl p-8 sm:p-10 space-y-8 transition-all duration-300 transform">
        {!company.verificationSent && (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 mb-4 bg-background rounded-full shadow-lg">
              <MailIcon className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
              Verification Required
            </h1>
            <p className="mt-3 text-lg text-gray-500 max-w-sm">
              We will send verification email to {company.userCompany.email}
            </p>
          </div>
        )}
        {/* Resend & Error/Success Area */}
        <div className="flex flex-col space-y-4">
          {company.verificationSent && (
            <div className="flex items-center p-3 text-sm font-semibold text-green-400 bg-background rounded-xl shadow-inner">
              <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
              Success! A new verification code has been sent to email
              {company.userCompany.email} check the code in your email.and Paste
              it here for verification
            </div>
          )}
          {!company.verificationSent && (
            <Button
              isLoading={company.verificationSending}
              onPress={company.sendVerificationEmail}
            >
              Send Verification Email
            </Button>
          )}

          {company.verificationSent && (
            <div className="text-sm text-foreground space-y-4 bg-background p-5 rounded-2xl border border-[#e6e6e620]">
              <p className="font-bold text-primary">What to do next:</p>
              <ul className="list-inside space-y-2">
                <li className="flex items-start">
                  <span className="shrink-0 mr-2 text-primary font-bold">
                    1.
                  </span>
                  <span>Open your email application .</span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 mr-2  text-primary font-bold">
                    2.
                  </span>
                  <span>Copy the verification code sent to you.</span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 mr-2  text-primary font-bold">
                    3.
                  </span>
                  <span>
                    Paste the code in the below field and click verify
                  </span>
                </li>
              </ul>
            </div>
          )}
          {company.verificationSent && (
            <InputOtp length={6} value={otp} onValueChange={setOtp} />
          )}
          {company.verificationSent && (
            <Button
              isLoading={company.verificationSending}
              onPress={() => company.verifyOtp(otp, "company")}
            >
              Verify
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
