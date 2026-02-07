namespace DATN_Quản_lý_phòng_gym_Backend.DTO
{
    public class AuthResponse
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string Token { get; set; } = null!;
}
}