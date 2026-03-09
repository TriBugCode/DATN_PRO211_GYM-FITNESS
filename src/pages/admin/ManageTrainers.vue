<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Quản lý huấn luyện viên</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Thêm huấn luyện viên
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm huấn luyện viên..."
            class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="specialtyFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả chuyên môn</option>
            <option value="Fitness">Fitness</option>
            <option value="Bodybuilding">Bodybuilding</option>
            <option value="CrossFit">CrossFit</option>
            <option value="Yoga">Yoga</option>
            <option value="Boxing">Boxing</option>
          </select>
          <select
            v-model="statusFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Trainers Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="trainer in filteredTrainers"
        :key="trainer.id"
        class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 p-6 hover:border-gym-red/40 transition-colors"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gym-red rounded-full flex items-center justify-center mr-3">
              <i class="fas fa-user-tie text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-oswald text-white">{{ trainer.name }}</h3>
              <p class="text-gym-text-secondary text-sm">{{ trainer.specialty }}</p>
            </div>
          </div>
          <span class="px-2 py-1 text-xs font-medium rounded-full"
                :class="trainer.status === 'active' ? 'bg-gym-green/20 text-gym-green' : 'bg-gray-500/20 text-gray-400'">
            {{ trainer.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Email:</span>
            <span class="text-white">{{ trainer.email }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">SĐT:</span>
            <span class="text-white">{{ trainer.phone }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Kinh nghiệm:</span>
            <span class="text-white">{{ trainer.experience }} năm</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Học viên:</span>
            <span class="text-white">{{ trainer.clientsCount }}</span>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm text-gym-text-secondary">
            Gia nhập: {{ formatDate(trainer.joinDate) }}
          </div>
          <div class="flex space-x-2">
            <button
              @click="editTrainer(trainer)"
              class="text-gym-blue hover:text-gym-blue/80 transition-colors"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="deleteTrainer(trainer.id)"
              class="text-red-400 hover:text-red-300 transition-colors"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Trainer Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-md">
        <h3 class="text-xl font-oswald text-white mb-4">
          {{ showEditModal ? 'Chỉnh sửa huấn luyện viên' : 'Thêm huấn luyện viên mới' }}
        </h3>

        <form @submit.prevent="saveTrainer" class="space-y-4">
          <div>
            <label class="block text-gym-text font-medium mb-2">Họ và tên</label>
            <input
              v-model="trainerForm.name"
              type="text"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Email</label>
            <input
              v-model="trainerForm.email"
              type="email"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Số điện thoại</label>
            <input
              v-model="trainerForm.phone"
              type="tel"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Chuyên môn</label>
            <select
              v-model="trainerForm.specialty"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Fitness">Fitness</option>
              <option value="Bodybuilding">Bodybuilding</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Yoga">Yoga</option>
              <option value="Boxing">Boxing</option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Kinh nghiệm (năm)</label>
            <input
              v-model.number="trainerForm.experience"
              type="number"
              min="0"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Mô tả</label>
            <textarea
              v-model="trainerForm.description"
              rows="3"
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              placeholder="Mô tả về huấn luyện viên..."
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
import { useAdminStore } from '../../stores/adminStore'

const adminStore = useAdminStore()

const searchQuery = ref('')
const specialtyFilter = ref('')
const statusFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingTrainer = ref(null)

const trainerForm = ref({
  name: '',
  email: '',
  phone: '',
  specialty: 'Fitness',
  experience: 0,
  description: '',
  status: 'active'
})

const filteredTrainers = computed(() => {
  return adminStore.trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         trainer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSpecialty = !specialtyFilter.value || trainer.specialty === specialtyFilter.value
    const matchesStatus = !statusFilter.value || trainer.status === statusFilter.value

    return matchesSearch && matchesSpecialty && matchesStatus
  })
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const editTrainer = (trainer) => {
  editingTrainer.value = trainer
  trainerForm.value = { ...trainer }
  showEditModal.value = true
}

const deleteTrainer = (id) => {
  if (confirm('Bạn có chắc muốn xóa huấn luyện viên này?')) {
    adminStore.deleteTrainer(id)
  }
}

const saveTrainer = () => {
  if (showEditModal.value) {
    adminStore.updateTrainer(editingTrainer.value.id, trainerForm.value)
  } else {
    adminStore.addTrainer(trainerForm.value)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingTrainer.value = null
  trainerForm.value = {
    name: '',
    email: '',
    phone: '',
    specialty: 'Fitness',
    experience: 0,
    description: '',
    status: 'active'
  }
}
</script>