// src/features/dashboard/services/dashboard.service.ts
import { api } from "../../../services/api";
import { DashboardData } from "../types";
import { getMockDashboardData } from "../../../mock/dashboard.mock";
import { API_MODE } from "../../../app/config";

const handleApi = async <T>(url: string): Promise<T> => {
  // ✅ Expect raw JSON body, not wrapped
  const res = await api.get<T>(url);
  if (res.status !== 200) {
    throw new Error(`API returned status ${res.status}`);
  }
  return res.data; // ✅ directly return the JSON body
};

export const getDashboardData = async (
  filter: "TODAY" | "LAST_MONTH" | "THIS_WEEK" | "YESTERDAY"
): Promise<DashboardData> => {
  if (API_MODE === "mock") {
    return Promise.resolve(getMockDashboardData(filter));
  }
  return handleApi<DashboardData>(`/Dashboard/${filter}`);
};
