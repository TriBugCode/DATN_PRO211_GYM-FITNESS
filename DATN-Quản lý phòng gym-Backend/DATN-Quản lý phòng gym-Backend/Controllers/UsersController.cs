using DATN_Quản_lý_phòng_gym_Backend.Data;
using DATN_Quản_lý_phòng_gym_Backend.DTO;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DATN_Quản_lý_phòng_gym_Backend.Controllers
{
    [Authorize(Roles = "Admin,Staff")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UsersController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Authorize]
        [HttpGet("api/users")]
        public IActionResult GetAll([FromQuery] string? role)
        {
            var users = _dbContext.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .AsQueryable();

            if (!string.IsNullOrEmpty(role))
            {
                users = users.Where(u =>
                    u.UserRoles.Any(ur => ur.Role.RoleName == role));
            }

            var result = users.Select(u => new UserDto
            {
                UserId = u.UserId,
                Username = u.Username,
                FullName = u.FullName,
                Email = u.Email,
                Phone = u.Phone,
                Roles = u.UserRoles.Select(ur => ur.Role.RoleName).ToList()
            }).ToList();

            return Ok(result);
        }


    }
}
