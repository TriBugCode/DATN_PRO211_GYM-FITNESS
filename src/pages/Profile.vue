<template>
  <div class="p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bebas text-gym-red mb-8">Cài Đặt Hồ Sơ</h1>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 mb-8" data-aos="fade-up">
        <h2 class="text-2xl font-oswald text-white mb-6">Thông Tin Cá Nhân</h2>

        <form @submit.prevent="updateProfile" class="space-y-6">
          <div>
            <label for="name" class="block text-gym-text font-medium mb-2">Họ và Tên</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
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
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="bg-gym-red hover:bg-gym-orange disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors"
          >
            <span v-if="loading">Đang Cập Nhật...</span>
            <span v-else>Cập Nhật Hồ Sơ</span>
          </button>
        </form>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20" data-aos="fade-up" data-aos-delay="100">
        <h2 class="text-2xl font-oswald text-white mb-6">Đổi Mật Khẩu</h2>

        <form @submit.prevent="changePassword" class="space-y-6">
          <div>
            <label for="currentPassword" class="block text-gym-text font-medium mb-2">Mật Khẩu Hiện Tại</label>
            <input
              id="currentPassword"
              v-model="passwordForm.current"
              type="password"
              required
              class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>

          <div>
            <label for="newPassword" class="block text-gym-text font-medium mb-2">Mật Khẩu Mới</label>
            <input
              id="newPassword"
              v-model="passwordForm.new"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-gym-text font-medium mb-2">Xác Nhận Mật Khẩu Mới</label>
            <input
              id="confirmPassword"
              v-model="passwordForm.confirm"
              type="password"
              required
              class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none transition-colors"
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>

          <button
            type="submit"
            :disabled="passwordLoading"
            class="bg-gym-red hover:bg-gym-orange disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors"
          >
            <span v-if="passwordLoading">Đang Đổi...</span>
            <span v-else>Đổi Mật Khẩu</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const form = ref({
  name: '',
  email: ''
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const loading = ref(false)
const passwordLoading = ref(false)

onMounted(() => {
  if (authStore.user) {
    form.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || ''
    }
  }
})

const updateProfile = async () => {
  loading.value = true

  try {
    authStore.updateProfile(form.value)
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Update error:', error)
    alert('Failed to update profile. Please try again.')
  } finally {
    loading.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('New passwords do not match')
    return
  }

  passwordLoading.value = true

  try {
    // In a real app, this would be an API call
    alert('Password changed successfully!')
    passwordForm.value = { current: '', new: '', confirm: '' }
  } catch (error) {
    console.error('Password change error:', error)
    alert('Failed to change password. Please try again.')
  } finally {
    passwordLoading.value = false
  }
}
</script>