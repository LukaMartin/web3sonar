import { convertToEth, findChainId } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useEthersProvider } from "@/lib/wagmi-ethers";

type FetchUserBalanceProps = {
  fromChain: string;
  address: `0x${string}` | undefined;
  fromAmount: number;
};

export default function useFetchUserBalance({
  address,
  fromAmount,
  fromChain,
}: FetchUserBalanceProps) {
  const provider = useEthersProvider();
  const { chainId } = useAccount();
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  let fromChainId = findChainId(fromChain)[0];

  const fetchUserBalance = useCallback(async () => {
    if (!provider || !address) {
      return;
    }

    setInsufficientFunds(false);
    const userBalance = await provider!.getBalance(address!);
    const formattedBalance = convertToEth(Number(userBalance));

    if (formattedBalance < fromAmount! && chainId === fromChainId) {
      setInsufficientFunds(true);
    }
  }, [address, chainId, fromAmount, fromChainId, provider]);

  useEffect(() => {
    fetchUserBalance();
  }, [fromAmount, fromChain, chainId, fetchUserBalance]);

  return insufficientFunds;
}
