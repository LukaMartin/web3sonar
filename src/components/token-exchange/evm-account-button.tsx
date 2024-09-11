import Image from "next/image";
import { convertToEth, formatAddress, getChainLogo } from "@/lib/utils";
import useFetchUserBalance from "@/hooks/useFetchUserBalance";
import { useAccount } from "wagmi";
import EVMAccountMenu from "./evm-account-menu";

export default function EVMAccountButton() {
  const { ethBalance } = useFetchUserBalance();
  const { address, isConnected, chainId } = useAccount();

  return (
    <>
      {isConnected && (
        <div className="flex w-80 items-center justify-between px-4">
          <div className="flex items-center gap-x-[0.375rem]">
            <Image
              src={getChainLogo(chainId)}
              alt="ethereum"
              width={30}
              height={30}
            />
            <p className="font-semibold text-white/90">
              {ethBalance &&
                convertToEth(Number(ethBalance.data?.value)).toFixed(3)}{" "}
              ETH
            </p>
          </div>

          <EVMAccountMenu>
            <button className="flex items-center justify-center gap-x-[0.375rem] bg-white/[5%] border border-white/10 rounded-3xl py-1 w-36 hover:bg-white/10 transition">
              <p className="text-white/60 font-semibold hover:text-white transition">
                {formatAddress(address, 5)}
              </p>
            </button>
          </EVMAccountMenu>
        </div>
      )}
    </>
  );
}
