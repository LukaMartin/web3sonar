import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tokens } from "@/lib/constants";
import Image from "next/image";

type TokenSelectToProps = {
  setToToken: (token: string) => void;
};

export default function TokenSelectTo({ setToToken }: TokenSelectToProps) {
  return (
    <Select onValueChange={setToToken} defaultValue="ETH">
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
