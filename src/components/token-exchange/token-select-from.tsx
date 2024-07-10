import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chains } from "@/lib/constants";
import { ChainTokens } from "@/lib/types";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TokenSelectFrom() {
  const fromToken = useTokenExchangeStore((state) => state.fromToken);
  const setFromToken = useTokenExchangeStore((state) => state.setFromToken);
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const [tokens, setTokens] = useState<ChainTokens[]>([]);

  useEffect(() => {
    chains.forEach((chain) => {
      if (chain.name === fromChain) {
        setTokens(chain.tokens);
      }
    });
  }, [fromChain]);

  return (
    <Select
      onValueChange={setFromToken}
      value={fromToken}
      disabled={!fromChain}
    >
      <SelectTrigger className="w-[42%] h-14 bg-white/[4%] border-white/20">
        <SelectValue placeholder="Token" />
      </SelectTrigger>
      <SelectContent>
        {tokens.map((token) => {
          return (
            <SelectItem value={token.tokenAddress} key={token.tokenAddress}>
              <div className="flex items-center gap-x-2 text-base">
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
