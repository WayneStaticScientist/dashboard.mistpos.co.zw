"use client";
import { Fragment, useState } from "react";
import { Button, Input, InputOtp } from "@heroui/react";
import { CheckCircleIcon, MailIcon } from "lucide-react";
import useSessionState from "@/stores/session-store";
import { useCompanyStore } from "@/stores/companies-store";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const company = useCompanyStore();

  const session = useSessionState();
  const [email, setEmail] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [newPassword, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-lg bg-background shadow-2xl ring-1 ring-background rounded-3xl p-8 sm:p-10 space-y-8 transition-all duration-300 transform">
        {!session.verificationSent && (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 mb-4 bg-background rounded-full shadow-lg">
              <MailIcon className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Password Reset
            </h1>
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {/* Resend & Error/Success Area */}
        <div className="flex flex-col space-y-4">
          {session.verificationSent && (
            <div className="flex items-center p-3 text-sm font-semibold text-green-400 bg-background rounded-xl shadow-inner">
              <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
              Success! A new verification code has been sent to email
              {email} check the code in your email.and Paste it here for
              verification
            </div>
          )}
          {!session.verificationSent && (
            <Button
              isLoading={session.verificationSending}
              onPress={() => session.sendVerificationEmail(email)}
            >
              Send Verification Email
            </Button>
          )}

          {session.verificationSent && (
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
                    Paste the code in the below field and enter new password you
                    will remember
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 mr-2  text-primary font-bold">
                    4.
                  </span>
                  <span>Click Verify</span>
                </li>
              </ul>
            </div>
          )}
          {session.verificationSent && (
            <Fragment>
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
                label="New Password"
                type={isVisible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputOtp length={6} value={otp} onValueChange={setOtp} />
            </Fragment>
          )}
          {session.verificationSent && (
            <Button
              isLoading={session.verificationSending}
              onPress={() =>
                session.verifyUserOtp({
                  email,
                  otp,
                  newPassword,
                })
              }
            >
              Verify
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
