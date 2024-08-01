import HomePageCard from "@/components/home-page-card";
import marketInsightsImage from "../../public/market-insights.png";
import portfolioTrackerImage from "../../public/portfolio-tracker.jpg";
import newsImage from "../../public/news.jpg";
import tokenExchangeImage from "../../public/token-exchange.jpg";
import gasDashboardImage from "../../public/gas-dashboard.png";
import MobileLandingPage from "@/components/mobile-landing-page";

const marketInsights = {
  title: "Market Insights",
  description:
    "View up to date data on the overall performance of the crypto market",
  image: marketInsightsImage,
  path: "/market-insights",
};

const portfolioTracker = {
  title: "Portfolio Tracker",
  description: "Coming soon...",
  image: portfolioTrackerImage,
  path: "/portfolio-tracker",
};

const news = {
  title: "News",
  description: "Read up on the latest web3 news and key ecenomic events",
  image: newsImage,
  path: "/news",
};

const tokenExchange = {
  title: "Token Exchange",
  description: "Easily bridge your tokens across EVM blockchains",
  image: tokenExchangeImage,
  path: "/token-exchange",
};

const gasDashboard = {
  title: "Gas Dashboard",
  description:
    "Monitor fees on the Ethereum blockchain and simualte your transactions",
  image: gasDashboardImage,
  path: "/gas-dashboard",
};

export default function Home() {
  return (
    <>
      <main className="hidden xl:flex flex-col mb-20 px-4 md:px-8">
        <div className="flex justify-between">
          <h1 className="text-[51px] font-semibold w-[30%]">
            Navigate through the world of Web3
          </h1>
          <HomePageCard
            cardDetails={marketInsights}
            className="animate-fadeInSlideUpFast"
          />
          <HomePageCard
            cardDetails={portfolioTracker}
            className="animate-fadeInSlideUpFast"
          />
        </div>

        <div className="flex justify-between mt-10">
          <HomePageCard
            cardDetails={news}
            className="animate-fadeInSlideUpSlow"
          />
          <HomePageCard
            cardDetails={tokenExchange}
            className="animate-fadeInSlideUpSlow"
          />
          <HomePageCard
            cardDetails={gasDashboard}
            className="animate-fadeInSlideUpSlow"
          />
        </div>
      </main>

      <main className="xl:hidden">
        <MobileLandingPage />
      </main>
    </>
  );
}
