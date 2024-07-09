"use client";

import { CryptoNewsData } from "@/lib/types";
import { useState } from "react";
import CryptoNewsCardContainer from "./crypto-news-card-container";
import NewsToggleButton from "./news-toggle-button";

type CryptoNewsContainerProps = {
  generalNews: CryptoNewsData[];
  tickerNews: CryptoNewsData[];
  nftNews: CryptoNewsData[];
};

const paths = [
  {
    path: "general",
    name: "General Crypto",
  },
  {
    path: "tickers",
    name: "BTC/ETH/SOL",
  },
  {
    path: "nfts",
    name: "NFTs",
  },
];

export default function CryptoNewsContainer({
  generalNews,
  tickerNews,
  nftNews,
}: CryptoNewsContainerProps) {
  const [toggleView, setToggleView] = useState("general");

  return (
    <section className="flex flex-col w-full">
      <div className="flex gap-x-[0.85rem]">
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
    </section>
  );
}
