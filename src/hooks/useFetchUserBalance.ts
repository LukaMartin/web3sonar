import { formatEther, formatUnits } from "viem";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { useEthersProvider } from "@/config/wagmi-ethers";
import { erc20Abi } from "viem";
import { wethAddresses } from "@/constants/wethAddresses";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { findChainId } from "@/utils/findChainId";

export default function useFetchUserBalance() {
  const provider = useEthersProvider();
  const { chainId, address } = useAccount();
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const [insufficientFundsEvm, setInsufficientFundsEvm] = useState(false);
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
    setInsufficientFundsEvm(false);

    if (fromToken === "ETH") {
      if (
        ethBalance.data &&
        Number(formatEther(BigInt(ethBalance.data?.value))) < fromAmount! &&
        chainId === fromChainId
      ) {
        setInsufficientFundsEvm(true);
        return;
      }
    } else if (
      userBalance.data &&
      fromToken !== "ETH" &&
      !wethAddresses.includes(fromToken)
    ) {
      const balance = userBalance.data![0];
      const formattedBalance = Number(formatUnits(balance, 6));

      if (formattedBalance < fromAmount! && chainId === fromChainId) {
        setInsufficientFundsEvm(true);
        return;
      }
    } else if (userBalance.data && wethAddresses.includes(fromToken)) {
      const balance = userBalance.data![0];
      const formattedBalance = Number(formatEther(BigInt(balance)));

      if (formattedBalance < fromAmount! && chainId === fromChainId) {
        setInsufficientFundsEvm(true);
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

  return { insufficientFundsEvm, ethBalance, fetchUserBalance };
}
