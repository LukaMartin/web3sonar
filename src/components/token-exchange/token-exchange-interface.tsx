"use client";

import TokenExchangeButton from "./token-exchange-button";
import TokenExchangeInput from "./token-exchange-input";
import ChainSelectFrom from "./chain-select-from";
import ChainSelectTo from "./chain-select-to";
import TokenSelectTo from "./token-select-to";
import TokenExchangeQuote from "./token-exchange-quote";
import TokenExchangeQuoteSkeleton from "./token-exchange-quote-skeleton";
import { useState, useRef } from "react";
import TokenSelectFrom from "./token-select-from";
import useFetchQuote from "@/hooks/useFetchQuote";
import { convertUsdcAddress, findChainId, getStatus } from "@/lib/utils";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useSwitchNetwork,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import useFetchUserBalance from "@/hooks/useFetchUserBalance";
import TransactionStatus from "./transaction-status";
import { TbSwitchVertical } from "react-icons/tb";
import { TokenExchangeResult } from "@/lib/token-exchange-result-types";

export default function TokenExchangeInterface() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { switchNetwork } = useSwitchNetwork();
  const [fromChain, setFromChain] = useState("");
  const [toChain, setToChain] = useState("");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("ETH");
  const [fromAmount, setFromAount] = useState(0);
  const [txResult, setTxResult] = useState<TokenExchangeResult | null>(null);
  const [pendingTx, setPendingTx] = useState(false);
  const inputRef = useRef<any>(null);
  const insufficientFunds = useFetchUserBalance({
    address,
    fromAmount,
    fromChain,
  });
  let fromUsdcTokenAddress = null;
  let toUsdcTokenAddress = null;
  let fromChainId = null;

  if (fromChain && fromToken === "USDC") {
    fromUsdcTokenAddress = convertUsdcAddress(fromChain)[0];
  }

  if (toChain && toToken === "USDC") {
    toUsdcTokenAddress = convertUsdcAddress(toChain)[0];
  }

  const swapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  const clearInput = () => {
    inputRef.current.value = null;
  };

  const { quote, isLoading } = useFetchQuote({
    fromChain: fromChain,
    toChain: toChain,
    fromToken: fromUsdcTokenAddress ? fromUsdcTokenAddress : fromToken,
    toToken: toUsdcTokenAddress ? toUsdcTokenAddress : toToken,
    fromAmount: fromAmount,
    fromAddress: address
      ? address
      : "0xF11aeCE59d2E3959b625bbd664e4A8400e941Fb9",
  });

  const exchangeTokens = async () => {
    setPendingTx(false);

    const provider = new BrowserProvider(walletProvider!);
    const signer = await provider.getSigner();

    fromChainId = findChainId(fromChain)[0];

    if (fromChainId !== chainId) {
      switchNetwork(fromChainId);
      return;
    }

    const tx = await signer.sendTransaction(quote!.transactionRequest);
    setTxResult(null);
    setPendingTx(true);
    await tx.wait();

    if (fromChain !== toChain) {
      let result;

      const interval = setInterval(async () => {
        result = await getStatus({
          bridge: quote!.tool,
          fromChain: fromChain,
          toChain: toChain,
          txHash: tx.hash,
        });

        setTxResult(result);
        console.log("RESULT", result);
        if (result.status === "DONE" || result.status === "FAILED") {
          clearInterval(interval);
        }
      }, 2000);

      setTimeout(() => {
        setFromAount(0);
        clearInput();
      }, 10000);
    }
  };

  return (
    <>
      <div className="flex w-[850px] mx-auto">
        <section className="w-[375px] flex flex-col mb-12 mx-auto bg-white/[2%] border-[1px] border-white/20 rounded-md shadow-[0_7px_5px_rgba(2,2,2,1)]">
          <div className="flex px-3 py-2 mt-3 justify-center">
            {isConnected && <w3m-account-button />}
          </div>

          <div className="flex justify-between items-center mt-2 px-6 py-4">
            <p className="text-xl text-white/80">From</p>
            <TokenSelectFrom setFromToken={setFromToken} />
          </div>

          <ChainSelectFrom fromChain={fromChain} setFromChain={setFromChain} />

          <div className="flex justify-between items-center px-6 py-4 mt-4">
            <p className="text-white/80 text-xl">To</p>
            <div className="flex">
              <button onClick={() => swapChains()}>
                <TbSwitchVertical
                  size={37}
                  className="mr-4 bg-[#111620] p-2 rounded-full hover:bg-white/[7%]"
                />
              </button>
              <TokenSelectTo setToToken={setToToken} />
            </div>
          </div>

          <ChainSelectTo toChain={toChain} setToChain={setToChain} />

          <p className="text-white/80 text-xl p-6">Amount</p>

          <TokenExchangeInput
            setFromAmount={setFromAount}
            fromAmount={fromAmount}
            fromToken={fromToken}
            inputRef={inputRef}
          />

          <TokenExchangeButton
            quote={quote}
            exchangeTokens={exchangeTokens}
            fromAmount={fromAmount}
            fromChain={fromChain}
            isLoading={isLoading}
            insufficientFunds={insufficientFunds}
          />

          <p className="text-sm text-white/50 pb-4 pr-6 self-end">
            Powered by{" "}
            <a
              href="https://li.fi/"
              target="_blank"
              className="text-green-yellow hover:text-green-yellow/70"
            >
              LIFI
            </a>
          </p>
        </section>

        <section>
          {isLoading && fromAmount ? (
            <TokenExchangeQuoteSkeleton />
          ) : quote && !isLoading && fromAmount ? (
            <TokenExchangeQuote quote={quote} toToken={toToken} />
          ) : null}

          <TransactionStatus
            txResult={txResult}
            pendingTx={pendingTx}
            setPendingTx={setPendingTx}
          />
        </section>
      </div>
    </>
  );
}
