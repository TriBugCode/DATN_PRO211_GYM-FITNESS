<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Đăng Nhập</h2>
        <p class="mt-2 text-gray-600">Chào mừng trở lại</p>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
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
            placeholder="Nhập mật khẩu"
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

        <!-- Forgot Password Link -->
        <div class="flex justify-end">
          <router-link to="/quen-mat-khau" class="text-blue-600 hover:text-blue-700 text-sm">
            Quên mật khẩu?
          </router-link>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {{ isLoading ? 'Đang xử lý...' : 'Đăng Nhập' }}
        </button>
      </form>

      <!-- Sign Up Link -->
      <div class="text-center">
        <p class="text-gray-600">
          Chưa có tài khoản?
          <router-link to="/dang-ki" class="text-blue-600 hover:text-blue-700 font-medium">
            Đăng kí ngay
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authStore'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')

    const handleLogin = async () => {
      if (!email.value || !password.value) {
        errorMessage.value = 'Vui lòng nhập email và mật khẩu'
        return
      }

      isLoading.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))

          const result = await authStore.login(email.value, password.value)
        
        if (result.success) {
          successMessage.value = 'Đăng nhập thành công!'
          router.push('/dashboard')
        } else {
          errorMessage.value = result.message
        }
      } catch (error) {
        errorMessage.value = 'Lỗi: ' + error.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      isLoading,
      errorMessage,
      successMessage,
      handleLogin
    }
  }
}
</script>
