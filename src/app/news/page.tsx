import MobileLandingPage from "@/components/mobile-landing-page";
import CryptoNewsContainer from "@/components/news/crypto-news-container";
import { fetchCryptoNews, fetchNewsEvents } from "@/lib/server-utils";
import { SearchParams } from "@/lib/types";

type NewsPageProps = {
  searchParams: SearchParams;
}

export default async function News({ searchParams }: NewsPageProps) {
  const { generalNews, tokenNews, nftNews } = await fetchCryptoNews();
  const newsEvents = await fetchNewsEvents();
  const sortBy = searchParams.sortBy as string || "general";

  return (
    <>
      <main className="hidden xl:flex flex-col mb-20 px-4 md:px-8">
        <h2 className="text-[32px] lg:text-[40px] font-semibold mb-6">
          News and Events
        </h2>
        <CryptoNewsContainer
          generalNews={generalNews.data}
          tokenNews={tokenNews.data}
          nftNews={nftNews.data}
          newsEvents={newsEvents}
          sortBy={sortBy}
        />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
