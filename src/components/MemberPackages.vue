<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">Gói tập của tôi</h2>
      <p class="text-gray-600 mt-2">Gói hiện tại: <span class="font-bold text-blue-600">{{ getPackageName(currentUser.packageLevel) }}</span></p>
    </div>

    <!-- Personal Info -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Thông tin cá nhân</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm text-gray-700">Ảnh đại diện</label>
          <input type="file" accept="image/*" @change="handleProfilePhoto" class="mt-2" />
          <div v-if="editableProfile.photo || currentUser.photo" class="mt-3">
            <img :src="editableProfile.photo || currentUser.photo" class="w-28 h-28 rounded-full object-cover" />
          </div>
        </div>
        <div class="md:col-span-2 space-y-3">
          <div class="flex gap-4">
            <input v-model="editableProfile.name" class="flex-1 px-3 py-2 border rounded" placeholder="Họ tên" />
            <input v-model="editableProfile.phone" class="flex-1 px-3 py-2 border rounded" placeholder="Số điện thoại" />
          </div>
          <div class="flex gap-4">
            <input v-model="editableProfile.address" class="flex-1 px-3 py-2 border rounded" placeholder="Địa chỉ" />
            <input v-model="editableProfile.dob" type="date" class="flex-1 px-3 py-2 border rounded" />
          </div>
          <div class="flex items-center gap-4">
            <label class="text-sm">Giới tính</label>
            <select v-model="editableProfile.gender" class="px-3 py-2 border rounded">
              <option value="">--Chọn--</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <button @click="saveProfile" class="ml-auto bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
          </div>
          <div v-if="profileMessage" class="text-green-600">{{ profileMessage }}</div>
        </div>
      </div>
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
            <p class="text-sm text-gray-600">Hạn gói: {{ formatDateNullable(currentUser.packageExpiry) }}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-green-600 font-bold">Đang hoạt động</div>
            <input type="number" min="1" v-model.number="renewMonths" class="w-20 px-2 py-1 border rounded" />
            <button @click="renewPackage(renewMonths)" class="bg-indigo-600 text-white px-3 py-1 rounded">Gia hạn (tháng)</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      {{ successMessage }}
    </div>
    <div v-if="renewMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-3">
      {{ renewMessage }}
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { authStore } from '../stores/authStore'

export default {
  name: 'MemberPackages',
  setup() {
    const currentUser = computed(() => authStore.currentUser.value || {})
    const editableProfile = ref({ ...authStore.currentUser.value })
    const successMessage = ref('')
    const profileMessage = ref('')
    const renewMessage = ref('')
    const renewMonths = ref(1)

    // Keep editableProfile in sync when authStore.currentUser changes
    watch(() => authStore.currentUser.value, (val) => {
      editableProfile.value = { ...val }
    })

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
      successMessage.value = `Nâng cấp gói tập thành công! Gói mới: ${getPackageName(newPackage)}`
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    const formatDateNullable = (dateString) => {
      if (!dateString) return 'Chưa có'
      return new Date(dateString).toLocaleDateString('vi-VN')
    }

    const handleProfilePhoto = (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        editableProfile.value.photo = ev.target.result
      }
      reader.readAsDataURL(file)
    }

    const saveProfile = () => {
      const payload = {
        name: editableProfile.value.name,
        phone: editableProfile.value.phone,
        address: editableProfile.value.address || '',
        dob: editableProfile.value.dob || '',
        gender: editableProfile.value.gender || '',
        photo: editableProfile.value.photo || ''
      }
      authStore.updateMember(currentUser.value.id, payload)
      profileMessage.value = 'Cập nhật thông tin cá nhân thành công'
      setTimeout(() => (profileMessage.value = ''), 3000)
    }

    const renewPackage = (months = 1) => {
      authStore.renewMemberPackage(currentUser.value.id, months)
      renewMessage.value = `Gia hạn thành công ${months} tháng. Hạn mới: ${formatDateNullable(authStore.currentUser.value?.packageExpiry)}`
      setTimeout(() => (renewMessage.value = ''), 4000)
    }

    return {
      currentUser,
      editableProfile,
      successMessage,
      profileMessage,
      renewMessage,
      renewMonths,
      getPackageName,
      formatDate,
      upgradePackage,
      handleProfilePhoto,
      saveProfile,
      renewPackage,
      formatDateNullable
    }
  }
}
</script>
