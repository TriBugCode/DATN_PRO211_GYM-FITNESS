namespace DATN_Quản_lý_phòng_gym_Backend.DTO
{
    public class CreatePackageDto
    {
        public string PackageName { get; set; } 
        public decimal Price { get; set; }
        public int DurationMonths { get; set; }
        public bool IsActive { get; set; }
    }
}