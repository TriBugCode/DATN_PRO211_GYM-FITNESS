<template>
  <div class="min-h-screen flex items-center justify-center bg-gym-dark px-4 py-12">
    <div class="max-w-md w-full bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20" data-aos="fade-up">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bebas text-gym-red mb-2">GYMSHARK</h1>
        <h2 class="text-2xl font-oswald text-white">Tham Gia Với Chúng Tôi</h2>
        <p class="text-gym-text-secondary">Bắt đầu hành trình fitness của bạn ngay hôm nay</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="name" class="block text-gym-text font-medium mb-2">Họ và Tên</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
            placeholder="Nhập họ và tên đầy đủ"
          />
        </div>

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
            minlength="6"
            class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
            placeholder="Tạo mật khẩu"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-gym-text font-medium mb-2">Xác Nhận Mật Khẩu</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
            class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
            placeholder="Xác nhận mật khẩu của bạn"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gym-red hover:bg-gym-orange disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-glow"
        >
          <span v-if="loading">Đang Tạo Tài Khoản...</span>
          <span v-else>Tạo Tài Khoản</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gym-text-secondary">
          Đã có tài khoản?
          <router-link to="/login" class="text-gym-red hover:text-gym-orange transition-colors font-semibold">Đăng nhập</router-link>
        </p>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  loading.value = true

  try {
    // Demo registration - in real app, this would be an API call
    authStore.register({
      id: Date.now(),
      name: form.value.name,
      email: form.value.email
    })

    alert('Account created successfully! Welcome to Gymshark!')
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration error:', error)
    alert('Registration failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>