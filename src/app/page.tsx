import CryptoMarketcapChart from "@/components/market-stats/crypto-marketcap-chart";
import CryptoCurrencyRankingsTable from "@/components/market-stats/cryptocurrency-rankings-table";
import FearAndGreedSkeleton from "@/components/market-stats/fear-and-greed-skeleton";
import BreakoutStrategySkeleton from "@/components/market-stats/breakout-strategy-skeleton";
import MobileLandingPage from "@/components/mobile-landing-page";
import {
  fetchCoinData,
  fetchBreakoutStrategy,
  fetchCryptoMarketCapData,
  fetchFearGreed,
} from "@/lib/server-utils";
import dynamic from "next/dynamic";
import BiggestGainersContainerSkeleton from "@/components/market-stats/biggest-gainers-container-skeleton";

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

const DynamicBiggestGainersContainer = dynamic(
  () => import("../components/market-stats/biggest-gainers-container"),
  {
    ssr: false,
    loading: () => <BiggestGainersContainerSkeleton />,
  }
);

export default async function Home() {
  const coinData = await fetchCoinData();
  const highCoinsPercentage = await fetchBreakoutStrategy();
  const fearAndGreed = await fetchFearGreed();
  const { cryptoTotalMarketcap, altcoinTotalMarketcap } =
    await fetchCryptoMarketCapData();

  return (
    <>
      <main className="hidden xl:flex flex-col max-w-7xl mx-auto mb-20 px-4 md:px-8">
        <div className="flex justify-between">
          <CryptoCurrencyRankingsTable coinData={coinData} />

          <div className="flex flex-col justify-between pb-[4.6rem]">
            <DynamicFearAndGreed fearAndGreed={fearAndGreed} />
            <DynamicBreakoutStrategyChart
              highCoinsPercentage={highCoinsPercentage[0].toFixed(2)}
            />
          </div>
        </div>

        <DynamicBiggestGainersContainer coinData={coinData} />

        <CryptoMarketcapChart
          cryptoTotalMarketCap={cryptoTotalMarketcap}
          altcoinTotalMarketcap={altcoinTotalMarketcap}
        />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
