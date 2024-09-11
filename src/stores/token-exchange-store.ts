import { Quote } from "@/lib/token-exchange-quote-types";
import { TokenExchangeResult } from "@/lib/token-exchange-result-types";
import { checkAndSetAllowance, getStatus } from "@/lib/utils";
import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { JsonRpcSigner, decodeBase64 } from "ethers";
import { create } from "zustand";

type Store = {
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  destinationAddress: string | `0x${string}` | null;
  txResult: TokenExchangeResult | null;
  awaitingConfirmation: boolean;
  settingAllowance: boolean;
  quote: Quote | null;
  isLoading: boolean;
  insufficientFunds: boolean;
  fetchQuoteErrorMessage: string;
  allowanceErrorMessage: string;
  transactionErrorMessage: string;
  lastWalletConnection: string;
  showMoreInfo: boolean;
  setFromChain: (chain: string) => void;
  setToChain: (chain: string) => void;
  setFromToken: (token: string) => void;
  setToToken: (token: string) => void;
  setFromAmount: (amount: number) => void;
  setDestinationAddress: (address: string | `0x${string}`) => void;
  setTxResult: (result: TokenExchangeResult | null) => void;
  setAwaitingConfirmation: (value: boolean) => void;
  setSettingAllowance: (value: boolean) => void;
  setLastWalletConnection: (chain: string) => void;
  setQuote: (quote: Quote | null) => void;
  setShowMoreInfo: (value: boolean) => void;
  fetchQuote: (address: `0x${string}`, fromAmount: number) => void;
  fetchQuoteSol: (address: `0x${string}` | string, fromAmount: number) => void;
  exchangeTokens: (
    txSigner: JsonRpcSigner | undefined,
    clearInput: () => void
  ) => void;
  exchangeTokensSol: (
    publicKey: PublicKey,
    sendTransaction: (
      transaction: VersionedTransaction | Transaction,
      connection: Connection,
      options?: SendTransactionOptions
    ) => Promise<TransactionSignature>,
    signTransaction:
      | (<T extends VersionedTransaction | Transaction>(
          transaction: T
        ) => Promise<T>)
      | undefined,
    connection: Connection,
    clearInput: () => void
  ) => void;
};
export const useTokenExchangeStore = create<Store>((set, get) => ({
  fromChain: "",
  toChain: "",
  fromToken: "",
  toToken: "",
  fromAmount: 0,
  destinationAddress: null,
  fromAddress: "",
  txResult: null,
  awaitingConfirmation: false,
  settingAllowance: false,
  quote: null,
  isLoading: false,
  insufficientFunds: false,
  fetchQuoteErrorMessage: "",
  allowanceErrorMessage: "",
  transactionErrorMessage: "",
  lastWalletConnection: "",
  showMoreInfo: false,
  setFromChain: (chain: string) => {
    set(() => ({
      fromChain: chain,
    }));
  },
  setToChain: (chain: string) => {
    set(() => ({
      toChain: chain,
    }));
  },
  setFromToken: (token: string) => {
    set(() => ({
      fromToken: token,
    }));
  },
  setToToken: (token: string) => {
    set(() => ({
      toToken: token,
    }));
  },
  setFromAmount: (amount: number) => {
    set(() => ({
      fromAmount: amount,
    }));
  },
  setDestinationAddress(address: string | `0x${string}` | null) {
    set(() => ({
      destinationAddress: address,
    }));
  },
  setTxResult: (result: TokenExchangeResult | null) => {
    set(() => ({
      txResult: result,
    }));
  },
  setAwaitingConfirmation: (value: boolean) => {
    set(() => ({
      awaitingConfirmation: value,
    }));
  },
  setSettingAllowance: (value: boolean) => {
    set(() => ({
      settingAllowance: value,
    }));
  },
  setLastWalletConnection: (chain: string) => {
    set(() => ({
      lastWalletConnection: chain,
    }));
  },
  setQuote: (quote: Quote | null) => {
    set(() => ({
      quote: quote,
    }));
  },
  setShowMoreInfo: (value: boolean) => {
    set(() => ({
      showMoreInfo: value,
    }));
  },
  fetchQuote: async (address: `0x${string}`, fromAmount: number) => {
    set(() => ({
      isLoading: true,
    }));
    set(() => ({
      fetchQuoteErrorMessage: "",
    }));

    try {
      const response = await fetch(
        `https://li.quest/v1/quote?fromChain=${get().fromChain}&toChain=${
          get().toChain
        }&fromToken=${get().fromToken}&toToken=${
          get().toToken
        }&fromAmount=${fromAmount}&fromAddress=${address}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        set(() => ({
          fetchQuoteErrorMessage: "Error fetching quote. Please try again.",
        }));
      }

      const data = await response.json();

      if (data.message) {
        set(() => ({
          quote: data,
        }));
      } else if (!data.message) {
        set(() => ({
          quote: data,
        }));
      }

      setTimeout(() => {
        set(() => ({
          isLoading: false,
        }));
      }, 3000);
    } catch (error) {
      set(() => ({
        fetchQuoteErrorMessage: "Error fetching quote. Please try again.",
      }));
      set(() => ({
        isLoading: false,
      }));
      return;
    }
  },
  exchangeTokens: async (
    txSigner: JsonRpcSigner | undefined,
    clearInput: () => void
  ) => {
    set(() => ({
      awaitingConfirmation: true,
    }));
    set(() => ({
      txResult: null,
    }));
    set(() => ({
      allowanceErrorMessage: "",
    }));
    set(() => ({
      transactionErrorMessage: "",
    }));

    const signer = txSigner;

    if (get().fromToken !== "ETH") {
      set(() => ({
        settingAllowance: true,
      }));
      try {
        await checkAndSetAllowance({
          wallet: signer!,
          tokenAddress: get().quote!.action.fromToken.address,
          approvalAddress: get().quote!.estimate.approvalAddress,
          amount: get().fromAmount,
          fromToken: get().fromToken,
        });
        set(() => ({
          settingAllowance: false,
        }));
      } catch (error: any) {
        if (error.message.includes("user rejected")) {
          set(() => ({
            allowanceErrorMessage: "User rejected transaction.",
          }));
        } else {
          set(() => ({
            allowanceErrorMessage: "Set allowance failed. Please try again.",
          }));
        }
        set(() => ({
          awaitingConfirmation: false,
        }));
        set(() => ({
          fromAmount: 0,
        }));
        clearInput();
        return;
      }
    }

    let tx;

    try {
      tx = await signer!.sendTransaction(get().quote!.transactionRequest);
      set(() => ({
        awaitingConfirmation: false,
      }));
      await tx.wait();
    } catch (error: any) {
      if (error.message.includes("user rejected")) {
        set(() => ({
          transactionErrorMessage: "User rejected transaction.",
        }));
      } else {
        set(() => ({
          transactionErrorMessage: "Transaction failed. Please try again.",
        }));
      }
      set(() => ({
        awaitingConfirmation: false,
      }));
      set(() => ({
        fromAmount: 0,
      }));
      clearInput();
      return;
    }

    let result: TokenExchangeResult | null;

    const interval = setInterval(async () => {
      result = await getStatus({
        bridge: get().quote!.tool,
        fromChain: get().fromChain,
        toChain: get().toChain,
        txHash: tx.hash,
      });

      set(() => ({
        txResult: result,
      }));
      if (result!.status === "DONE" || result!.status === "FAILED") {
        clearInterval(interval);
      }
    }, 4000);

    setTimeout(() => {
      set(() => ({
        fromAmount: 0,
      }));
      clearInput();
    }, 5000);
  },
  fetchQuoteSol: async (
    fromAddress: `0x${string}` | string,
    fromAmount: number
  ) => {
    set(() => ({
      isLoading: true,
    }));
    set(() => ({
      fetchQuoteErrorMessage: "",
    }));

    try {
      if (get().destinationAddress === "") {
        return;
      }

      const response = await fetch(
        `https://li.quest/v1/quote?fromChain=${get().fromChain}&toChain=${
          get().toChain
        }&fromToken=${get().fromToken}&toToken=${
          get().toToken
        }&fromAddress=${fromAddress}&toAddress=${
          get().fromChain === "SOL" && get().toChain === "SOL"
            ? fromAddress
            : get().destinationAddress
        }&fromAmount=${fromAmount}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        set(() => ({
          fetchQuoteErrorMessage: "Error fetching quote. Please try again.",
        }));
      }

      const data = await response.json();

      if (data.message) {
        set(() => ({
          quote: data,
        }));
      } else if (!data.message) {
        set(() => ({
          quote: data,
        }));
      }

      setTimeout(() => {
        set(() => ({
          isLoading: false,
        }));
      }, 3000);
    } catch (error) {
      set(() => ({
        fetchQuoteErrorMessage: "Error fetching quote. Please try again.",
      }));
      set(() => ({
        isLoading: false,
      }));
      return;
    }
  },
  exchangeTokensSol: async (
    publicKey: PublicKey,
    sendTransaction: (
      transaction: VersionedTransaction | Transaction,
      connection: Connection,
      options?: SendTransactionOptions
    ) => Promise<TransactionSignature>,
    signTransaction:
      | (<T extends VersionedTransaction | Transaction>(
          transaction: T
        ) => Promise<T>)
      | undefined,
    connection: Connection,
    clearInput: () => void
  ) => {
    let signature: string;

    const quote = get().quote;

    try {
      if (!publicKey) throw new Error("No public key");
      if (!signTransaction)
        throw new Error("No sign transaction function param");
      if (!quote) throw new Error("No quote");

      set(() => ({
        awaitingConfirmation: true,
      }));
      set(() => ({
        txResult: null,
      }));
      set(() => ({
        allowanceErrorMessage: "",
      }));
      set(() => ({
        transactionErrorMessage: "",
      }));

      const decodedTx = decodeBase64(quote.transactionRequest.data.toString());

      const deserializedTx = VersionedTransaction.deserialize(decodedTx);

      signature = await sendTransaction(deserializedTx, connection, {
        skipPreflight: true,
        maxRetries: 5,
      });

      set(() => ({
        awaitingConfirmation: false,
      }));
    } catch (error: any) {
      if (error.message.includes("user rejected")) {
        set(() => ({
          transactionErrorMessage: "User rejected transaction.",
        }));
      } else {
        set(() => ({
          transactionErrorMessage: "Transaction failed. Please try again.",
        }));
      }
      set(() => ({
        awaitingConfirmation: false,
      }));
      set(() => ({
        fromAmount: 0,
      }));
      clearInput();
      return;
    }

    let result: TokenExchangeResult | null;

    const interval = setInterval(async () => {
      result = await getStatus({
        bridge: get().quote!.tool,
        fromChain: get().fromChain,
        toChain: get().toChain,
        txHash: signature,
      });

      set(() => ({
        txResult: result,
      }));
      if (result!.status === "DONE" || result!.status === "FAILED") {
        clearInterval(interval);
      }
    }, 4000);

    setTimeout(() => {
      set(() => ({
        fromAmount: 0,
      }));
      clearInput();
    }, 5000);
  },
}));
