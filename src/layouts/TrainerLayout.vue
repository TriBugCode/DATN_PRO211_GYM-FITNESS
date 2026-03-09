<template>
  <div class="min-h-screen bg-gym-dark flex">
    <!-- Sidebar -->
    <div class="w-64 bg-gym-dark-secondary border-r border-gym-red/20">
      <div class="p-6">
        <h1 class="text-2xl font-bebas text-gym-red">GYMSHARK</h1>
        <p class="text-gym-text-secondary text-sm">Trainer Panel</p>
      </div>

      <nav class="px-4">
        <router-link
          to="/trainer"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'TrainerDashboard' }"
        >
          <i class="fas fa-tachometer-alt mr-3"></i>
          Tổng quan
        </router-link>

        <router-link
          to="/trainer/clients"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'MyClients' }"
        >
          <i class="fas fa-users mr-3"></i>
          Học viên của tôi
        </router-link>

        <router-link
          to="/trainer/schedules"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'MySchedules' }"
        >
          <i class="fas fa-calendar-alt mr-3"></i>
          Lịch tập
        </router-link>

        <router-link
          to="/trainer/plans"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'WorkoutPlans' }"
        >
          <i class="fas fa-dumbbell mr-3"></i>
          Kế hoạch tập
        </router-link>

        <router-link
          to="/trainer/reports"
          class="flex items-center px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors mb-2"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'ProgressReports' }"
        >
          <i class="fas fa-chart-line mr-3"></i>
          Báo cáo tiến độ
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
    case 'TrainerDashboard': return 'Tổng quan Trainer'
    case 'MyClients': return 'Học viên của tôi'
    case 'MySchedules': return 'Lịch tập'
    case 'WorkoutPlans': return 'Kế hoạch tập luyện'
    case 'ProgressReports': return 'Báo cáo tiến độ'
    default: return 'Trainer Panel'
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>