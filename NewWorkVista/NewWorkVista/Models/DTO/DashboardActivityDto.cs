namespace NewWorkVista.Models.DTO
{
    public class DashboardActivityDto
    {
        public string Name { get; set; }          // FullName of the team member
        public string Initials { get; set; }      // e.g. "AK"
        public string Status { get; set; }        // Productive / Idle / Away
        public string Activity { get; set; }      // ApplicationName or task description
        public string Time { get; set; }          // Duration formatted as "xh ym"
        public int Progress { get; set; }         // % progress vs DailyCapacity
    }
}
