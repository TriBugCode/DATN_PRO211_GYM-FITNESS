namespace DATN_Quản_lý_phòng_gym_Backend.DTO
{
    public class RegisterRequest
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string Role { get; set; } = "Member"; // mặc định
    }
}
