export async function fetchSolPrice() {
  const response = await fetch(
    "https://api.coinbase.com/v2/prices/SOL-USD/spot",
    {
      method: "GET",
      next: {
        revalidate: 120,
      },
    }
  );

  const data = await response.json();

  return data.data.amount;
}
