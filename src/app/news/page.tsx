import MobileLandingPage from "@/components/mobile-landing-page";
import CryptoNewsContainer from "@/components/news/crypto-news-container";
import { fetchCryptoNews } from "@/lib/server-utils";

export default async function News() {
  const { generalNews, tickerNews, nftNews } = await fetchCryptoNews();

  return (
    <>
      <main className="hidden xl:flex flex-col max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-[32px] lg:text-[40px] font-semibold mb-6">
          News Headlines
        </h2>
        <CryptoNewsContainer
          generalNews={generalNews.data}
          tickerNews={tickerNews.data}
          nftNews={nftNews.data}
        />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
