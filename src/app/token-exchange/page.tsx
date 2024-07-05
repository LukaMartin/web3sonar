import MobileLandingPage from "@/components/mobile-landing-page";
import TokenExchangeInterface from "../../components/token-exchange/token-exchange-interface";

export default function TokenExchangeJumper() {
  return (
    <>
      <main className="hidden xl:block">
        <TokenExchangeInterface />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
