import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chains } from "@/lib/constants";
import Image from "next/image";

type ChainSelectToProps = {
  setToChain: (chain: string) => void;
  toChain: string;
};

export default function ChainSelectTo({
  setToChain,
  toChain,
}: ChainSelectToProps) {
  return (
    <Select onValueChange={setToChain} value={toChain}>
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
