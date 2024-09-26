"use client";

import { ResponsivePie } from "@nivo/pie";
import { Tooltip } from "@nextui-org/react";
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
      value: Number(highCoinsPercentage).toFixed(2),
      color: "#16A34A",
    },
    {
      id: "Bearish",
      label: "Bearish",
      value: Number(100 - highCoinsPercentage).toFixed(2),
      color: "#DC2626",
    },
  ];

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex gap-x-3 items-center mb-4">
          <h3 className="text-lg text-white/85">Breakout Strategy</h3>
          <Tooltip
            showArrow={true}
            content="The breakout strategy represents the proportion of the top 300 coins by market cap, that are trading above or below their monthly highs and lows. This data is provided by Token Metrics."
            classNames={{
              base: ["before:bg-neutral-400 dark:before:bg-white max-w-96"],
              content: [
                "py-2 px-4 shadow-xl",
                "text-gray-950 font-semibold bg-gradient-to-br from-white to-neutral-400",
              ],
            }}
          >
            <div>
              <FiInfo size={23} className="text-white/75 mt-1" />
            </div>
          </Tooltip>
        </div>
        <div className="flex gap-x-2 mb-3">
          <div className="flex items-center gap-x-1">
            <div className="h-4 w-4 rounded-full bg-[#16A34A]" />
            <p className="text-sm">Bullish</p>
          </div>
          <div className="flex items-center gap-x-1">
            <div className="h-4 w-4 rounded-full bg-[#DC2626]" />
            <p className="text-sm">Bearish</p>
          </div>
        </div>
      </div>
      <div className="relative bg-white/[3%] rounded-md h-[16rem] w-full shadow-[0_7px_5px_rgba(2,2,2,1)]">
        <ResponsivePie
          data={data}
          theme={{
            text: {
              fontSize: 14,
              fontFamily: "Inter",
            },
          }}
          margin={{ top: 30, right: 70, bottom: 30, left: 70 }}
          innerRadius={0.7}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          enableArcLabels={false}
          arcLinkLabelsThickness={3}
          arcLinkLabelsDiagonalLength={5}
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
          tooltip={({ datum: { id, value } }) => (
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
