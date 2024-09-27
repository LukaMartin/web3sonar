"use client";

import { reverseDate } from "@/utils/reverseDate";
import { Line } from "@nivo/line";
import { CryptoMarketcapData } from "../../types/market-insights/cryptoMarketcapData";

type CryptoMarketcapChartProps = {
  cryptoTotalMarketCap: CryptoMarketcapData[];
  altcoinTotalMarketcap: CryptoMarketcapData[];
};

const convertInputPrice = (item: { item: string }) => {
  return "$" + Number(item) / 1000000000000 + "T";
};

export default function CryptoMarketcapChart({
  cryptoTotalMarketCap,
  altcoinTotalMarketcap,
}: CryptoMarketcapChartProps) {
  const theme = {
    axis: {
      ticks: {
        text: {
          fill: "rgba(255 255 255 / 0.75)",
        },
      },
    },
    tooltip: {
      container: {
        color: "rgba(3 17 18 / 1)",
        background: "rgba(255 255 255 / 0.75)",
      },
    },
    text: {
      fontSize: 13,
      fontFamily: "Inter",
    },
  };

  return (
    <section>
      <h2 className="text-white/85 text-lg mt-[5rem] mb-4">
        Crypto Market Cap (USD)
      </h2>

      <div className="flex bg-white/[3%] rounded-md w-full shadow-[0_7px_5px_rgba(2,2,2,1)]">
        <Line
          axisBottom={{
            format: "%b %d",
            tickValues: "every 7 days",
          }}
          axisLeft={null}
          axisRight={{
            format: (item) => convertInputPrice(item),
          }}
          data={[
            {
              data: altcoinTotalMarketcap,
              id: "Altcoin Market Cap",
            },
            {
              data: cryptoTotalMarketCap,
              id: "Total Market Cap",
            },
          ]}
          margin={{
            bottom: 80,
            left: 45,
            right: 70,
            top: 40,
          }}
          curve="monotoneX"
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: "%Y-%m-%d",
            precision: "day",
            type: "time",
            useUTC: false,
          }}
          height={550}
          width={1200}
          pointSize={0}
          lineWidth={3}
          colors={["#FACC15", "#16A34A"]}
          theme={theme}
          enableSlices="x"
          enableTouchCrosshair
          defs={[
            {
              colors: [
                {
                  color: "inherit",
                  offset: 0,
                },
                {
                  color: "inherit",
                  offset: 100,
                  opacity: 0,
                },
              ],
              id: "gradientA",
              type: "linearGradient",
            },
          ]}
          fill={[
            {
              id: "gradientA",
              match: "*",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 60,
              itemTextColor: "rgba(255, 255, 255, 0.75)",
              itemsSpacing: 75,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 1,
              symbolSize: 16,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
            },
          ]}
          enableArea
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: "rgba(255 255 255 / 0.9)",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                  color: "rgba(3 17 18 / 1)",
                  fontWeight: "bold",
                }}
              >
                <>
                  <div>
                    {reverseDate(slice.points[0].data.xFormatted as string)}
                  </div>
                  <div>
                    Total Market Cap: $
                    {(
                      Number(slice.points[0].data.yFormatted) / 1000000000000
                    ).toFixed(2)}
                    T
                  </div>
                  <div>
                    Altcoin Market Cap: $
                    {(
                      Number(slice.points[1].data.yFormatted) / 1000000000000
                    ).toFixed(2)}
                    T
                  </div>
                </>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
}
