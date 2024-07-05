import { useEffect, useState } from "react";

export default function useFetchEthPrice() {
  const [ethPrice, setEthPrice] = useState(0);

  function fetchEthPrice() {
    fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setEthPrice(jsonResponse.data.amount);
      });
  }

  useEffect(() => {
    fetchEthPrice();
  }, []);

  return ethPrice;
}
