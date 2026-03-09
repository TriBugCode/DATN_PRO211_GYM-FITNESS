<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Kế hoạch tập luyện</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Tạo kế hoạch mới
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm kế hoạch..."
            class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="clientFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả học viên</option>
            <option v-for="client in trainerStore.clients" :key="client.id" :value="client.name">
              {{ client.name }}
            </option>
          </select>
          <select
            v-model="statusFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="paused">Tạm dừng</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Workout Plans Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="plan in filteredPlans"
        :key="plan.id"
        class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 p-6 hover:border-gym-red/40 transition-colors"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-oswald text-white mb-1">{{ plan.name }}</h3>
            <p class="text-gym-text-secondary text-sm">{{ plan.clientName }}</p>
          </div>
          <span class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getStatusBadgeClass(plan.status)">
            {{ getStatusText(plan.status) }}
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Mục tiêu:</span>
            <span class="text-white">{{ plan.goal }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Thời gian:</span>
            <span class="text-white">{{ plan.duration }} tuần</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Bài tập:</span>
            <span class="text-white">{{ plan.exercises?.length || 0 }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gym-text-secondary">Tiến độ:</span>
            <span class="text-white">{{ plan.progress }}%</span>
          </div>
        </div>

        <div class="mb-4">
          <div class="w-full bg-gym-dark rounded-full h-2">
            <div
              class="bg-gym-red h-2 rounded-full transition-all duration-300"
              :style="{ width: `${plan.progress}%` }"
            ></div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm text-gym-text-secondary">
            Cập nhật: {{ formatDate(plan.lastUpdate) }}
          </div>
          <div class="flex space-x-2">
            <button
              @click="viewPlanDetails(plan)"
              class="text-gym-blue hover:text-gym-blue/80 transition-colors"
              title="Xem chi tiết"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              @click="editPlan(plan)"
              class="text-gym-green hover:text-gym-green/80 transition-colors"
              title="Chỉnh sửa"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="duplicatePlan(plan)"
              class="text-gym-orange hover:text-gym-orange/80 transition-colors"
              title="Sao chép"
            >
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Plan Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-oswald text-white">Chi tiết kế hoạch tập luyện</h3>
          <button
            @click="closeModal"
            class="text-gym-text-secondary hover:text-white transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div v-if="selectedPlan" class="space-y-6">
          <!-- Plan Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Tên kế hoạch</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedPlan.name }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Học viên</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedPlan.clientName }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Mục tiêu</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedPlan.goal }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Thời gian</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedPlan.duration }} tuần</p>
            </div>
          </div>

          <!-- Exercises -->
          <div>
            <label class="block text-gym-text font-medium mb-2">Danh sách bài tập</label>
            <div class="space-y-3">
              <div
                v-for="(exercise, index) in selectedPlan.exercises"
                :key="index"
                class="bg-gym-dark p-4 rounded-lg"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-white font-medium">{{ exercise.name }}</h4>
                    <p class="text-gym-text-secondary text-sm">{{ exercise.description }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-white">{{ exercise.sets }} sets × {{ exercise.reps }}</p>
                    <p class="text-gym-text-secondary text-sm">{{ exercise.restTime }}s nghỉ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-gym-text font-medium mb-2">Ghi chú</label>
            <div class="bg-gym-dark p-3 rounded">
              <p class="text-gym-text-secondary">{{ selectedPlan.notes || 'Không có ghi chú' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Plan Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h3 class="text-xl font-oswald text-white mb-4">
          {{ showEditModal ? 'Chỉnh sửa kế hoạch' : 'Tạo kế hoạch tập luyện mới' }}
        </h3>

        <form @submit.prevent="savePlan" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Tên kế hoạch</label>
              <input
                v-model="planForm.name"
                type="text"
                required
                class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-gym-text font-medium mb-2">Học viên</label>
              <select
                v-model="planForm.clientName"
                required
                class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              >
                <option value="">Chọn học viên</option>
                <option v-for="client in trainerStore.clients" :key="client.id" :value="client.name">
                  {{ client.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Mục tiêu</label>
              <select
                v-model="planForm.goal"
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
              <label class="block text-gym-text font-medium mb-2">Thời gian (tuần)</label>
              <input
                v-model.number="planForm.duration"
                type="number"
                min="1"
                required
                class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              />
            </div>
          </div>

          <!-- Exercises Section -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-gym-text font-medium">Bài tập</label>
              <button
                type="button"
                @click="addExercise"
                class="text-gym-blue hover:text-gym-blue/80 transition-colors"
              >
                <i class="fas fa-plus mr-1"></i>Thêm bài tập
              </button>
            </div>

            <div class="space-y-3 max-h-60 overflow-y-auto">
              <div
                v-for="(exercise, index) in planForm.exercises"
                :key="index"
                class="bg-gym-dark p-3 rounded-lg"
              >
                <div class="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
                  <div class="md:col-span-2">
                    <label class="block text-gym-text text-sm mb-1">Tên bài tập</label>
                    <input
                      v-model="exercise.name"
                      type="text"
                      required
                      class="w-full px-2 py-1 bg-gym-dark-secondary border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-gym-text text-sm mb-1">Sets</label>
                    <input
                      v-model.number="exercise.sets"
                      type="number"
                      min="1"
                      required
                      class="w-full px-2 py-1 bg-gym-dark-secondary border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="block text-gym-text text-sm mb-1">Reps</label>
                    <input
                      v-model.number="exercise.reps"
                      type="number"
                      min="1"
                      required
                      class="w-full px-2 py-1 bg-gym-dark-secondary border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                    />
                  </div>
                  <div class="flex items-center">
                    <button
                      type="button"
                      @click="removeExercise(index)"
                      class="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Ghi chú</label>
            <textarea
              v-model="planForm.notes"
              rows="3"
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              placeholder="Ghi chú về kế hoạch..."
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
              {{ showEditModal ? 'Cập nhật' : 'Tạo kế hoạch' }}
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
const clientFilter = ref('')
const statusFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)
const selectedPlan = ref(null)
const editingPlan = ref(null)

const planForm = ref({
  name: '',
  clientName: '',
  goal: 'Giảm cân',
  duration: 4,
  exercises: [],
  notes: '',
  status: 'active',
  progress: 0
})

const filteredPlans = computed(() => {
  return trainerStore.workoutPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         plan.clientName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesClient = !clientFilter.value || plan.clientName === clientFilter.value
    const matchesStatus = !statusFilter.value || plan.status === statusFilter.value

    return matchesSearch && matchesClient && matchesStatus
  })
})

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'active': return 'bg-gym-green/20 text-gym-green'
    case 'completed': return 'bg-gym-blue/20 text-gym-blue'
    case 'paused': return 'bg-yellow-500/20 text-yellow-400'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'active': return 'Đang thực hiện'
    case 'completed': return 'Hoàn thành'
    case 'paused': return 'Tạm dừng'
    default: return status
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const viewPlanDetails = (plan) => {
  selectedPlan.value = plan
  showDetailsModal.value = true
}

const editPlan = (plan) => {
  editingPlan.value = plan
  planForm.value = { ...plan }
  showEditModal.value = true
}

const duplicatePlan = (plan) => {
  const duplicatedPlan = {
    ...plan,
    id: Date.now(),
    name: `${plan.name} (Sao chép)`,
    status: 'active',
    progress: 0,
    lastUpdate: new Date().toISOString()
  }
  trainerStore.addWorkoutPlan(duplicatedPlan)
}

const addExercise = () => {
  planForm.value.exercises.push({
    name: '',
    sets: 3,
    reps: 10,
    restTime: 60
  })
}

const removeExercise = (index) => {
  planForm.value.exercises.splice(index, 1)
}

const savePlan = () => {
  const planData = {
    ...planForm.value,
    lastUpdate: new Date().toISOString()
  }

  if (showEditModal.value) {
    trainerStore.updateWorkoutPlan(editingPlan.value.id, planData)
  } else {
    trainerStore.addWorkoutPlan(planData)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  showDetailsModal.value = false
  selectedPlan.value = null
  editingPlan.value = null
  planForm.value = {
    name: '',
    clientName: '',
    goal: 'Giảm cân',
    duration: 4,
    exercises: [],
    notes: '',
    status: 'active',
    progress: 0
  }
}
</script>