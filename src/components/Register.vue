<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Đăng Kí</h2>
        <p class="mt-2 text-gray-600">Tạo tài khoản mới</p>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <!-- Full Name -->
        <div>
          <label for="fullname" class="block text-sm font-medium text-gray-700">
            Họ và Tên
          </label>
          <input
            id="fullname"
            v-model="fullname"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập họ và tên"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@gmail.com"
          />
        </div>

        <!-- Phone -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="0123456789"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
          />
          <p class="mt-1 text-gray-500 text-xs">Mật khẩu phải có ít nhất 6 ký tự</p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Xác nhận Mật khẩu
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập lại mật khẩu"
          />
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
          {{ isLoading ? 'Đang xử lý...' : 'Đăng Kí' }}
        </button>
      </form>

      <!-- Login Link -->
      <div class="text-center">
        <p class="text-gray-600">
          Đã có tài khoản?
          <router-link to="/dang-nhap" class="text-blue-600 hover:text-blue-700 font-medium">
            Đăng nhập ngay
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore, PACKAGES } from '../stores/authStore'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const fullname = ref('')
    const email = ref('')
    const phone = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')

    const handleRegister = async () => {
      errorMessage.value = ''
      successMessage.value = ''

      // Validation
      if (!fullname.value || !email.value || !phone.value || !password.value || !confirmPassword.value) {
        errorMessage.value = 'Vui lòng điền tất cả các trường'
        return
      }

      if (password.value.length < 6) {
        errorMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự'
        return
      }

      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Mật khẩu xác nhận không khớp'
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Email không hợp lệ'
        return
      }

      isLoading.value = true

      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Check if email already exists
        const allMembers = authStore.getAllMembers()
        if (allMembers.some(m => m.email === email.value)) {
          errorMessage.value = 'Email này đã được đăng kí'
          isLoading.value = false
          return
        }

        // Create new member
        authStore.addMember({
          name: fullname.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
          packageLevel: PACKAGES.BASIC,
          selectedTrainer: ''
        })

        successMessage.value = 'Đăng kí thành công! Hãy đăng nhập để tiếp tục'
        setTimeout(() => {
          router.push('/dang-nhap')
        }, 1500)
      } catch (error) {
        errorMessage.value = 'Lỗi: ' + error.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      fullname,
      email,
      phone,
      password,
      confirmPassword,
      isLoading,
      errorMessage,
      successMessage,
      handleRegister
    }
  }
}
</script>
