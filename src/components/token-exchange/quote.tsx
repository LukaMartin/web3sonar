"use client";

import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { WiTime4 } from "react-icons/wi";
import type { Quote } from "../../types/token-exchange/quote";
import { convertToTokenAmount } from "@/utils/convertToTokenAmount";

export default function Quote() {
  const quote = useTokenExchangeStore((state) => state.quote);
  const toToken = useTokenExchangeStore((state) => state.toToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const isLoading = useTokenExchangeStore((state) => state.isLoading);

  return (
    <div className="flex justify-between px-4 mt-2">
      {quote && fromAmount && !quote.message ? (
        <div className="flex gap-x-1">
          <WiTime4 size={27} className="text-white/50 mt-1 font-semibold" />

          <p
            className={`${
              isLoading && "animate-pulseStrong"
            } pt-1 text-lg text-white/90`}
          >
            {quote.estimate.executionDuration < 60
              ? `${Math.round(quote.estimate.executionDuration)} s`
              : `${Math.round(
                  Number(quote.estimate.executionDuration) / 60
                )} min`}
          </p>
        </div>
      ) : (
        <div />
      )}

      <div className="flex justify-end items-center">
        {quote && fromAmount && !quote.message ? (
          <div>
            <p className={`${isLoading && "animate-pulseStrong"} text-2xl`}>
              {convertToTokenAmount(toToken, quote)}
            </p>

            <p
              className={`${
                isLoading && "animate-pulseStrong"
              } text-sm text-right text-white/50 pb-2`}
            >
              ${Number(quote.estimate.toAmountUSD).toFixed(2)}
            </p>
          </div>
        ) : !quote ? (
          <div className="flex flex-col">
            <p className="text-2xl text-right text-white/50">0.00</p>
            <p className="text-sm text-right text-white/50 pb-2">$0</p>
          </div>
        ) : quote && !fromAmount ? (
          <div className="flex flex-col">
            <p className="text-2xl text-right text-white/50">0.00</p>
            <p className="text-sm text-right text-white/50 pb-2">$0</p>
          </div>
        ) : quote && quote.message ? (
          <div>
            <p className="text-2xl text-right text-white/50">0.00</p>
            <p className="text-sm text-right text-white/50 pb-2">$0</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
