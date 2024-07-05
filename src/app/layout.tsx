import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextUIProvider } from "@nextui-org/react";
//import { Web3Modal } from "../context/web3modal";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'

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
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
      >
        <NextUIProvider>
          <Header />
          <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
