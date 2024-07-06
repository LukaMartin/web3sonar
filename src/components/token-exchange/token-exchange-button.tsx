"use client";

import { Quote } from "@/lib/token-exchange-quote-types";
import { findChainId } from "@/lib/utils";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from "wagmi";

type TokenExchangeButtonProps = {
  quote: Quote | null;
  exchangeTokens: () => void;
  fromAmount: number;
  fromChain: string;
  isLoading: boolean;
  insufficientFunds: boolean;
};

export default function TokenExchangeButton({
  quote,
  exchangeTokens,
  fromAmount,
  fromChain,
  isLoading,
  insufficientFunds,
}: TokenExchangeButtonProps) {
  const { open } = useWeb3Modal()
  const { chainId, isConnected, isConnecting } = useAccount()
  let fromChainId = findChainId(fromChain)[0];
  const enabledButtonStyle =
    "h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold bg-green-yellow rounded-md mx-6 mt-6 mb-4 hover:bg-green-yellow/70 trasition active:scale-95";

  return (
    <>
      {!isConnected && !quote && (
        <button className={enabledButtonStyle} onClick={() => open()}>
          {isConnecting ? "Connecting..." : "Connect wallet"}
        </button>
      )}
      {!isConnected && quote && (
        <button className={enabledButtonStyle} onClick={() => open()}>
          {isConnecting ? "Connecting..." : "Connect wallet"}
        </button>
      )}
      {isConnected && !quote && (
        <button className="h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold bg-white/50 rounded-md mx-6 mt-6 mb-4">
          Exchange
        </button>
      )}
      {quote && isConnected && (
        <button
          className={`${
            isLoading || !fromAmount || insufficientFunds || quote.message
              ? "bg-white/50 hover:bg-white/50"
              : "bg-green-yellow hover:bg-green-yellow/70"
          } h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold rounded-md mx-6 mt-6 mb-4 transition active:scale-95`}
          onClick={() => exchangeTokens()}
          disabled={
            isLoading ||
            !fromAmount ||
            insufficientFunds ||
            (quote.message as boolean | undefined)
          }
        >
          {`${
            insufficientFunds
              ? "Insufficient funds"
              : fromChainId !== chainId
              ? "Switch network"
              : "Exchange"
          }`}
        </button>
      )}
    </>
  );
}
