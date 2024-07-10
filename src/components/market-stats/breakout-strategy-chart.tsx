"use client";

import { ResponsivePie } from "@nivo/pie";
import { Tooltip } from "react-tooltip";
import { FiInfo } from "react-icons/fi";

type BreakOutStrategyChartProps = {
  highCoinsPercentage: number;
};

export default function BreakoutStrategyChart({
  highCoinsPercentage,
}: BreakOutStrategyChartProps) {
  const data = [
    {
      id: "Bullish",
      label: "Bullish",
      value: highCoinsPercentage,
      color: "#16A34A",
    },
    {
      id: "Bearish",
      label: "Bearish",
      value: 100 - highCoinsPercentage,
      color: "#DC2626",
    },
  ];

  return (
    <section>
      <div className="flex gap-x-3">
        <h3 className="text-lg text-white/85 mb-4">Breakout Strategy</h3>
        <a id="breakout-strategy" data-tooltip-place="top">
          <FiInfo size={23} className="text-white/75 mt-1" />
        </a>
        <Tooltip
          className="max-w-80"
          anchorSelect="#breakout-strategy"
          content="The breakout strategy represents the proportion of the top 300 coins by market cap, that are trading above or below their monthly highs and lows. This data is provided by Token Metrics."
        />
      </div>
      <div className="relative bg-white/[3%] border-[1px] border-white/20 rounded-md h-[16rem] w-full shadow-[0_7px_7px_rgba(2,2,2,1)]">
        <ResponsivePie
          data={data}
          theme={{
            text: {
              fontSize: 14,
              fontFamily: "Inter",
            },
          }}
          margin={{ top: 30, right: 60, bottom: 30, left: 60 }}
          innerRadius={0.7}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          enableArcLabels={false}
          arcLinkLabelsThickness={3}
          arcLinkLabelsDiagonalLength={10}
          arcLinkLabelsTextColor={"rgba(255, 255, 255, 0.75)"}
          arcLinkLabel={(d) => `${d.value}%`}
          arcLinkLabelsColor={{
            from: "color",
          }}
          colors={{ datum: "data.color" }}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          legends={[
            {
              anchor: "left",
              direction: "column",
              justify: false,
              translateX: -40,
              translateY: -85,
              itemsSpacing: 6,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "rgba(255, 255, 255, 0.75)",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
            },
          ]}
          tooltip={({ datum: { id, value, color } }) => (
            <div
              style={{
                padding: 12,
                color: "#030712",
                background: "rgba(255 255 255 / 0.9)",
              }}
            >
              <strong>
                {id}: {value}%
              </strong>
            </div>
          )}
        />
      </div>
    </section>
  );
}
