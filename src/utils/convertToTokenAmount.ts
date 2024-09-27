import { Quote } from "@/types/token-exchange/quote";
import { wethAddresses } from "@/constants/wethAddresses";
import { formatEther, formatUnits } from "viem";

export const convertToTokenAmount = (toToken: string, quote: Quote) => {
  if (toToken === "ETH" || wethAddresses.includes(toToken)) {
    return Number(formatEther(BigInt(quote.estimate.toAmount))).toFixed(7);
  } else if (toToken === "SOL") {
    return Number(formatUnits(BigInt(quote.estimate.toAmount), 9)).toFixed(7);
  } else {
    return Number(formatUnits(BigInt(quote.estimate.toAmount), 6)).toFixed(3);
  }
};
