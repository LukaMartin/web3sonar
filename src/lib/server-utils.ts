"use server";

import {
  NewsEvent,
  SimulateTransactionParameters,
  TokenMetricsMarketCapData,
} from "./types";
import { BlockPricesParameter } from "./types";
import { findChainId } from "./utils";

export async function fetchEthPrice() {
  const response = await fetch(
    "https://api.coinbase.com/v2/prices/ETH-USD/spot",
    {
      next: {
        revalidate: 120,
      },
    }
  );

  const data = await response.json();

  return data.data.amount;
}

export async function fetchBlockValues() {
  const response = await fetch(
    "https://api.blocknative.com/gasprices/blockprices",
    {
      method: "GET",
      headers: {
        Authorization: `${process.env.BLOCKNATIVE_API_KEY}`,
      },
      next: {
        revalidate: 9.5,
      },
    }
  );

  const data = await response.json();

  const maxFee = data.maxPrice;

  const baseFee = data.blockPrices.map((value: BlockPricesParameter) => {
    return Number(value.baseFeePerGas).toFixed(2);
  });
  const pendingBlockNumber = data.blockPrices.map(
    (value: BlockPricesParameter) => {
      return value.blockNumber;
    }
  );

  const pendingTransactionCount = data.blockPrices.map(
    (value: BlockPricesParameter) => {
      return value.estimatedTransactionCount;
    }
  );

  const estimatedPrices = data.blockPrices.map(
    (value: BlockPricesParameter) => {
      return value.estimatedPrices;
    }
  );

  return {
    baseFee,
    maxFee,
    pendingBlockNumber,
    pendingTransactionCount,
    estimatedPrices,
  };
}

