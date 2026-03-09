<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Học viên của tôi</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Thêm học viên
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm học viên..."
            class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang tập</option>
            <option value="inactive">Tạm nghỉ</option>
          </select>
          <select
            v-model="membershipFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả gói</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Elite">Elite</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Clients Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="client in filteredClients"
        :key="client.id"
        class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 p-6 hover:border-gym-red/40 transition-colors"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gym-red rounded-full flex items-center justify-center mr-3">
              <i class="fas fa-user text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-oswald text-white">{{ client.name }}</h3>
              <p class="text-gym-text-secondary text-sm">{{ client.membership }}</p>
            </div>
          </div>
          <span class="px-2 py-1 text-xs font-medium rounded-full"
                :class="client.status === 'active' ? 'bg-gym-green/20 text-gym-green' : 'bg-gray-500/20 text-gray-400'">
            {{ client.status === 'active' ? 'Đang tập' : 'Tạm nghỉ' }}
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Email:</span>
            <span class="text-white">{{ client.email }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">SĐT:</span>
            <span class="text-white">{{ client.phone }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Tham gia:</span>
            <span class="text-white">{{ formatDate(client.joinDate) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Mục tiêu:</span>
            <span class="text-white">{{ client.goal }}</span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm text-gym-text-secondary">
            Cập nhật: {{ formatDate(client.lastUpdate) }}
          </div>
          <div class="flex space-x-2">
            <button
              @click="viewClientDetails(client)"
              class="text-gym-blue hover:text-gym-blue/80 transition-colors"
              title="Xem chi tiết"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              @click="editClient(client)"
              class="text-gym-green hover:text-gym-green/80 transition-colors"
              title="Chỉnh sửa"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="createWorkoutPlan(client)"
              class="text-gym-orange hover:text-gym-orange/80 transition-colors"
              title="Tạo kế hoạch"
            >
              <i class="fas fa-dumbbell"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Client Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-oswald text-white">Chi tiết học viên</h3>
          <button
            @click="closeModal"
            class="text-gym-text-secondary hover:text-white transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div v-if="selectedClient" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Họ và tên</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedClient.name }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Email</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedClient.email }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Số điện thoại</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedClient.phone }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Gói thành viên</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedClient.membership }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Mục tiêu</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedClient.goal }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Trạng thái</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedClient.status === 'active' ? 'Đang tập' : 'Tạm nghỉ' }}</p>
            </div>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Lịch sử tập luyện</label>
            <div class="bg-gym-dark p-3 rounded max-h-32 overflow-y-auto">
              <p class="text-gym-text-secondary text-sm">{{ selectedClient.workoutHistory || 'Chưa có lịch sử tập luyện' }}</p>
            </div>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Ghi chú</label>
            <div class="bg-gym-dark p-3 rounded max-h-32 overflow-y-auto">
              <p class="text-gym-text-secondary text-sm">{{ selectedClient.notes || 'Không có ghi chú' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Client Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-md">
        <h3 class="text-xl font-oswald text-white mb-4">
          {{ showEditModal ? 'Chỉnh sửa học viên' : 'Thêm học viên mới' }}
        </h3>

        <form @submit.prevent="saveClient" class="space-y-4">
          <div>
            <label class="block text-gym-text font-medium mb-2">Họ và tên</label>
            <input
              v-model="clientForm.name"
              type="text"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Email</label>
            <input
              v-model="clientForm.email"
              type="email"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Số điện thoại</label>
            <input
              v-model="clientForm.phone"
              type="tel"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Gói thành viên</label>
            <select
              v-model="clientForm.membership"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Elite">Elite</option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Mục tiêu</label>
            <select
              v-model="clientForm.goal"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Giảm cân">Giảm cân</option>
              <option value="Tăng cơ">Tăng cơ</option>
              <option value="Cải thiện sức khỏe">Cải thiện sức khỏe</option>
              <option value="Tăng sức mạnh">Tăng sức mạnh</option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Ghi chú</label>
            <textarea
              v-model="clientForm.notes"
              rows="3"
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              placeholder="Ghi chú về học viên..."
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gym-text-secondary hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="bg-gym-red hover:bg-gym-orange text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {{ showEditModal ? 'Cập nhật' : 'Thêm' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTrainerStore } from '../../stores/trainerStore'

const trainerStore = useTrainerStore()

const searchQuery = ref('')
const statusFilter = ref('')
const membershipFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)
const selectedClient = ref(null)
const editingClient = ref(null)

const clientForm = ref({
  name: '',
  email: '',
  phone: '',
  membership: 'Basic',
  goal: 'Giảm cân',
  notes: '',
  status: 'active'
})

const filteredClients = computed(() => {
  return trainerStore.clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || client.status === statusFilter.value
    const matchesMembership = !membershipFilter.value || client.membership === membershipFilter.value

    return matchesSearch && matchesStatus && matchesMembership
  })
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const viewClientDetails = (client) => {
  selectedClient.value = client
  showDetailsModal.value = true
}

const editClient = (client) => {
  editingClient.value = client
  clientForm.value = { ...client }
  showEditModal.value = true
}

const createWorkoutPlan = (client) => {
  // Navigate to workout plans page with client pre-selected
  // This would be implemented with route params or shared state
  alert(`Tạo kế hoạch tập luyện cho ${client.name}`)
}

const saveClient = () => {
  if (showEditModal.value) {
    trainerStore.updateClient(editingClient.value.id, clientForm.value)
  } else {
    trainerStore.addClient(clientForm.value)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  showDetailsModal.value = false
  selectedClient.value = null
  editingClient.value = null
  clientForm.value = {
    name: '',
    email: '',
    phone: '',
    membership: 'Basic',
    goal: 'Giảm cân',
    notes: '',
    status: 'active'
  }
}
</script>