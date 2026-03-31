namespace NewWorkVista.Models.DTO
{
    public class DashboardWorkloadDto
    {
        public string FullName { get; set; }
        public decimal DailyCapacity { get; set; }
        public decimal LoggedHours { get; set; }
        public decimal Matched { get; set; }
        public decimal Less { get; set; }
    }
}
