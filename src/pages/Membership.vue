<template>
  <div class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-5xl md:text-7xl font-bebas text-gym-red mb-4">GÓI THÀNH VIÊN</h1>
        <p class="text-xl text-gym-text-secondary">Chọn gói phù hợp với hành trình fitness của bạn</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Basic Plan -->
        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="100">
          <div class="text-center">
            <h3 class="text-3xl font-oswald text-white mb-2">CƠ BẢN</h3>
            <div class="text-5xl font-bebas text-gym-red mb-6">
              29$<span class="text-xl">/tháng</span>
            </div>
            <ul class="text-left text-gym-text-secondary mb-8 space-y-3">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Truy cập thiết bị gym</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Truy cập phòng thay đồ</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Lớp fitness cơ bản</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Truy cập ứng dụng di động</li>
              <li><i class="fas fa-times text-gym-text-secondary mr-2"></i>Buổi tập huấn luyện cá nhân</li>
              <li><i class="fas fa-times text-gym-text-secondary mr-2"></i>Tư vấn dinh dưỡng</li>
            </ul>
            <button
              @click="selectPlan('basic')"
              class="w-full bg-gym-red hover:bg-gym-orange text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-glow"
            >
              CHỌN GÓI CƠ BẢN
            </button>
          </div>
        </div>

        <!-- Pro Plan (Recommended) -->
        <div class="bg-gym-dark-secondary p-8 rounded-lg border-2 border-gym-red relative transform scale-105" data-aos="fade-up" data-aos-delay="200">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-gym-red text-white px-4 py-1 rounded-full text-sm font-semibold">KHUYẾN NGHỊ</span>
          </div>
          <div class="text-center">
            <h3 class="text-3xl font-oswald text-white mb-2">PRO</h3>
            <div class="text-5xl font-bebas text-gym-red mb-6">
              59$<span class="text-xl">/tháng</span>
            </div>
            <ul class="text-left text-gym-text-secondary mb-8 space-y-3">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tất cả tính năng Cơ bản</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Buổi tập huấn luyện cá nhân (2x/tháng)</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tư vấn dinh dưỡng</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Đặt lịch ưu tiên</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Vé khách (2/tháng)</li>
              <li><i class="fas fa-times text-gym-text-secondary mr-2"></i>Huấn luyện cá nhân không giới hạn</li>
            </ul>
            <button
              @click="selectPlan('pro')"
              class="w-full bg-gym-red hover:bg-gym-orange text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-glow"
            >
              CHỌN GÓI PRO
            </button>
          </div>
        </div>

        <!-- Elite Plan -->
        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="300">
          <div class="text-center">
            <h3 class="text-3xl font-oswald text-white mb-2">ELITE</h3>
            <div class="text-5xl font-bebas text-gym-red mb-6">
              99$<span class="text-xl">/tháng</span>
            </div>
            <ul class="text-left text-gym-text-secondary mb-8 space-y-3">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tất cả tính năng Pro</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Huấn luyện cá nhân không giới hạn</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Lập kế hoạch dinh dưỡng cao cấp</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Truy cập phòng VIP</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Dịch vụ spa & phục hồi</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Sự kiện độc quyền</li>
            </ul>
            <button
              @click="selectPlan('elite')"
              class="w-full bg-gym-red hover:bg-gym-orange text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-glow"
            >
              CHỌN GÓI ELITE
            </button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-20 max-w-4xl mx-auto" data-aos="fade-up">
        <h2 class="text-4xl font-bebas text-gym-red text-center mb-12">CÂU HỎI THƯỜNG GẶP</h2>

        <div class="space-y-6">
          <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
            <h3 class="text-xl font-semibold text-white mb-3">Tôi có thể hủy thành viên bất cứ lúc nào không?</h3>
            <p class="text-gym-text-secondary">Có, bạn có thể hủy thành viên bất cứ lúc nào. Không có hợp đồng dài hạn hoặc phí hủy.</p>
          </div>

          <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
            <h3 class="text-xl font-semibold text-white mb-3">Có phí đăng ký không?</h3>
            <p class="text-gym-text-secondary">Không có phí đăng ký cho bất kỳ gói thành viên nào. Bạn chỉ trả phí đăng ký hàng tháng.</p>
          </div>

          <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
            <h3 class="text-xl font-semibold text-white mb-3">Tôi có thể tạm ngừng thành viên không?</h3>
            <p class="text-gym-text-secondary">Có, bạn có thể tạm ngừng thành viên lên đến 3 tháng mỗi năm nếu cần, không có phí thêm.</p>
          </div>

          <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
            <h3 class="text-xl font-semibold text-white mb-3">Bạn có giảm giá cho sinh viên hoặc người cao tuổi không?</h3>
            <p class="text-gym-text-secondary">Chúng tôi cung cấp giá đặc biệt cho sinh viên và người cao tuổi. Liên hệ với chúng tôi để biết thêm thông tin về chương trình giảm giá.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMembershipStore } from '../stores/membershipStore'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const membershipStore = useMembershipStore()
const authStore = useAuthStore()

const selectPlan = (planId) => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  membershipStore.selectMembership(planId)
  router.push('/payment?plan=' + planId)
}
</script>