import { convertToEth, convertUsdcDown, findChainId } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { useEthersProvider } from "@/lib/wagmi-ethers";
import { erc20Abi } from "viem";
import { wethAddresses } from "@/lib/constants";

type FetchUserBalanceProps = {
  fromChain: string;
  address: `0x${string}` | undefined;
  fromAmount: number;
  fromToken: string;
};

export default function useFetchUserBalance({
  address,
  fromAmount,
  fromChain,
  fromToken,
}: FetchUserBalanceProps) {
  const provider = useEthersProvider();
  const { chainId } = useAccount();
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  let fromChainId = findChainId(fromChain)[0];
  const ethBalance = useBalance({
    address: address,
    chainId: chainId,
  });
  const userBalance = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: fromToken as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address!],
      },
    ],
  });

  const fetchUserBalance = useCallback(async () => {
    if (!provider || !address) {
      return;
    }
    setInsufficientFunds(false);

    if (fromToken === "ETH") {
      if (
        convertToEth(Number(ethBalance.data?.value)) < fromAmount! &&
        chainId === fromChainId
      ) {
        setInsufficientFunds(true);
        return;
      }
    } else if (
      userBalance.data &&
      fromToken !== "ETH" &&
      !wethAddresses.includes(fromToken)
    ) {
      const balance = userBalance.data![0];
      const formattedBalance = convertUsdcDown(Number(balance));

      if (formattedBalance < fromAmount! && chainId === fromChainId) {
        setInsufficientFunds(true);
        return;
      }
    } else if (userBalance.data && wethAddresses.includes(fromToken)) {
      const balance = userBalance.data![0];
      const formattedBalance = convertToEth(Number(balance));

      if (formattedBalance < fromAmount! && chainId === fromChainId) {
        setInsufficientFunds(true);
        return;
      }
    }
  }, [
    address,
    chainId,
    fromAmount,
    fromChainId,
    provider,
    fromToken,
    userBalance,
    ethBalance,
  ]);

  useEffect(() => {
    fetchUserBalance();
  }, [fromAmount, fromChain, chainId, fetchUserBalance]);

  return insufficientFunds;
}
