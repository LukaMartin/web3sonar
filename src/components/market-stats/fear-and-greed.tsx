"use client";

import { FearAndGreedProps } from "@/lib/types";
import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";
import { FiInfo } from "react-icons/fi";
import { Tooltip } from "@nextui-org/react";

export default function FearAndGreed({ fearAndGreed }: FearAndGreedProps) {
  const [fearGreedValue, setFearGreedValue] = useState(0);
  const [fearGreedClassification, setFearGreedClassification] = useState("");

  useEffect(() => {
    fearAndGreed.map((data) => {
      setFearGreedValue(Number(data.value));
      setFearGreedClassification(data.value_classification);
    });
  }, [fearAndGreed]);

  return (
    <section className="flex flex-col">
      <div className="flex gap-x-3">
        <h3 className="text-lg text-white/85 mb-4">Fear and Greed Index</h3>
        <Tooltip
          showArrow={true}
          content="The fear and greed index is a gauge to measure investor sentiment. When the sentiment overly fearful it indicates that the market over-sold. When investors are too greedy it indicates a correction in the market is likely. This data is provided by Alternative Me."
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
      <div className="bg-white/[3%] border-[1px] border-white/20 rounded-md w-[24rem] h-[15rem] shadow-[0_7px_7px_rgba(2,2,2,1)]">
        <div className="w-[24rem]">
          <GaugeComponent
            type="semicircle"
            arc={{
              colorArray: ["#FF2121", "#2DF329"],
              subArcs: [
                { limit: 20 },
                { limit: 40 },
                { limit: 60 },
                { limit: 80 },
                { limit: 100 },
              ],
            }}
            labels={{
              valueLabel: {
                formatTextValue: (value) => value,
                matchColorWithArc: true,
              },
              tickLabels: { hideMinMax: true },
            }}
            pointer={{ type: "blob", animationDelay: 0, width: 25 }}
            value={fearGreedValue}
          />
          <p className="text-lg text-center text-white/75">
            {fearGreedClassification}
          </p>
        </div>
      </div>
    </section>
  );
}
