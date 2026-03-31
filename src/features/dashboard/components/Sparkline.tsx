import { useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

/**
 * 📌 SPARKLINE COMPONENT
 * --------------------------------------------------
 * Small lightweight line chart used inside KPI cards.
 *
 * Features:
 * - Displays trend visually
 * - Hover effect (glow + shadow)
 * - Tooltip for value insight
 *
 * 💡 Why this component?
 * → Reusable mini chart
 * → Improves UX with visual trends
 * → Keeps KPI cards clean
 */
export const Sparkline = ({
  data,
  color,
}: {
  data: number[];
  color: string;
}) => {

  /**
   * 📌 Hover State
   * Controls glow/shadow intensity
   */
  const [hover, setHover] = useState(false);

  /**
   * 📌 Format Data for Recharts
   * Converts array → object format
   *
   * Example:
   * [10,20,30] → [{index:0,value:10}, ...]
   */
  const formatted = data.map((value, index) => ({
    index,
    value,
  }));

  /**
   * 📌 SVG Shadow / Glow Filter
   * - Adds soft glow under line
   * - Changes intensity on hover
   *
   * 💡 Why SVG filter?
   * → Advanced visual styling
   * → Better than plain line
   */
  const shadowFilter = `
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow 
        dx="0" 
        dy="2" 
        stdDeviation="${hover ? 4 : 2}" 
        flood-color="${color}" 
        flood-opacity="${hover ? 0.6 : 0.3}" 
      />
    </filter>
  `;

  return (
    <ResponsiveContainer width="100%" height="100%">

      {/* 📌 Line Chart */}
      <LineChart
        data={formatted}

        /**
         * Hover Events
         * - Enable glow animation
         */
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >

        {/* 📌 Inject SVG filter */}
        <defs dangerouslySetInnerHTML={{ __html: shadowFilter }} />

        {/* 📌 Line */}
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}              // No dots → clean sparkline
          strokeLinecap="round"    // Smooth edges
          filter="url(#shadow)"    // Apply glow effect
        />

        {/* 📌 Tooltip on hover */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};