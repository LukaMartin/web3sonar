import { fetchEthPrice } from "@/lib/server-utils";
import { Poppins } from "next/font/google";
import { FaEthereum } from "react-icons/fa";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default async function Header() {
  const ethPrice = await fetchEthPrice();

  return (
    <header className="h-32 max-w-7xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-y-4 sm:gap-y-0 mx-auto mb-20 px-4 md:px-8 border-b border-white/10">
      <h1
        className={`${poppins.className} text-2xl xs:text-3xl md:text-4xl xl:text-5xl`}
      >
        <span className="text-accent">ETHEREUM</span> GAS TRACKER
      </h1>

      <p className="flex md:text-lg">
        <FaEthereum size={30} className="text-accent" /> $
        {Number(ethPrice).toFixed(2)}
      </p>
    </header>
  );
}
