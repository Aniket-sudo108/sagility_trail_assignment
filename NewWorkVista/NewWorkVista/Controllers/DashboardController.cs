using Microsoft.AspNetCore.Mvc;
using NewWorkVista.Models.DTO;
using NewWorkVista.Service;
using System.Threading.Tasks;

namespace Workvista.Controllers
{
    /// <summary>
    /// API Controller for Dashboard
    /// Handles HTTP requests related to dashboard data
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _service;

        /// <summary>
        /// Constructor - inject Dashboard service
        /// </summary>
        /// <param name="service">Service layer dependency</param>
        public DashboardController(IDashboardService service)
        {
            _service = service;
        }

        /// <summary>
        /// GET api/dashboard/{filter}
        /// Retrieves dashboard data based on filter
        /// </summary>
        /// <param name="filter">
        /// Filter value (e.g., "TODAY", "WEEK", "MONTH")
        /// </param>
        /// <returns>
        /// Returns DashboardDataDto containing:
        /// KPI, Trend, Workload, Donut, and Activity data
        /// </returns>
        /// <remarks>
        /// Example request:
        /// GET api/dashboard/TODAY
        /// </remarks>
        [HttpGet("{filter}")]
        public async Task<ActionResult<DashboardDataDto>> GetDashboard(string filter)
        {
            // Call service layer to fetch dashboard data
            var data = await _service.GetDashboardAsync(filter);

            // Always return HTTP 200 OK with data
            // Even if lists are empty, structure remains consistent
            return Ok(data);
        }
    }
}