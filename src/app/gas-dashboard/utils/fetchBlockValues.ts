import { BlockPricesParameter } from "../../../lib/types";

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