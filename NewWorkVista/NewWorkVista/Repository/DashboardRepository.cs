using Microsoft.EntityFrameworkCore;
using NewWorkVista.Models.DTO;
using Workvista.Data;
using System;
using System.Data.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Workvista.Repositories
{
    /// <summary>
    /// Repository responsible for retrieving dashboard data
    /// using stored procedure: sp_GetDashboardData
    /// </summary>
    public class DashboardRepository : IDashboardRepository
    {
        private readonly WorkvistaDbContext _context;

        /// <summary>
        /// Initializes repository with database context
        /// </summary>
        public DashboardRepository(WorkvistaDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Executes stored procedure and returns a DbDataReader
        /// </summary>
        /// <param name="filter">Filter value (e.g., Today, Week, Month)</param>
        private async Task<DbDataReader> ExecuteProcedureAsync(string filter)
        {
            var conn = _context.Database.GetDbConnection();

            // Open database connection manually
            await conn.OpenAsync();

            // Create database command
            var cmd = conn.CreateCommand();
            cmd.CommandText = "sp_GetDashboardData";
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            // Add stored procedure parameter
            var param = cmd.CreateParameter();
            param.ParameterName = "@Filter";
            param.Value = filter;
            cmd.Parameters.Add(param);

            // Execute and return reader (connection auto-closes)
            return await cmd.ExecuteReaderAsync(System.Data.CommandBehavior.CloseConnection);
        }

        /// <summary>
        /// Calculates percentage change between current and previous values
        /// </summary>
        /// <param name="logged">Current value</param>
        /// <param name="prev">Previous value</param>
        /// <returns>Tuple (Change %, IsNegative flag)</returns>
        private (int Change, bool IsNegative) CalcChange(int logged, int prev)
        {
            // Handle zero baseline case
            if (prev == 0)
            {
                if (logged == 0) return (0, false);   // No change
                if (logged > 0) return (100, false);  // Growth from zero
                return (-100, true);                  // Decline from zero
            }

            // Calculate percentage difference
            double percent = ((double)(logged - prev) / prev) * 100;

            // Round percentage
            int rounded = (int)Math.Round(percent, MidpointRounding.AwayFromZero);

            return (rounded, percent < 0);
        }

        /// <summary>
        /// Main method to fetch dashboard data
        /// Contains multiple result sets:
        /// 1. KPI
        /// 2. Trend
        /// 3. Workload
        /// 4. Donut
        /// 5. Activity
        /// </summary>
        public async Task<DashboardDataDto> GetDashboardDataAsync(string filter)
        {
            var dashboardData = new DashboardDataDto
            {
                Kpis = new List<DashboardKpiDto>(),
                Trend = new List<DashboardTrendDto>(),
                Workload = new List<DashboardWorkloadDto>(),
                Donut = new List<DashboardDonutDto>(),
                Activity = new List<DashboardActivityDto>()
            };

            using var reader = await ExecuteProcedureAsync(filter);

            // =========================
            // 1️⃣ KPI RESULT SET
            // =========================
            while (await reader.ReadAsync())
            {
                // Total logged time in seconds
                var logged = reader.IsDBNull(reader.GetOrdinal("LoggedSeconds"))
                    ? 0
                    : reader.GetInt32(reader.GetOrdinal("LoggedSeconds"));

                // Previous period logged seconds
                var prev = reader.IsDBNull(reader.GetOrdinal("PrevLoggedSeconds"))
                    ? 0
                    : reader.GetInt32(reader.GetOrdinal("PrevLoggedSeconds"));

                // Calculate change percentage
                var (change, isNegative) = CalcChange(logged, prev);

                dashboardData.Kpis.Add(new DashboardKpiDto
                {
                    // KPI title (e.g., "Total Hours")
                    Title = reader.IsDBNull(reader.GetOrdinal("Title"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("Title")),

                    // Total logged work time (seconds)
                    LoggedSeconds = logged,

                    // Previous period logged time (seconds)
                    PrevLoggedSeconds = prev,

                    // Total time user was active on system
                    OnSystemSeconds = reader.IsDBNull(reader.GetOrdinal("OnSystemSeconds"))
                        ? 0
                        : reader.GetInt32(reader.GetOrdinal("OnSystemSeconds")),

                    // Time user was away
                    AwaySeconds = reader.IsDBNull(reader.GetOrdinal("AwaySeconds"))
                        ? 0
                        : reader.GetInt32(reader.GetOrdinal("AwaySeconds")),

                    // Idle/inactive time
                    IdleSeconds = reader.IsDBNull(reader.GetOrdinal("IdleSeconds"))
                        ? 0
                        : reader.GetInt32(reader.GetOrdinal("IdleSeconds")),

                    // Productive working time
                    ProductiveSeconds = reader.IsDBNull(reader.GetOrdinal("ProductiveSeconds"))
                        ? 0
                        : reader.GetInt32(reader.GetOrdinal("ProductiveSeconds")),

                    // Percentage change vs previous period
                    Change = change,

                    // Indicates negative trend
                    IsNegative = isNegative
                });
            }

            // =========================
            // 2️⃣ TREND RESULT SET
            // =========================
            await reader.NextResultAsync();
            while (await reader.ReadAsync())
            {
                dashboardData.Trend.Add(new DashboardTrendDto
                {
                    // Hour of the day (0–23)
                    Hour = reader.IsDBNull(reader.GetOrdinal("Hour"))
                        ? 0
                        : Convert.ToInt32(reader["Hour"]),

                    // Today's performance score at that hour
                    TodayScore = reader.IsDBNull(reader.GetOrdinal("TodayScore"))
                        ? 0
                        : Convert.ToInt32(reader["TodayScore"]),

                    // Yesterday's performance score
                    YesterdayScore = reader.IsDBNull(reader.GetOrdinal("YesterdayScore"))
                        ? 0
                        : Convert.ToInt32(reader["YesterdayScore"])
                });
            }

            // =========================
            // 3️⃣ WORKLOAD RESULT SET
            // =========================
            await reader.NextResultAsync();
            while (await reader.ReadAsync())
            {
                dashboardData.Workload.Add(new DashboardWorkloadDto
                {
                    // Employee full name
                    FullName = reader.IsDBNull(reader.GetOrdinal("FullName"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("FullName")),

                    // Expected daily working capacity (hours)
                    DailyCapacity = reader.IsDBNull(reader.GetOrdinal("DailyCapacity"))
                        ? 0
                        : Convert.ToDecimal(reader["DailyCapacity"]),

                    // Actual logged working hours
                    LoggedHours = reader.IsDBNull(reader.GetOrdinal("LoggedHours"))
                        ? 0
                        : Convert.ToDecimal(reader["LoggedHours"]),

                    // Work matched with expected capacity
                    Matched = reader.IsDBNull(reader.GetOrdinal("Matched"))
                        ? 0
                        : Convert.ToDecimal(reader["Matched"]),

                    // Remaining or less work compared to capacity
                    Less = reader.IsDBNull(reader.GetOrdinal("Less"))
                        ? 0
                        : Convert.ToDecimal(reader["Less"])
                });
            }

            // =========================
            // 4️⃣ DONUT RESULT SET
            // =========================
            await reader.NextResultAsync();
            while (await reader.ReadAsync())
            {
                dashboardData.Donut.Add(new DashboardDonutDto
                {
                    // Category name (e.g., Productive, Idle, Away)
                    Category = reader.IsDBNull(reader.GetOrdinal("Category"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("Category")),

                    // Total time in seconds for category
                    TotalSeconds = reader.IsDBNull(reader.GetOrdinal("TotalSeconds"))
                        ? 0
                        : reader.GetInt32(reader.GetOrdinal("TotalSeconds")),

                    // UI color code (hex format)
                    ColorHex = reader.IsDBNull(reader.GetOrdinal("ColorHex"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("ColorHex"))
                });
            }

            // =========================
            // 5️⃣ ACTIVITY RESULT SET
            // =========================
            await reader.NextResultAsync();
            while (await reader.ReadAsync())
            {
                dashboardData.Activity.Add(new DashboardActivityDto
                {
                    // Employee/User full name
                    Name = reader.IsDBNull(reader.GetOrdinal("name"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("name")),

                    // Initials for avatar display (e.g., "AK")
                    Initials = reader.IsDBNull(reader.GetOrdinal("Initials"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("Initials")),

                    // Current status (Online, Offline, Busy, etc.)
                    Status = reader.IsDBNull(reader.GetOrdinal("Status"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("Status")),

                    // Current activity description (e.g., "Coding", "Meeting")
                    Activity = reader.IsDBNull(reader.GetOrdinal("activity"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("activity")),

                    // Time of activity (formatted string like "10:30 AM")
                    Time = reader.IsDBNull(reader.GetOrdinal("time"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("time")),

                    // Progress percentage (0–100)
                    Progress = reader.IsDBNull(reader.GetOrdinal("progress"))
                        ? 0
                        : reader.GetInt32(reader.GetOrdinal("progress"))
                });
            }

            // Return final dashboard data object
            return dashboardData;
        }
    }
}