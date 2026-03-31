using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Workvista.Models
{
    public class TeamMember
    {
        public int Id { get; set; }

        [Required, MaxLength(20)]
        public string EmployeeCode { get; set; }

        [Required, MaxLength(100)]
        public string FullName { get; set; }

        [Required, MaxLength(150)]
        public string Email { get; set; }

        public int? ManagerId { get; set; }

        [ForeignKey("ManagerId")]
        public TeamMember Manager { get; set; }

        public int TeamId { get; set; }
        public Team Team { get; set; }

        public decimal DailyCapacity { get; set; } = 8;

        [MaxLength(20)]
        public string AvatarColor { get; set; }

        [MaxLength(5)]
        public string Initials { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<ActivityLog> ActivityLogs { get; set; }
        public ICollection<TimeEntry> TimeEntries { get; set; }
        public ICollection<ProductivityScore> ProductivityScores { get; set; }
        public MemberStatus MemberStatus { get; set; }
    }
}