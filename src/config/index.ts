import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, arbitrum, base, optimism, zkSync, blast, polygon } from "wagmi/chains";
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
const chains = [mainnet, arbitrum, base, optimism, zkSync, blast, polygon] as const;

export const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [mainnet.id]: http(process.env.MAINNET_RPC_URL),
    [arbitrum.id]: http(process.env.ARBITRUM_RPC_URL),
    [base.id]: http(process.env.BASE_RPC_URL),
    [optimism.id]: http(process.env.OPTIMISM_RPC_URL),
    [zkSync.id]: http(process.env.ZKSYNC_RPC_URL),
    [blast.id]: http(process.env.BLAST_RPC_URL),
    [polygon.id]: http(process.env.POLYGON_RPC_URL),
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

