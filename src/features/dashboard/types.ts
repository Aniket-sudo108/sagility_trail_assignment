// src/features/dashboard/types.ts

export type FilterType = "TODAY" | "YESTERDAY" | "THIS_WEEK";

// Raw KPI from API
export interface RawKpi {
  title: string;
  loggedSeconds?: number;
  prevLoggedSeconds?: number;
  onSystemSeconds?: number;
  awaySeconds?: number;
  idleSeconds?: number;
  productiveSeconds?: number;
}

// KPI for UI
export interface KPI {
  title: string;
  value: string;        // formatted HH:MM
  change: number;
  isNegative?: boolean;
  trend?: number[];
}

export interface DonutSlice {
  category: string;
  totalSeconds: number;
  colorHex: string;
}

export interface ActivityUser {
  name: string;
  initials: string;
  status: "Productive" | "Away" | "Idle";
  activity: string;
  time: string;
  progress: number;
}


// Workload
export interface Workload {
  fullName: string;
  dailyCapacity: number;
  loggedHours: number;
  matched: number;
  less: number;
}

// Trend
export interface Trend {
  hour: number;
  todayScore: number;
  yesterdayScore: number;
}


export interface DashboardData {
  kpis: RawKpi[];
  trend: Trend[];
  workload: Workload[];
  donut: DonutSlice[];
  activity?: ActivityUser[];   // ✅ add this

  kpisError?: string | null;
  activityError?: string | null;
  breakdownError?: string | null;
  workloadError?: string | null;
  trendError?: string | null;


}
