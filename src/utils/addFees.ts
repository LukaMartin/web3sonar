import { FeeCosts } from "@/types/token-exchange/quote";

export function addFees(arr: FeeCosts[]) {
  let sum = 0;

  arr.forEach((data) => {
    if (Number(data.amountUSD) > 0) {
      sum += Number(data.amountUSD);
    }
  });

  return Number(sum).toFixed(2);
}
