import { Quote } from "@/lib/token-exchange-quote-types";
import { FetchQuoteProps } from "@/lib/types";
import { convertToWei, convertUsdcUp } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export default function useFetchQuote({
  fromChain,
  toChain,
  fromToken,
  toToken,
  fromAmount,
  fromAddress,
}: FetchQuoteProps) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  let convertedFromAmount = 0;

  if (fromToken === "ETH") {
    convertedFromAmount = convertToWei(fromAmount!);
  } else if (fromToken === "USDC") {
    convertedFromAmount = convertUsdcUp(fromAmount!);
  }

  const fetchQuote = useCallback(() => {
    setIsLoading(true);

    fetch(
      `https://li.quest/v1/quote?fromChain=${fromChain}&toChain=${toChain}&fromToken=${fromToken}&toToken=${toToken}&fromAmount=${convertedFromAmount}&fromAddress=${fromAddress}?denyBridges=hop`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        setTimeout(() => {
          if (jsonResponse.message) {
            setQuote(jsonResponse);
          } else if (
            !jsonResponse.message &&
            jsonResponse.action.fromAmount == convertedFromAmount
          ) {
            setQuote(jsonResponse);
          }
        }, 1000);

        setTimeout(() => {
          setIsLoading(false);
        }, 4200);
      });
  }, [
    fromChain,
    toChain,
    fromToken,
    toToken,
    convertedFromAmount,
    fromAddress,
  ]);

  useEffect(() => {
    if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      fromAddress
    ) {
      fetchQuote();
    }
  }, [
    fromChain,
    toChain,
    fromToken,
    toToken,
    fromAmount,
    fromAddress,
    fetchQuote,
  ]);

  return {
    quote,
    isLoading,
  };
}
