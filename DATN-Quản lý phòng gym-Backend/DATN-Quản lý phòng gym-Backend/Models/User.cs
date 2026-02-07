using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DATN_Quản_lý_phòng_gym_Backend.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }
         public string? Phone { get; set; }   // ✅ THÊM
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? PackageId { get; set; }
        public Package? Package { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
