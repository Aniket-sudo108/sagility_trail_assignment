using NewWorkVista.Models.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Workvista.Repositories
{
    /// <summary>
    /// Repository interface for Dashboard data access
    /// Defines contract for fetching dashboard-related data from database
    /// </summary>
    public interface IDashboardRepository
    {
        /// <summary>
        /// Retrieves complete dashboard data
        /// </summary>
        /// <param name="filter">
        /// Filter criteria (e.g., "Today", "Week", "Month")
        /// used to fetch specific dashboard data
        /// </param>
        /// <returns>
        /// DashboardDataDto containing:
        /// - KPI data (summary metrics)
        /// - Trend data (hourly/daily comparison)
        /// - Workload data (user capacity vs work)
        /// - Donut chart data (category distribution)
        /// - Activity data (recent user activity)
        /// </returns>
        Task<DashboardDataDto> GetDashboardDataAsync(string filter);
    }
}