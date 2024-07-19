import MobileLandingPage from "@/components/mobile-landing-page";
import CryptoNewsContainer from "@/components/news/crypto-news-container";
import { fetchCryptoNews, fetchNewsEvents } from "@/lib/server-utils";

export default async function News() {
  const { generalNews, tickerNews, nftNews } = await fetchCryptoNews();
  const newsEvents = await fetchNewsEvents();

  return (
    <>
      <main className="hidden xl:flex flex-col mb-20 px-4 md:px-8">
        <h2 className="text-[32px] lg:text-[40px] font-semibold mb-6">
          News and Events
        </h2>
        <CryptoNewsContainer
          generalNews={generalNews.data}
          tickerNews={tickerNews.data}
          nftNews={nftNews.data}
          newsEvents={newsEvents}
        />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
