import {
  addFees,
  convertToTokenAmount,
  formatAddress,
  getChainLogoByName,
  getTokenLogo,
  shortenProviderName,
} from "@/lib/utils";
import { TbRouteX } from "react-icons/tb";
import Image from "next/image";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolanaActiveWallet from "solana-active-wallet-react";

export default function QuoteMoreInfo() {
  const quote = useTokenExchangeStore((state) => state.quote);
  const toToken = useTokenExchangeStore((state) => state.toToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const destinationAddress = useTokenExchangeStore(
    (state) => state.destinationAddress
  );
  const isLoading = useTokenExchangeStore((state) => state.isLoading);
  const { address } = useAccount();
  const { publicKey } = useWallet();
  const { activePublicKey } = useSolanaActiveWallet(publicKey);

  return (
    <>
      {quote && quote.message ? (
        <section className="flex flex-col gap-y-2 items-center p-4 mt-3 mx-6 bg-white/[4%] rounded-md">
          <p>{quote.message}</p>
          <TbRouteX size={40} />
        </section>
      ) : (
        <section className="flex flex-col p-4 mt-3 mx-6 bg-white/[4%] rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {quote && (
                <Image
                  className="rounded-full"
                  src={quote.toolDetails.logoURI}
                  alt="Provider Logo"
                  height={45}
                  width={45}
                />
              )}
              <div className="flex flex-col gap-x-4">
                <p className={`${isLoading && "animate-pulseStrong"} text-lg`}>
                  {quote && shortenProviderName(quote.toolDetails.name)}
                </p>
                <p className="text-white/50 text-sm">Provdier</p>
              </div>
            </div>

            <div className="text-right">
              {quote && (
                <p className={`${isLoading && "animate-pulseStrong"} text-lg`}>
                  $
                  {(
                    Number(
                      quote.estimate.gasCosts.map((cost) => cost.amountUSD)
                    ) + Number(addFees(quote.estimate.feeCosts))
                  ).toFixed(2)}
                </p>
              )}
              <p className="text-sm text-white/50">Gas + Fees</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <p>You send</p>

            <div className="flex items-center gap-x-1">
              <p className={`${isLoading && "animate-pulseStrong"}`}>
                {fromAmount.toFixed(3)}
              </p>
              <Image
                src={getTokenLogo(fromToken)}
                alt="Token Logo"
                height={20}
                width={20}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p>You recieve</p>

            <div className="flex items-center gap-x-1">
              {quote && (
                <p className={`${isLoading && "animate-pulseStrong"}`}>
                  {convertToTokenAmount(toToken, quote)}
                </p>
              )}
              <Image
                src={getTokenLogo(toToken)}
                alt="Token Logo"
                height={20}
                width={20}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <p>Destination</p>

            <div className="flex items-center gap-x-1">
              <p>
                {fromChain !== "SOL" && toChain !== "SOL"
                  ? formatAddress(address, 5)
                  : (fromChain === "SOL" && toChain !== "SOL") ||
                    (fromChain !== "SOL" && toChain === "SOL")
                  ? formatAddress(destinationAddress, 5)
                  : fromChain === "SOL" && toChain === "SOL"
                  ? formatAddress(
                    activePublicKey?.toString() || publicKey?.toString(),
                      5
                    )
                  : ""}
              </p>
              <Image
                src={getChainLogoByName(toChain)}
                alt="Chain Logo"
                height={20}
                width={20}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
