using System.ComponentModel.DataAnnotations;

namespace Workvista.Models
{
    public class KpiMaster
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }

        [Required, MaxLength(50)]
        public string ColumnName { get; set; }

        public bool IsActive { get; set; } = true;
    }
}