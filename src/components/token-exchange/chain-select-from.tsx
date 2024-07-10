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

export default function ChainSelectFrom() {
  const fromChain = useTokenExchangeStore((state) => state.fromChain);
  const setFromChain = useTokenExchangeStore((state) => state.setFromChain);
  
  return (
    <Select onValueChange={setFromChain} value={fromChain}>
      <SelectTrigger className="w-[55%] h-14 bg-[#111620] border-white/20">
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
