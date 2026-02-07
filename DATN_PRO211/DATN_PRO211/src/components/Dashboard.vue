<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <router-link 
            to="/"
            class="text-gray-600 hover:text-blue-600 font-medium text-lg"
          >
            ← Trang Chủ
          </router-link>
          <h1 class="text-2xl font-bold text-blue-600 border-l-4 border-blue-600 pl-4">GYM Management</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">{{ currentUser.name }}</span>
          <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {{ getRoleName(currentUser.role) }}
          </span>
          <button 
            @click="logout"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow min-h-screen">
        <nav class="p-6 space-y-2">
          <!-- Quick Navigation -->
          <router-link 
            to="/"
            class="block px-4 py-2 rounded hover:bg-green-50 text-green-700 font-medium border-l-4 border-green-600 mb-4"
          >
            🏠 Về Trang Chủ
          </router-link>

          <!-- Admin Menu -->
          <template v-if="isAdmin">
            <h3 class="text-gray-600 text-sm font-bold px-4 py-2">QUẢN LÝ</h3>
            <router-link 
              to="/dashboard/members"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📋 Quản lý Hội viên
            </router-link>
            <router-link 
              to="/dashboard/trainers"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              💪 Quản lý Huấn luyện viên
            </router-link>
            <router-link 
              to="/dashboard/staff"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              👥 Quản lý Nhân viên
            </router-link>
            <router-link 
              to="/dashboard/admin-package"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📦 Quản lý Gói tập
            </router-link>
            <router-link 
              to="/dashboard/reports"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📊 Báo cáo thống kê
            </router-link>
          </template>

          <!-- Staff Menu -->
          <template v-else-if="isStaff">
            <h3 class="text-gray-600 text-sm font-bold px-4 py-2">CÔNG VIỆC</h3>
            <router-link 
              to="/dashboard/members"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📋 Quản lý Hội viên
            </router-link>
            <router-link 
              to="/dashboard/reports"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📊 Báo cáo thống kê
            </router-link>
          </template>

          <!-- Trainer Menu -->
          <template v-else-if="isTrainer">
            <h3 class="text-gray-600 text-sm font-bold px-4 py-2">CÔNG VIỆC</h3>
            <router-link 
              to="/dashboard/schedule"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📅 Lịch tập
            </router-link>
            <router-link 
              to="/dashboard/members"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              👤 Thông tin Hội viên
            </router-link>
          </template>

          <!-- Member Menu -->
          <template v-else-if="isMember">
            <h3 class="text-gray-600 text-sm font-bold px-4 py-2">THÔNG TIN</h3>
            <router-link 
              to="/dashboard/packages"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📦 Gói tập của tôi
            </router-link>
            <router-link 
              to="/dashboard/schedule"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              📅 Lịch tập
            </router-link>
            <router-link 
              v-if="canSelectTrainer"
              to="/dashboard/select-trainer"
              class="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700"
            >
              💪 Chọn Huấn luyện viên
            </router-link>
          </template>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authStore, ROLES, PACKAGES } from '../stores/authStore'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const currentUser = ref(authStore.currentUser.value)

    const isAdmin = computed(() => currentUser.value?.role === ROLES.ADMIN)
    const isStaff = computed(() => currentUser.value?.role === ROLES.STAFF)
    const isTrainer = computed(() => currentUser.value?.role === ROLES.TRAINER)
    const isMember = computed(() => currentUser.value?.role === ROLES.MEMBER)
    const canSelectTrainer = computed(() => 
      currentUser.value?.packageLevel === PACKAGES.ELITE ||
      currentUser.value?.packageLevel === PACKAGES.PREMIUM
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
