import Image from "next/image";
import { HomePageCardDetails } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

type HomePageCardProps = {
  cardDetails: HomePageCardDetails;
  className?: string;
};

export default function HomePageCard({
  cardDetails,
  className,
}: HomePageCardProps) {
  return (
    <section
      className={cn(
        "w-[30%] bg-white/[3%] flex flex-col justify-between border-white/20 border-[1px] rounded-md shadow-[0_7px_7px_rgba(2,2,2,1)] transition hover:scale-[1.02]",
        className
      )}
    >
      <div>
        <Link href={cardDetails.path} className={`${cardDetails.title === "Portfolio Tracker" && "pointer-events-none"}`}>
          <h2 className="text-2xl font-semibold text-white/90 p-4">
            {cardDetails.title}
          </h2>
        </Link>
        <p className="text-white/75 px-4">{cardDetails.description}</p>
      </div>
      <div className="h-[200px] relative">
        <Link href={cardDetails.path} className={`${cardDetails.title === "Portfolio Tracker" && "pointer-events-none"}`}>
          <Image
            src={cardDetails.image}
            alt="market insights image"
            className="pt-4 rounded-b-md"
            fill
          />
        </Link>
      </div>
    </section>
  );
}
