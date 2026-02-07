namespace DATN_Quản_lý_phòng_gym_Backend.DTO
{
    public class LoginRequest
    {
        public string UsernameOrEmail { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
