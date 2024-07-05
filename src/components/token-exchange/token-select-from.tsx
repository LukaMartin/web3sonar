import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tokens } from "@/lib/constants";
import Image from "next/image";

type TokenSelectFromProps = {
  setFromToken: (token: string) => void;
};

export default function TokenSelectFrom({
  setFromToken,
}: TokenSelectFromProps) {
  return (
    <Select onValueChange={setFromToken} defaultValue="ETH">
      <SelectTrigger className="w-[125px] h-8 bg-[#111620] border-white/20">
        <SelectValue placeholder="Token" />
      </SelectTrigger>
      <SelectContent>
        {tokens.map((token) => {
          return (
            <SelectItem value={token.name} key={token.name}>
              <div className="flex items-center gap-x-2 text-base">
                <Image
                  src={token.logo}
                  alt="Chain Logo"
                  height={23}
                  width={23}
                />
                {token.name}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
