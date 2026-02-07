using DATN_Quản_lý_phòng_gym_Backend.Models;

using Microsoft.EntityFrameworkCore;
namespace DATN_Quản_lý_phòng_gym_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<Package> Packages { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ===== COMPOSITE KEY =====
            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            // ===== ROLE =====
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin" },
                new Role { RoleId = 2, RoleName = "Trainer" },
                new Role { RoleId = 3, RoleName = "Member" },
                new Role { RoleId = 4, RoleName = "Staff" }
            );

            // ===== PERMISSION =====
            modelBuilder.Entity<Permission>().HasData(
                new Permission { PermissionId = 1, PermissionName = "USER_VIEW" },
                new Permission { PermissionId = 2, PermissionName = "USER_CREATE" },
                new Permission { PermissionId = 3, PermissionName = "USER_UPDATE" },
                new Permission { PermissionId = 4, PermissionName = "USER_DELETE" }
            );

            // ===== ROLE PERMISSION (ADMIN FULL) =====
            modelBuilder.Entity<RolePermission>().HasData(
                new RolePermission { RoleId = 1, PermissionId = 1 },
                new RolePermission { RoleId = 1, PermissionId = 2 },
                new RolePermission { RoleId = 1, PermissionId = 3 },
                new RolePermission { RoleId = 1, PermissionId = 4 }
            );

            // ===== ADMIN + Memeber + Trainer USER =====
          modelBuilder.Entity<User>().HasData(
            new User
            {
                UserId = 1,
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                FullName = "Admin System",
                Email = "admin@gym.com",
                Phone = "0900000001",
                IsActive = true,
                CreatedAt = DateTime.Now
            },
            new User
            {
                UserId = 2,
                Username = "trainer",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                FullName = "Huấn luyện viên",
                Email = "trainer@gym.com",
                Phone = "0900000002",
                IsActive = true,
                CreatedAt = DateTime.Now
            },
            new User
            {
                UserId = 3,
                Username = "member",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                FullName = "Hội viên",
                Email = "member@gym.com",
                Phone = "0900000003",
                IsActive = true,
                CreatedAt = DateTime.Now
            },
            new User
            {
                UserId = 4,
                Username = "staff",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                FullName = "Nhân viên",
                Email = "staff@gym.com",
                Phone = "0900000004",
                IsActive = true,
                CreatedAt = DateTime.Now
            }
        );
        

            // ===== USER ROLE =====
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole
                {
                    UserId = 1,
                    RoleId = 1
                },
                new UserRole
                {
                    UserId = 2,
                    RoleId = 2
                },
                new UserRole
                {
                    UserId = 3,
                    RoleId = 3
                },
                new UserRole
                {
                    UserId = 4,
                    RoleId = 4
                }
            );
             modelBuilder.Entity<Package>().HasData(
                new Package
                {
                    Id = 1,
                    PackageName = "Cơ Bản",
                    Price = 500000,
                    DurationMonths = 1,
                    IsActive = true
                },
                new Package
                {
                    Id = 2,
                    PackageName = "Cao Cấp",
                    Price = 1000000,
                    DurationMonths = 1,
                    IsActive = true
                },
                new Package
                {
                    Id = 3,
                    PackageName = "Ưu Tú",
                    Price = 1700000,
                    DurationMonths = 1,
                    IsActive = true
                }
            );
        }

    }

}


