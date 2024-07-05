import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextUIProvider } from "@nextui-org/react";
import { Web3Modal } from "../context/web3modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web 3 Sonar",
  description: "A Web 3 suite to guide you through your day to day in crypto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
      >
        <NextUIProvider>
          <Header />
          <Web3Modal>{children}</Web3Modal>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
