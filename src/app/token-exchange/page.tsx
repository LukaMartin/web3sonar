import dynamic from 'next/dynamic';
import MobileLandingPage from "@/components/mobile-landing-page";
import TokenExchangeInterfaceSkeleton from '@/components/token-exchange/token-exchange-interface-skeleton';
const DynamicTokenExchangeInterface = dynamic(() => import("../../components/token-exchange/token-exchange-interface"), {
  ssr: false,
  loading: () => <TokenExchangeInterfaceSkeleton />
})

export default function TokenExchangeJumper() {
  return (
    <>
      <main className="hidden xl:block">
        <DynamicTokenExchangeInterface />
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
