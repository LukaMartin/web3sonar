"use client";

import useFetchUserBalance from "@/hooks/useFetchUserBalance";
import { useEthersSigner } from "@/lib/wagmi-ethers";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "wagmi";
import ChainSelectionDialog from "./chain-selection-dialog";
import useFetchUserBalanceSol from "@/hooks/useFetchUserBalanceSol";
import useSolanaActiveWallet from "solana-active-wallet-react";
import { connection } from "@/config/solana";

type TokenExchangeButtonProps = {
  onOpen: () => void;
  clearInput: () => void;
};

export default function TokenExchangeButton({
  onOpen,
  clearInput,
}: TokenExchangeButtonProps) {
  const { isConnected } = useAccount();
  const { connected, sendTransaction, signTransaction, publicKey } =
    useWallet();
  const { activePublicKey } = useSolanaActiveWallet(publicKey);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const isLoading = useTokenExchangeStore((state) => state.isLoading);
  const quote = useTokenExchangeStore((state) => state.quote);
  const exchangeTokens = useTokenExchangeStore((state) => state.exchangeTokens);
  const exchangeTokensSol = useTokenExchangeStore(
    (state) => state.exchangeTokensSol
  );
  const txSigner = useEthersSigner();
  const { insufficientFundsEvm } = useFetchUserBalance();
  const { insufficientFundsSol } = useFetchUserBalanceSol();
  const enabledButtonStyle =
    "h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold bg-green-yellow rounded-md mx-6 mt-6 mb-4 hover:bg-green-yellow/70 trasition active:scale-95";

  return (
    <>
      {!isConnected && !connected && !quote && (
        <ChainSelectionDialog>
          <button className={enabledButtonStyle}>Connect Wallet</button>
        </ChainSelectionDialog>
      )}
      {!isConnected && !connected && quote && (
        <ChainSelectionDialog>
          <button className={enabledButtonStyle}>Connect Wallet</button>
        </ChainSelectionDialog>
      )}
      {!connected && isConnected && fromChain === "SOL" && (
        <ChainSelectionDialog>
          <button className={enabledButtonStyle}>Connect Wallet</button>
        </ChainSelectionDialog>
      )}
      {!isConnected && connected && fromChain !== "SOL" && fromChain !== "" && (
        <ChainSelectionDialog>
          <button className={enabledButtonStyle}>Connect Wallet</button>
        </ChainSelectionDialog>
      )}
      {isConnected && !connected && !quote && fromChain !== "SOL" && (
        <button className="h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold bg-white/50 rounded-md mx-6 mt-6 mb-4 hover:cursor-default">
          Exchange
        </button>
      )}
      {connected &&
        !isConnected &&
        !quote &&
        (fromChain === "SOL" || fromChain === "") && (
          <button className="h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold bg-white/50 rounded-md mx-6 mt-6 mb-4 hover:cursor-default">
            Exchange
          </button>
        )}
      {connected && isConnected && !quote && (
        <button className="h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold bg-white/50 rounded-md mx-6 mt-6 mb-4 hover:cursor-default">
          Exchange
        </button>
      )}
      {quote && isConnected && fromChain !== "SOL" && (
        <button
          className={`${
            isLoading || !fromAmount || insufficientFundsEvm || quote.message
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
            insufficientFundsEvm ||
            (quote.message as boolean | undefined)
          }
        >
          {`${insufficientFundsEvm ? "Insufficient funds" : "Exchange"}`}
        </button>
      )}
      {quote && connected && fromChain === "SOL" && (
        <button
          className={`${
            isLoading || !fromAmount || insufficientFundsSol || quote.message
              ? "bg-white/50 hover:bg-white/50"
              : "bg-green-yellow hover:bg-green-yellow/70"
          } h-12 border-white/20 border-[1px] text-lg text-gray-950 font-semibold rounded-md mx-6 mt-6 mb-4 transition active:scale-95`}
          onClick={() => {
            activePublicKey &&
              exchangeTokensSol(
                activePublicKey,
                sendTransaction,
                signTransaction,
                connection,
                clearInput
              );
            onOpen();
          }}
          disabled={
            isLoading ||
            !fromAmount ||
            insufficientFundsSol ||
            (quote.message as boolean | undefined)
          }
        >
          {`${insufficientFundsSol ? "Insufficient funds" : "Exchange"}`}
        </button>
      )}
    </>
  );
}
