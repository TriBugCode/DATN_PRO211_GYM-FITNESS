<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold text-gray-900">Quản lý Hội viên</h2>
      <button
        v-if="canAddMember"
        @click="showAddForm = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Thêm Hội viên mới
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
    <div v-if="showAddForm || editingMember" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <h3 class="text-2xl font-bold mb-6">
          {{ editingMember ? 'Sửa Hội viên' : 'Thêm Hội viên mới' }}
        </h3>
        
        <form @submit.prevent="saveMember" class="space-y-4">
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
              :required="!editingMember"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
            <p v-if="editingMember" class="text-xs text-gray-500 mt-1">Để trống nếu không muốn thay đổi</p>
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
            <label class="block text-sm font-medium text-gray-700">Gói tập</label>
            <select
              v-model="formData.packageLevel"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            >
              <option value="">-- Chọn gói tập --</option>
              <option value="basic">Basic - Mua gói tập, xem lịch tập</option>
              <option value="premium">Premium - Thêm chọn huấn luyện viên</option>
              <option value="elite">Elite - Gói cao cấp nhất</option>
            </select>
          </div>

          <div v-if="formData.packageLevel === 'premium' || formData.packageLevel === 'elite'">
            <label class="block text-sm font-medium text-gray-700">Huấn luyện viên</label>
            <select
              v-model="formData.selectedTrainer"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            >
              <option value="">-- Chọn huấn luyện viên --</option>
              <option v-for="trainer in getAllTrainers()" :key="trainer.id" :value="trainer.id">
                {{ trainer.name }}
              </option>
            </select>
          </div>

          <div v-if="formError" class="text-red-600 text-sm">{{ formError }}</div>

          <div class="flex gap-4 mt-6">
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {{ editingMember ? 'Cập nhật' : 'Thêm' }}
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

    <!-- Members Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-200 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Họ tên</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gói tập</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Huấn luyện viên</th>
            <th v-if="canEditMember" class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành động</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="member in displayMembers" :key="member.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900">{{ member.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ member.email }}</td>
            <td class="px-6 py-4 text-gray-600">{{ member.phone }}</td>
            <td class="px-6 py-4">
              <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ getPackageName(member.packageLevel) }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600">
              {{ member.selectedTrainer ? getTrainerName(member.selectedTrainer) : 'N/A' }}
            </td>
            <td v-if="canEditMember" class="px-6 py-4 space-x-2">
              <button
                @click="startEdit(member)"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                ✏️ Sửa
              </button>
              <button
                @click="deleteMember(member.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                🗑️ Xóa
              </button>
            </td>
          </tr>
          <tr v-if="displayMembers.length === 0">
            <td :colspan="canEditMember ? 6 : 5" class="px-6 py-8 text-center text-gray-500">
              Không có hội viên nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { authStore } from '../stores/authStore'

export default {
  name: 'ManageMembers',
  setup() {
    /* ================= STATE ================= */
    const members = ref([])
    const searchQuery = ref('')
    const searchResults = ref(null)

    const showAddForm = ref(false)
    const editingMember = ref(null)
    const formError = ref('')

    const formData = ref({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      packageLevel: '',
      selectedTrainer: ''
    })

    /* ================= LOAD MEMBERS ================= */
    const loadMembers = async () => {
      members.value = await authStore.getAllMembers()
      console.log('MEMBERS:', members.value)
    }

    onMounted(loadMembers)

    /* ================= PERMISSION ================= */
    const canAddMember = computed(() =>
      authStore.canAccess(['Admin', 'Staff'])
    )

    const canEditMember = computed(() =>
      authStore.canAccess(['Admin', 'Staff'])
    )

    /* ================= DISPLAY ================= */
    const displayMembers = computed(() => {
      return searchResults.value ?? members.value
    })

    /* ================= SEARCH ================= */
    const performSearch = async () => {
      if (!searchQuery.value.trim()) {
        searchResults.value = null
        return
      }
      searchResults.value = await authStore.searchMembers(searchQuery.value)
    }

    /* ================= TRAINERS (UI ONLY) ================= */
    const getAllTrainers = async () => {
      return await authStore.getAllTrainers()
    }

    const getTrainerName = () => 'N/A'

    /* ================= PACKAGE ================= */
    const getPackageName = (pkg) => {
      const map = {
        basic: 'Basic',
        premium: 'Premium',
        elite: 'Elite'
      }
      return map[pkg] || 'Chưa đăng ký'
    }

    /* ================= FORM ================= */
    const resetForm = () => {
      showAddForm.value = false
      editingMember.value = null
      formError.value = ''
      formData.value = {
        fullName: '',
        email: '',
        password: '',
        phone: '',
        packageLevel: '',
        selectedTrainer: ''
      }
    }

    const startEdit = (member) => {
      editingMember.value = member
      formData.value = {
        fullName: member.fullName,
        email: member.email,
        phone: member.phone,
        password: ''
      }
    }

    const saveMember = async () => {
      if (!formData.value.fullName || !formData.value.email || !formData.value.phone) {
        formError.value = 'Vui lòng điền đầy đủ thông tin'
        return
      }

      if (editingMember.value) {
        await authStore.updateMember(editingMember.value.userId, formData.value)
      } else {
        if (!formData.value.password) {
          formError.value = 'Vui lòng nhập mật khẩu'
          return
        }
        await authStore.addMember(formData.value)
      }

      await loadMembers()
      resetForm()
    }

    const deleteMember = async (userId) => {
      if (confirm('Bạn chắc chắn muốn xóa hội viên này?')) {
        await authStore.deleteMember(userId)
        await loadMembers()
      }
    }

    /* ================= EXPORT ================= */
    return {
      members,
      searchQuery,
      searchResults,
      showAddForm,
      editingMember,
      formData,
      formError,
      canAddMember,
      canEditMember,
      displayMembers,
      performSearch,
      getAllTrainers,
      getTrainerName,
      getPackageName,
      resetForm,
      startEdit,
      saveMember,
      deleteMember
    }
  }
}
</script>
