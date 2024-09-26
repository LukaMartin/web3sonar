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
