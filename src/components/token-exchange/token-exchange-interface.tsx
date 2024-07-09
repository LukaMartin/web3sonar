"use client";

import TokenExchangeButton from "./token-exchange-button";
import TokenExchangeInput from "./token-exchange-input";
import ChainSelectFrom from "./chain-select-from";
import ChainSelectTo from "./chain-select-to";
import TokenSelectTo from "./token-select-to";
import TokenExchangeQuote from "./token-exchange-quote";
import TokenExchangeQuoteSkeleton from "./token-exchange-quote-skeleton";
import { useState, useRef, useEffect, useMemo } from "react";
import TokenSelectFrom from "./token-select-from";
import useFetchQuote from "@/hooks/useFetchQuote";
import { checkAndSetAllowance, findChainId, getStatus } from "@/lib/utils";
import useFetchUserBalance from "@/hooks/useFetchUserBalance";
import { TbSwitchVertical } from "react-icons/tb";
import { TokenExchangeResult } from "@/lib/token-exchange-result-types";
import { useAccount, useSwitchChain } from "wagmi";
import { useEthersSigner } from "@/lib/wagmi-ethers";
import { useDisclosure } from "@nextui-org/react";
import TokenExchangeModal from "./token-exchange-modal";
import CircularProgressIndicator from "./circular-progress";

export default function TokenExchangeInterface() {
  const { address, chainId, isConnected } = useAccount();
  const txSigner = useEthersSigner();
  const { switchChain } = useSwitchChain();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fromChain, setFromChain] = useState("");
  const [toChain, setToChain] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState(0);
  const [txResult, setTxResult] = useState<TokenExchangeResult | null>(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [settingAllowance, setSettingAllowance] = useState(false);
  const inputRef = useRef<any>(null);
  const insufficientFunds = useFetchUserBalance({
    address,
    fromAmount,
    fromChain,
    fromToken,
  });
  let fromChainId = findChainId(fromChain)[0];

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
    fromToken: fromToken,
    toToken: toToken,
    fromAmount: fromAmount,
    fromAddress: address
      ? address
      : "0xF11aeCE59d2E3959b625bbd664e4A8400e941Fb9",
    awaitingConfirmation: awaitingConfirmation,
  });

  const exchangeTokens = async () => {
    setAwaitingConfirmation(true);
    setTxResult(null);
    const signer = txSigner;

    if (fromToken !== "ETH") {
      setSettingAllowance(true);
      await checkAndSetAllowance({
        wallet: signer!,
        tokenAddress: quote!.action.fromToken.address,
        approvalAddress: quote!.estimate.approvalAddress,
        amount: fromAmount,
        fromToken: fromToken,
      });
      setSettingAllowance(false);
    }

    const tx = await signer!.sendTransaction(quote!.transactionRequest);
    setAwaitingConfirmation(false);
    await tx.wait();

    let result;

    const interval = setInterval(async () => {
      result = await getStatus({
        bridge: quote!.tool,
        fromChain: fromChain,
        toChain: toChain,
        txHash: tx.hash,
      });

      setTxResult(result);
      if (result.status === "DONE" || result.status === "FAILED") {
        clearInterval(interval);
      }
    }, 4000);

    setTimeout(() => {
      setFromAmount(0);
      clearInput();
    }, 5000);
  };

  useEffect(() => {
    if (isConnected && fromChainId !== chainId) {
      switchChain({ chainId: fromChainId });
      return;
    }
  }, [chainId, fromChainId, isConnected, switchChain]);

  useEffect(() => {
    setFromAmount(0);
    clearInput();
  }, [fromChain]);

  useEffect(() => {
    setFromAmount(0);
    clearInput();
  }, [toChain]);

  return (
    <>
      <div className="flex w-[850px] mx-auto">
        <section className="w-[375px] flex flex-col mb-12 mx-auto bg-white/[2%] border-[1px] border-white/20 rounded-md shadow-[0_7px_5px_rgba(2,2,2,1)]">
          <div className="flex px-3 py-2 mt-3 justify-center">
            {isConnected && <w3m-account-button />}
          </div>

          <p className="text-xl text-white/80 ml-6 mt-4">From</p>

          <div className="flex justify-between items-center mt-6 px-6">
            <ChainSelectFrom
              fromChain={fromChain}
              setFromChain={setFromChain}
            />
            <TokenSelectFrom
              fromToken={fromToken}
              setFromToken={setFromToken}
              fromChain={fromChain}
            />
          </div>

          <div className="w-[61%] flex justify-between items-center px-6 mt-6">
            <p className="text-white/80 text-xl">To</p>
            <div className="flex">
              <button onClick={() => swapChains()}>
                <TbSwitchVertical
                  size={37}
                  className="bg-[#111620] p-2 rounded-full hover:bg-white/[7%]"
                />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-6 mt-6">
            <ChainSelectTo toChain={toChain} setToChain={setToChain} />
            <TokenSelectTo
              toToken={toToken}
              setToToken={setToToken}
              toChain={toChain}
            />
          </div>

          <p className="text-white/80 text-xl p-6">Amount</p>

          <TokenExchangeInput
            setFromAmount={setFromAmount}
            fromAmount={fromAmount}
            fromToken={fromToken}
            inputRef={inputRef}
          />

          <TokenExchangeButton
            quote={quote}
            exchangeTokens={exchangeTokens}
            fromAmount={fromAmount}
            isLoading={isLoading}
            insufficientFunds={insufficientFunds}
            onOpen={onOpen}
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

          <TokenExchangeModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            settingAllowance={settingAllowance}
            awaitingConfirmation={awaitingConfirmation}
            txResult={txResult}
            fromChain={fromChain}
            toChain={toChain}
          />
        </section>
      </div>
    </>
  );
}
