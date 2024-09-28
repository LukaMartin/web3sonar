import BiggestGainersTable from "./biggest-gainers-table";
import { CryptocurrencyCoinData } from "../../types/market-insights/cryptocurrencyCoinData";
import Tooltip from "../tooltip";

export default function BiggestGainersContainer({
  coinData,
}: {
  coinData: CryptocurrencyCoinData[];
}) {
  let sortedDataOne = coinData
    .sort(
      (a, b) =>
        b.market_cap_24hr_percent_change - a.market_cap_24hr_percent_change
    )
    .slice(0, 10);
  let sortedDataTwo = coinData
    .sort(
      (a, b) =>
        b.market_cap_24hr_percent_change - a.market_cap_24hr_percent_change
    )
    .slice(10, 20);
  let sortedDataThree = coinData
    .sort(
      (a, b) =>
        b.market_cap_24hr_percent_change - a.market_cap_24hr_percent_change
    )
    .slice(20, 30);
  return (
    <section className="w-full mx-auto mt-20">
      <div className="flex gap-x-3">
        <h3 className="text-white/85 text-lg mb-4">
          Biggest Gainers by Market Cap
        </h3>
        <Tooltip
          size={23}
          content="This data represents the coins in the top 100 by market cap, that have had the highest percentage increase in market cap over the last 24 hours."
        />
      </div>
      <div className="flex justify-between ">
        <BiggestGainersTable coinData={sortedDataOne} indexIncrease={1} />
        <BiggestGainersTable coinData={sortedDataTwo} indexIncrease={11} />
        <BiggestGainersTable coinData={sortedDataThree} indexIncrease={21} />
      </div>
    </section>
  );
}
