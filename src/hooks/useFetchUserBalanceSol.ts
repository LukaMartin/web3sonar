import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { convertSolDown } from "@/lib/utils";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { connection, SOL_USDC_MINT, SOL_USDT_MINT } from "@/config/solana";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useCallback, useEffect, useState } from "react";
import useSolWalletChange from "./useSolWalletChange";

export default function useFetchUserBalanceSol() {
  const { connected } = useWallet();
  const { currentPublicKey } = useSolWalletChange();
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const txResult = useTokenExchangeStore((state) => state.txResult);
  const [insufficientFundsSol, setInsufficientFundsSol] = useState(false);
  const [solBalance, setSolBalance] = useState(0);

  const fetchUserSolBalance = useCallback(async () => {
    if (currentPublicKey) {
      setInsufficientFundsSol(false);
      const balance = await connection.getBalance(currentPublicKey);
      const convertedBalance = convertSolDown(balance);
      setSolBalance(convertedBalance);
      if (
        fromChain === "SOL" &&
        fromToken === "SOL" &&
        convertedBalance < fromAmount
      ) {
        setInsufficientFundsSol(true);
      }
    }
  }, [currentPublicKey, fromAmount, fromChain, fromToken]);

  const fetchTokenBalance = useCallback(
    async (wallet: PublicKey | null, tokenMint: PublicKey) => {
      if (!wallet) return;

      setInsufficientFundsSol(false);
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        wallet,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      const account = tokenAccounts.value.find(
        (account) =>
          account.account.data.parsed.info.mint === tokenMint.toBase58()
      );

      const balance =
        account?.account.data.parsed.info.tokenAmount.uiAmount || 0;

      if (balance && balance < fromAmount) {
        setInsufficientFundsSol(true);
      }
    },
    [fromAmount]
  );

  useEffect(() => {
    if (fromChain === "SOL" && currentPublicKey && connected) {
      if (fromToken === "SOL") {
        fetchUserSolBalance();
      } else if (fromToken === SOL_USDC_MINT.toBase58()) {
        fetchTokenBalance(currentPublicKey, SOL_USDC_MINT);
      } else if (fromToken === SOL_USDT_MINT.toBase58()) {
        fetchTokenBalance(currentPublicKey, SOL_USDT_MINT);
      }
    }
  }, [
    connected,
    fetchUserSolBalance,
    fetchTokenBalance,
    fromChain,
    fromToken,
    currentPublicKey,
  ]);

  useEffect(() => {
    fetchUserSolBalance();
  }, [fetchUserSolBalance, currentPublicKey, txResult]);

  return { insufficientFundsSol, solBalance, fetchUserSolBalance };
}
