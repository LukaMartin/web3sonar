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
