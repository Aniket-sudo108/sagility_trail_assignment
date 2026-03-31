using System;

namespace Workvista.Models
{
    public class ProductivityScore
    {
        public long Id { get; set; }

        public int MemberId { get; set; }
        public TeamMember Member { get; set; }

        public DateTime ScoreDate { get; set; }
        public byte HourOfDay { get; set; }
        public decimal Score { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}