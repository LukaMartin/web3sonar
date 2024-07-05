"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

// 2. Set chains
const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R",
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    currency: "ETH",
    explorerUrl: "https://arbiscan.io",
    rpcUrl: "https://arb-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R",
  },
  {
    chainId: 8453,
    name: "Base",
    currency: "ETH",
    explorerUrl: "https://basescan.org",
    rpcUrl: "https://base-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R",
  },
  {
    chainId: 81457,
    name: "Blast",
    currency: "ETH",
    explorerUrl: "https://blastscan.io",
    rpcUrl: "https://blast-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R",
  },
  {
    chainId: 137,
    name: "Fantom Opera",
    currency: "ETH",
    explorerUrl: "ftmscan.com",
    rpcUrl: "https://rpcapi.fantom.network",
  },
  {
    chainId: 250,
    name: "Polygon",
    currency: "ETH",
    explorerUrl: "polygonscan.com",
    rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R",
  },
  {
    chainId: 10,
    name: "Optimism",
    currency: "ETH",
    explorerUrl: "https://optimistic.etherscan.io",
    rpcUrl: "https://opt-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R",
  },
];

// 3. Create a metadata object
const metadata = {
  name: "Web 3 Sonar",
  description: "A Web 3 suite to guide you through your day to day in crypto",
  url: "https://web3sonar.xyz", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl:
    "https://eth-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: chains,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

type Web3ModalProps = {
  children: React.ReactNode;
};

export function Web3Modal({ children }: Web3ModalProps) {
  return children;
}
