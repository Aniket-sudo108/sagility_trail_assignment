using System;

namespace Workvista.Models
{
    public class MemberStatus
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int MemberId { get; set; }

        public TeamMember Member { get; set; }

        public string Status { get; set; }
        public DateTime LastActiveTime { get; set; }
    }
}