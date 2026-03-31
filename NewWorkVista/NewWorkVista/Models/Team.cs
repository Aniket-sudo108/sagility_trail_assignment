using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Workvista.Models
{
    public class Team
    {
        public int Id { get; set; }

        [Required, MaxLength(80)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        public bool IsActive { get; set; } = true;

        public ICollection<TeamMember> Members { get; set; }
    }
}