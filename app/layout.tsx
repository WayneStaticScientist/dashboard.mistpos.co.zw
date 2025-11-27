"use client";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
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
