import { fetchEthPrice } from "@/lib/server-utils";
import { FaEthereum } from "react-icons/fa";
import Logo from "./logo";
import Link from "next/link";


export default async function Header() {
  const ethPrice = await fetchEthPrice();

  return (
    <header className="h-32 max-w-7xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-y-4 sm:gap-y-0 mx-auto mb-20 px-4 md:px-8 border-b border-white/10">
      <Link href="/"><Logo /></Link>

      <p className="flex md:text-lg">
        <FaEthereum size={30} className="text-accent" /> $
        {Number(ethPrice).toFixed(2)}
      </p>
    </header>
  );
}
