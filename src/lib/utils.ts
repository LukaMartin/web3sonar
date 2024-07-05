import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { chains } from "./constants";
import { FeeCosts } from "./token-exchange-quote-types";
import { GetStatusParams } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capatalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertToWei(number: number) {
  return number * 1000000000000000000;
}

export function convertToEth(number: number) {
  return number / 1000000000000000000
}

export function convertUsdcUp(number: number) {
  return number * 1000000;
}

export function convertUsdcDown(number: number) {
  return number / 1000000;
}

export function convertUsdcAddress(chainName: string) {
  let filteredUsdcAddress: string[] = [];

  chains.map((chain) => {
    const { name, usdcAddress } = chain;

    if (name == chainName && usdcAddress) {
      filteredUsdcAddress.push(usdcAddress);
    }
  });

  return filteredUsdcAddress;
}

export function addFees(arr: FeeCosts[]) {
    let sum = 0;

    arr.forEach(data => {
      if (Number(data.amountUSD) > 0) {
        sum += Number(data.amountUSD)
      }
    });
    
    return Number(sum).toFixed(2) ;
}

export function findChainId(chainName: string) {
  let chainId: number[] = [];

  chains.map((chain) => {
    const { name, id } = chain;

    if (name == chainName) {
      chainId.push(id);
    }

  });

  return chainId;
}

export const getStatus = async ({ bridge, fromChain, toChain, txHash }: GetStatusParams) => {
  const result = await fetch(`https://li.quest/v1/status?bridge=${bridge}&fromChain=${fromChain}&toChain=${toChain}&txHash=${txHash}`, {
      method: "GET"
  });

  const data = result.json()
  return data
};

export const shortenTx = (transaction: string) => {
  let substringOne = "";
  let subStringTwo = "";
  let finalString = "";
  let length;
  let shortenedLength;

  if (!transaction) {
    return;
  }

  if(transaction.length) {
    length = transaction.length;
    shortenedLength = transaction.length - 5;
  }

  substringOne = transaction.substring(0, 4);

  if (length && shortenedLength) {
  subStringTwo = transaction.substring(shortenedLength, length)
  }

  finalString = substringOne + ".." + subStringTwo;

  return finalString;
};

