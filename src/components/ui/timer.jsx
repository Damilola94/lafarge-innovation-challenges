"use client";

import { useTimer } from "@/contexts/TimerContext";

export function Timer() {
  const { timeLeft } = useTimer();

  const progress = (timeLeft / (15 * 60)) * 100;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white border-2 border-green-600 rounded-full flex items-center px-4 py-2 gap-3">
        <div className="relative w-8 h-8">
          <svg className="w-full h-full transform -rotate-90 rounded-full">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#16A34A"
              strokeWidth="32"
              strokeDasharray="87.96"
              strokeDashoffset={87.96 - (87.96 * progress) / 100}
              className="transition-all duration-500"
            />
          </svg>
        </div>
        <div className="font-mono font-bold text-xl">
          {String(minutes).padStart(2, "0")} MIN{" "}
          {String(seconds).padStart(2, "0")} SEC
        </div>
      </div>
    </div>
  );
}
