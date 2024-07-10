"use client";

import TokenExchangeButton from "./token-exchange-button";
import TokenExchangeInput from "./token-exchange-input";
import ChainSelectFrom from "./chain-select-from";
import ChainSelectTo from "./chain-select-to";
import TokenSelectTo from "./token-select-to";
import TokenExchangeQuote from "./token-exchange-quote";
import TokenExchangeQuoteSkeleton from "./token-exchange-quote-skeleton";
import { useRef, useEffect } from "react";
import TokenSelectFrom from "./token-select-from";
import { convertToWei, convertUsdcUp, findChainId } from "@/lib/utils";
import { TbSwitchVertical } from "react-icons/tb";
import { useAccount, useSwitchChain } from "wagmi";
import { useDisclosure } from "@nextui-org/react";
import TokenExchangeModal from "./token-exchange-modal";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { wethAddresses } from "@/lib/constants";
import { Toaster, toast } from 'sonner'

export default function TokenExchangeInterface() {
  const { address, chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const toToken = useTokenExchangeStore((state) => state.toToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const quote = useTokenExchangeStore((state) => state.quote);
  const isLoading = useTokenExchangeStore((state) => state.isLoading)
  const awaitingConfirmation = useTokenExchangeStore((state) => state.awaitingConfirmation);
  const fetchQuoteErrorMessage = useTokenExchangeStore((state) => state.fetchQuoteErrorMessage);
  const allowanceErrorMessage = useTokenExchangeStore((state) => state.allowanceErrorMessage);
  const transactionErrorMessage = useTokenExchangeStore((state) => state.transactionErrorMessage);
  const setFromChain = useTokenExchangeStore((state) => state.setFromChain);
  const setToChain = useTokenExchangeStore((state) => state.setToChain);
  const setFromAmount = useTokenExchangeStore((state) => state.setFromAmount);
  const fetchQuote = useTokenExchangeStore((state) => state.fetchQuote)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const inputRef = useRef<any>(null);
  const interval = useRef<any>(null);
  let fromChainId = findChainId(fromChain)[0];
  let convertedFromAmount = 0;

  if (fromToken === "ETH" || wethAddresses.includes(fromToken)) {
    convertedFromAmount = convertToWei(fromAmount!);
  } else {
    convertedFromAmount = convertUsdcUp(fromAmount!);
  }

  const swapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  const clearInput = () => {
    inputRef.current.value = null;
  };

  useEffect(() => {
    if (fromChain && toChain && fromToken && toToken && fromAmount && address) {
      fetchQuote(address, convertedFromAmount);
    }
  }, [fromChain, toChain, fromToken, toToken, fromAmount, address, fetchQuote, convertedFromAmount]);

  useEffect(() => {
    if (fromChain && toChain && fromToken && toToken && fromAmount && address && !awaitingConfirmation) {
      interval.current = setInterval(() => {
        fetchQuote(address, convertedFromAmount);
      }, 50000)
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [awaitingConfirmation, fromChain, toChain, fromToken, toToken, fromAmount, address, fetchQuote, convertedFromAmount]);

  useEffect(() => {
    if (isConnected && fromChainId !== chainId) {
      switchChain({ chainId: fromChainId });
      return;
    }
  }, [chainId, fromChainId, isConnected, switchChain]);

  useEffect(() => {
    setFromAmount(0);
    clearInput();
  }, [fromChain, setFromAmount]);

  useEffect(() => {
    setFromAmount(0);
    clearInput();
  }, [toChain, setFromAmount]);

  useEffect(() => {
    if (allowanceErrorMessage) {
      toast.error(allowanceErrorMessage);
      onClose();
    }
  }, [allowanceErrorMessage, onClose]);

  useEffect(() => {
    if (transactionErrorMessage) {
      toast.error(transactionErrorMessage);
      onClose();
    }
  }, [transactionErrorMessage, onClose]);

  useEffect(() => {
    if (fetchQuoteErrorMessage) {
      toast.error(fetchQuoteErrorMessage)
    }
  }, [fetchQuoteErrorMessage])

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
            />
            <TokenSelectFrom
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
            <ChainSelectTo 
            />
            <TokenSelectTo
            />
          </div>

          <p className="text-white/80 text-xl p-6">Amount</p>

          <TokenExchangeInput
            inputRef={inputRef}
          />

          <TokenExchangeButton
            onOpen={onOpen}
            clearInput={clearInput}
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
            <TokenExchangeQuote/>
          ) : null}

          <TokenExchangeModal
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
          />
        </section>
        <Toaster richColors/>
      </div>
    </>
  );
}
