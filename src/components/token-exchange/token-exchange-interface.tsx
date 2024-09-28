"use client";

import TokenExchangeButton from "./token-exchange-button";
import TokenExchangeInput from "./token-exchange-input";
import ChainSelectFrom from "./chain-select-from";
import ChainSelectTo from "./chain-select-to";
import TokenSelectTo from "./token-select-to";
import QuoteMoreInfo from "./quote-more-info";
import { useRef } from "react";
import TokenSelectFrom from "./token-select-from";
import { TbSwitchVertical } from "react-icons/tb";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import DestinationAddressInput from "./destination-address-input";
import {
  useQuoteFetching,
  useChainSwitching,
  useErrorHandling,
} from "@/hooks/useTokenExchangeEffects";
import Quote from "./quote";
import CircularTimer from "../circular-timer-two";
import { FaChevronDown } from "react-icons/fa";
import LoadingSpinner from "../loading-spinner";
import { FaChevronUp } from "react-icons/fa6";
import AccountButtons from "./account-buttons";
import TokenExchangeDialog from "./token-exchange-dialog";

export default function TokenExchangeInterface() {
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const quote = useTokenExchangeStore((state) => state.quote);
  const isLoading = useTokenExchangeStore((state) => state.isLoading);
  const showMoreInfo = useTokenExchangeStore((state) => state.showMoreInfo);
  const inputRef = useRef<any>(null);
  const interval = useRef<any>(null);
  const setFromChain = useTokenExchangeStore((state) => state.setFromChain);
  const setToChain = useTokenExchangeStore((state) => state.setToChain);
  const setShowMoreInfo = useTokenExchangeStore(
    (state) => state.setShowMoreInfo
  );
  useQuoteFetching(inputRef, interval);
  useChainSwitching();
  useErrorHandling();

  const swapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  const clearInput = () => {
    inputRef.current.value = null;
  };

  return (
    <>
      <section className="w-[375px] flex flex-col mb-12 mx-auto bg-white/[3%] rounded-md shadow-[0_8px_5px_rgba(2,2,2,1)]">
        <AccountButtons />

        <div className="flex justify-between items-center px-6 mt-6">
          <p className="text-xl text-white/80">From</p>
          {quote && fromAmount && !isLoading && !quote.message ? (
            <CircularTimer duration={45} isInfinite={true} size={34} />
          ) : fromAmount && isLoading ? (
            <LoadingSpinner
              size={34}
              color="rgb(255 255 255 / 50%)"
              icon={true}
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-y-4 bg-white/5 rounded-md mx-6 mt-4">
          <div className="flex justify-between items-center mt-4 px-4">
            <ChainSelectFrom />
            <TokenSelectFrom />
          </div>

          <TokenExchangeInput inputRef={inputRef} />
        </div>

        <div className="w-[61%] flex justify-between items-center px-6 mt-4">
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

        <div className="flex flex-col gap-y-4 bg-white/5 rounded-md mx-6 mt-4">
          <div className="flex justify-between items-center px-4 mt-4">
            <ChainSelectTo />
            <TokenSelectTo />
          </div>

          <Quote />
        </div>

        <DestinationAddressInput />

        {quote && fromAmount ? (
          <div className="flex justify-between items-center gap-x-1 mx-6 mt-4">
            {!isLoading && quote.message ? (
              <p className="text-red-500 text-sm">
                Error, click more info for details
              </p>
            ) : null}
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="flex items-center gap-x-1"
            >
              <p className=" text-white/80 hover:text-white hover:cursor-pointer transition">
                More info
              </p>
              {!showMoreInfo ? (
                <FaChevronDown size={17} className="text-white/80" />
              ) : (
                <FaChevronUp size={17} className="text-white/80" />
              )}
            </button>
          </div>
        ) : null}

        {showMoreInfo && quote && fromAmount ? <QuoteMoreInfo /> : null}

        <TokenExchangeButton clearInput={clearInput} />

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

      <TokenExchangeDialog />
    </>
  );
}
