"use client";

import { Line } from "@nivo/line";

type CryptoMarketcapChartProps = {
  newDataArray: any;
};

const convertInputPrice = (item: { item: string }) => {
  return "$" + Number(item) / 1000000000000 + "T";
};

export default function CryptoMarketcapChart({
  newDataArray,
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
  };

  return (
    <section>
      <h2 className="text-white/85 text-lg mt-[7.5rem] mb-4">
        Total crypto market cap (USD)
      </h2>
      <div className="flex bg-white/[2%] border-[1px] border-white/20 rounded-md w-full shadow-[0_7px_7px_rgba(2,2,2,1)]">
        <Line
          axisBottom={{
            format: "%b %d",
            legendOffset: -12,
            tickValues: "every 30 days",
          }}
          axisLeft={{
            format: (item) => convertInputPrice(item),
          }}
          data={[
            {
              data: newDataArray,
              id: "Market cap",
            },
          ]}
          margin={{
            bottom: 60,
            left: 70,
            right: 20,
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
          height={500}
          width={1200}
          pointSize={0}
          lineWidth={3}
          colors={["#a4f839"]}
          theme={theme}
          enableSlices="x"
          enableTouchCrosshair
          defs={[
            {
              id: "gradientC",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#fff" },
                { offset: 100, color: "#000" },
              ],
            },
          ]}
          fill={[{ match: "*", id: "gradientC" }]}
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
                {slice.points.map((point) => (
                  <>
                    <div key={point.data.xFormatted}>
                      {point.data.xFormatted}
                    </div>
                    <div>
                      $
                      {(Number(point.data.yFormatted) / 1000000000000).toFixed(
                        3
                      )}{" "}
                      T
                    </div>
                  </>
                ))}
              </div>
            );
          }}
        />
      </div>
    </section>
  );
}
