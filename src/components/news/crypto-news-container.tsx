"use client";

import { CryptoNewsData, NewsEvent } from "@/lib/types";
import { useState } from "react";
import CryptoNewsCardContainer from "./crypto-news-card-container";
import NewsToggleButton from "./news-toggle-button";
import NewsEventsTable from "./news-events-table";

type CryptoNewsContainerProps = {
  generalNews: CryptoNewsData[];
  tickerNews: CryptoNewsData[];
  nftNews: CryptoNewsData[];
  newsEvents: NewsEvent[];
};

const paths = [
  {
    path: "general",
    name: "General",
  },
  {
    path: "tickers",
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
  tickerNews,
  nftNews,
  newsEvents,
}: CryptoNewsContainerProps) {
  const [toggleView, setToggleView] = useState("general");

  return (
    <section className="flex flex-col w-full">
      <div className="flex gap-x-8 mb-4">
        {paths.map((path) => {
          return (
            <NewsToggleButton
              key={path.name}
              toggleView={toggleView}
              setToggleView={setToggleView}
              path={path.path}
            >
              {path.name}
            </NewsToggleButton>
          );
        })}
      </div>
      {toggleView === "general" && (
        <CryptoNewsCardContainer data={generalNews} />
      )}
      {toggleView === "tickers" && (
        <CryptoNewsCardContainer data={tickerNews} />
      )}
      {toggleView === "nfts" && <CryptoNewsCardContainer data={nftNews} />}
      {toggleView === "events" && <NewsEventsTable newsEvents={newsEvents} />}
    </section>
  );
}
