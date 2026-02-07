using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using BCrypt.Net;

using DATN_Quản_lý_phòng_gym_Backend.Data;
using DATN_Quản_lý_phòng_gym_Backend.DTO;
using DATN_Quản_lý_phòng_gym_Backend.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace DATN_Quản_lý_phòng_gym_Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        // ================= LOGIN =================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _db.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u =>
                    u.Username == request.UsernameOrEmail ||
                    u.Email == request.UsernameOrEmail
                );

            if (user == null)
                return Unauthorized("Sai tài khoản hoặc mật khẩu");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Unauthorized("Sai tài khoản hoặc mật khẩu");

            var roleName = user.UserRoles
                .Select(ur => ur.Role.RoleName)
                .FirstOrDefault() ?? "Member";

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, roleName)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = new
                {
                    user.UserId,
                    user.Username,
                    user.FullName,
                    user.Email,
                    user.Phone,
                    role = roleName
                }
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest dto)
        {
            // 1. Check username
            if (_db.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Username đã tồn tại");

            // 2. Tìm role
            var role = _db.Roles.FirstOrDefault(r => r.RoleName == dto.Role);
            if (role == null)
                return BadRequest("Role không hợp lệ");

            // 3. Tạo user
            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            // 4. Gán role
            var userRole = new UserRole
            {
                UserId = user.UserId,
                RoleId = role.RoleId
            };

            _db.UserRoles.Add(userRole);
            _db.SaveChanges();

            return Ok(new
            {
                message = "Register thành công",
                role = role.RoleName
            });
        }
    }
}
