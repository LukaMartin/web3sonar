import { CryptoNewsData, NewsEvent } from "@/lib/types";
import CryptoNewsCardContainer from "./crypto-news-card-container";
import NewsToggleButton from "./news-toggle-button";
import NewsEventsTable from "./news-events-table";

type CryptoNewsContainerProps = {
  generalNews: CryptoNewsData[];
  tokenNews: CryptoNewsData[];
  nftNews: CryptoNewsData[];
  newsEvents: NewsEvent[];
  sortBy: string;
};

const paths = [
  {
    path: "general",
    name: "General",
  },
  {
    path: "tokens",
    name: "BTC/ETH/SOL",
  },
  {
    path: "nfts",
    name: "NFTs",
  },
  {
    path: "events",
    name: "Key Events",
  },
];

export default function CryptoNewsContainer({
  generalNews,
  tokenNews,
  nftNews,
  newsEvents,
  sortBy,
}: CryptoNewsContainerProps) {
  return (
    <section className="flex flex-col w-full">
      <div className="flex gap-x-8 mb-4">
        {paths.map((path) => {
          return (
            <NewsToggleButton key={path.name} path={path.path} sortBy={sortBy}>
              {path.name}
            </NewsToggleButton>
          );
        })}
      </div>
      {sortBy === "general" && <CryptoNewsCardContainer data={generalNews} />}
      {sortBy === "tokens" && <CryptoNewsCardContainer data={tokenNews} />}
      {sortBy === "nfts" && <CryptoNewsCardContainer data={nftNews} />}
      {sortBy === "events" && <NewsEventsTable newsEvents={newsEvents} />}
    </section>
  );
}
