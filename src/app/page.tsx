import CryptoMarketcapChart from "@/components/market-stats/crypto-marketcap-chart";
import CryptoCurrencyRankingsTable from "@/components/market-stats/cryptocurrency-rankings-table";
import FearAndGreedSkeleton from "@/components/market-stats/fear-and-greed-skeleton";
import BreakoutStrategySkeleton from "@/components/market-stats/breakout-strategy-skeleton";
import MobileLandingPage from "@/components/mobile-landing-page";
import {
  fetchCoinData,
  fetchCryptoMarketCapData,
  fetchFearGreed,
} from "@/lib/server-utils";
import dynamic from "next/dynamic";

const DynamicFearAndGreed = dynamic(
  () => import("../components/market-stats/fear-and-greed"),
  {
    ssr: false,
    loading: () => <FearAndGreedSkeleton />,
  }
);

const DynamicBreakoutStrategyChart = dynamic(
  () => import("../components/market-stats/breakout-strategy-chart"),
  {
    ssr: false,
    loading: () => <BreakoutStrategySkeleton />,
  }
);

export default async function Home() {
  const coinData = await fetchCoinData();
  const { newDataArray, highCoinsPercentage } = await fetchCryptoMarketCapData();
  const fearAndGreed = await fetchFearGreed();

  return (
    <>
      <main className="hidden xl:flex flex-col max-w-7xl mx-auto mb-20 px-4 md:px-8">
        <div className="flex justify-between">
          <CryptoCurrencyRankingsTable coinData={coinData} />

          <div className="flex flex-col justify-between pb-[4.75rem]">
            <DynamicFearAndGreed fearAndGreed={fearAndGreed} />
            <DynamicBreakoutStrategyChart
              highCoinsPercentage={highCoinsPercentage[0].toFixed(2)}
            />
          </div>
        </div>

        <CryptoMarketcapChart newDataArray={newDataArray} />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
