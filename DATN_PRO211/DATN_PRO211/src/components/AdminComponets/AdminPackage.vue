
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold text-gray-900">Quản lý Gói tập</h2>
      <button @click="openAdd" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + Thêm Gói tập mới
      </button>
    </div>

    <!-- Search Bar (optional, future) -->
    <!-- <div class="flex gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm theo tên gói..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="performSearch"
        class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        🔍 Tìm kiếm
      </button>
    </div> -->

    <!-- Add/Edit Form Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <h3 class="text-2xl font-bold mb-6">
          {{ isEdit ? 'Sửa Gói tập' : 'Thêm Gói tập mới' }}
        </h3>
        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Tên gói</label>
            <input
              v-model="form.packageName"
              type="text"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
            <input
              v-model.number="form.price"
              type="number"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Thời hạn (tháng)</label>
            <input
              v-model.number="form.durationMonths"
              type="number"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div class="flex items-center mt-2">
            <input class="form-check-input mr-2" type="checkbox" v-model="form.isActive" />
            <label class="form-check-label text-sm">Hoạt động</label>
          </div>
          <div class="flex gap-4 mt-6">
            <button type="button" @click="close" class="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500">
              Hủy
            </button>
            <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Packages Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-200 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên gói</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Giá (VNĐ)</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời hạn</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành động</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="p in packages" :key="p.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900">{{ p.packageName }}</td>
            <td class="px-6 py-4 text-gray-600">{{ formatPrice(p.price) }}</td>
            <td class="px-6 py-4 text-gray-600">{{ p.durationMonths }} tháng</td>
            <td class="px-6 py-4">
              <span :class="p.isActive ? 'inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium' : 'inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium'">
                {{ p.isActive ? 'Hoạt động' : 'Ngừng' }}
              </span>
            </td>
            <td class="px-6 py-4 space-x-2">
              <button @click="openEdit(p)" class="text-blue-600 hover:text-blue-800 font-medium">
                ✏️ Sửa
              </button>
              <button @click="remove(p.id)" class="text-red-600 hover:text-red-800 font-medium">
                🗑️ Xóa
              </button>
            </td>
          </tr>
          <tr v-if="packages.length === 0">
            <td colspan="5" class="px-6 py-8 text-center text-gray-500">
              Không có gói tập nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const packages = ref([])
const showModal = ref(false)
const isEdit = ref(false)

const form = ref({
  id: null,
  packageName: '',
  price: 0,
  durationMonths: 1,
  isActive: true
})

const api = 'http://localhost:5170/api/Packages'

// LOAD
const loadPackages = async () => {
  const res = await axios.get(api)
  packages.value = res.data
}

onMounted(loadPackages)

// ADD
const openAdd = () => {
  isEdit.value = false
  form.value = {
    id: null,
    packageName: '',
    price: 0,
    durationMonths: 1,
    isActive: true
  }
  showModal.value = true
}

// EDIT
const openEdit = (p) => {
  isEdit.value = true
  form.value = { ...p }
  showModal.value = true
}

// SAVE
const save = async () => {
  if (isEdit.value) {
    await axios.put(`${api}/${form.value.id}`, form.value)
  } else {
    await axios.post(api, form.value)
  }
  showModal.value = false
  loadPackages()
}

// DELETE
const remove = async (id) => {
  if (confirm('Xóa gói tập này?')) {
    await axios.delete(`${api}/${id}`)
    loadPackages()
  }
}

const close = () => {
  showModal.value = false
}

const formatPrice = (v) =>
  v.toLocaleString('vi-VN') + 'đ'
</script>

<style scoped>

/* Tailwind utility classes are used for styling. If you want to add custom styles, you can add here. */
</style>
