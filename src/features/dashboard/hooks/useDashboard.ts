// src/features/dashboard/hooks/useDashboard.ts
import { useEffect, useState } from "react";
import { DashboardData, FilterType } from "../types";
import { getDashboardData } from "../services/dashboard.service";

export const useDashboard = (filter: FilterType) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getDashboardData(filter);
        setData(res);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to fetch dashboard data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [filter]);

  return { data, loading, error };
};
