using System;

namespace Workvista.Models
{
    public class TimeEntry
    {
        public long Id { get; set; }

        public int MemberId { get; set; }
        public TeamMember Member { get; set; }

        public DateTime LoggedDate { get; set; }

        public int LoggedSeconds { get; set; }
        public int OnSystemSeconds { get; set; }
        public int AwaySeconds { get; set; }
        public int IdleSeconds { get; set; }
        public int ProductiveSeconds { get; set; }

        public decimal ChangePercent { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}