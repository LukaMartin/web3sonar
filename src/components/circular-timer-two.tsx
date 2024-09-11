"use client"

import { useState, useEffect } from "react"
import { IoMdRefresh } from "react-icons/io";

type CircularTimerProps = {
  duration: number
  isInfinite: boolean
  size: number
}

export default function CircularTimer({ duration, isInfinite, size }: CircularTimerProps) {
  const [time, setTime] = useState(duration)
  const [isRunning, setIsRunning] = useState(isInfinite)

  const FULL_DASH_ARRAY = 283
  const TIME_LIMIT = duration

  const calculateTimeFraction = () => {
    const rawTimeFraction = time / TIME_LIMIT
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            return TIME_LIMIT // Reset to 60 when it reaches 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, TIME_LIMIT])

  return (
    <div>
      <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-transparent"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-green-yellow"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{
              strokeDasharray: FULL_DASH_ARRAY,
              strokeDashoffset: isRunning
                ? FULL_DASH_ARRAY - calculateTimeFraction() * FULL_DASH_ARRAY
                : 0,
              transition: "stroke-dashoffset 0.3s ease-in-out",
              transform: "rotate(90deg) scale(-1, 1)",
              transformOrigin: "center",
            }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <IoMdRefresh size={20} className="text-white/85" />
        </div>
      </div>
    </div>
  )
}