<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bebas text-gym-red mb-2">Chào mừng trở lại, {{ user?.name }}!</h1>
      <p class="text-gym-text-secondary">Sẵn sàng chinh phục mục tiêu fitness hôm nay?</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Membership Status -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20" data-aos="fade-up">
        <h3 class="text-xl font-oswald text-white mb-4">Trạng Thái Thành Viên</h3>
        <div v-if="userMembership" class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gym-text-secondary">Gói Hiện Tại:</span>
            <span class="text-gym-red font-semibold capitalize">{{ userMembership.name }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gym-text-secondary">Hết Hạn:</span>
            <span class="text-white">{{ formatDate(userMembership.endDate) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gym-text-secondary">Trạng Thái:</span>
            <span class="text-gym-green font-semibold">Hoạt Động</span>
          </div>
        </div>
        <div v-else class="text-center">
          <p class="text-gym-text-secondary mb-4">Không có thành viên hoạt động</p>
          <router-link
            to="/membership"
            class="bg-gym-red hover:bg-gym-orange text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Chọn Gói
          </router-link>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20" data-aos="fade-up" data-aos-delay="100">
        <h3 class="text-xl font-oswald text-white mb-4">Tuần Này</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gym-text-secondary">Bài Tập:</span>
            <span class="text-gym-red font-semibold">5</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gym-text-secondary">Giờ:</span>
            <span class="text-white">12.5</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gym-text-secondary">Calo:</span>
            <span class="text-gym-green font-semibold">2,450</span>
          </div>
        </div>
      </div>

      <!-- Goals -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-xl font-oswald text-white mb-4">Tiến Độ Mục Tiêu</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gym-text-secondary">Giảm Cân</span>
              <span class="text-white">7/10 lbs</span>
            </div>
            <div class="w-full bg-gym-dark rounded-full h-2">
              <div class="bg-gym-red h-2 rounded-full" style="width: 70%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gym-text-secondary">Tăng Sức Mạnh</span>
              <span class="text-white">85%</span>
            </div>
            <div class="w-full bg-gym-dark rounded-full h-2">
              <div class="bg-gym-orange h-2 rounded-full" style="width: 85%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20" data-aos="fade-up">
      <h3 class="text-xl font-oswald text-white mb-6">Bài Tập Gần Đây</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gym-dark rounded-lg">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gym-red rounded-full flex items-center justify-center mr-4">
              <i class="fas fa-dumbbell text-white"></i>
            </div>
            <div>
              <h4 class="text-white font-semibold">Tập Luyện Sức Mạnh</h4>
              <p class="text-gym-text-secondary text-sm">Tập Trung Vào Thân Trên • 1 giờ 30 phút</p>
            </div>
          </div>
          <span class="text-gym-green font-semibold">Hoàn Thành</span>
        </div>

        <div class="flex items-center justify-between p-4 bg-gym-dark rounded-lg">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gym-red rounded-full flex items-center justify-center mr-4">
              <i class="fas fa-heartbeat text-white"></i>
            </div>
            <div>
              <h4 class="text-white font-semibold">HIIT Cardio</h4>
              <p class="text-gym-text-secondary text-sm">Cường Độ Cao • 45 phút</p>
            </div>
          </div>
          <span class="text-gym-green font-semibold">Hoàn Thành</span>
        </div>

        <div class="flex items-center justify-between p-4 bg-gym-dark rounded-lg">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gym-red rounded-full flex items-center justify-center mr-4">
              <i class="fas fa-running text-white"></i>
            </div>
            <div>
              <h4 class="text-white font-semibold">Chạy Phục Hồi</h4>
              <p class="text-gym-text-secondary text-sm">Cardio Nhẹ • 30 phút</p>
            </div>
          </div>
          <span class="text-gym-text-secondary">Đã Lên Lịch</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useMembershipStore } from '../stores/membershipStore'

const authStore = useAuthStore()
const membershipStore = useMembershipStore()

const user = computed(() => authStore.user)
const userMembership = computed(() => membershipStore.userMembership)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>