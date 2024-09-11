"use client";

import { useState, useEffect } from "react";
import { LuTimerReset } from "react-icons/lu";

type CircularTimerProps = {
  duration: number;
  isInfinite: boolean;
  size: number;
};
export default function CircularTimer({
  duration,
  isInfinite,
  size,
}: CircularTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  const center = size / 2;
  const radius = size * 0.35;
  const tickLength = size * 0.15;
  const tickWidth = 4;
  const totalTicks = 45;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (isInfinite) {
            return duration;
          } else {
            clearInterval(timer);
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, isInfinite]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const generateTicks = () => {
    const ticks = [];
    for (let i = 0; i < totalTicks; i++) {
      const angle = (i * 360) / totalTicks;
      const isActive = i < ((duration - timeLeft) / duration) * totalTicks;
      ticks.push(
        <line
          key={i}
          x1={center + radius * Math.cos((angle * Math.PI) / 180)}
          y1={center + radius * Math.sin((angle * Math.PI) / 180)}
          x2={
            center + (radius + tickLength) * Math.cos((angle * Math.PI) / 180)
          }
          y2={
            center + (radius + tickLength) * Math.sin((angle * Math.PI) / 180)
          }
          stroke={isActive ? "currentColor" : "rgba(255, 255, 255, 0.2)"}
          strokeWidth={tickWidth / 3}
          className={isActive ? "text-green-yellow" : "bg-white/[2%]"}
        />
      );
    }
    return ticks;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-white rounded-lg">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {generateTicks()}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <LuTimerReset size={18} className="text-white" />
        </div>
      </div>
    </div>
  );
}
