import CryptoMarketcapChart from "@/app/market-insights/components/crypto-marketcap-chart";
import CryptoCurrencyRankingsTable from "@/app/market-insights/components/cryptocurrency-rankings-table";
import FearAndGreedSkeleton from "@/app/market-insights/components/fear-and-greed-skeleton";
import BreakoutStrategySkeleton from "@/app/market-insights/components/breakout-strategy-skeleton";
import MobileLandingPage from "@/components/mobile-landing-page";
import { fetchFearGreed } from "./utils/fetchFearGreed";
import { fetchCoinData } from "./utils/fetchCoinData";
import { fetchBreakoutStrategy } from "./utils/fetchBreakoutStrategy";
import { fetchCryptoMarketCapData } from "./utils/fetchCryptoMarketCapData";
import dynamic from "next/dynamic";
import BiggestGainersContainerSkeleton from "@/app/market-insights/components/biggest-gainers-container-skeleton";

const DynamicFearAndGreed = dynamic(
  () => import("./components/fear-and-greed"),
  {
    ssr: false,
    loading: () => <FearAndGreedSkeleton />,
  }
);

const DynamicBreakoutStrategyChart = dynamic(
  () => import("./components/breakout-strategy-chart"),
  {
    ssr: false,
    loading: () => <BreakoutStrategySkeleton />,
  }
);

const DynamicBiggestGainersContainer = dynamic(
  () => import("./components/biggest-gainers-container"),
  {
    ssr: false,
    loading: () => <BiggestGainersContainerSkeleton />,
  }
);

export default async function MarketInsights() {
  const coinData = await fetchCoinData();
  const highCoinsPercentage = await fetchBreakoutStrategy();
  const fearAndGreed = await fetchFearGreed();
  const { cryptoTotalMarketcap, altcoinTotalMarketcap } =
    await fetchCryptoMarketCapData();

  return (
    <>
      <main className="hidden xl:flex flex-col mb-20 px-4 md:px-8">
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
