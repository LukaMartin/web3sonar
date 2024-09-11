import { useEffect, useCallback } from "react";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useAccount, useSwitchChain } from "wagmi";
import { useToast } from "../components/ui/use-toast";
import {
  findChainId,
  convertToWei,
  convertSolUp,
  convertUsdcUp,
} from "@/lib/utils";
import { wethAddresses } from "@/lib/constants";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolWalletChange from "./useSolWalletChange";

export function useQuoteFetching(
  inputRef: React.RefObject<HTMLInputElement>,
  interval: React.MutableRefObject<any>
) {
  const { address } = useAccount();
  const { publicKey } = useWallet();
  const { currentPublicKey } = useSolWalletChange();
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const toToken = useTokenExchangeStore((state) => state.toToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const destinationAddress = useTokenExchangeStore(
    (state) => state.destinationAddress
  );
  const quote = useTokenExchangeStore((state) => state.quote);
  const txResult = useTokenExchangeStore((state) => state.txResult);
  const setFromAmount = useTokenExchangeStore((state) => state.setFromAmount);
  const fetchQuote = useTokenExchangeStore((state) => state.fetchQuote);
  const fetchQuoteSol = useTokenExchangeStore((state) => state.fetchQuoteSol);
  const awaitingConfirmation = useTokenExchangeStore(
    (state) => state.awaitingConfirmation
  );

  //Logic for determining convertedFromAmount
  const convertFromAmount = useCallback(() => {
    if (fromToken === "ETH" || wethAddresses.includes(fromToken)) {
      return convertToWei(fromAmount);
    } else if (fromToken === "SOL") {
      return convertSolUp(fromAmount);
    } else {
      return convertUsdcUp(fromAmount);
    }
  }, [fromAmount, fromToken]);

  const convertedFromAmount = convertFromAmount();

  // Effect for fetching quotes
  useEffect(() => {
    if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      fromChain !== "SOL" &&
      toChain !== "SOL"
    ) {
      fetchQuote(
        address || "0xF11aeCE59d2E3959b625bbd664e4A8400e941Fb9",
        convertedFromAmount
      );
    } else if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      destinationAddress &&
      fromChain === "SOL" &&
      toChain !== "SOL"
    ) {
      fetchQuoteSol(
        currentPublicKey?.toBase58() ||
          publicKey?.toBase58() ||
          "E98rYk1s9mqm75SfBqqwFq73hCKWMtnyceASsWk1cmVp",
        convertedFromAmount
      );
    } else if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      destinationAddress &&
      fromChain !== "SOL" &&
      toChain === "SOL"
    ) {
      fetchQuoteSol(
        address || "0xF11aeCE59d2E3959b625bbd664e4A8400e941Fb9",
        convertedFromAmount
      );
    } else if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      fromChain === "SOL" &&
      toChain === "SOL"
    ) {
      fetchQuoteSol(
        currentPublicKey?.toBase58() ||
          publicKey?.toBase58() ||
          "E98rYk1s9mqm75SfBqqwFq73hCKWMtnyceASsWk1cmVp",
        convertedFromAmount
      );
    }
  }, [
    fromChain,
    toChain,
    fromToken,
    toToken,
    fromAmount,
    address,
    destinationAddress,
    currentPublicKey,
    publicKey,
    fetchQuote,
    fetchQuoteSol,
    convertedFromAmount,
  ]);

  // Effect for interval quote fetching
  useEffect(() => {
    if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      !awaitingConfirmation &&
      fromChain !== "SOL" &&
      toChain !== "SOL"
    ) {
      interval.current = setInterval(() => {
        fetchQuote(
          address || "0xF11aeCE59d2E3959b625bbd664e4A8400e941Fb9",
          convertedFromAmount
        );
      }, 50000);
    } else if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      destinationAddress &&
      fromChain === "SOL" &&
      toChain !== "SOL"
    ) {
      interval.current = setInterval(() => {
        fetchQuoteSol(
          currentPublicKey?.toBase58() ||
            publicKey?.toBase58() ||
            "E98rYk1s9mqm75SfBqqwFq73hCKWMtnyceASsWk1cmVp",
          convertedFromAmount
        );
      }, 50000);
    } else if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      destinationAddress &&
      fromChain !== "SOL" &&
      toChain === "SOL"
    ) {
      interval.current = setInterval(() => {
        fetchQuoteSol(
          address || "0xF11aeCE59d2E3959b625bbd664e4A8400e941Fb9",
          convertedFromAmount
        );
      }, 50000);
    } else if (
      fromChain &&
      toChain &&
      fromToken &&
      toToken &&
      fromAmount &&
      fromChain === "SOL" &&
      toChain === "SOL"
    ) {
      interval.current = setInterval(() => {
        fetchQuoteSol(
          currentPublicKey?.toBase58() ||
            publicKey?.toBase58() ||
            "E98rYk1s9mqm75SfBqqwFq73hCKWMtnyceASsWk1cmVp",
          convertedFromAmount
        );
      }, 50000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [
    awaitingConfirmation,
    fromChain,
    toChain,
    fromToken,
    toToken,
    fromAmount,
    address,
    currentPublicKey,
    publicKey,
    destinationAddress,
    interval,
    fetchQuote,
    convertedFromAmount,
    fetchQuoteSol,
  ]);

  // Effect for clearing input on chain change
  useEffect(() => {
    setFromAmount(0);
    if (inputRef.current) inputRef.current.value = "";
  }, [fromChain, toChain, setFromAmount, inputRef]);

  // Effect for clearing interval on quote error
  useEffect(() => {
    if (quote && quote.message) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [quote, interval]);

  //Effect for clearing interval on destination address change
  useEffect(() => {
    if (fromChain === "SOL" && toChain !== "SOL" && destinationAddress === "") {
      clearInterval(interval.current);
      interval.current = null;
    } else if (
      fromChain !== "SOL" &&
      toChain === "SOL" &&
      destinationAddress === ""
    ) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [destinationAddress, interval, fromChain, toChain]);
}

export function useChainSwitching() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const fromChain = useTokenExchangeStore((state) => state.fromChain);

  // Effect for switching chain
  useEffect(() => {
    if (isConnected) {
      const fromChainId = findChainId(fromChain)[0];
      if (fromChainId !== chainId) {
        switchChain({ chainId: fromChainId });
      }
    }
  }, [chainId, fromChain, isConnected, switchChain]);
}

export function useErrorHandling(onClose: () => void) {
  const { toast } = useToast();
  const fetchQuoteErrorMessage = useTokenExchangeStore(
    (state) => state.fetchQuoteErrorMessage
  );
  const allowanceErrorMessage = useTokenExchangeStore(
    (state) => state.allowanceErrorMessage
  );
  const transactionErrorMessage = useTokenExchangeStore(
    (state) => state.transactionErrorMessage
  );
  // Error handling for allowance
  useEffect(() => {
    if (allowanceErrorMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: allowanceErrorMessage,
        className: "py-3 px-4",
      });
      onClose();
    }
  }, [allowanceErrorMessage, toast, onClose]);

  // Error handling for transaction
  useEffect(() => {
    if (transactionErrorMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: transactionErrorMessage,
        className: "py-3 px-4",
      });
      onClose();
    }
  }, [transactionErrorMessage, toast, onClose]);

  // Error handling for fetchQuote
  useEffect(() => {
    if (fetchQuoteErrorMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: fetchQuoteErrorMessage,
        className: "py-3 px-4",
      });
    }
  }, [fetchQuoteErrorMessage, toast]);
}
