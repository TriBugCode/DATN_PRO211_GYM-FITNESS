<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold text-gray-900">Quản lý Huấn luyện viên</h2>
      <button
        v-if="canAddTrainer"
        @click="showAddForm = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Thêm Huấn luyện viên mới
      </button>
    </div>

    <!-- Search Bar -->
    <div class="flex gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm theo tên, email hoặc chuyên môn..."
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
    <div v-if="showAddForm || editingTrainer" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <h3 class="text-2xl font-bold mb-6">
          {{ editingTrainer ? 'Sửa Huấn luyện viên' : 'Thêm Huấn luyện viên mới' }}
        </h3>
        
        <form @submit.prevent="saveTrainer" class="space-y-4">
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
              :required="!editingTrainer"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
            <p v-if="editingTrainer" class="text-xs text-gray-500 mt-1">Để trống nếu không muốn thay đổi</p>
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
            <label class="block text-sm font-medium text-gray-700">Chuyên môn</label>
            <select
              v-model="formData.specialty"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            >
              <option value="">-- Chọn chuyên môn --</option>
              <option value="Fitness">Fitness</option>
              <option value="Yoga">Yoga</option>
              <option value="Boxing">Boxing</option>
              <option value="Swimming">Swimming</option>
              <option value="Aerobics">Aerobics</option>
              <option value="Weight Training">Weight Training</option>
              <option value="Functional Training">Functional Training</option>
            </select>
          </div>

          <div v-if="formError" class="text-red-600 text-sm">{{ formError }}</div>

          <div class="flex gap-4 mt-6">
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {{ editingTrainer ? 'Cập nhật' : 'Thêm' }}
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

    <!-- Trainers Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-200 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Họ tên</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Chuyên môn</th>
            <th v-if="canEditTrainer" class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành động</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="trainer in displayTrainers" :key="trainer.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900">{{ trainer.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ trainer.email }}</td>
            <td class="px-6 py-4 text-gray-600">{{ trainer.phone }}</td>
            <td class="px-6 py-4">
              <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ trainer.specialty }}
              </span>
            </td>
            <td v-if="canEditTrainer" class="px-6 py-4 space-x-2">
              <button
                @click="startEdit(trainer)"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                ✏️ Sửa
              </button>
              <button
                @click="deleteTrainer(trainer.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                🗑️ Xóa
              </button>
            </td>
          </tr>
          <tr v-if="displayTrainers.length === 0">
            <td :colspan="canEditTrainer ? 5 : 4" class="px-6 py-8 text-center text-gray-500">
              Không có huấn luyện viên nào
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
  name: 'ManageTrainers',
  setup() {
    const trainers = ref(authStore.getAllTrainers())
    const searchQuery = ref('')
    const searchResults = ref(null)
    const showAddForm = ref(false)
    const editingTrainer = ref(null)
    const formError = ref('')

    const formData = ref({
      name: '',
      email: '',
      password: '',
      phone: '',
      specialty: ''
    })

    const canAddTrainer = computed(() => authStore.canAccess('add-trainer'))
    const canEditTrainer = computed(() => authStore.canAccess('edit-trainer') || authStore.canAccess('delete-trainer'))

    const displayTrainers = computed(() => {
      return searchResults.value || trainers.value
    })

    const performSearch = () => {
      if (!searchQuery.value.trim()) {
        searchResults.value = null
        return
      }
      searchResults.value = authStore.searchTrainers(searchQuery.value)
    }

    const resetForm = () => {
      showAddForm.value = false
      editingTrainer.value = null
      formError.value = ''
      formData.value = {
        name: '',
        email: '',
        password: '',
        phone: '',
        specialty: ''
      }
    }

    const startEdit = (trainer) => {
      editingTrainer.value = trainer
      formData.value = { ...trainer }
    }

    const saveTrainer = async () => {
      if (!formData.value.name || !formData.value.email || !formData.value.phone || !formData.value.specialty) {
        formError.value = 'Vui lòng điền đầy đủ thông tin'
        return
      }

      if (editingTrainer.value) {
        if (formData.value.password === '') {
          delete formData.value.password
        }
        authStore.updateTrainer(editingTrainer.value.id, formData.value)
      } else {
        if (!formData.value.password) {
          formError.value = 'Vui lòng nhập mật khẩu'
          return
        }
        authStore.addTrainer(formData.value)
      }

      trainers.value = authStore.getAllTrainers()
      resetForm()
    }

    const deleteTrainer = (trainerId) => {
      if (confirm('Bạn chắc chắn muốn xóa huấn luyện viên này?')) {
        authStore.deleteTrainer(trainerId)
        trainers.value = authStore.getAllTrainers()
      }
    }

    return {
      trainers,
      searchQuery,
      searchResults,
      showAddForm,
      editingTrainer,
      formData,
      formError,
      canAddTrainer,
      canEditTrainer,
      displayTrainers,
      performSearch,
      resetForm,
      startEdit,
      saveTrainer,
      deleteTrainer
    }
  }
}
</script>
