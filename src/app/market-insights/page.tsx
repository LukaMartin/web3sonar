import CryptoMarketcapChart from "@/components/market-insights/crypto-marketcap-chart";
import CryptoCurrencyRankingsTable from "@/components/market-insights/cryptocurrency-rankings-table";
import FearAndGreedSkeleton from "@/components/market-insights/fear-and-greed-skeleton";
import BreakoutStrategySkeleton from "@/components/market-insights/breakout-strategy-skeleton";
import MobileLandingPage from "@/components/mobile-landing-page";
import { fetchFearGreed } from "../../services/alternative-me/fetchFearGreed";
import { fetchCoinData } from "../../services/moralis/fetchCoinData";
import { fetchBreakoutStrategy } from "../../services/token-metrics/fetchBreakoutStrategy";
import { fetchCryptoMarketCapData } from "../../services/live-coin-watch/fetchCryptoMarketCapData";
import dynamic from "next/dynamic";
import BiggestGainersContainerSkeleton from "@/components/market-insights/biggest-gainers-container-skeleton";

const DynamicFearAndGreed = dynamic(
  () => import("../../components/market-insights/fear-and-greed"),
  {
    ssr: false,
    loading: () => <FearAndGreedSkeleton />,
  }
);

const DynamicBreakoutStrategyChart = dynamic(
  () => import("../../components/market-insights/breakout-strategy-chart"),
  {
    ssr: false,
    loading: () => <BreakoutStrategySkeleton />,
  }
);

const DynamicBiggestGainersContainer = dynamic(
  () => import("../../components/market-insights/biggest-gainers-container"),
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
