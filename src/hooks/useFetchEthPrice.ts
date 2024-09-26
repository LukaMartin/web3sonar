import { useEffect, useState } from "react";
import { fetchEthPrice } from "@/lib/utils/fetchEthPrice";

export default function useFetchEthPrice() {
  const [ethPrice, setEthPrice] = useState(0);

  const fetchPrice = async () => {
    const price = await fetchEthPrice();
    setEthPrice(price);
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return ethPrice;
}
