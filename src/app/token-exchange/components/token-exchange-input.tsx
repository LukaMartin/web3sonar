import useFetchEthPrice from "@/hooks/useFetchEthPrice";
import useFetchSolPrice from "@/hooks/useFetchSolPrice";
import { wethAddresses } from "@/lib/constants";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useDebouncedCallback } from "use-debounce";

type TokenExchangeInputProps = {
  inputRef: any;
};

export default function TokenExchangeInput({
  inputRef,
}: TokenExchangeInputProps) {
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const setFromAmount = useTokenExchangeStore((state) => state.setFromAmount);
  const ethPrice = useFetchEthPrice();
  const solPrice = useFetchSolPrice();
  let fromUsd = 0;
  if (
    (fromAmount && fromToken === "ETH") ||
    wethAddresses.includes(fromToken)
  ) {
    fromUsd = fromAmount * ethPrice;
  } else if (fromAmount && fromToken && fromToken !== "SOL") {
    fromUsd = fromAmount;
  } else if (fromAmount && fromToken === "SOL") {
    fromUsd = fromAmount * solPrice;
  }

  const debounced = useDebouncedCallback((value) => {
    setFromAmount(value);
  }, 1000);

  return (
    <>
      <input
        onChange={(e) => debounced(Number(e.target.value))}
        type="number"
        className="h-10 bg-transparent px-4 text-2xl outline-none text-right"
        placeholder="0.00"
        ref={inputRef}
        required
      />
      {fromAmount ? (
        <p className="text-sm text-right text-white/50 -mt-4 mr-4 pb-2">
          ${fromUsd.toFixed(2)}
        </p>
      ) : (
        <p className="text-sm text-right text-white/50 -mt-4 mr-4 pb-2">$0</p>
      )}
    </>
  );
}
