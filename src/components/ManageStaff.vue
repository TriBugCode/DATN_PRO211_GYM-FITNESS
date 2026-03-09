<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold text-gray-900">Quản lý Nhân viên</h2>
      <button
        v-if="canAddStaff"
        @click="showAddForm = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Thêm Nhân viên mới
      </button>
    </div>

    <!-- Search Bar -->
    <div class="flex gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="performSearch"
        class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        🔍 Tìm kiếm
      </button>
    </div>

    <!-- Add/Edit Form Modal -->
    <div v-if="showAddForm || editingStaff" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <h3 class="text-2xl font-bold mb-6">
          {{ editingStaff ? 'Sửa Nhân viên' : 'Thêm Nhân viên mới' }}
        </h3>
        
        <form @submit.prevent="saveStaff" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              v-model="formData.password"
              type="password"
              :required="!editingStaff"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
            <p v-if="editingStaff" class="text-xs text-gray-500 mt-1">Để trống nếu không muốn thay đổi</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              v-model="formData.phone"
              type="tel"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Chức vụ</label>
            <input
              v-model="formData.position"
              type="text"
              placeholder="VD: Quản lý, Lễ tân, Bảo vệ..."
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div v-if="formError" class="text-red-600 text-sm">{{ formError }}</div>

          <div class="flex gap-4 mt-6">
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {{ editingStaff ? 'Cập nhật' : 'Thêm' }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Staff Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-200 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Họ tên</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Chức vụ</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày tham gia</th>
            <th v-if="canEditStaff" class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành động</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="staff in displayStaff" :key="staff.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900">{{ staff.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ staff.email }}</td>
            <td class="px-6 py-4 text-gray-600">{{ staff.phone }}</td>
            <td class="px-6 py-4 text-gray-600">{{ staff.position || 'N/A' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ formatDate(staff.createdAt) }}</td>
            <td v-if="canEditStaff" class="px-6 py-4 space-x-2">
              <button
                @click="startEdit(staff)"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                ✏️ Sửa
              </button>
              <button
                @click="deleteStaff(staff.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                🗑️ Xóa
              </button>
            </td>
          </tr>
          <tr v-if="displayStaff.length === 0">
            <td :colspan="canEditStaff ? 6 : 5" class="px-6 py-8 text-center text-gray-500">
              Không có nhân viên nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { authStore } from '../stores/authStore'

export default {
  name: 'ManageStaff',
  setup() {
    const staff = ref(authStore.getAllStaff())
    const searchQuery = ref('')
    const searchResults = ref(null)
    const showAddForm = ref(false)
    const editingStaff = ref(null)
    const formError = ref('')

    const formData = ref({
      name: '',
      email: '',
      password: '',
      phone: '',
      position: ''
    })

    const canAddStaff = computed(() => authStore.canAccess('add-staff'))
    const canEditStaff = computed(() => authStore.canAccess('edit-staff') || authStore.canAccess('delete-staff'))

    const displayStaff = computed(() => {
      return searchResults.value || staff.value
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('vi-VN')
    }

    const performSearch = () => {
      if (!searchQuery.value.trim()) {
        searchResults.value = null
        return
      }
      searchResults.value = authStore.searchStaff(searchQuery.value)
    }

    const resetForm = () => {
      showAddForm.value = false
      editingStaff.value = null
      formError.value = ''
      formData.value = {
        name: '',
        email: '',
        password: '',
        phone: '',
        position: ''
      }
    }

    const startEdit = (staffMember) => {
      editingStaff.value = staffMember
      formData.value = { ...staffMember }
    }

    const saveStaff = async () => {
      if (!formData.value.name || !formData.value.email || !formData.value.phone) {
        formError.value = 'Vui lòng điền đầy đủ thông tin'
        return
      }

      if (editingStaff.value) {
        if (formData.value.password === '') {
          delete formData.value.password
        }
        authStore.updateStaff(editingStaff.value.id, formData.value)
      } else {
        if (!formData.value.password) {
          formError.value = 'Vui lòng nhập mật khẩu'
          return
        }
        authStore.addStaff(formData.value)
      }

      staff.value = authStore.getAllStaff()
      resetForm()
    }

    const deleteStaff = (staffId) => {
      if (confirm('Bạn chắc chắn muốn xóa nhân viên này?')) {
        authStore.deleteStaff(staffId)
        staff.value = authStore.getAllStaff()
      }
    }

    return {
      staff,
      searchQuery,
      searchResults,
      showAddForm,
      editingStaff,
      formData,
      formError,
      canAddStaff,
      canEditStaff,
      displayStaff,
      formatDate,
      performSearch,
      resetForm,
      startEdit,
      saveStaff,
      deleteStaff
    }
  }
}
</script>
