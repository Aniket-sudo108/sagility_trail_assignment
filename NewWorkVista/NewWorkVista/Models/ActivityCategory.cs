using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Workvista.Models
{
    public class ActivityCategory
    {
        public int Id { get; set; }

        [Required, MaxLength(60)]
        public string Name { get; set; }

        [Required, MaxLength(10)]
        public string ColorHex { get; set; }

        public bool IsProductive { get; set; }

        public int SortOrder { get; set; }

        public ICollection<ActivityLog> ActivityLogs { get; set; }
    }
}