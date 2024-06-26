import BlockDataContainer from "@/components/block-data-container";
import EstimatedPricesContainer from "@/components/estimated-prices-container";
import TransactionSimulationContainer from "@/components/transaction-simulation-container";
import {
  fetchBlockValues,
} from "@/lib/server-utils";

export default async function Home() {
  const {
    baseFee,
    maxFee,
    pendingBlockNumber,
    pendingTransactionCount,
    estimatedPrices,
  } = await fetchBlockValues();
  const estimatedPricesFlat = estimatedPrices.flat();

  return (
    <main className="flex flex-col max-w-7xl mx-auto px-4 md:px-8">
      <BlockDataContainer
        baseFee={baseFee}
        maxFee={maxFee}
        pendingBlockNumber={pendingBlockNumber}
        pendingTransactionCount={pendingTransactionCount}
        estimatedPrices={estimatedPricesFlat}
      />

      <EstimatedPricesContainer estimatedPrices={estimatedPricesFlat} />

      <TransactionSimulationContainer />
    </main>
  );
}
