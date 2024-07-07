import CryptoMarketcapChart from "@/components/market-summary/crypto-marketcap-chart";
import CryptoCurrencyRankingsTable from "@/components/market-summary/cryptocurrency-rankings-table";
import FearAndGreedSkeleton from "@/components/market-summary/fear-and-greed-skeleton";
import BreakoutStrategySkeleton from "@/components/market-summary/breakout-strategy-skeleton";
import MobileLandingPage from "@/components/mobile-landing-page";
import {
  fetchCoinData,
  fetchCryptoMarketCapData,
  fetchCryptoNews,
  fetchFearGreed,
} from "@/lib/server-utils";
import dynamic from "next/dynamic";

const DynamicFearAndGreed = dynamic(
  () => import("../components/market-summary/fear-and-greed"),
  {
    ssr: false,
    loading: () => <FearAndGreedSkeleton />,
  }
);

const DynamicBreakoutStrategyChart = dynamic(
  () => import("../components/market-summary/breakout-strategy-chart"),
  {
    ssr: false,
    loading: () => <BreakoutStrategySkeleton />,
  }
);

export default async function Home() {
  const coinData = await fetchCoinData();
  const { newDataArray, highCoinsPercentage } =
    await fetchCryptoMarketCapData();
  const fearAndGreed = await fetchFearGreed();
  const news = await fetchCryptoNews();
  //console.log("NEWS", news)

  return (
    <>
      <main className="hidden xl:flex flex-col max-w-7xl mx-auto px-4 md:px-8">
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
