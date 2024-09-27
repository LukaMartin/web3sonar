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
