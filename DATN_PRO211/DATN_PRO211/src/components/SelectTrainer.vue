<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">Chọn Huấn luyện viên</h2>
      <p class="text-gray-600 mt-2">
        Gói tập của bạn: <span class="font-bold text-blue-600">{{ getPackageName(currentUser.packageLevel) }}</span>
      </p>
      <p v-if="!canSelectTrainer" class="text-red-600 mt-2">
        ⚠️ Bạn cần nâng cấp lên gói Premium hoặc Elite để chọn huấn luyện viên
      </p>
    </div>

    <!-- Trainers Grid -->
    <div v-if="canSelectTrainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="trainer in trainers"
        :key="trainer.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        :class="currentUser.selectedTrainer === trainer.id ? 'ring-4 ring-blue-500' : ''"
      >
        <!-- Trainer Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-400 h-24"></div>

        <!-- Trainer Info -->
        <div class="p-6 -mt-12 relative">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900">{{ trainer.name }}</h3>
              <p class="text-sm text-gray-600">{{ trainer.specialty }}</p>
            </div>
            <span
              v-if="currentUser.selectedTrainer === trainer.id"
              class="bg-blue-500 text-white rounded-full p-2"
            >
              ✓
            </span>
          </div>

          <!-- Trainer Details -->
          <div class="space-y-2 mb-4 text-sm text-gray-600">
            <p>📧 {{ trainer.email }}</p>
            <p>📱 {{ trainer.phone }}</p>
          </div>

          <!-- Bio/Description -->
          <div class="mb-4 p-3 bg-gray-50 rounded">
            <p class="text-sm text-gray-700">
              Chuyên gia trong lĩnh vực {{ trainer.specialty }} với kinh nghiệm nhiều năm đào tạo hội viên.
            </p>
          </div>

          <!-- Select Button -->
          <button
            @click="selectTrainer(trainer.id)"
            :class="currentUser.selectedTrainer === trainer.id
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'"
            class="w-full text-white py-2 rounded font-medium transition-colors"
          >
            {{ currentUser.selectedTrainer === trainer.id ? '✓ Đã chọn' : 'Chọn huấn luyện viên này' }}
          </button>
        </div>
      </div>

      <div v-if="trainers.length === 0" class="col-span-full text-center text-gray-500 py-12">
        Hiện chưa có huấn luyện viên nào
      </div>
    </div>

    <!-- Package Upgrade Offer -->
    <div v-else class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
      <h3 class="text-2xl font-bold mb-4">Nâng cấp lên Premium hoặc Elite</h3>
      <p class="mb-6">
        Chỉ gói Premium và Elite mới có thể chọn huấn luyện viên cá nhân. 
        Nâng cấp ngay để có được sự hướng dẫn chuyên môn từ các huấn luyện viên hàng đầu.
      </p>
      <router-link
        to="/dashboard/packages"
        class="inline-block bg-white text-blue-600 px-6 py-3 rounded font-bold hover:bg-gray-100 transition-colors"
      >
        Xem các gói tập
      </router-link>
    </div>

    <!-- Current Trainer Info -->
    <div v-if="canSelectTrainer && currentUser.selectedTrainer" class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Huấn luyện viên hiện tại</h3>
      <div v-if="currentTrainerInfo" class="flex items-start gap-6">
        <div class="flex-1">
          <p class="text-lg font-semibold text-gray-900">{{ currentTrainerInfo.name }}</p>
          <p class="text-gray-600 mt-1">Chuyên môn: {{ currentTrainerInfo.specialty }}</p>
          <p class="text-gray-600 mt-1">📧 {{ currentTrainerInfo.email }}</p>
          <p class="text-gray-600 mt-1">📱 {{ currentTrainerInfo.phone }}</p>
          <button
            @click="removeTrainer"
            class="mt-4 text-red-600 hover:text-red-800 font-medium"
          >
            Hủy chọn huấn luyện viên
          </button>
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
import { ref, computed } from 'vue'
import { authStore, PACKAGES } from '../stores/authStore'

export default {
  name: 'SelectTrainer',
  setup() {
    const currentUser = ref(authStore.currentUser.value)
    const trainers = ref(authStore.getAllTrainers())
    const successMessage = ref('')

    const canSelectTrainer = computed(() =>
      currentUser.value?.packageLevel === PACKAGES.PREMIUM ||
      currentUser.value?.packageLevel === PACKAGES.ELITE
    )

    const currentTrainerInfo = computed(() => {
      if (!currentUser.value?.selectedTrainer) return null
      return trainers.value.find(t => t.id === currentUser.value.selectedTrainer)
    })

    const getPackageName = (packageLevel) => {
      const names = {
        basic: 'Basic',
        premium: 'Premium',
        elite: 'Elite'
      }
      return names[packageLevel] || packageLevel
    }

    const selectTrainer = (trainerId) => {
      authStore.updateMember(currentUser.value.id, { selectedTrainer: trainerId })
      currentUser.value = { ...currentUser.value, selectedTrainer: trainerId }
      successMessage.value = `Đã chọn huấn luyện viên ${currentTrainerInfo.value.name}`
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    const removeTrainer = () => {
      authStore.updateMember(currentUser.value.id, { selectedTrainer: '' })
      currentUser.value = { ...currentUser.value, selectedTrainer: '' }
      successMessage.value = 'Đã hủy chọn huấn luyện viên'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    return {
      currentUser,
      trainers,
      successMessage,
      canSelectTrainer,
      currentTrainerInfo,
      getPackageName,
      selectTrainer,
      removeTrainer
    }
  }
}
</script>
