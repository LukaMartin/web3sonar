"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import PaginationButtons from "./pagination-buttons";
import { CryptocurrencyCoinData, PageDirection } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function CryptoCurrencyRankingsTable({
  coinData,
}: {
  coinData: CryptocurrencyCoinData[];
}) {
  let nf = new Intl.NumberFormat("en-US");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const coinDataSliced = coinData.slice(
    currentPage * resultsPerPage - resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      router.refresh();
    }, 60000)
  }, [router])

  return (
    <section>
      <div className="flex justify-between items-center mb-4 w-[44rem]">
        <h3 className="text-white/85 text-lg">
          Top Cryptocurrenices by Market Cap
        </h3>
        <p>Page {currentPage} of 10</p>
      </div>
      <table className=" bg-white/[3%] rounded-md shadow-[0_7px_7px_rgba(2,2,2,1)] border-collapse outline outline-1 outline-white/20 table-fixed">
        <thead>
          <tr className="text-sm text-white/90">
            <th className="text-left pt-6 pb-4 pl-6 w-24">RANK</th>
            <th className="text-left pt-6 pb-4 w-20">NAME</th>
            <th className="text-right pt-6 pb-4 w-28">PRICE</th>
            <th className="text-right pt-6 pb-4 w-40">MARKET CAP</th>
            <th className="text-right pt-6 pb-4 w-20">1H%</th>
            <th className="text-right pt-6 pb-4 w-20">24H%</th>
            <th className="text-right pt-6 pb-4 pr-6 w-24">7D%</th>
          </tr>
        </thead>
        <tbody>
          {coinDataSliced.map((coin) => {
            return (
              <tr key={coin.name}>
                <td className="py-[1rem] text-white/75 text-sm pl-6">
                  <p>{coin.market_cap_rank}</p>
                </td>
                <td className="flex items-center pt-[0.9rem] text-sm">
                  <Image
                    src={coin.logo}
                    alt="Token Logo"
                    height={25}
                    width={25}
                    className="rounded-full"
                  />
                  <p className="font-bold pl-2 uppercase">{coin.symbol}</p>
                </td>
                <td className="text-right text-white/75 text-sm">
                  {coin.usd_price > 0.01 ? (
                    <p>${Number(coin.usd_price).toFixed(2)}</p>
                  ) : (
                    <p>${coin.usd_price}</p>
                  )}
                </td>
                <td className="text-right text-white/75 text-sm">
                  <p>${nf.format(coin.market_cap_usd)}</p>
                </td>
                <td className="text-right text-sm">
                  {coin.usd_price_1hr_percent_change > 0 ? (
                    <p className="text-green-600">
                      {Number(coin.usd_price_1hr_percent_change).toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-600">
                      {Number(coin.usd_price_1hr_percent_change).toFixed(2)}%
                    </p>
                  )}
                </td>
                <td className="text-right text-sm">
                  {coin.usd_price_24hr_percent_change > 0 ? (
                    <p className="text-green-600">
                      {Number(coin.usd_price_24hr_percent_change).toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-600">
                      {Number(coin.usd_price_24hr_percent_change).toFixed(2)}%
                    </p>
                  )}
                </td>
                <td className="text-right text-sm pr-6">
                  {coin.usd_price_7d_percent_change > 0 ? (
                    <p className="text-green-600">
                      {Number(coin.usd_price_7d_percent_change).toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-600">
                      {Number(coin.usd_price_7d_percent_change).toFixed(2)}%
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginationButtons
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </section>
  );
}
