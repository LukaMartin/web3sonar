"use server";

import { SimulateTransactionParameters } from "./types";
import { BlockPricesParameter } from "./types";

export async function fetchEthPrice() {
  const response = await fetch(
    "https://api.coinbase.com/v2/prices/ETH-USD/spot",
    {
      next: {
        revalidate: 120,
      },
    }
  );

  const data = await response.json();
  
  return data.data.amount;
}

export async function fetchBlockValues() {
  const response = await fetch(
    "https://api.blocknative.com/gasprices/blockprices",
    {
      method: "GET",
      headers: {
        Authorization: `${process.env.BLOCKNATIVE_API_KEY}`,
      },
      next: {
        revalidate: 9.5,
      },
    }
  );

  const data = await response.json();

  const maxFee = data.maxPrice;

  const baseFee = data.blockPrices.map((value: BlockPricesParameter) => {
    return Number(value.baseFeePerGas).toFixed(2);
  });
  const pendingBlockNumber = data.blockPrices.map((value: BlockPricesParameter) => {
    return value.blockNumber;
  });

  const pendingTransactionCount = data.blockPrices.map((value: BlockPricesParameter) => {
    return value.estimatedTransactionCount;
  });

  const estimatedPrices = data.blockPrices.map((value: BlockPricesParameter) => {
    return value.estimatedPrices
  });

  return { baseFee, maxFee, pendingBlockNumber, pendingTransactionCount, estimatedPrices };
};


export async function simulateTransaction({
  contractAddress,
  senderAddress,
  gasLimit,
  maxFeePerGas,
  maxPriorityFeePerGas,
  transactionValue,
  transactionInput,
}: SimulateTransactionParameters) {
  const response = await fetch("https://api.blocknative.com/simulate", {
    method: "POST",
    headers: {
      credentials: `${process.env.BLOCKNATIVE_API_KEY}:${process.env.BLOCKNATIVE_API_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system: "ethereum",
      network: "main",
      transactions: [
        {
          to: `${contractAddress}`,
          from: `${senderAddress}`,
          gas: Number(`${gasLimit}`),
          maxFeePerGas: Number(`${maxFeePerGas}`) * 1000000000,
          maxPriorityFeePerGas: Number(`${maxPriorityFeePerGas}`) * 1000000000,
          value: Number(`${transactionValue}`) * 1000000000000000000,
          input: `${transactionInput}`,
        },
      ],
    }),
  });

  const data = await response.json();

  const failureMessage = data.msg;

  const simulatedBlockNumber = data.simulatedBlockNumber;

  const gasUsed = data.gasUsed;

  let simulationStatus;

  if (data.msg) {
    simulationStatus = "Failed";
  } else {
    simulationStatus = "Completed";
  }

  let transactionResult;

  if (data.msg) {
    transactionResult = "";
  } else {
    transactionResult = data.error[0];
  }

  return {
    simulatedBlockNumber,
    gasUsed,
    simulationStatus,
    transactionResult,
    failureMessage,
  };
}

export const submitTransaction = async (formData: FormData) => {
  const contractAddress = formData.get("contract-address")!;
  const senderAddress = formData.get("sender-address")!;
  const gasLimit = formData.get("gas-limit")!;
  const maxFeePerGas = formData.get("max-gas-fee")!;
  const maxPriorityFeePerGas = formData.get("max-priority-fee")!;
  const transactionValue = formData.get("transaction-value")!;
  const transactionInput = formData.get("transaction-input")!;

  const result = await simulateTransaction({
    contractAddress,
    senderAddress,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    transactionValue,
    transactionInput,
  });

  return result;
};
