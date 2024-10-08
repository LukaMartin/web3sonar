import Image from "next/image";
import { CryptoNewsData } from "../../types/news/cryptoNewsData";

type CryptoNewsCardContainerProps = {
  data: CryptoNewsData[];
};

const shortenNewsTitle = (headline: string) => {
  return headline.length > 65 ? headline.substring(0, 65) + "..." : headline;
};

const shortenNewsSource = (source: string) => {
  return source.includes("The") ? source.substring(3, source.length) : source;
};

export default function CryptoNewsCardContainer({
  data,
}: CryptoNewsCardContainerProps) {
  return (
    <div className="flex flex-wrap gap-8">
      {data.map((article) => {
        return (
          <div
            key={article.title}
            className="flex flex-col justify-between p-6 flex-1 basis-80 max-w-[475px] sm:max-w-[48%] max-h-[450px] bg-white/[3%] rounded-md shadow-[0_7px_5px_rgba(2,2,2,1)] transition hover:scale-[1.025] overflow-hidden"
          >
            <a href={article.news_url} target="_blank">
              <p className="mb-4 font-semibold hover:text-white/70">
                {shortenNewsTitle(article.title)}
              </p>
            </a>
            <div>
              <a href={article.news_url} target="_blank">
                <Image
                  unoptimized
                  src={article.image_url}
                  alt="News article image"
                  height={350}
                  width={500}
                  className="rounded-md mb-6 mt-2 object-cover"
                />
              </a>
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
  );
}
