import { Quote } from "@/lib/token-exchange-quote-types";
import { TokenExchangeResult } from "@/lib/token-exchange-result-types";
import { checkAndSetAllowance, getStatus } from "@/lib/utils";
import { JsonRpcSigner } from "ethers";
import { create } from "zustand";

type Store = {
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  txResult: TokenExchangeResult | null;
  awaitingConfirmation: boolean;
  settingAllowance: boolean;
  quote: Quote | null;
  isLoading: boolean;
  insufficientFunds: boolean;
  fetchQuoteErrorMessage: string;
  allowanceErrorMessage: string;
  transactionErrorMessage: string;
  setFromChain: (chain: string) => void;
  setToChain: (chain: string) => void;
  setFromToken: (token: string) => void;
  setToToken: (token: string) => void;
  setFromAmount: (amount: number) => void;
  setTxResult: (result: TokenExchangeResult | null) => void;
  setAwaitingConfirmation: (value: boolean) => void;
  setSettingAllowance: (value: boolean) => void;
  fetchQuote: (address: `0x${string}`, fromAmount: number) => void;
  exchangeTokens: (
    txSigner: JsonRpcSigner | undefined,
    clearInput: () => void
  ) => void;
};
export const useTokenExchangeStore = create<Store>((set, get) => ({
  fromChain: "",
  toChain: "",
  fromToken: "",
  toToken: "",
  fromAmount: 0,
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
  fetchQuote: async (address: `0x${string}`, fromAmount: number) => {
    set(() => ({
      isLoading: true,
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
        throw new Error();
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
        if (error.message.includes("user rejected action")) {
          set(() => ({
            transactionErrorMessage: "User rejected transaction.",
          }));
        } else {
          set(() => ({
            allowanceErrorMessage: "Set allowance failed. Please try again.",
          }));
        }
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
      if (error.message.includes("user rejected action")) {
        set(() => ({
          transactionErrorMessage: "User rejected transaction.",
        }));
      } else {
        set(() => ({
          transactionErrorMessage: "Transaction failed. Please try again.",
        }));
      }
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
}));
