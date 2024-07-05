import CryptoMarketcapChart from "@/components/market-summary/crypto-marketcap-chart";
import CryptoCurrencyRankingsTable from "@/components/market-summary/cryptocurrency-rankings-table";
import FearAndGreed from "@/components/market-summary/fear-and-greed";
import MobileLandingPage from "@/components/mobile-landing-page";
import {
  fetchCoinData,
  fetchCryptoMarketCapData,
  fetchCryptoNews,
  fetchFearGreed,
} from "@/lib/server-utils";

export default async function Home() {
  const coinData = await fetchCoinData();
  const { newDataArray, highCoinsPercentage } = await fetchCryptoMarketCapData();
  const fearAndGreed = await fetchFearGreed();

  return (
    <>
    <main className="hidden xl:flex flex-col max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex justify-between">
        <CryptoCurrencyRankingsTable coinData={coinData} />
        <FearAndGreed fearAndGreed={fearAndGreed} />
      </div>
      
      <CryptoMarketcapChart newDataArray={newDataArray} />
    </main>

    <main className="xl:hidden">
      <MobileLandingPage />
    </main>
    </>
  );
}
