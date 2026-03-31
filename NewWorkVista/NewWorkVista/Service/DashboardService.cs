using NewWorkVista.Models.DTO;
using NewWorkVista.Service;
using Workvista.Repositories;
using System.Threading.Tasks;

namespace Workvista.Services
{
    /// <summary>
    /// Service layer for Dashboard
    /// Acts as a bridge between Controller and Repository
    /// </summary>
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _repo;

        /// <summary>
        /// Constructor - inject repository dependency
        /// </summary>
        /// <param name="repo">Dashboard repository instance</param>
        public DashboardService(IDashboardRepository repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Retrieves dashboard data based on filter
        /// </summary>
        /// <param name="filter">
        /// Filter type (e.g., "Today", "Week", "Month")
        /// </param>
        /// <returns>
        /// DashboardDataDto containing:
        /// KPI, Trend, Workload, Donut chart, and Activity data
        /// </returns>
        public async Task<DashboardDataDto> GetDashboardAsync(string filter)
        {
            // Call repository to fetch data from database
            // No business logic applied here (pass-through service)
            return await _repo.GetDashboardDataAsync(filter);
        }
    }
}