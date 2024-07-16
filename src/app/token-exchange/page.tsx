import dynamic from "next/dynamic";
import MobileLandingPage from "@/components/mobile-landing-page";
import TokenExchangeInterfaceSkeleton from "@/components/token-exchange/token-exchange-interface-skeleton";
const DynamicTokenExchangeInterface = dynamic(
  () => import("../../components/token-exchange/token-exchange-interface"),
  {
    ssr: false,
    loading: () => <TokenExchangeInterfaceSkeleton />,
  }
);
import { IoAlertCircleOutline } from "react-icons/io5";

export default function TokenExchange() {
  return (
    <>
      <main className="hidden xl:block mb-20">
        <section className="w-[375px] mx-auto -mt-10 mb-5 bg-red-500 border-white/20 border-[1px] rounded-md p-2">
          <p className="flex items-center gap-x-1 font-semibold">
            <IoAlertCircleOutline size={25} /> Alert
          </p>
          <p className="text-sm">
            {" "}
            Earlier today LI.FI was subject to a smart contract exploit. It
            affected users that had manually set infinite approvals. This is not
            possible through Web 3 Sonar.
          </p>
          <p className="text-sm">
            The situation has since been contained, It poses no further risk to
            users as reported by LI.FI. Please refer to the LI.FI{" "}
            <a
              className="underline hover:text-white/60"
              href="https://x.com/lifiprotocol/status/1813238237642608864"
              target="_blank"
            >
              Twitter
            </a>{" "}
            or{" "}
            <a
              className="underline hover:text-white/60"
              href="https://discord.com/invite/lifi"
              target="_blank"
            >
              Discord
            </a>{" "}
            for further information.
          </p>
        </section>
        <DynamicTokenExchangeInterface />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
