// src/features/dashboard/pages/Dashboard.tsx

import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

// Components
import { Loader } from "../../shared/components/Loader";
import { Error } from "../../shared/components/Error";
import { KpiCard } from "../dashboard/components/KpiCard";
import { ActivityCard } from "../dashboard/components/ActivityCard";
import { DonutChart } from "../dashboard/components/DonutChart";
import { WorkloadChart } from "../dashboard/components/WorkloadChart";
import { TrendChart } from "../dashboard/components/TrendChart";
import { Navbar } from "../dashboard/components/Navbar";
import { Header } from "../dashboard/components/Header";

// Types
import { DashboardData, FilterType, KPI, RawKpi, ActivityUser } from "../dashboard/types";

// Service
import { getDashboardData } from "../dashboard/services/dashboard.service";

export const Dashboard = () => {
  // -------------------
  // State variables
  // -------------------
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("TODAY");

  // Expand/collapse states
  const [expanded, setExpanded] = useState(false);
  const [breakdownExpanded, setBreakdownExpanded] = useState(false);
  const [workloadExpanded, setWorkloadExpanded] = useState(false);
  const [trendExpanded, setTrendExpanded] = useState(false);

  // -------------------
  // Fetch dashboard data (mock or live)
  // -------------------
  const fetchData = async (selectedFilter: FilterType) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getDashboardData(selectedFilter); // ✅ unified service call
      setData(res);
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to fetch dashboard data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch & refetch when filter changes
  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  // -------------------
  // Render loading / error
  // -------------------
  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!data) return <Error message="No data available" />;

  // -------------------
  // Helper: convert seconds → HH:MM
  // -------------------
  const formatSecondsToHHMM = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#EEF3F7] min-h-screen">
      <Navbar />

      <div className="p-3 sm:p-4 lg:p-6">
        <Header
          filter={filter}
          setFilter={(value: FilterType) => setFilter(value)}
          refresh={() => fetchData(filter)}
        />

        {/* ================= KPI SECTION ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {data.kpisError ? (
            <Error message={data.kpisError} />
          ) : (
            Array.isArray(data.kpis) &&
            (data.kpis as RawKpi[]).map((rawKpi, i) => {
              let seconds = 0;
              switch (rawKpi.title) {
                case "Team Idle Hours": seconds = rawKpi.idleSeconds ?? 0; break;
                case "Team Productive Hours": seconds = rawKpi.productiveSeconds ?? 0; break;
                case "Team Time Away": seconds = rawKpi.awaySeconds ?? 0; break;
                case "Team Time On System": seconds = rawKpi.onSystemSeconds ?? 0; break;
                default: seconds = rawKpi.loggedSeconds ?? 0; break;
              }

              const value = formatSecondsToHHMM(seconds);
              const prev = rawKpi.prevLoggedSeconds ?? 0;
              const change = prev > 0 ? Math.round(((seconds - prev) / prev) * 100) : 0;
              const isNegative = seconds < prev;

              const kpi: KPI = {
                title: rawKpi.title,
                value,
                change,
                isNegative,
                trend: Array.isArray(data.trend) ? data.trend.map(t => t.todayScore) : undefined,
              };

              return <KpiCard key={i} item={kpi} />;
            })
          )}
        </div>

        {/* ================= MIDDLE SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Team Activity */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-gray-100 p-3 rounded">
              <div>
                <h2 className="font-semibold text-[#1A2332]">Team Activity</h2>
                <p className="text-xs text-gray-500">Real Time Updates</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="flex -space-x-2">
                    {[{ name: "A", bg: "bg-[#00B8A9]" },
                      { name: "B", bg: "bg-blue-600" },
                      { name: "C", bg: "bg-yellow-600" },
                      { name: "D", bg: "bg-pink-600" }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 flex items-center justify-center text-white text-[10px] rounded-full border-2 border-white ${item.bg}`}
                      >
                        {item.name}
                      </div>
                    ))}
                    <div className="w-6 h-6 bg-gray-200 text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                      +5
                    </div>
                  </div>
                  <span>10 Team Members Active</span>
                </div>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-[#E8F9F8]"
                >
                  {expanded ? <ArrowDownLeft /> : <ArrowUpRight />}
                </button>
              </div>
            </div>

           <div className="flex gap-4 overflow-x-auto p-2">
          {data.activityError ? (
            <Error message={data.activityError} />
          ) : (
            Array.isArray(data.activity) &&
            data.activity.map((user: ActivityUser, i) => (
              <div key={i} className="min-w-[250px]">
                <ActivityCard user={user} />
              </div>
            ))
          )}
        </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3 bg-gray-100 p-3 rounded">
              <div>
                <h2 className="font-semibold text-[#1A2332]">Activity Breakdown</h2>
                <p className="text-xs text-gray-500">Time Allocation</p>
              </div>
              <button
                onClick={() => setBreakdownExpanded(!breakdownExpanded)}
                className="w-7 h-7 bg-gray-200 rounded-md flex items-center justify-center"
              >
                {breakdownExpanded ? <ArrowDownLeft /> : <ArrowUpRight />}
              </button>
            </div>

            {data.breakdownError ? (
              <Error message={data.breakdownError} />
            ) : (
              <DonutChart data={Array.isArray(data.donut) ? data.donut : []} />
            )}
          </div>
        </div>

               {/* ================= BOTTOM SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {/* Workload Chart */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border">
            <div className="flex justify-between items-start mb-3 bg-gray-100 p-3 rounded">
              <h2 className="font-semibold text-[#1A2332]">Workload Distribution</h2>
              <button
                onClick={() => setWorkloadExpanded(!workloadExpanded)}
                className="w-7 h-7 bg-gray-200 rounded-md flex items-center justify-center"
              >
                {workloadExpanded ? <ArrowDownLeft /> : <ArrowUpRight />}
              </button>
            </div>

            {data.workloadError ? (
              <Error message={data.workloadError} />
            ) : (
              <WorkloadChart data={Array.isArray(data.workload) ? data.workload : []} />
            )}
          </div>

          {/* Trend Chart */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border">
            <div className="flex justify-between items-start mb-3 bg-gray-100 p-3 rounded">
              <h2 className="font-semibold text-[#1A2332]">Productivity Trend</h2>
              <button
                onClick={() => setTrendExpanded(!trendExpanded)}
                className="w-7 h-7 bg-gray-200 rounded-md flex items-center justify-center"
              >
                {trendExpanded ? <ArrowDownLeft /> : <ArrowUpRight />}
              </button>
            </div>

            {data.trendError ? (
              <Error message={data.trendError} />
            ) : (
              <TrendChart data={Array.isArray(data.trend) ? data.trend : []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
