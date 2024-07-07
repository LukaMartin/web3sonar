"use client";

import { CryptoNewsData } from "@/lib/types";
import { useState } from "react";
import CryptoNewsCardContainer from "./crypto-news-card-container";
import { cn } from "@/lib/utils";

type CryptoNewsContainerProps = {
  generalNews: CryptoNewsData[];
  tickerNews: CryptoNewsData[];
  nftNews: CryptoNewsData[];
};

export default function CryptoNewsContainer({
  generalNews,
  tickerNews,
  nftNews,
}: CryptoNewsContainerProps) {
  const buttonStyles =
    "text-white/75 mb-6 bg-white/[2%] border-white/20 border-[1px] rounded-md px-4 py-2 hover:bg-white/[5%] hover:text-white active:scale-[0.97]";
  const [toggleView, setToggleView] = useState("general");

  return (
    <section className="flex flex-col w-full">
      <div className="flex gap-x-[0.85rem]">
        <button
          className={cn(`${buttonStyles}`, {
            "text-white bg-white/[10%]": toggleView === "general",
          })}
          onClick={() => setToggleView("general")}
        >
          General Crypto
        </button>
        <button
          className={cn(`${buttonStyles}`, {
            "text-white bg-white/[10%]": toggleView === "tickers",
          })}
          onClick={() => setToggleView("tickers")}
        >
          BTC/ETH/SOL
        </button>
        <button className={buttonStyles} onClick={() => setToggleView("nfts")}>NFTs</button>
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
