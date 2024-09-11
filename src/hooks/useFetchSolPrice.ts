import { useEffect, useState } from "react";

export default function useFetchSolPrice() {
  const [solPrice, setSolPrice] = useState(0);

  function fetchSolPrice() {
    fetch("https://api.coinbase.com/v2/prices/SOL-USD/spot", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setSolPrice(jsonResponse.data.amount);
      });
  }

  useEffect(() => {
    fetchSolPrice();
  }, []);

  return solPrice;
}
