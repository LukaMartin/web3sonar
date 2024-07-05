import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chains } from "@/lib/constants";
import Image from "next/image";

type ChainSelectFromProps = {
  setFromChain: (chain: string) => void;
  fromChain: string;
};

export default function ChainSelectFrom({
  setFromChain,
  fromChain,
}: ChainSelectFromProps) {
  return (
    <Select onValueChange={setFromChain} value={fromChain}>
      <SelectTrigger className="w-[325px] h-14 ml-6 bg-[#111620] border-white/20">
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
                  height={35}
                  width={35}
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
