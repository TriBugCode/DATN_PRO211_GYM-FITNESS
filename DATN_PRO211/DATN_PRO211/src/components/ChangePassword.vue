<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Đổi Mật Khẩu</h2>
        <p class="mt-2 text-gray-600">Cập nhật mật khẩu của bạn</p>
      </div>

      <!-- Check if user is logged in -->
      <div v-if="!isUserLoggedIn" class="bg-red-50 border border-red-200 rounded-md p-4">
        <p class="text-red-800 text-sm">
          Bạn cần
          <router-link to="/dang-nhap" class="font-medium hover:underline">
            đăng nhập
          </router-link>
          để đổi mật khẩu.
        </p>
      </div>

      <!-- Form -->
      <form v-if="isUserLoggedIn" class="mt-8 space-y-6" @submit.prevent="handleChangePassword">
        <!-- Current Password -->
        <div>
          <label for="currentPassword" class="block text-sm font-medium text-gray-700">
            Mật Khẩu Hiện Tại
          </label>
          <input
            id="currentPassword"
            v-model="currentPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập mật khẩu hiện tại"
          />
        </div>

        <!-- New Password -->
        <div>
          <label for="newPassword" class="block text-sm font-medium text-gray-700">
            Mật Khẩu Mới
          </label>
          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập mật khẩu mới"
          />
          <p class="mt-1 text-gray-500 text-xs">Mật khẩu phải có ít nhất 6 ký tự</p>
        </div>

        <!-- Confirm New Password -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Xác Nhận Mật Khẩu Mới
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>

        <!-- Password Strength Indicator -->
        <div v-if="newPassword" class="space-y-2">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-700">Độ mạnh:</span>
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full transition-all"
                :class="getPasswordStrengthClass()"
                :style="{ width: getPasswordStrength() + '%' }"
              ></div>
            </div>
          </div>
          <p class="text-xs text-gray-600">{{ getPasswordStrengthText() }}</p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="text-green-600 text-sm text-center">
          {{ successMessage }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {{ isLoading ? 'Đang xử lý...' : 'Đổi Mật Khẩu' }}
        </button>
      </form>

      <!-- Back Link -->
      <div class="text-center">
        <router-link to="/" class="text-blue-600 hover:text-blue-700 text-sm">
          Quay lại trang chủ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ChangePassword',
  setup() {
    const router = useRouter()
    const currentPassword = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    const isUserLoggedIn = ref(false)
    let currentUser = null

    onMounted(() => {
      // Check if user is logged in
      const user = localStorage.getItem('currentUser')
      if (user) {
        isUserLoggedIn.value = true
        currentUser = JSON.parse(user)
      }
    })

    const getPasswordStrength = () => {
      if (!newPassword.value) return 0

      let strength = 0
      // Length check
      if (newPassword.value.length >= 6) strength += 25
      if (newPassword.value.length >= 12) strength += 25
      // Complexity check
      if (/[a-z]/.test(newPassword.value)) strength += 12
      if (/[A-Z]/.test(newPassword.value)) strength += 13
      if (/[0-9]/.test(newPassword.value)) strength += 12
      if (/[^a-zA-Z0-9]/.test(newPassword.value)) strength += 13

      return Math.min(strength, 100)
    }

    const getPasswordStrengthClass = () => {
      const strength = getPasswordStrength()
      if (strength < 30) return 'bg-red-500'
      if (strength < 60) return 'bg-yellow-500'
      if (strength < 80) return 'bg-blue-500'
      return 'bg-green-500'
    }

    const getPasswordStrengthText = () => {
      const strength = getPasswordStrength()
      if (strength < 30) return 'Yếu'
      if (strength < 60) return 'Trung bình'
      if (strength < 80) return 'Tốt'
      return 'Rất tốt'
    }

    const handleChangePassword = async () => {
      errorMessage.value = ''
      successMessage.value = ''

      // Validation
      if (!currentPassword.value) {
        errorMessage.value = 'Vui lòng nhập mật khẩu hiện tại'
        return
      }

      if (!newPassword.value || !confirmPassword.value) {
        errorMessage.value = 'Vui lòng điền tất cả các trường'
        return
      }

      if (newPassword.value.length < 6) {
        errorMessage.value = 'Mật khẩu mới phải có ít nhất 6 ký tự'
        return
      }

      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = 'Mật khẩu xác nhận không khớp'
        return
      }

      if (currentPassword.value === newPassword.value) {
        errorMessage.value = 'Mật khẩu mới phải khác mật khẩu hiện tại'
        return
      }

      isLoading.value = true

      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')

        // Find user
        const userIndex = users.findIndex(u => u.email === currentUser.email)

        if (userIndex === -1) {
          errorMessage.value = 'Không tìm thấy người dùng'
          isLoading.value = false
          return
        }

        // Check current password
        if (users[userIndex].password !== currentPassword.value) {
          errorMessage.value = 'Mật khẩu hiện tại không chính xác'
          isLoading.value = false
          return
        }

        // Update password
        users[userIndex].password = newPassword.value
        localStorage.setItem('users', JSON.stringify(users))

        successMessage.value = 'Đổi mật khẩu thành công!'
        currentPassword.value = ''
        newPassword.value = ''
        confirmPassword.value = ''

        setTimeout(() => {
          router.push('/')
        }, 1500)
      } catch (error) {
        errorMessage.value = 'Lỗi: ' + error.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      isLoading,
      errorMessage,
      successMessage,
      isUserLoggedIn,
      handleChangePassword,
      getPasswordStrength,
      getPasswordStrengthClass,
      getPasswordStrengthText
    }
  }
}
</script>
