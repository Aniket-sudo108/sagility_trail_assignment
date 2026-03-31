namespace NewWorkVista.Models.DTO
{
    // DTO class for KPIs
    public class DashboardKpiDto
    {
        public string Title { get; set; }
        public int LoggedSeconds { get; set; }
        public int PrevLoggedSeconds { get; set; }
        public int OnSystemSeconds { get; set; }
        public int AwaySeconds { get; set; }
        public int IdleSeconds { get; set; }
        public int ProductiveSeconds { get; set; }

        // New calculated fields
        public int Change { get; set; }
        public bool IsNegative { get; set; }
    }

}
