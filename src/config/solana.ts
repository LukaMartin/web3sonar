import { Connection, PublicKey } from "@solana/web3.js";

if (!process.env.NEXT_PUBLIC_SOLANA_RPC_URL) {
  throw new Error("NEXT_PUBLIC_SOLANA_RPC_URL is not defined");
}

export const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL
);

export const SOL_USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);
export const SOL_USDT_MINT = new PublicKey(
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
);
