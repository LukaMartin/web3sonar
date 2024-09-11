import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextUIProvider } from "@nextui-org/react";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "@/config";
import Web3ModalProvider from "@/context";
import { Toaster } from "@/components/ui/toaster";
import Container from "@/components/container";
import AppWalletProvider from "@/components/app-wallet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web 3 Sonar",
  description: "A Web 3 suite to guide you through your day to day in crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-white overflow-y-scroll`}
      >
        <NextUIProvider>
          <Container>
            <Header />
            <Web3ModalProvider initialState={initialState}>
              <AppWalletProvider>
                {children}
                <Toaster />
              </AppWalletProvider>
            </Web3ModalProvider>
            <Footer />
          </Container>
        </NextUIProvider>
      </body>
    </html>
  );
}
