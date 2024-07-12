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

export default function TokenExchange() {
  return (
    <>
      <main className="hidden xl:block mb-20">
        <DynamicTokenExchangeInterface />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
