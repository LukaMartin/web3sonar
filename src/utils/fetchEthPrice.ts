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
