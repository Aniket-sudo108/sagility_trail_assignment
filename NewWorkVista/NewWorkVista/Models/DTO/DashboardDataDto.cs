namespace NewWorkVista.Models.DTO
{
    public class DashboardDataDto
    {
        public List<DashboardKpiDto> Kpis { get; set; }
        public List<DashboardTrendDto> Trend { get; set; }
        public List<DashboardWorkloadDto> Workload { get; set; }
        public List<DashboardDonutDto> Donut { get; set; }
        public List<DashboardActivityDto> Activity { get; set; }
    }
}
