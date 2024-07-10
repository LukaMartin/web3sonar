import useFetchEthPrice from "@/hooks/useFetchEthPrice";
import { wethAddresses } from "@/lib/constants";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useEffect, useState } from "react";

type TokenExchangeInputProps = {
  inputRef: any;
};

export default function TokenExchangeInput({
  inputRef,
}: TokenExchangeInputProps) {
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const fromAmount = useTokenExchangeStore((state) => state.fromAmount);
  const setFromAmount = useTokenExchangeStore((state) => state.setFromAmount);
  const [input, setInput] = useState(0);
  const ethPrice = useFetchEthPrice();
  let fromUsd = 0;
  if (
    (fromAmount && fromToken === "ETH") ||
    wethAddresses.includes(fromToken)
  ) {
    fromUsd = fromAmount * ethPrice;
  } else if (fromAmount && fromToken) {
    fromUsd = fromAmount;
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => setFromAmount(input), 700);
    return () => clearTimeout(timeOutId);
  }, [input, setFromAmount]);

  return (
    <>
      <input
        onChange={(e) => setInput(Number(e.target.value))}
        type="number"
        className="h-14 border-white/20 border-[1px] bg-white/[4%] rounded-md mx-6 pl-2 text-xl"
        placeholder="0"
        ref={inputRef}
        required
      />
      {fromAmount ? (
        <p className="text-sm text-white/50 pl-6 pt-1">${fromUsd.toFixed(2)}</p>
      ) : (
        <p className="text-sm text-white/50 pl-6 pt-1">$0</p>
      )}
    </>
  );
}
