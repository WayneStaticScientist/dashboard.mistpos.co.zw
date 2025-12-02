"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="w-screen! ">
        <HeroUIProvider>
          <ThemeProvider attribute={"class"} enableSystem={true}>
            {children}
            <Toaster />
          </ThemeProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
