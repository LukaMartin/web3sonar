import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { chains, wethAddresses } from "./constants";
import { FeeCosts } from "./token-exchange-quote-types";
import { CheckAndSetAllowanceParams, GetStatusParams } from "./types";
import { Contract } from "ethers";
import { erc20Abi } from "viem";

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
  return number / 1000000000000000000;
}

export function convertUsdcUp(number: number) {
  return number * 1000000;
}

export function convertUsdcDown(number: number) {
  return number / 1000000;
}

export function addFees(arr: FeeCosts[]) {
  let sum = 0;

  arr.forEach((data) => {
    if (Number(data.amountUSD) > 0) {
      sum += Number(data.amountUSD);
    }
  });

  return Number(sum).toFixed(2);
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

export const getStatus = async ({
  bridge,
  fromChain,
  toChain,
  txHash,
}: GetStatusParams) => {
  const result = await fetch(
    `https://li.quest/v1/status?bridge=${bridge}&fromChain=${fromChain}&toChain=${toChain}&txHash=${txHash}`,
    {
      method: "GET",
    }
  );

  const data = result.json();
  return data;
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

  if (transaction.length) {
    length = transaction.length;
    shortenedLength = transaction.length - 5;
  }

  substringOne = transaction.substring(0, 4);

  if (length && shortenedLength) {
    subStringTwo = transaction.substring(shortenedLength, length);
  }

  finalString = substringOne + ".." + subStringTwo;

  return finalString;
};

export const reverseDate = (date: string) => {
  let newDate = date.split("-");
  let formattedDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];

  return formattedDate;
};

export const convertDate = (date: string) => {
  let newDate = "";
  let reversedDate = reverseDate(date.split("T")[0])
  let day = reversedDate.substring(0, 2)
  let month = Number(reversedDate.substring(3, 5)) - 1
  let year = reversedDate.substring(8, 10)
  const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
  let newMonth = months[Number(month)]

  newDate = day + " " + newMonth + " "  + year

  return newDate
}

export const shortenNewsTitle = (headline: string) => {
  return headline.length > 65 ? headline.substring(0, 65) + "..." : headline;
};

export const shortenNewsSource = (source: string) => {
  return source.includes("The") ? source.substring(3, source.length) : source;
};

export const checkAndSetAllowance = async ({
  wallet,
  tokenAddress,
  approvalAddress,
  amount,
  fromToken,
}: CheckAndSetAllowanceParams) => {
  if (fromToken === "ETH") {
    return;
  }

  const erc20 = new Contract(tokenAddress, erc20Abi, wallet);

  if (wethAddresses.includes(fromToken)) {
    const approveTx = await erc20.approve(approvalAddress, BigInt(convertToWei(amount)));
    await approveTx.wait();
  } else {
    const approveTx = await erc20.approve(approvalAddress, convertUsdcUp(amount));
    await approveTx.wait();
  }

};

export const removeDecimalsFromString = (string: string) => {
  let substring = string.split(".")[0]

  return substring
}
