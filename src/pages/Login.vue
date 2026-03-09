<template>
  <div class="min-h-screen flex items-center justify-center bg-gym-dark px-4">
    <div class="max-w-md w-full bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20" data-aos="fade-up">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bebas text-gym-red mb-2">GYMSHARK</h1>
        <h2 class="text-2xl font-oswald text-white">Chào Mừng Trở Lại</h2>
        <p class="text-gym-text-secondary">Đăng nhập vào tài khoản của bạn</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-gym-text font-medium mb-2">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
            placeholder="Nhập email của bạn"
          />
        </div>

        <div>
          <label for="password" class="block text-gym-text font-medium mb-2">Mật Khẩu</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
            placeholder="Nhập mật khẩu của bạn"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              v-model="form.remember"
              type="checkbox"
              class="rounded border-gym-red/20 bg-gym-dark text-gym-red focus:ring-gym-red"
            />
            <span class="ml-2 text-gym-text-secondary">Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" class="text-gym-red hover:text-gym-orange transition-colors">Quên mật khẩu?</a>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gym-red hover:bg-gym-orange disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-glow"
        >
          <span v-if="loading">Đang đăng nhập...</span>
          <span v-else>Đăng Nhập</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gym-text-secondary">
          Chưa có tài khoản?
          <router-link to="/register" class="text-gym-red hover:text-gym-orange transition-colors font-semibold">Đăng ký</router-link>
        </p>
      </div>

      <!-- Demo credentials -->
      <div class="mt-8 p-4 bg-gym-dark rounded-lg border border-gym-red/20">
        <h3 class="text-gym-red font-semibold mb-3">Tài Khoản Demo</h3>
        <div class="space-y-2 text-sm">
          <div>
            <strong class="text-gym-orange">Admin:</strong>
            <span class="text-gym-text-secondary ml-2">admin@gym.com / 123456</span>
          </div>
          <div>
            <strong class="text-gym-orange">Trainer:</strong>
            <span class="text-gym-text-secondary ml-2">trainer@gym.com / 123456</span>
          </div>
          <div>
            <strong class="text-gym-orange">Member:</strong>
            <span class="text-gym-text-secondary ml-2">member@gym.com / 123456</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true

  try {
    // Demo login - in real app, this would be an API call
    let userData = null

    if (form.value.email === 'admin@gym.com' && form.value.password === '123456') {
      userData = {
        id: 1,
        name: 'Admin User',
        email: form.value.email,
        role: 'admin'
      }
    } else if (form.value.email === 'trainer@gym.com' && form.value.password === '123456') {
      userData = {
        id: 2,
        name: 'Trainer User',
        email: form.value.email,
        role: 'trainer'
      }
    } else if (form.value.email === 'member@gym.com' && form.value.password === '123456') {
      userData = {
        id: 3,
        name: 'Member User',
        email: form.value.email,
        role: 'member'
      }
    } else if (form.value.email === 'demo@gymshark.com' && form.value.password === 'demo123') {
      userData = {
        id: 4,
        name: 'Demo User',
        email: form.value.email,
        role: 'member'
      }
    }

    if (userData) {
      authStore.login(userData)

      // Redirect based on role
      if (userData.role === 'admin') {
        router.push('/admin')
      } else if (userData.role === 'trainer') {
        router.push('/trainer')
      } else {
        router.push('/dashboard')
      }
    } else {
      alert('Thông tin đăng nhập không hợp lệ. Vui lòng sử dụng tài khoản demo.')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('Đăng nhập thất bại. Vui lòng thử lại.')
  } finally {
    loading.value = false
  }
}
</script>