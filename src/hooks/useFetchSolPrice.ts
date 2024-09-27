import { fetchSolPrice } from "@/utils/fetchSolPrice";
import { useEffect, useState } from "react";

export default function useFetchSolPrice() {
  const [solPrice, setSolPrice] = useState(0);

  const fetchPrice = async () => {
    const price = await fetchSolPrice();
    setSolPrice(price);
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return solPrice;
}
