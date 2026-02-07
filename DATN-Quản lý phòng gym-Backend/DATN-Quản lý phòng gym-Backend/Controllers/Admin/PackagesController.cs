namespace DATN_Quản_lý_phòng_gym_Backend.Controllers
{
    using DATN_Quản_lý_phòng_gym_Backend.Data;
    using DATN_Quản_lý_phòng_gym_Backend.DTO;
    using DATN_Quản_lý_phòng_gym_Backend.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("api/[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PackagesController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreatePackage([FromBody] CreatePackageDto dto)
        {
                // Validate
            if (string.IsNullOrWhiteSpace(dto.PackageName))
                return BadRequest("Tên gói không được để trống");

            var exists = await _context.Packages
                .AnyAsync(p => p.PackageName == dto.PackageName);

            if (exists)
                return BadRequest("Gói tập đã tồn tại");

            var package = new Package
            {
                PackageName = dto.PackageName.ToLower(),
                Price = dto.Price,
                DurationMonths = dto.DurationMonths,
                IsActive = dto.IsActive
            };

            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            return Ok(package);
        }
       [HttpGet]
       public async Task<IActionResult> GetPackages()
       {
           var packages = await _context.Packages
                
                .Select(p => new 
                {
                    p.Id,
                    p.PackageName,
                    p.Price,
                    p.DurationMonths,
                    p.IsActive
                })
                .ToListAsync();
              return Ok(packages);
       }
    }
}