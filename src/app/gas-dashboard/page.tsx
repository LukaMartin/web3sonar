import BlockDataContainer from "@/components/gas-dashboard/block-data-container";
import EstimatedPricesContainer from "@/components/gas-dashboard/estimated-prices-container";
import TransactionSimulationContainer from "@/components/gas-dashboard/transaction-simulation-container";
import MobileLandingPage from "@/components/mobile-landing-page";
import { fetchBlockValues } from "../../services/blocknative/fetchBlockValues";

export default async function GasDashboard() {
  const {
    baseFee,
    maxFee,
    pendingBlockNumber,
    pendingTransactionCount,
    estimatedPrices,
  } = await fetchBlockValues();
  const estimatedPricesFlat = estimatedPrices.flat();

  return (
    <>
      <main className="hidden xl:flex flex-col mb-20 px-4 md:px-8">
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

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
