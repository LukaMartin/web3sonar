import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chains } from "@/lib/constants";
import { useTokenExchangeStore } from "@/stores/token-exchange-store";
import Image from "next/image";

export default function ChainSelectTo() {
  const toChain = useTokenExchangeStore((state) => state.toChain);
  const setToChain = useTokenExchangeStore((state) => state.setToChain);
  const setQuote = useTokenExchangeStore((state) => state.setQuote);

  return (
    <Select
      onValueChange={(value) => {
        setToChain(value);
        setQuote(null);
      }}
      value={toChain}
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
