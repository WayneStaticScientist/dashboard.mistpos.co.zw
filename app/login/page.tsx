"use client";
import { Input } from "@heroui/react";
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
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-[#e6e6e610] mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <MdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#e6e6e610] dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 transition duration-150 ease-in-out"
                placeholder="you@storename.com"
                disabled={isLoading}
              />
            </div>
            <Input label="Email" type="email" variant={"bordered"} />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-[#e6e6e610] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#e6e6e610] dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 transition duration-150 ease-in-out"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white transition duration-300 ease-in-out ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Trouble logging in?{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginApp;
