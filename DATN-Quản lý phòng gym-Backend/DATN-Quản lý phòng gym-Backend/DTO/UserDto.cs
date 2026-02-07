namespace DATN_Quản_lý_phòng_gym_Backend.DTO
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}