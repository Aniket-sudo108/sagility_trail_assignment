import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const TrendChart = ({ data }: { data: any[] }) => {
  return (
    <div className="w-full h-[300px] bg-gray-50 rounded-md p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="hour" />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          {/* ✅ Yesterday Line */}
          <Line
            type="monotone"
            dataKey="yesterdayScore"   // fixed to match your data
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Yesterday"
          />

          {/* ✅ Today Line */}
          <Line
            type="monotone"
            dataKey="todayScore"       // fixed to match your data
            stroke="#F6C343"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Today"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
