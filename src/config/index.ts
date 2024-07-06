import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, arbitrum, base, optimism, zkSync, blast } from "wagmi/chains";
import { walletConnect } from 'wagmi/connectors'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Sonar",
  description: "A Web 3 suite to guide you through your day to day in crypto",
  url: "https://web3sonar.xyz", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, arbitrum, base, optimism, zkSync, blast] as const;

export const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R'),
    [arbitrum.id]: http('https://arb-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R'),
    [base.id]: http('https://base-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R'),
    [optimism.id]: http('https://opt-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R'),
    [zkSync.id]: http('https://zksync-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R'),
    [blast.id]: http('https://blast-mainnet.g.alchemy.com/v2/IO89WeqWT4MaRG3eUlT0VriMSY5Tdy7R'),
  },
  ssr: false,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    walletConnect({
      projectId: projectId,
      metadata: metadata,
    }),
  ],
})
