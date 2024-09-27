"use server";

import { simulateTransaction } from "./simulateTransaction";

export const submitSimulationTransaction = async (formData: FormData) => {
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
