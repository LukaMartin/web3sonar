import useFetchEthPrice from "@/hooks/useFetchEthPrice";

type TokenExchangeInputProps = {
  fromAmount: number;
  setFromAmount: (amount: number) => void;
  fromToken: string;
  inputRef: any;
};

export default function TokenExchangeInput({
  fromAmount,
  setFromAmount,
  fromToken,
  inputRef,
}: TokenExchangeInputProps) {
  const ethPrice = useFetchEthPrice();

  let fromUsd = 0;

  if (fromAmount && fromToken === "ETH") {
    fromUsd = fromAmount * ethPrice;
  } else if (fromAmount && fromToken === "USDC") {
    fromUsd = fromAmount;
  }

  return (
    <>
      <input
        onChange={(e) => setFromAmount(Number(e.target.value))}
        type="number"
        className="h-14 border-white/20 border-[1px] bg-[#111620] rounded-md mx-6 pl-2 text-xl"
        placeholder="0"
        ref={inputRef}
        required
      />
      {fromAmount ? (
        <p className="text-sm text-white/50 pl-6 pt-1">${fromUsd.toFixed(2)}</p>
      ) : (
        <p className="my-3"></p>
      )}
    </>
  );
}
