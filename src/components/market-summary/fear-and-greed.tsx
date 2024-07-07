"use client";

import { FearAndGreedProps } from "@/lib/types";
import { useEffect, useState } from "react";
import GaugeComponent from 'react-gauge-component'

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
      <h2 className="text-lg text-white/85 mb-4">Fear and Greed Index</h2>
      <div className="bg-white/[2%] border-[1px] border-white/20 rounded-md w-[24rem] h-[15rem] shadow-[0_7px_7px_rgba(2,2,2,1)]">
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
