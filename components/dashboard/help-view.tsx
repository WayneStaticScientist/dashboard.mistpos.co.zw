import React, { useState } from "react";
import {
  ChevronDown,
  LifeBuoy,
  ShieldAlert,
  CreditCard,
  Box,
  Users,
  Settings,
} from "lucide-react";
import { MistDivider } from "../layouts/mist-divider";

// Define the structure for a common error
interface ErrorDetail {
  id: string;
  code: string;
  description: string;
  troubleshooting: string;
}

// Define the structure for an error category
interface ErrorCategory {
  title: string;
  icon: React.ElementType;
  details: ErrorDetail[];
}

// Mock data for POS system errors
const commonErrors: ErrorCategory[] = [
  {
    title: "Payment Processing Errors",
    icon: CreditCard,
    details: [
      {
        id: "1",
        code: "PAY-001",
        description:
          "Transaction Declined (Generic/Card Issuer Error). The card issuer refused the charge.",
        troubleshooting:
          "1. Ask the customer to try a different card. 2. Verify the payment terminal has a stable internet connection. 3. If persistent, contact your payment gateway provider.",
      },
      {
        id: "2",
        code: "PAY-002",
        description:
          "Device Connection Failure. The POS terminal cannot communicate with the card reader.",
        troubleshooting:
          "1. Check the physical cable connection (USB/Bluetooth). 2. Restart the card reader and the POS application. 3. Check device settings to ensure pairing is active.",
      },
      {
        id: "3",
        code: "PAY-003",
        description:
          "Payment Gateway Timeout. The transaction took too long to complete.",
        troubleshooting:
          "1. Ensure network speed is optimal (run a speed test). 2. Process the payment manually if necessary. 3. Check for external firewall restrictions on the POS network.",
      },
    ],
  },
  {
    title: "Inventory and Stock Errors",
    icon: Box,
    details: [
      {
        id: "4",
        code: "INV-001",
        description:
          "Negative Stock Warning. Attempting to sell an item with zero or negative inventory.",
        troubleshooting:
          "1. Perform a physical stock count and update the inventory manually. 2. Verify any recent receiving or return transactions for errors. 3. Adjust the inventory count in the back-office system.",
      },
      {
        id: "5",
        code: "INV-002",
        description:
          "Sync Failure (Local vs. Cloud). Inventory counts differ between the POS device and the cloud system.",
        troubleshooting:
          "1. Force a manual sync/data refresh in the POS app settings. 2. Check the system log for specific API errors. 3. Ensure the POS device is running the latest software version.",
      },
    ],
  },
  {
    title: "Hardware and Peripheral Issues",
    icon: Settings,
    details: [
      {
        id: "6",
        code: "HW-001",
        description:
          "Receipt Printer Offline. The POS application cannot find or connect to the printer.",
        troubleshooting:
          "1. Check printer power and paper. 2. Verify network/USB connection status. 3. Restart the printer and test the connection from the operating system settings.",
      },
      {
        id: "7",
        code: "HW-002",
        description:
          "Barcode Scanner Input Error. Scanner is connected but not inputting data correctly.",
        troubleshooting:
          "1. Test the scanner in a simple text editor (e.g., Notepad) to check basic functionality. 2. Ensure the scanner is configured for the correct output mode (e.g., keyboard wedge).",
      },
    ],
  },
  {
    title: "User and Authentication Errors",
    icon: Users,
    details: [
      {
        id: "8",
        code: "AUTH-001",
        description:
          "Permission Denied. User tried to perform an action (e.g., discount, void) without the required role.",
        troubleshooting:
          "1. Ask a manager to log in and approve the action. 2. Review the user's role and permissions in the back-office management system.",
      },
      {
        id: "9",
        code: "AUTH-002",
        description:
          "Login Failed (User Not Found). The entered credentials do not match any active user.",
        troubleshooting:
          "1. Double-check username/employee ID and password. 2. If the user is new, confirm their account has been activated in the system.",
      },
    ],
  },
];

// Accordion Component for Error details
const AccordionItem: React.FC<{ category: ErrorCategory }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = category.icon;

  return (
    <div className="border-b border-[#e6e6e620]">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold text-foreground hover:bg-[#e6e6e620] transition duration-150"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-foreground" />
          <span>
            {category.title} ({category.details.length} Issues)
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "transform rotate-180 " : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 bg-background border-t border-[#e6e6e620] transition-all duration-300">
          <ul className="space-y-4">
            {category.details.map((error) => (
              <li
                key={error.id}
                className="p-3 border border-[#e6e6e620] rounded-lg bg-background shadow-sm"
              >
                <h4 className="text-sm font-bold text-red-600 mb-1 flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-2  " />
                  {error.code}: {error.description}
                </h4>
                <div className="space-y-2 text-foreground">
                  <p className="text-xs">
                    <span className="font-medium text-foreground block mb-0.5">
                      Description:
                    </span>
                    {error.description}
                  </p>
                  <p className="text-xs">
                    <span className="font-medium text-foreground block mb-0.5">
                      Troubleshooting Steps:
                    </span>
                    {error.troubleshooting}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main Application Component
export const HelpAndSupport: React.FC = () => {
  return (
    <div className=" bg-background p-4 sm:p-8 ">
      <div className="max-w-4xl mx-auto bg-background shadow-2xl rounded-xl overflow-hidden">
        <header className="p-6 text-foreground flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LifeBuoy className="w-8 h-8" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mistpos Support Center
            </h1>
          </div>
          <span className="text-sm font-medium opacity-80 hidden sm:block">
            Version 1.0.1
          </span>
        </header>

        {/* System Explanation Message Box */}
        <section className="p-6 ">
          <h2 className="text-xl font-bold text-primary mb-3 border-b pb-2 flex items-center">
            What is Mistpos?
          </h2>
          <div className="bg-background  p-4 rounded-lg shadow-inner">
            <p className="text-sm text-foreground leading-relaxed">
              **Mistpos** is a modern, unified Point of Sale (POS) and inventory
              management system designed for efficiency and accuracy in retail
              and restaurant environments. It manages every aspect of a
              transaction, from order entry to payment processing and daily
              reporting. Key functions include:
            </p>
            <ul className="list-disc list-inside mt-2 text-xs text-gray-400 space-y-1 ml-4">
              <li>
                **Sales Processing:** Fast, secure transactions, returns, and
                exchanges.
              </li>
              <li>
                **Inventory Control:** Real-time stock tracking, low-stock
                alerts, and multi-location management.
              </li>
              <li>
                **Employee Management:** Clock-in/out, permission-based access,
                and sales performance tracking.
              </li>
              <li>
                **Reporting:** Comprehensive sales, tax, and trend analysis
                reports.
              </li>
            </ul>
            <p className="text-xs italic mt-3 text-foreground leading-relaxed">
              *If your issue is not listed below, please contact the dedicated
              support line or log a ticket.*
            </p>
          </div>
        </section>
        <MistDivider />
        <section className="p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center">
            <ShieldAlert className="w-6 h-6 mr-2" />
            Common Errors & Troubleshooting
          </h2>

          <div className="border border-[#e6e6e620] rounded-lg overflow-hidden divide-y divide-[#e6e6e620]">
            {commonErrors.map((category) => (
              <AccordionItem key={category.title} category={category} />
            ))}
          </div>
        </section>

        {/* Footer/Contact */}
        <footer className="p-6 bg-background border-t border-[#e6e6e620] text-center">
          <p className="text-sm text-gray-400">
            Need more help? email **support@mistpos.co.zw**.
          </p>
        </footer>
      </div>
    </div>
  );
};
