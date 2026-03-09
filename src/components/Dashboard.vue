<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
    <!-- Navigation Bar -->
    <nav class="glass-morphism border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <router-link 
            to="/"
            class="group text-gray-600 hover:text-blue-600 font-medium text-lg flex items-center space-x-2 transition-all hover:-translate-x-1"
          >
            <span>←</span>
            <span>Trang Chủ</span>
          </router-link>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-l-4 border-blue-600 pl-4 glow-text">
            GYM Management
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <div class="hidden sm:flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {{ currentUser.name?.charAt(0)?.toUpperCase() }}
            </div>
            <div>
              <p class="text-gray-700 font-semibold">{{ currentUser.name }}</p>
              <span class="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium inline-block">
                {{ getRoleName(currentUser.role) }}
              </span>
            </div>
          </div>
          <button 
            @click="logout"
            class="group btn-modern bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>🚪</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 glass-morphism border-r border-white/20 min-h-screen sticky top-20 shadow-lg">
        <nav class="p-6 space-y-3">
          <!-- Quick Navigation -->
          <router-link 
            to="/"
            class="group card-modern block px-4 py-3 rounded-lg bg-gradient-to-r from-green-400/10 to-emerald-400/10 text-green-700 font-medium border-l-4 border-green-600 mb-4 hover:from-green-400/20 hover:to-emerald-400/20"
          >
            🏠 Về Trang Chủ
          </router-link>

          <!-- Admin Menu -->
          <template v-if="isAdmin">
            <h3 class="text-gray-600 text-xs font-bold px-4 py-2 uppercase tracking-wider">⚙️ Quản Lý</h3>
            <router-link 
              to="/dashboard/members"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              📋 Quản lý Hội viên
            </router-link>
            <router-link 
              to="/dashboard/trainers"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              💪 Quản lý Huấn luyện viên
            </router-link>
            <router-link 
              to="/dashboard/staff"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              👥 Quản lý Nhân viên
            </router-link>
            <router-link 
              to="/dashboard/reports"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              📊 Báo cáo thống kê
            </router-link>
          </template>

          <!-- Staff Menu -->
          <template v-else-if="isStaff">
            <h3 class="text-gray-600 text-xs font-bold px-4 py-2 uppercase tracking-wider">📌 Công Việc</h3>
            <router-link 
              to="/dashboard/members"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              📋 Quản lý Hội viên
            </router-link>
            <router-link 
              to="/dashboard/reports"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              📊 Báo cáo thống kê
            </router-link>
          </template>

          <!-- Trainer Menu -->
          <template v-else-if="isTrainer">
            <h3 class="text-gray-600 text-xs font-bold px-4 py-2 uppercase tracking-wider">📌 Công Việc</h3>
            <router-link 
              to="/dashboard/schedule"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              📅 Lịch tập
            </router-link>
            <router-link 
              to="/dashboard/members"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              👤 Thông tin Hội viên
            </router-link>
          </template>

          <!-- Member Menu -->
          <template v-else-if="isMember">
            <h3 class="text-gray-600 text-xs font-bold px-4 py-2 uppercase tracking-wider">ℹ️ Thông Tin</h3>
            <router-link 
              to="/dashboard/packages"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              📦 Gói tập của tôi
            </router-link>
            <router-link 
              to="/dashboard/profile"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              👤 Hồ sơ của tôi
            </router-link>
            <router-link 
              to="/dashboard/schedule"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              📅 Lịch tập
            </router-link>
            <router-link 
              v-if="canSelectTrainer"
              to="/dashboard/select-trainer"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50/50 hover:border-l-4 hover:border-blue-600 transition-all"
            >
              💪 Chọn Huấn luyện viên
            </router-link>

            <h3 class="text-gray-600 text-xs font-bold px-4 py-2 mt-6 uppercase tracking-wider">📊 Theo Dõi Tiến Độ</h3>
            <router-link 
              to="/dashboard/attendance"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50/50 hover:border-l-4 hover:border-indigo-600 transition-all"
            >
              🏃 Lịch sử tập luyện
            </router-link>
            <router-link 
              to="/dashboard/progress"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50/50 hover:border-l-4 hover:border-indigo-600 transition-all"
            >
              📈 Theo dõi tiến độ
            </router-link>
            <router-link 
              to="/dashboard/payments"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50/50 hover:border-l-4 hover:border-indigo-600 transition-all"
            >
              💳 Lịch sử thanh toán
            </router-link>
            <router-link 
              to="/dashboard/workout-plans"
              class="group card-modern block px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50/50 hover:border-l-4 hover:border-indigo-600 transition-all"
            >
              📅 Kế hoạch tập luyện
            </router-link>
          </template>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8 animate-fade-in">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authStore, ROLES, PACKAGES } from '../stores/authStore'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const currentUser = computed(() => authStore.currentUser.value || {})

    const isAdmin = computed(() => currentUser.value.role === ROLES.ADMIN)
    const isStaff = computed(() => currentUser.value.role === ROLES.STAFF)
    const isTrainer = computed(() => currentUser.value.role === ROLES.TRAINER)
    const isMember = computed(() => currentUser.value.role === ROLES.MEMBER)
    const canSelectTrainer = computed(() =>
      currentUser.value.packageLevel === PACKAGES.ELITE ||
      currentUser.value.packageLevel === PACKAGES.PREMIUM
    )

    const getRoleName = (role) => {
      const roleNames = {
        [ROLES.ADMIN]: 'Quản trị viên',
        [ROLES.STAFF]: 'Nhân viên',
        [ROLES.TRAINER]: 'Huấn luyện viên',
        [ROLES.MEMBER]: 'Hội viên'
      }
      return roleNames[role] || 'Không xác định'
    }

    const logout = () => {
      authStore.logout()
      router.push('/dang-nhap')
    }

    return {
      currentUser,
      isAdmin,
      isStaff,
      isTrainer,
      isMember,
      canSelectTrainer,
      getRoleName,
      logout
    }
  }
}
</script>
