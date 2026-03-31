// src/features/dashboard/mockDashboardData.ts

import { DashboardData } from "../features/dashboard/types";

/**
 * Utility to calculate % change
 */
const calcChange = (logged: number, prev: number) => {
  if (prev === 0) return { change: 0, isNegative: false };
  const percent = ((logged - prev) / prev) * 100;
  return { change: Math.round(percent), isNegative: percent < 0 };
};

/**
 * Mock data for TODAY
 */
const todayData: DashboardData = {
  kpis: [
    {
      title: "Team Idle Hours",
      loggedSeconds: 5000,
      prevLoggedSeconds: 118560,
      onSystemSeconds: 94000,
      awaySeconds: 11000,
      idleSeconds: 5000,
      productiveSeconds: 72000,
      ...calcChange(5000, 118560),
    },
    {
      title: "Team Logged Hours",
      loggedSeconds: 118560,
      prevLoggedSeconds: 111849, // ~6% increase
      onSystemSeconds: 94000,
      awaySeconds: 11000,
      idleSeconds: 5000,
      productiveSeconds: 72000,
      ...calcChange(118560, 111849),
    },
    {
      title: "Team Productive Hours",
      loggedSeconds: 72000,
      prevLoggedSeconds: 118560,
      onSystemSeconds: 94000,
      awaySeconds: 11000,
      idleSeconds: 5000,
      productiveSeconds: 72000,
      ...calcChange(72000, 118560),
    },
    {
      title: "Team Time Away",
      loggedSeconds: 3000,
      prevLoggedSeconds: 33000,
      onSystemSeconds: 94000,
      awaySeconds: 11000,
      idleSeconds: 5000,
      productiveSeconds: 72000,
      ...calcChange(3000, 33000),
    },
    {
      title: "Team Time On System",
      loggedSeconds: 26000,
      prevLoggedSeconds: 33000,
      onSystemSeconds: 94000,
      awaySeconds: 11000,
      idleSeconds: 5000,
      productiveSeconds: 72000,
      ...calcChange(26000, 33000),
    },
  ],
  trend: [
    { hour: 8, todayScore: 70, yesterdayScore: 65 },
    { hour: 9, todayScore: 60, yesterdayScore: 55 },
    { hour: 10, todayScore: 75, yesterdayScore: 70 },
    { hour: 11, todayScore: 80, yesterdayScore: 72 },
    { hour: 12, todayScore: 78, yesterdayScore: 68 },
    { hour: 13, todayScore: 75, yesterdayScore: 70 },
  ],
  workload: [
    { fullName: "Aniket Kavathekar", dailyCapacity: 8, loggedHours: 12, matched: 8, less: 0 },
    { fullName: "Sandip Kharat", dailyCapacity: 8, loggedHours: 10, matched: 8, less: 0 },
    { fullName: "Sanket Doshi", dailyCapacity: 8, loggedHours: 6, matched: 6, less: 2 },
  ],
  donut: [
    { category: "Productive Time", totalSeconds: 1680, colorHex: "#00B8A9" },
    { category: "Idle Time", totalSeconds: 2400, colorHex: "#94A3B8" },
    { category: "Away Time", totalSeconds: 3000, colorHex: "#F59E0B" }
  ],
  activity: [
    { name: "Aniket Kavathekar", initials: "AK", status: "Productive", activity: "DB Migration", time: "0h 28m", progress: 5 },
    {name: "Sanket Doshi", initials: "SD", status: "Away", activity: "Away from system", time: "0h 40m", progress: 8 },
    {name: "Sandip Kharat", initials: "SK", status: "Idle", activity: "Idle on system", time: "0h 20m", progress: 3 },
    {name: "Omkar Budhwale", initials: "OB", status: "Idle", activity: "Idle on system", time: "0h 20m", progress: 3 }
  ],
};

/**
 * Mock data for YESTERDAY
 */
const yesterdayData: DashboardData = {
  kpis: [
    {
      title: "Team Idle Hours",
      loggedSeconds: 10000,
      prevLoggedSeconds: 12000,
      onSystemSeconds: 95000,
      awaySeconds: 12000,
      idleSeconds: 10000,
      productiveSeconds: 70000,
      ...calcChange(10000, 12000),
    },
    {
      title: "Team Logged Hours",
      loggedSeconds: 110000,
      prevLoggedSeconds: 118560,
      onSystemSeconds: 93000,
      awaySeconds: 10000,
      idleSeconds: 6000,
      productiveSeconds: 71000,
      ...calcChange(110000, 118560),
    },
    {
      title: "Team Productive Hours",
      loggedSeconds: 71000,
      prevLoggedSeconds: 118560,
      onSystemSeconds: 93000,
      awaySeconds: 10000,
      idleSeconds: 6000,
      productiveSeconds: 71000,
      ...calcChange(71000, 118560),
    },
    {
      title: "Team Time Away",
      loggedSeconds: 3000,
      prevLoggedSeconds: 33000,
      onSystemSeconds: 93000,
      awaySeconds: 10000,
      idleSeconds: 6000,
      productiveSeconds: 71000,
      ...calcChange(3000, 33000),
    },
    {
      title: "Team Time On System",
      loggedSeconds: 26000,
      prevLoggedSeconds: 33000,
      onSystemSeconds: 93000,
      awaySeconds: 10000,
      idleSeconds: 6000,
      productiveSeconds: 71000,
      ...calcChange(26000, 33000),
    },
  ],
  trend: [
    { hour: 8, todayScore: 65, yesterdayScore: 70 },
    { hour: 9, todayScore: 55, yesterdayScore: 60 },
    { hour: 10, todayScore: 70, yesterdayScore: 75 },
    { hour: 11, todayScore: 72, yesterdayScore: 80 },
    { hour: 12, todayScore: 68, yesterdayScore: 78 },
    { hour: 13, todayScore: 70, yesterdayScore: 75 },
  ],
  workload: [
    { fullName: "Aniket Kavathekar", dailyCapacity: 8, loggedHours: 9, matched: 8, less: -1 },
    { fullName: "Sandip Kharat", dailyCapacity: 8, loggedHours: 7, matched: 7, less: 1 },
    { fullName: "Sanket Doshi", dailyCapacity: 8, loggedHours: 6, matched: 6, less: 2 },
  ],
  donut: [
    { category: "Productive Time", totalSeconds: 1400, colorHex: "#00B8A9" },
    { category: "Idle Time", totalSeconds: 3000, colorHex: "#94A3B8" },
    { category: "Away Time", totalSeconds: 4000, colorHex: "#F59E0B" },
    { category: "Ideal Time", totalSeconds: 2000, colorHex: "#F9A8D4" },
  ],
  activity: [
    { name: "Sandip Kharat", initials: "SK", status: "Productive", activity: "DB Migration", time: "0h 40m", progress: 8 },
    {name: "Sandip Kharat", initials: "SK", status: "Idle", activity: "Idle on system", time: "0h 20m", progress: 3 },
    {name: "Sanket Doshi", initials: "SD", status: "Away", activity: "Away from system", time: "0h 40m", progress: 8 }
  ],
};

/**
 * Export function that switches dataset based on filter
 */
export const getMockDashboardData = (filter: string): DashboardData => {
  switch (filter) {
    case "TODAY": return todayData;
    case "YESTERDAY": return yesterdayData;
    default: return todayData;
  }
};
