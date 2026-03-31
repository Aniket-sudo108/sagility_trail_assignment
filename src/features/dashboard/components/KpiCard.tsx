// src/features/dashboard/components/KpiCard.tsx

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { KPI } from "../types";
import { Sparkline } from "./Sparkline";

/**
 * 📌 KPI CARD COMPONENT
 * --------------------------------------------------
 * Displays:
 * - KPI title
 * - Animated time value (HH:MM format)
 * - Trend graph (sparkline)
 * - Percentage change indicator
 */
export const KpiCard = ({ item }: { item: KPI }) => {
  const isNegative = item.isNegative;
  const [displayValue, setDisplayValue] = useState("00:00");

  useEffect(() => {
    if (!item.value) return;

    /**
     * Convert "HH:MM" → total seconds
     * Example: "32:45" → 117,300 seconds
     */
    const [hrs, mins] = item.value.split(":").map(Number);
    const totalSeconds = hrs * 3600 + mins * 60;

    let current = 0;
    const duration = 1000; // total animation time (1s)
    const stepTime = 20;   // interval speed
    const increment = totalSeconds / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;

      if (current >= totalSeconds) {
        clearInterval(timer);
        setDisplayValue(item.value); // exact final value
      } else {
        // Convert seconds back → HH:MM
        const hrs = Math.floor(current / 3600);
        const mins = Math.floor((current % 3600) / 60);

        setDisplayValue(
          `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
        );
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [item.value]);

  return (
    <div
      className="
        relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-md group
      "
    >
      {/* 📌 Top Hover Animated Border */}
      <div
        className="
          absolute top-0 left-0 w-full h-[3px] bg-primary
          scale-x-0 group-hover:scale-x-100 origin-left
          transition-transform duration-300
        "
      />

      {/* 📌 KPI Title */}
      <div className="text-gray-500 text-sm">{item.title}</div>

      {/* 📌 Value + Trend Graph */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-[26px] font-bold text-[#1A2332] tabular-nums">
          {displayValue}
        </span>

        <div className="w-[80px] h-[40px]">
          {item.trend && (
            <Sparkline
              data={item.trend}
              color={isNegative ? "#EF4444" : "#00B8A9"}
            />
          )}
        </div>
      </div>

      {/* 📌 Change Indicator */}
      <div
        className={`flex items-center gap-1 mt-3 text-sm ${
          isNegative ? "text-[#EF4444]" : "text-[#00B8A9]"
        }`}
      >
        {isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
        <span className="font-medium">{item.change}%</span>
        <span className="text-gray-400 ml-1">From Last Period</span>
      </div>
    </div>
  );
};
