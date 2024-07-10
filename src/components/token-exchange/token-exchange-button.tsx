"use client";

import useFetchUserBalance from "@/hooks/useFetchUserBalance";
import { useEthersSigner } from "@/lib/wagmi-ethers";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

type TokenExchangeButtonProps = {
  onOpen: () => void;
  clearInput: () => void;
};

export default function TokenExchangeButton({
  onOpen,
  clearInput,
}: TokenExchangeButtonProps) {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const isLoading = useTokenExchangeStore((state) => state.isLoading);
  const quote = useTokenExchangeStore((state) => state.quote);
  const exchangeTokens = useTokenExchangeStore((state) => state.exchangeTokens);
  const txSigner = useEthersSigner();
  const insufficientFunds = useFetchUserBalance({
    address,
    fromAmount,
    fromChain,
    fromToken,
  });
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
            exchangeTokens(txSigner, clearInput);
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
