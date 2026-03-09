<template>
  <div class="min-h-screen bg-gym-dark flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gym-dark-secondary border-r border-gym-red/20">
      <div class="p-6">
        <h1 class="text-2xl font-bebas text-gym-red">GYMSHARK</h1>
        <p class="text-gym-text-secondary text-sm">Admin Panel</p>
      </div>

      <nav class="px-4">
        <router-link
          to="/admin"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'AdminDashboard' }"
        >
          <i class="fas fa-tachometer-alt mr-3"></i>
          Tổng quan
        </router-link>

        <router-link
          to="/admin/members"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'ManageMembers' }"
        >
          <i class="fas fa-users mr-3"></i>
          Quản lý thành viên
        </router-link>

        <router-link
          to="/admin/trainers"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'ManageTrainers' }"
        >
          <i class="fas fa-user-tie mr-3"></i>
          Quản lý HLV
        </router-link>

        <router-link
          to="/admin/schedules"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'ManageSchedules' }"
        >
          <i class="fas fa-calendar-alt mr-3"></i>
          Lịch tập
        </router-link>

        <router-link
          to="/admin/reports"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'ManageReports' }"
        >
          <i class="fas fa-chart-bar mr-3"></i>
          Báo cáo
        </router-link>

        <router-link
          to="/admin/payments"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'ManagePayments' }"
        >
          <i class="fas fa-credit-card mr-3"></i>
          Thanh toán
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="absolute bottom-4 left-4 right-4">
        <button
          @click="logout"
          class="w-full flex items-center px-4 py-3 text-gym-text hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
        >
          <i class="fas fa-sign-out-alt mr-3"></i>
          Đăng xuất
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-gym-dark-secondary border-b border-gym-red/20 px-6 py-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-oswald text-white">{{ pageTitle }}</h2>
          <div class="flex items-center space-x-4">
            <span class="text-gym-text-secondary">Xin chào, {{ user?.name }}</span>
            <div class="w-8 h-8 bg-gym-red rounded-full flex items-center justify-center">
              <i class="fas fa-user text-white text-sm"></i>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const pageTitle = computed(() => {
  const route = router.currentRoute.value
  switch (route.name) {
    case 'AdminDashboard': return 'Tổng quan Admin'
    case 'ManageMembers': return 'Quản lý thành viên'
    case 'ManageTrainers': return 'Quản lý huấn luyện viên'
    case 'ManageSchedules': return 'Quản lý lịch tập'
    case 'ManageReports': return 'Báo cáo và thống kê'
    case 'ManagePayments': return 'Quản lý thanh toán'
    default: return 'Admin Panel'
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>