export async function simulateTransaction({
  contractAddress,
  senderAddress,
  gasLimit,
  maxFeePerGas,
  maxPriorityFeePerGas,
  transactionValue,
  transactionInput,
}: SimulateTransactionParameters) {
  const response = await fetch("https://api.blocknative.com/simulate", {
    method: "POST",
    headers: {
      credentials: `${process.env.BLOCKNATIVE_API_KEY}:${process.env.BLOCKNATIVE_API_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system: "ethereum",
      network: "main",
      transaction: {
        to: `${contractAddress}`,
        from: `${senderAddress}`,
        gas: Number(`${gasLimit}`),
        maxFeePerGas: Number(`${maxFeePerGas}`) * 1000000000,
        maxPriorityFeePerGas: Number(`${maxPriorityFeePerGas}`) * 1000000000,
        value: Number(`${transactionValue}`) * 1000000000000000000,
        input: `${transactionInput}`,
      },
    }),
  });

  const data = await response.json();

  const failureMessage = data.msg;

  const simulatedBlockNumber = data.simulatedBlockNumber;

  const gasUsed = data.gasUsed;

  const error = data.error;

  let simulationStatus;

  if (data.msg) {
    simulationStatus = "Failed";
  } else {
    simulationStatus = "Completed";
  }

  return {
    simulatedBlockNumber,
    gasUsed,
    simulationStatus,
    failureMessage,
    error,
  };
}

export const submitTransaction = async (formData: FormData) => {
  const contractAddress = formData.get("contract-address")!;
  const senderAddress = formData.get("sender-address")!;
  const gasLimit = formData.get("gas-limit")!;
  const maxFeePerGas = formData.get("max-gas-fee")!;
  const maxPriorityFeePerGas = formData.get("max-priority-fee")!;
  const transactionValue = formData.get("transaction-value")!;
  const transactionInput = formData.get("transaction-input")!;

  const result = await simulateTransaction({
    contractAddress,
    senderAddress,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    transactionValue,
    transactionInput,
  });

  return result;
};

export const fetchCoinData = async () => {
  const response = await fetch(
    "https://deep-index.moralis.io/api/v2.2/market-data/global/market-cap",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": `${process.env.MORALIS_API_KEY}`,
      },
      next: {
        revalidate: 300,
      },
    }
  );

  const data = await response.json();

  return data;
};

export const fetchBreakoutStrategy = async () => {
  let date = new Date();
  let dateOffsetOne = 24 * 60 * 60 * 1000 * 0;
  let dateOffsetTwo = 24 * 60 * 60 * 1000 * 180;

  let dateOne = new Date(date.setTime(date.getTime() - dateOffsetOne));
  let dateTwo = new Date(date.setTime(date.getTime() - dateOffsetTwo));

  let finalDateOne = dateOne.toISOString().split("T")[0];
  let finalDateTwo = dateTwo.toISOString().split("T")[0];

  const response = await fetch(
    `https://api.tokenmetrics.com/v2/market-metrics?startDate=${finalDateTwo}&endDate=${finalDateOne}&limit=1000&page=0`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: `${process.env.TRADING_METRICS_API_KEY}`,
      },
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = await response.json();

  const highCoinsPercentage = data.data.map(
    (item: TokenMetricsMarketCapData) => {
      return item.TM_GRADE_PERC_HIGH_COINS;
    }
  );

  const newDataArray = data.data.map((item: TokenMetricsMarketCapData) => {
    return {
      x: item.DATE,
      y: Number(item.TOTAL_CRYPTO_MCAP).toFixed(0),
    };
  });

  return highCoinsPercentage;
};

export const fetchCryptoMarketCapData = async () => {
  let endDate = Date.now();
  let startDate = Date.now() - 7889229001;

  const response = await fetch(
    "https://api.livecoinwatch.com/overview/history",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": `${process.env.LIVE_COIN_WATCH_API_KEY}`,
      },
      body: JSON.stringify({
        currency: "USD",
        start: startDate,
        end: endDate,
      }),
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await response.json();

  const cryptoTotalMarketcap = data.map((item: any) => {
    return {
      x: new Date(item.date).toISOString().split("T")[0],
      y: item.cap,
    };
  });

  const altcoinTotalMarketcap = data.map((item: any) => {
    return {
      x: new Date(item.date).toISOString().split("T")[0],
      y: item.cap * (1 - item.btcDominance),
    };
  });

  return { cryptoTotalMarketcap, altcoinTotalMarketcap };
};

export const fetchFearGreed = async () => {
  const response = await fetch("https://api.alternative.me/fng/", {
    method: "GET",
    next: {
      revalidate: 3600,
    },
  });

  const data = await response.json();

  return data.data;
};

export const fetchCryptoNews = async () => {
  const generalResponse = await fetch(
    "https://cryptonews-api.com/api/v1/category?section=general&items=12&page=1&token=qglrdr1zt0jdszdtlrzrt6gsj2ipkrbgupszx00f&source=The+Block,Cointelegraph,Reuters,Coindesk,BeInCrypto,Blockworks,Decrypt,UToday,Bitcoin,Forbes,Crypto+News",
    {
      method: "GET",
      next: {
        revalidate: 300,
      },
    }
  );

  const generalNews = await generalResponse.json();

  const tokenResponse = await fetch(
    "https://cryptonews-api.com/api/v1?tickers=BTC,ETH,SOL&items=12&page=1&token=qglrdr1zt0jdszdtlrzrt6gsj2ipkrbgupszx00f&source=The+Block,Cointelegraph,Reuters,Coindesk,BeInCrypto,Blockworks,Decrypt,UToday,Bitcoin,Forbes,Crypto+News",
    {
      method: "GET",
      next: {
        revalidate: 300,
      },
    }
  );

  const tokenNews = await tokenResponse.json();

  const nftResponse = await fetch(
    "https://cryptonews-api.com/api/v1/category?section=general&items=12&topic=NFT&page=1&token=qglrdr1zt0jdszdtlrzrt6gsj2ipkrbgupszx00f",
    {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    }
  );

  const nftNews = await nftResponse.json();

  return { generalNews, tokenNews, nftNews };
};

export const fetchNewsEvents = async () => {
  const response = await fetch(
    "https://nfs.faireconomy.media/cc_calendar_thisweek.json",
    {
      method: "GET",
      next: {
        revalidate: 14400,
      },
    }
  );

  const data = await response.json();

  const filteredData = data.filter((event: NewsEvent) => {
    return event.impact === "High";
  });

  return filteredData;
};
