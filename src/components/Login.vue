<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-cyan-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
    <!-- Animated Background Blobs (teal/cyan accents) -->
    <div class="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/12 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

    <!-- Card Container -->
    <div class="max-w-md w-full relative z-30">
      <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 hover-lift">
        <!-- Header -->
        <div class="text-center mb-8 fade-up">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mb-4 rotate-slow">
            <span class="text-2xl">💪</span>
          </div>
          <h2 class="text-4xl font-bold text-cyan-50">Đăng Nhập</h2>
          <p class="mt-2 text-cyan-100 text-lg">Chào mừng trở lại, bạn 👋</p>
        </div>

        <!-- Form -->
        <form class="space-y-6 fade-up stagger-1" @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div class="relative">
            <label for="email" class="block text-sm font-semibold text-cyan-100 mb-2">
              📧 Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="example@gmail.com"
            />
          </div>

          <!-- Password Input -->
          <div class="relative">
            <label for="password" class="block text-sm font-semibold text-cyan-100 mb-2">
              🔐 Mật khẩu
            </label>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Nhập mật khẩu"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-11 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>

          <!-- Error Message -->
          <transition name="slide">
            <div v-if="errorMessage" class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm fade-up">
              ❌ {{ errorMessage }}
            </div>
          </transition>

          <!-- Success Message -->
          <transition name="slide">
            <div v-if="successMessage" class="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm fade-up">
              ✅ {{ successMessage }}
            </div>
          </transition>

          <!-- Forgot Password Link -->
          <div class="flex justify-end">
            <router-link 
              to="/quen-mat-khau" 
              class="text-sm text-cyan-200 hover:text-cyan-50 hover:underline transition-colors font-medium"
            >
              Quên mật khẩu?
            </router-link>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full btn-modern btn-gradient text-white py-3 rounded-lg font-bold flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="animate-spin">⏳</span>
            <span>{{ isLoading ? 'Đang xử lý...' : 'Đăng Nhập' }}</span>
          </button>
        </form>

        <!-- Divider -->
          <div class="my-6 flex items-center space-x-3">
          <div class="flex-1 h-px bg-cyan-200/40"></div>
          <span class="text-cyan-100 text-xs">Hoặc</span>
          <div class="flex-1 h-px bg-cyan-200/40"></div>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center">
            <p class="text-cyan-100">
            Chưa có tài khoản?
            <router-link 
              to="/dang-ki" 
              class="text-cyan-200 hover:text-cyan-50 font-bold transition-colors hover:underline"
            >
              Đăng kí ngay
            </router-link>
          </p>
        </div>

        <!-- Test Credentials Hint -->
        <div class="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p class="text-xs text-gray-800 text-center">
            🧪 Test: admin@gym.com / 123456<br/>
            Or: member@gym.com / 123456
          </p>
        </div>
      </div>

      <!-- Bottom Info -->
      <div class="mt-8 text-center text-gray-400 text-sm fade-up stagger-2">
        <p>🔒 Thông tin của bạn được bảo vệ an toàn</p>
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
    const showPassword = ref(false)
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

        const result = authStore.login(email.value, password.value)
        
        if (result.success) {
          successMessage.value = `Chào mừng ${result.user.name}`
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
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
      showPassword,
      isLoading,
      errorMessage,
      successMessage,
      handleLogin
    }
  }
}
</script>
