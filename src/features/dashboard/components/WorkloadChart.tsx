import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export const WorkloadChart = ({ data }: { data: any[] }) => {
  return (
    <div className="w-full h-[350px] bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          barGap={8}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

          {/* ✅ X-Axis → use fullName */}
          <XAxis
            dataKey="fullName"
            tick={{
              fontSize: 12,
              fill: "#ff885d",
              fontWeight: "600",
            }}
          />

          <YAxis tick={{ fontSize: 12, fill: "#374151" }} />
          <Tooltip />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            iconSize={10}
            iconType="square"
          />

          {/* ✅ Capacity Bar → use dailyCapacity */}
          <Bar
            dataKey="dailyCapacity"
            fill="#00B8A9"
            name="Capacity"
            radius={[12, 12, 0, 0]}
            barSize={10}
          />

          {/* ✅ Matched Work Bar */}
          <Bar
            dataKey="matched"
            fill="#F6C343"
            name="Logged Hours Matched Capacity"
            radius={[12, 12, 0, 0]}
            barSize={10}
          />

          {/* ✅ Less Work Bar */}
          <Bar
            dataKey="less"
            fill="#F9A8D4"
            name="Logged Hours less than Capacity"
            radius={[12, 12, 0, 0]}
            barSize={10}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
