import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chains } from "@/constants/chains";
import { getChainName } from "@/utils/getChainName";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function ChainSelectFrom() {
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const setFromChain = useTokenExchangeStore((state) => state.setFromChain);
  const setQuote = useTokenExchangeStore((state) => state.setQuote);
  const { isConnected, chainId } = useAccount();
  const { connected } = useWallet();

  useEffect(() => {
    if (isConnected) {
      setFromChain(getChainName(chainId) || "");
    } else if (connected && !isConnected) {
      setFromChain("SOL");
    }
  }, [isConnected, connected, chainId, setFromChain]);

  return (
    <Select
      onValueChange={(value) => {
        setFromChain(value);
        setQuote(null);
      }}
      value={fromChain}
    >
      <SelectTrigger className="w-[47%] h-10 bg-gray-950 border-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-white/10">
        <SelectValue placeholder="Chain" />
      </SelectTrigger>
      <SelectContent className="bg-gray-950 border-none outline-none">
        {chains.map((chain) => {
          return (
            <SelectItem value={chain.name} key={chain.id}>
              <div className="flex items-center gap-x-2">
                <Image
                  src={chain.logo}
                  alt="Chain Logo"
                  height={25}
                  width={25}
                />
                {chain.name}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
