import { SimulateTransactionParameters } from "@/lib/types";

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
      transaction: {
        to: `${contractAddress}`,
        from: `${senderAddress}`,
        gas: Number(`${gasLimit}`),
        maxFeePerGas: Number(`${maxFeePerGas}`) * 1000000000,
        maxPriorityFeePerGas: Number(`${maxPriorityFeePerGas}`) * 1000000000,
        value: Number(`${transactionValue}`) * 1000000000000000000,
        input: `${transactionInput}`,
      },
    }),
  });

  const data = await response.json();

  const failureMessage = data.msg;

  const simulatedBlockNumber = data.simulatedBlockNumber;

  const gasUsed = data.gasUsed;

  const error = data.error;

  let simulationStatus;

  if (data.msg) {
    simulationStatus = "Failed";
  } else {
    simulationStatus = "Completed";
  }

  return {
    simulatedBlockNumber,
    gasUsed,
    simulationStatus,
    failureMessage,
    error,
  };
}
