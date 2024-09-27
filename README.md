## Web 3 Sonar

This applicaton aims to provide web 3 participants with a suite of tools to help them through their day to day interactions with crypto and web3. The application currently is composed of market insights, crypto news, a token exchange ui and a gas dashboard to track ethereum gas prices. The gas dashboard also includes a transaction simulator.

The tech stack used for the application is TypeScript, React, NextJs, Wagmi, Ethers, Shadcn UI, Tailwind CSS and Zustand for state management.

To use the application head to: https://www.web3sonar.xyz/

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First create an `.env` file in the root of the project and add the following variables:

```bash
BLOCKNATIVE_API_KEY=<your blocknative api key   >
BLOCKNATIVE_API_SECRET=<your blocknative api secret>
NEXT_PUBLIC_PROJECT_ID=<your project id>
MORALIS_API_KEY=<your moralis api key>
TRADING_METRICS_API_KEY=<your trading metrics api key>
MAINNET_RPC_URL=<your mainnet rpc url>
ARBITRUM_RPC_URL=<your arbitrum rpc url>
BASE_RPC_URL=<your base rpc url>
OPTIMISM_RPC_URL=<your optimism rpc url>
ZKSYNC_RPC_URL=<your zksync rpc url>
BLAST_RPC_URL=<your blast rpc url>
POLYGON_RPC_URL=<your polygon rpc url>
NEXT_PUBLIC_SOLANA_RPC_URL=<your solana rpc url>
LIVE_COIN_WATCH_API_KEY=<your live coin watch api key>
OPENAI_API_KEY=<your openai api key>
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

