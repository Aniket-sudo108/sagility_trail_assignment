using NewWorkVista.Models.DTO;

namespace NewWorkVista.Service
{
    public interface IDashboardService
    {
        Task<DashboardDataDto> GetDashboardAsync(string filter);
    }
}
