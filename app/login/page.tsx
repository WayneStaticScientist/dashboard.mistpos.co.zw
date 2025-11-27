"use client";
import { Button, Input } from "@heroui/react";
import React, { useState, FormEvent } from "react";
import { MdLock, MdMail } from "react-icons/md";
// Main Login Component
const LoginApp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic Form Validation (can be expanded)
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    // Simulate an API call
    console.log("Attempting login with:", { email, password });

    setTimeout(() => {
      setIsLoading(false);
      // In a real LoginApplication, you would check credentials here.
      if (email === "admin@mistpos.com" && password === "pos123") {
        alert("Login successful! Redirecting...");
        // window.location.href = '/dashboard'; // Example redirection
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }, 1500);
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
            className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 text-sm"
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
            startContent={<MdMail />}
          />
          <div className="h-1" />
          <Input
            isRequired
            label="Password"
            type="password"
            placeholder="password"
            labelPlacement="outside"
            variant={"flat"}
            startContent={<MdLock />}
          />
          <Button
            type="submit"
            className="w-full"
            isLoading={false}
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
