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
  
  return (
    <Select onValueChange={setToChain} value={toChain}>
      <SelectTrigger className="w-[55%] h-14 bg-white/[4%] border-white/20">
        <SelectValue placeholder="Select chain" />
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => {
          return (
            <SelectItem value={chain.name} key={chain.id}>
              <div className="flex items-center gap-x-4">
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
