import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useDebouncedCallback } from "use-debounce";

export default function DestinationAddressInput() {
  const setDestinationAddress = useTokenExchangeStore(
    (state) => state.setDestinationAddress
  );
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const visible =
    (fromChain === "SOL" && toChain !== "SOL" && toChain !== "") ||
    (fromChain !== "SOL" && toChain == "SOL" && fromChain !== "");

  const debounced = useDebouncedCallback((value) => {
    setDestinationAddress(value);
  }, 800);

  return (
    <>
      {visible && (
        <label
          htmlFor="destination-address"
          className="text-white/80 text-xl pl-6 py-4"
        >
          Destination Address
        </label>
      )}
      {visible && (
        <input
          id="destination-address"
          name="destinatiom-address"
          type="text"
          className="h-10 bg-white/[4%] rounded-md mx-6 pl-2 text-sm outline-none focus:ring-1 ring-white"
          onChange={(e) => debounced(e.target.value)}
          autoComplete="off"
          required
        />
      )}
    </>
  );
}
