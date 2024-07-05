import { convertToEth, findChainId } from "@/lib/utils";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { useCallback, useEffect, useState } from "react";

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
  const { walletProvider } = useWeb3ModalProvider();
  const { chainId } = useWeb3ModalAccount();
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  let fromChainId = findChainId(fromChain)[0];

  const fetchUserBalance = useCallback(async () => {
    if (!walletProvider || !address) {
      return;
    }

    setInsufficientFunds(false);
    const provider = new BrowserProvider(walletProvider!);
    const userBalance = await provider.getBalance(address!);
    const formattedBalance = convertToEth(Number(userBalance));

    if (formattedBalance < fromAmount! && chainId === fromChainId) {
      setInsufficientFunds(true);
    }
  }, [address, chainId, fromAmount, fromChainId, walletProvider]);

  useEffect(() => {
    fetchUserBalance();
  }, [fromAmount, fromChain, chainId, fetchUserBalance]);

  return insufficientFunds;
}
