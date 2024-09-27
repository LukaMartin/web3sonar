import { removeDecimalsFromString } from "@/utils/removeDecimalsFromString";
import Image from "next/image";
import { CryptocurrencyCoinData } from "../../types/market-insights/cryptocurrencyCoinData";

export default function BiggestGainersTable({
  coinData,
  indexIncrease,
}: {
  coinData: CryptocurrencyCoinData[];
  indexIncrease: number;
}) {
  let nf = new Intl.NumberFormat("en-US");

  return (
    <section>
      <table className=" bg-white/[3%] rounded-md shadow-[0_7px_5px_rgba(2,2,2,1)] table-fixed">
        <thead>
          <tr className="text-sm text-white/90">
            <th className="text-left pt-6 pb-4 pl-6 w-[4.25rem]">#</th>
            <th className="text-left pt-6 pb-4 w-20">NAME</th>
            <th className="text-right pt-6 pb-4 w-32">MCAP CHANGE</th>
            <th className="text-right pt-6 pb-4 pr-6 w-[6.75rem]">24H%</th>
          </tr>
        </thead>
        <tbody>
          {coinData.map((coin, index) => {
            return (
              <tr key={coin.name}>
                <td className="py-[1rem] text-white/75 text-sm pl-6">
                  <p>{index + indexIncrease}</p>
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
                  <p>
                    $
                    {removeDecimalsFromString(
                      nf.format(coin.market_cap_24hr_change)
                    )}
                  </p>
                </td>
                <td className="text-right text-white/75 text-sm pr-6">
                  <p>
                    {coin.market_cap_24hr_percent_change > 0 ? (
                      <p className="text-green-600">
                        {Number(coin.market_cap_24hr_percent_change).toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className="text-red-600">
                        {Number(coin.market_cap_24hr_percent_change).toFixed(2)}
                        %
                      </p>
                    )}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
