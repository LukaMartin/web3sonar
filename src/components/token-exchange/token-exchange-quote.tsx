import { addFees, convertToEth, convertUsdcDown } from "@/lib/utils";
import { TbRouteX } from "react-icons/tb";
import ethLogo from "../../../public/eth-logo.svg";
import usdcLogo from "../../../public/usd-coin-usdc-logo.svg";
import Image from "next/image";
import { TokenExchangeQuoteProps } from "@/lib/token-exchange-quote-types";

export default function TokenExchangeQuote({
  quote,
  toToken,
}: TokenExchangeQuoteProps) {
  return (
    <>
      {quote.message ? (
        <section className="w-[375px] h-[200px] flex flex-col justify-center items-center gap-y-6 mx-auto bg-white/[2%] border-[1px] border-white/20 rounded-xl shadow-[0_7px_5px_rgba(2,2,2,1)]">
          <p className="text-xl font-semibold px-4 text-center">
            {quote.message}
          </p>
          <TbRouteX size={50} />
        </section>
      ) : (
        <section className="w-[375px] h-[200px] flex flex-col justify-between mx-auto mb-16 py-6 bg-white/[2%] border-[1px] border-white/20 rounded-xl shadow-[0_7px_5px_rgba(2,2,2,1)]">
          <div className="flex justify-between px-6">
            <div className="flex gap-x-6">
              {toToken === "ETH" ? (
                <Image
                  src={ethLogo}
                  alt="Ethereum Logo"
                  height={55}
                  width={55}
                />
              ) : (
                <Image src={usdcLogo} alt="USDC Logo" height={55} width={55} />
              )}
              <div className="pt-2">
                <p className="text-2xl">
                  {toToken === "ETH" &&
                  convertToEth(Number(quote.estimate.toAmount)) < 0.1
                    ? convertToEth(Number(quote.estimate.toAmount)).toFixed(3)
                    : toToken === "ETH" &&
                      convertToEth(Number(quote.estimate.toAmount)) >= 0.1
                    ? convertToEth(Number(quote.estimate.toAmount)).toFixed(4)
                    : convertUsdcDown(Number(quote?.estimate.toAmount)).toFixed(
                        2
                      )}
                </p>
                <p className="text-sm text-white/50">
                  ${quote.estimate.toAmountUSD}
                </p>
              </div>
            </div>
            <div className="pt-3">
              <p className="text-lg">${addFees(quote.estimate.feeCosts)}</p>
              <p className="text-sm text-white/50 text-right">Fees</p>
            </div>
          </div>

          <div className="flex justify-between px-6">
            <div className="flex gap-x-6">
              <Image
                className="rounded-full"
                src={quote.toolDetails.logoURI}
                alt="Provider Logo"
                height={55}
                width={55}
              />
              <div className="flex flex-col gap-x-4 pt-2">
                <p className="text-lg">{quote.toolDetails.name}</p>
                <p className="text-white/50 text-sm">Provdier</p>
              </div>
            </div>

            <div className="flex flex-col pt-1 text-right">
              <p className="pt-1 text-lg">
                {quote.estimate.executionDuration < 60
                  ? `${Math.round(quote.estimate.executionDuration)} s`
                  : `${Math.round(
                      Number(quote.estimate.executionDuration) / 60
                    )} min`}
              </p>
              <p className="text-white/50 text-sm">Time</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
