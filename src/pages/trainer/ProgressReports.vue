<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Báo cáo tiến độ</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Tạo báo cáo mới
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm báo cáo..."
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
            v-model="periodFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả thời gian</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Progress Reports Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="report in filteredReports"
        :key="report.id"
        class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 p-6 hover:border-gym-red/40 transition-colors"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-oswald text-white mb-1">{{ report.clientName }}</h3>
            <p class="text-gym-text-secondary text-sm">{{ formatDate(report.date) }}</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bebas text-gym-green">{{ report.overallProgress }}%</div>
            <p class="text-gym-text-secondary text-sm">Tiến độ</p>
          </div>
        </div>

        <!-- Progress Metrics -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="text-center">
            <div class="text-lg font-medium text-white">{{ report.weight }}kg</div>
            <p class="text-gym-text-secondary text-sm">Cân nặng</p>
          </div>
          <div class="text-center">
            <div class="text-lg font-medium text-white">{{ report.bodyFat }}%</div>
            <p class="text-gym-text-secondary text-sm">Mỡ cơ thể</p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gym-text-secondary">Tiến độ tập luyện</span>
            <span class="text-white">{{ report.workoutProgress }}%</span>
          </div>
          <div class="w-full bg-gym-dark rounded-full h-2">
            <div
              class="bg-gym-red h-2 rounded-full transition-all duration-300"
              :style="{ width: `${report.workoutProgress}%` }"
            ></div>
          </div>
        </div>

        <!-- Key Achievements -->
        <div class="mb-4">
          <h4 class="text-white font-medium mb-2">Thành tích chính</h4>
          <ul class="text-gym-text-secondary text-sm space-y-1">
            <li v-for="achievement in report.achievements" :key="achievement" class="flex items-center">
              <i class="fas fa-check text-gym-green mr-2"></i>
              {{ achievement }}
            </li>
          </ul>
        </div>

        <!-- Notes -->
        <div class="mb-4">
          <h4 class="text-white font-medium mb-2">Ghi chú</h4>
          <p class="text-gym-text-secondary text-sm">{{ report.notes }}</p>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm text-gym-text-secondary">
            Cập nhật: {{ formatDate(report.lastUpdate) }}
          </div>
          <div class="flex space-x-2">
            <button
              @click="viewReportDetails(report)"
              class="text-gym-blue hover:text-gym-blue/80 transition-colors"
              title="Xem chi tiết"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              @click="editReport(report)"
              class="text-gym-green hover:text-gym-green/80 transition-colors"
              title="Chỉnh sửa"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="deleteReport(report.id)"
              class="text-red-400 hover:text-red-300 transition-colors"
              title="Xóa"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-oswald text-white">Chi tiết báo cáo tiến độ</h3>
          <button
            @click="closeModal"
            class="text-gym-text-secondary hover:text-white transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div v-if="selectedReport" class="space-y-6">
          <!-- Report Header -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Học viên</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedReport.clientName }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Ngày báo cáo</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ formatDate(selectedReport.date) }}</p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Tiến độ tổng thể</label>
              <p class="text-white bg-gym-dark px-3 py-2 rounded">{{ selectedReport.overallProgress }}%</p>
            </div>
          </div>

          <!-- Measurements -->
          <div>
            <h4 class="text-white font-medium mb-3">Chỉ số cơ thể</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gym-dark p-3 rounded-lg text-center">
                <div class="text-xl font-medium text-white">{{ selectedReport.weight }}kg</div>
                <p class="text-gym-text-secondary text-sm">Cân nặng</p>
              </div>
              <div class="bg-gym-dark p-3 rounded-lg text-center">
                <div class="text-xl font-medium text-white">{{ selectedReport.height }}cm</div>
                <p class="text-gym-text-secondary text-sm">Chiều cao</p>
              </div>
              <div class="bg-gym-dark p-3 rounded-lg text-center">
                <div class="text-xl font-medium text-white">{{ selectedReport.bodyFat }}%</div>
                <p class="text-gym-text-secondary text-sm">Mỡ cơ thể</p>
              </div>
              <div class="bg-gym-dark p-3 rounded-lg text-center">
                <div class="text-xl font-medium text-white">{{ selectedReport.muscleMass }}kg</div>
                <p class="text-gym-text-secondary text-sm">Khối cơ</p>
              </div>
            </div>
          </div>

          <!-- Progress Charts -->
          <div>
            <h4 class="text-white font-medium mb-3">Tiến độ tập luyện</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gym-text-secondary">Hoàn thành kế hoạch</span>
                  <span class="text-white">{{ selectedReport.workoutProgress }}%</span>
                </div>
                <div class="w-full bg-gym-dark rounded-full h-3">
                  <div
                    class="bg-gym-red h-3 rounded-full"
                    :style="{ width: `${selectedReport.workoutProgress}%` }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gym-text-secondary">Tăng cường sức mạnh</span>
                  <span class="text-white">{{ selectedReport.strengthProgress }}%</span>
                </div>
                <div class="w-full bg-gym-dark rounded-full h-3">
                  <div
                    class="bg-gym-blue h-3 rounded-full"
                    :style="{ width: `${selectedReport.strengthProgress}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Achievements -->
          <div>
            <h4 class="text-white font-medium mb-3">Thành tích đạt được</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div
                v-for="achievement in selectedReport.achievements"
                :key="achievement"
                class="flex items-center bg-gym-dark p-2 rounded"
              >
                <i class="fas fa-trophy text-gym-orange mr-2"></i>
                <span class="text-white text-sm">{{ achievement }}</span>
              </div>
            </div>
          </div>

          <!-- Goals and Recommendations -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="text-white font-medium mb-3">Mục tiêu tiếp theo</h4>
              <div class="bg-gym-dark p-3 rounded">
                <p class="text-gym-text-secondary text-sm">{{ selectedReport.nextGoals }}</p>
              </div>
            </div>
            <div>
              <h4 class="text-white font-medium mb-3">Khuyến nghị</h4>
              <div class="bg-gym-dark p-3 rounded">
                <p class="text-gym-text-secondary text-sm">{{ selectedReport.recommendations }}</p>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <h4 class="text-white font-medium mb-3">Ghi chú chi tiết</h4>
            <div class="bg-gym-dark p-3 rounded">
              <p class="text-gym-text-secondary">{{ selectedReport.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Report Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h3 class="text-xl font-oswald text-white mb-4">
          {{ showEditModal ? 'Chỉnh sửa báo cáo' : 'Tạo báo cáo tiến độ mới' }}
        </h3>

        <form @submit.prevent="saveReport" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Học viên</label>
              <select
                v-model="reportForm.clientName"
                required
                class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              >
                <option value="">Chọn học viên</option>
                <option v-for="client in trainerStore.clients" :key="client.id" :value="client.name">
                  {{ client.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-gym-text font-medium mb-2">Ngày báo cáo</label>
              <input
                v-model="reportForm.date"
                type="date"
                required
                class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              />
            </div>
          </div>

          <!-- Measurements -->
          <div>
            <h4 class="text-white font-medium mb-3">Chỉ số cơ thể</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-gym-text text-sm mb-1">Cân nặng (kg)</label>
                <input
                  v-model.number="reportForm.weight"
                  type="number"
                  step="0.1"
                  required
                  class="w-full px-2 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-gym-text text-sm mb-1">Chiều cao (cm)</label>
                <input
                  v-model.number="reportForm.height"
                  type="number"
                  required
                  class="w-full px-2 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-gym-text text-sm mb-1">Mỡ cơ thể (%)</label>
                <input
                  v-model.number="reportForm.bodyFat"
                  type="number"
                  step="0.1"
                  required
                  class="w-full px-2 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-gym-text text-sm mb-1">Khối cơ (kg)</label>
                <input
                  v-model.number="reportForm.muscleMass"
                  type="number"
                  step="0.1"
                  required
                  class="w-full px-2 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Progress -->
          <div>
            <h4 class="text-white font-medium mb-3">Tiến độ</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-gym-text text-sm mb-1">Tiến độ tổng thể (%)</label>
                <input
                  v-model.number="reportForm.overallProgress"
                  type="number"
                  min="0"
                  max="100"
                  required
                  class="w-full px-2 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-gym-text text-sm mb-1">Hoàn thành tập luyện (%)</label>
                <input
                  v-model.number="reportForm.workoutProgress"
                  type="number"
                  min="0"
                  max="100"
                  required
                  class="w-full px-2 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-gym-text text-sm mb-1">Tăng cường sức mạnh (%)</label>
                <input
                  v-model.number="reportForm.strengthProgress"
                  type="number"
                  min="0"
                  max="100"
                  required
                  class="w-full px-2 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Achievements -->
          <div>
            <label class="block text-gym-text font-medium mb-2">Thành tích đạt được</label>
            <div class="space-y-2">
              <div
                v-for="(achievement, index) in reportForm.achievements"
                :key="index"
                class="flex gap-2"
              >
                <input
                  v-model="reportForm.achievements[index]"
                  type="text"
                  class="flex-1 px-3 py-1 bg-gym-dark border border-gym-red/20 rounded text-white text-sm focus:border-gym-red focus:outline-none"
                  placeholder="Nhập thành tích..."
                />
                <button
                  type="button"
                  @click="removeAchievement(index)"
                  class="text-red-400 hover:text-red-300"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <button
                type="button"
                @click="addAchievement"
                class="text-gym-blue hover:text-gym-blue/80 transition-colors"
              >
                <i class="fas fa-plus mr-1"></i>Thêm thành tích
              </button>
            </div>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Mục tiêu tiếp theo</label>
            <textarea
              v-model="reportForm.nextGoals"
              rows="2"
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              placeholder="Mục tiêu cho giai đoạn tiếp theo..."
            ></textarea>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Khuyến nghị</label>
            <textarea
              v-model="reportForm.recommendations"
              rows="2"
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              placeholder="Khuyến nghị cho học viên..."
            ></textarea>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Ghi chú</label>
            <textarea
              v-model="reportForm.notes"
              rows="3"
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              placeholder="Ghi chú chi tiết về báo cáo..."
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
              {{ showEditModal ? 'Cập nhật' : 'Tạo báo cáo' }}
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
const periodFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)
const selectedReport = ref(null)
const editingReport = ref(null)

const reportForm = ref({
  clientName: '',
  date: new Date().toISOString().split('T')[0],
  weight: 0,
  height: 0,
  bodyFat: 0,
  muscleMass: 0,
  overallProgress: 0,
  workoutProgress: 0,
  strengthProgress: 0,
  achievements: [''],
  nextGoals: '',
  recommendations: '',
  notes: ''
})

const filteredReports = computed(() => {
  return trainerStore.progressReports.filter(report => {
    const matchesSearch = report.clientName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         report.notes.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesClient = !clientFilter.value || report.clientName === clientFilter.value

    let matchesPeriod = true
    if (periodFilter.value) {
      const reportDate = new Date(report.date)
      const now = new Date()

      switch (periodFilter.value) {
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesPeriod = reportDate >= weekAgo
          break
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
          matchesPeriod = reportDate >= monthAgo
          break
        case 'quarter':
          const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
          matchesPeriod = reportDate >= quarterAgo
          break
      }
    }

    return matchesSearch && matchesClient && matchesPeriod
  })
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const viewReportDetails = (report) => {
  selectedReport.value = report
  showDetailsModal.value = true
}

const editReport = (report) => {
  editingReport.value = report
  reportForm.value = { ...report }
  showEditModal.value = true
}

const deleteReport = (id) => {
  if (confirm('Bạn có chắc muốn xóa báo cáo này?')) {
    trainerStore.deleteProgressReport(id)
  }
}

const addAchievement = () => {
  reportForm.value.achievements.push('')
}

const removeAchievement = (index) => {
  if (reportForm.value.achievements.length > 1) {
    reportForm.value.achievements.splice(index, 1)
  }
}

const saveReport = () => {
  const reportData = {
    ...reportForm.value,
    lastUpdate: new Date().toISOString()
  }

  if (showEditModal.value) {
    trainerStore.updateProgressReport(editingReport.value.id, reportData)
  } else {
    trainerStore.addProgressReport(reportData)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  showDetailsModal.value = false
  selectedReport.value = null
  editingReport.value = null
  reportForm.value = {
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    height: 0,
    bodyFat: 0,
    muscleMass: 0,
    overallProgress: 0,
    workoutProgress: 0,
    strengthProgress: 0,
    achievements: [''],
    nextGoals: '',
    recommendations: '',
    notes: ''
  }
}
</script>