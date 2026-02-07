<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">Gói tập của tôi</h2>
      <p class="text-gray-600 mt-2">Gói hiện tại: <span class="font-bold text-blue-600">{{ getPackageName(currentUser.packageLevel) }}</span></p>
    </div>

    <!-- Current Package Details -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Basic Package -->
      <div class="border-2" :class="currentUser.packageLevel === 'basic' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'">
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900">Basic</h3>
          <p class="text-gray-600 mt-2">300.000đ/tháng</p>
          
          <ul class="mt-6 space-y-3">
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Mua gói tập
            </li>
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Xem lịch tập
            </li>
            <li class="flex items-center text-gray-400">
              <span class="text-gray-300 mr-3">✗</span>
              Chọn huấn luyện viên
            </li>
          </ul>

          <button
            v-if="currentUser.packageLevel !== 'basic'"
            @click="upgradePackage('basic')"
            class="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Chọn gói này
          </button>
          <button
            v-else
            disabled
            class="mt-6 w-full bg-green-600 text-white py-2 rounded cursor-not-allowed"
          >
            ✓ Gói hiện tại
          </button>
        </div>
      </div>

      <!-- Premium Package -->
      <div class="border-2" :class="currentUser.packageLevel === 'premium' ? 'border-green-600 bg-green-50' : 'border-gray-300'">
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900">Premium</h3>
          <p class="text-gray-600 mt-2">600.000đ/tháng</p>
          
          <div class="absolute top-4 right-4">
            <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Phổ biến</span>
          </div>

          <ul class="mt-6 space-y-3">
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Mua gói tập
            </li>
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Xem lịch tập
            </li>
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Chọn huấn luyện viên
            </li>
          </ul>

          <button
            v-if="currentUser.packageLevel !== 'premium'"
            @click="upgradePackage('premium')"
            class="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Nâng cấp lên
          </button>
          <button
            v-else
            disabled
            class="mt-6 w-full bg-green-600 text-white py-2 rounded cursor-not-allowed"
          >
            ✓ Gói hiện tại
          </button>
        </div>
      </div>

      <!-- Elite Package -->
      <div class="border-2" :class="currentUser.packageLevel === 'elite' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'">
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900">Elite</h3>
          <p class="text-gray-600 mt-2">1.000.000đ/tháng</p>

          <div class="absolute top-4 right-4">
            <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">VIP</span>
          </div>

          <ul class="mt-6 space-y-3">
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Mua gói tập
            </li>
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Xem lịch tập
            </li>
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Chọn huấn luyện viên
            </li>
            <li class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✓</span>
              Hỗ trợ 24/7
            </li>
          </ul>

          <button
            v-if="currentUser.packageLevel !== 'elite'"
            @click="upgradePackage('elite')"
            class="mt-6 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Nâng cấp lên
          </button>
          <button
            v-else
            disabled
            class="mt-6 w-full bg-purple-600 text-white py-2 rounded cursor-not-allowed"
          >
            ✓ Gói hiện tại
          </button>
        </div>
      </div>
    </div>

    <!-- Package History -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Lịch sử gói tập</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <p class="font-semibold text-gray-900">{{ getPackageName(currentUser.packageLevel) }} - Đang sử dụng</p>
            <p class="text-sm text-gray-600">Kích hoạt từ {{ formatDate(currentUser.createdAt) }}</p>
          </div>
          <span class="text-green-600 font-bold">Đang hoạt động</span>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { authStore } from '../stores/authStore'

export default {
  name: 'MemberPackages',
  setup() {
    const currentUser = ref(authStore.currentUser.value)
    const successMessage = ref('')

    const getPackageName = (packageLevel) => {
      const names = {
        basic: 'Basic',
        premium: 'Premium',
        elite: 'Elite'
      }
      return names[packageLevel] || packageLevel
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('vi-VN')
    }

    const upgradePackage = (newPackage) => {
      authStore.updateMember(currentUser.value.id, { packageLevel: newPackage })
      currentUser.value = { ...currentUser.value, packageLevel: newPackage }
      successMessage.value = `Nâng cấp gói tập thành công! Gói mới: ${getPackageName(newPackage)}`
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    return {
      currentUser,
      successMessage,
      getPackageName,
      formatDate,
      upgradePackage
    }
  }
}
</script>
