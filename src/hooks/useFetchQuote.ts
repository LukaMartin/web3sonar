import { wethAddresses } from "@/lib/constants";
import { Quote } from "@/lib/token-exchange-quote-types";
import { FetchQuoteProps } from "@/lib/types";
import { convertToWei, convertUsdcUp } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";

export default function useFetchQuote({
  fromChain,
  toChain,
  fromToken,
  toToken,
  fromAmount,
  fromAddress,
  awaitingConfirmation,
}: FetchQuoteProps) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const interval = useRef<any>(null);
  const { address } = useAccount();

  if (fromToken === "ETH" || wethAddresses.includes(fromToken)) {
    fromAmount = convertToWei(fromAmount!);
  } else {
    fromAmount = convertUsdcUp(fromAmount!);
  }

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);

    const response = await fetch(
      `https://li.quest/v1/quote?fromChain=${fromChain}&toChain=${toChain}&fromToken=${fromToken}&toToken=${toToken}&fromAmount=${fromAmount}&fromAddress=${fromAddress}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (data.message) {
      setQuote(data);
    } else if (!data.message) {
      setQuote(data);
    }
   
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [fromChain, toChain, fromToken, toToken, fromAmount, fromAddress]);

  useEffect(() => {
    if (fromChain && toChain && fromToken && toToken && fromAmount && fromAddress) {
      fetchQuote();
    }
  }, [fromChain, toChain, fromToken, toToken, fromAmount, fromAddress, fetchQuote]);

  useEffect(() => {
    if (fromChain && toChain && fromToken && toToken && fromAmount && address && !awaitingConfirmation) {
      interval.current = setInterval(() => {
        fetchQuote();
      }, 50000)
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [awaitingConfirmation, fromChain, toChain, fromToken, toToken, fromAmount, address, fetchQuote]);

  return {
    quote,
    isLoading,
    fetchQuote,
  };
}
