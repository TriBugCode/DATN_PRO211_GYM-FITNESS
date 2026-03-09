<template>
  <nav class="bg-gym-dark-secondary border-b border-gym-red/20 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bebas text-gym-red hover:text-gym-orange transition-colors">
            GYMSHARK
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gym-text hover:text-gym-red transition-colors font-medium">Trang Chủ</router-link>
          <router-link to="/programs" class="text-gym-text hover:text-gym-red transition-colors font-medium">Chương Trình</router-link>
          <router-link to="/trainers" class="text-gym-text hover:text-gym-red transition-colors font-medium">Huấn Luyện Viên</router-link>
          <router-link to="/membership" class="text-gym-text hover:text-gym-red transition-colors font-medium">Thành Viên</router-link>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="text-gym-text hover:text-gym-red transition-colors font-medium">Đăng Nhập</router-link>
            <router-link to="/register" class="bg-gym-red hover:bg-gym-orange text-white px-4 py-2 rounded-lg font-medium transition-colors">Tham Gia Ngay</router-link>
          </template>
          <template v-else>
            <router-link to="/dashboard" class="text-gym-text hover:text-gym-red transition-colors font-medium">Bảng Điều Khiển</router-link>
            <button @click="logout" class="text-gym-text hover:text-gym-red transition-colors font-medium">Đăng Xuất</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>