import { TokenMetricsMarketCapData } from "@/lib/types";

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