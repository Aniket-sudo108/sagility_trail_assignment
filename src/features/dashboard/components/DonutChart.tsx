// src/features/dashboard/components/DonutChart.tsx

import { PieChart, Pie, Cell } from "recharts";
import { DonutSlice } from "../types";

/**
 * 🍩 DonutChart Component
 *
 * 👉 Displays activity distribution in donut format
 *
 * WHY WE USE THIS MODULE?
 * - Visual representation of data (easy to understand)
 * - Reusable chart component
 * - Keeps Dashboard clean (separation of concerns)
 * - Built using Recharts for dynamic data rendering
 */

export const DonutChart = ({ data }: { data: DonutSlice[] }) => {
  /**
   * 📊 Calculate total seconds
   */
  const total = data.reduce((acc, item) => acc + item.totalSeconds, 0);

  /**
   * 🎯 Calculate "Active %" (Productive + Ideal)
   */
  const activeValue =
    (data.find(d => d.category === "Productive Time")?.totalSeconds || 0) +
    (data.find(d => d.category === "Ideal Time")?.totalSeconds || 0);

  const activePercent = total > 0 ? Math.round((activeValue / total) * 100) : 0;

  return (
    <div className="flex items-center gap-6 mt-4">
      {/* 🍩 Donut Chart Wrapper */}
      <div className="relative w-[130px] h-[130px] flex-shrink-0">
        <PieChart width={130} height={130}>
          <Pie
            data={data}
            dataKey="totalSeconds"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.colorHex} />
            ))}
          </Pie>
        </PieChart>

        {/* 🧠 Center Text (Active %) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[22px] font-extrabold text-[#1A2332] leading-none">
            {activePercent}%
          </span>
          <span className="text-[11px] text-gray-500 font-medium">Active</span>
        </div>
      </div>

      {/* 📋 Legend Section */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 flex-1">
        {data.map((item, i) => {
          const percent = total > 0 ? Math.round((item.totalSeconds / total) * 100) : 0;
          return (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-[9px] h-[9px] rounded-full"
                  style={{ background: item.colorHex }}
                />
                <span className="text-[12px] text-gray-500">{item.category}</span>
              </div>
              <span className="text-[20px] font-bold text-[#1A2332] leading-none">
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
