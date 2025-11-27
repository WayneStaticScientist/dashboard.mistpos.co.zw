"use client";
import { errorToast } from "@/utils/toaster";
import { Button, Input } from "@heroui/react";
import { MdLock, MdMail } from "react-icons/md";
import { decodeFromAxios } from "@/utils/errors";
import React, { useState, FormEvent } from "react";
import useSessionState from "@/stores/session-store";
// Main Login Component
const LoginApp: React.FC = () => {
  const session = useSessionState();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      await session.login(email, password);
      window.location.href = "/";
    } catch (e) {
      setError(decodeFromAxios(e).message);
      errorToast(decodeFromAxios(e).message);
    }
  };

  return (
    <div className="min-h-screen bg-background  flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-background  rounded-xl shadow-2xl p-6 sm:p-10 border border-[#e6e6e610] transition duration-300">
        {/* Logo and Title Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-3">
            {/* Mistpos Logo Text/Placeholder */}
            <span className="text-4xl font-extrabold text-primary">
              MISTPOS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-400 ">
            Point of Sale System Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Enter your credentials to manage your store.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 my-3! mb-6! dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            isRequired
            label="Email"
            type="email"
            placeholder="email"
            labelPlacement="outside"
            variant={"flat"}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<MdMail />}
          />
          <div className="h-1" />
          <Input
            isRequired
            label="Password"
            type="password"
            placeholder="password"
            labelPlacement="outside"
            onChange={(e) => setPassword(e.target.value)}
            variant={"flat"}
            startContent={<MdLock />}
          />
          <Button
            type="submit"
            className="w-full"
            isLoading={session.loading}
            color="primary"
          >
            Login
          </Button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Forgot Password?{" "}
          <a
            href="#"
            className="font-medium text-primary-400 hover:text-primary-700"
          >
            Request New
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginApp;
