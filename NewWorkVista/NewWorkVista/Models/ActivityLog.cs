using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Workvista.Models
{
    public class ActivityLog
    {
        public long Id { get; set; }

        public int MemberId { get; set; }
        public TeamMember Member { get; set; }

        public int CategoryId { get; set; }
        public ActivityCategory Category { get; set; }

        public string ApplicationName { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        [NotMapped]
        public int DurationSeconds => (int)((EndTime ?? DateTime.Now) - StartTime).TotalSeconds;

        public string Status { get; set; }
        public DateTime LogDate { get; set; }
    }
}