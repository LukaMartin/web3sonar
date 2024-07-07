import { CryptoNewsData } from "@/lib/types";
import { shortenNewsSource, shortenNewsTitle } from "@/lib/utils";
import { Image } from "@nextui-org/react";

type CryptoNewsCardContainerProps = {
    data: CryptoNewsData[]
}

export default function CryptoNewsCardContainer({ data }: CryptoNewsCardContainerProps) {
  return (
    <div className="flex flex-wrap justify-between gap-y-6">
        {data.map((article) => {
          return (
            <div
              key={article.title}
              className="flex flex-col justify-between p-6 w-[32%] h-[400px] bg-white/[2%] border-white/20 border-[1px] rounded-md shadow-[0_7px_7px_rgba(2,2,2,1)] transition hover:scale-[1.025]"
            >
              <a href={article.news_url} target="_blank">
                <p className="mb-4 text-lg hover:text-white/60">
                  {shortenNewsTitle(article.title)}
                </p>
              </a>
              <div>
                <Image
                  src={article.image_url}
                  alt="News article image"
                  height={350}
                  width={350}
                  className="rounded-md mb-6"
                />
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p>{shortenNewsSource(article.source_name)}</p>
                    <p className="text-sm text-white/60">Source</p>
                  </div>
                  <div className="flex flex-col">
                    <p>{article.date.substring(5, 16)}</p>
                    <p className="text-sm text-white/60">Date</p>
                  </div>
                  <div className="flex flex-col">
                    <p>{article.sentiment}</p>
                    <p className="text-sm text-white/60">Sentiment</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  )
}
