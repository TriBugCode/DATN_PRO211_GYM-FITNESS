using System.ComponentModel.DataAnnotations;

namespace DATN_Quản_lý_phòng_gym_Backend.Models
{
    public class Package
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string PackageName { get; set; }
        public decimal Price { get; set; }
        public int DurationMonths { get; set; }
        public bool IsActive { get; set; }
        public ICollection<User> Users { get; set; }
    }
}