import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chains } from "@/constants/chains";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChainTokens } from "../../types/token-exchange/chainTokens";

export default function TokenSelectTo() {
  const toToken = useTokenExchangeStore((state) => state.toToken);
  const setToToken = useTokenExchangeStore((state) => state.setToToken);
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const setQuote = useTokenExchangeStore((state) => state.setQuote);
  const [tokens, setTokens] = useState<ChainTokens[]>([]);

  useEffect(() => {
    chains.forEach((chain) => {
      if (chain.name === toChain) {
        setTokens(chain.tokens);
      }
    });
  }, [toChain]);

  return (
    <Select
      onValueChange={(value) => {
        setToToken(value);
        setQuote(null);
      }}
      value={toToken}
      disabled={!toChain}
    >
      <SelectTrigger className="w-[47%] h-10 bg-gray-950 border-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-white/10">
        <SelectValue placeholder="Token" />
      </SelectTrigger>
      <SelectContent className="bg-gray-950 border-none outline-none">
        {tokens.map((token) => {
          return (
            <SelectItem value={token.tokenAddress} key={token.tokenAddress}>
              <div className="flex items-center gap-x-2">
                <Image
                  src={token.logo}
                  alt="Chain Logo"
                  height={23}
                  width={23}
                />
                {token.symbol}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
