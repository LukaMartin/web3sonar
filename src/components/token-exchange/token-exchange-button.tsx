"use client";

import { Quote } from "@/lib/token-exchange-quote-types";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

type TokenExchangeButtonProps = {
  quote: Quote | null;
  exchangeTokens: () => void;
  fromAmount: number;
  isLoading: boolean;
  insufficientFunds: boolean;
  onOpen: () => void;
};

export default function TokenExchangeButton({
  quote,
  exchangeTokens,
  fromAmount,
  isLoading,
  insufficientFunds,
  onOpen,
}: TokenExchangeButtonProps) {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const enabledButtonStyle =
    "h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold bg-green-yellow rounded-md mx-6 mt-6 mb-4 hover:bg-green-yellow/70 trasition active:scale-95";

  return (
    <>
      {!isConnected && !quote && (
        <button className={enabledButtonStyle} onClick={() => open()}>
          Connect Wallet
        </button>
      )}
      {!isConnected && quote && (
        <button className={enabledButtonStyle} onClick={() => open()}>
          Connect Wallet
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
          onClick={() => {
            exchangeTokens();
            onOpen();
          }}
          disabled={
            isLoading ||
            !fromAmount ||
            insufficientFunds ||
            (quote.message as boolean | undefined)
          }
        >
          {`${insufficientFunds ? "Insufficient funds" : "Exchange"}`}
        </button>
      )}
    </>
  );
}
