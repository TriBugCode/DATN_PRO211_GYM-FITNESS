<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold">Trang Hồ Sơ</h2>

    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold mb-4">Thông tin cá nhân</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm text-gray-700">Ảnh đại diện</label>
          <input type="file" accept="image/*" @change="handlePhoto" class="mt-2" />
          <div v-if="editable.photo || currentUser.photo" class="mt-3">
            <img :src="editable.photo || currentUser.photo" class="w-28 h-28 rounded-full object-cover" />
          </div>
        </div>

        <div class="md:col-span-2 space-y-3">
          <div class="flex gap-4">
            <input v-model="editable.name" class="flex-1 px-3 py-2 border rounded" placeholder="Họ tên" />
            <input v-model="editable.phone" class="flex-1 px-3 py-2 border rounded" placeholder="Số điện thoại" />
          </div>
          <div class="flex gap-4">
            <input v-model="editable.address" class="flex-1 px-3 py-2 border rounded" placeholder="Địa chỉ" />
            <input v-model="editable.dob" type="date" class="flex-1 px-3 py-2 border rounded" />
          </div>
          <div class="flex items-center gap-4">
            <label class="text-sm">Giới tính</label>
            <select v-model="editable.gender" class="px-3 py-2 border rounded">
              <option value="">--Chọn--</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <button @click="save" class="ml-auto bg-blue-600 text-white px-4 py-2 rounded">Lưu hồ sơ</button>
          </div>

          <div v-if="message" class="text-green-600">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { authStore } from '../stores/authStore'

export default {
  name: 'Profile',
  setup() {
    const currentUser = computed(() => authStore.currentUser.value || {})
    const editable = ref({ ...authStore.currentUser.value })
    const message = ref('')

    watch(() => authStore.currentUser.value, (val) => {
      editable.value = { ...val }
    })

    const handlePhoto = (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        editable.value.photo = ev.target.result
      }
      reader.readAsDataURL(file)
    }

    const save = () => {
      const payload = {
        name: editable.value.name,
        phone: editable.value.phone,
        address: editable.value.address || '',
        dob: editable.value.dob || '',
        gender: editable.value.gender || '',
        photo: editable.value.photo || ''
      }
      if (!currentUser.value || !currentUser.value.id) return
      authStore.updateMember(currentUser.value.id, payload)
      message.value = 'Lưu hồ sơ thành công'
      setTimeout(() => (message.value = ''), 3000)
    }

    return {
      currentUser,
      editable,
      handlePhoto,
      save,
      message
    }
  }
}
</script>
