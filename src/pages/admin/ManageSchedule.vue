<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Quản lý lịch tập</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Thêm lịch tập
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm lớp học..."
            class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="trainerFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả huấn luyện viên</option>
            <option v-for="trainer in adminStore.trainers" :key="trainer.id" :value="trainer.name">
              {{ trainer.name }}
            </option>
          </select>
          <select
            v-model="dayFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả ngày</option>
            <option value="Monday">Thứ 2</option>
            <option value="Tuesday">Thứ 3</option>
            <option value="Wednesday">Thứ 4</option>
            <option value="Thursday">Thứ 5</option>
            <option value="Friday">Thứ 6</option>
            <option value="Saturday">Thứ 7</option>
            <option value="Sunday">Chủ nhật</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Schedule Table -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gym-dark">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Lớp học</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Huấn luyện viên</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Ngày</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Thời gian</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Sức chứa</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Đã đăng ký</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gym-red/10">
            <tr v-for="schedule in filteredSchedules" :key="schedule.id" class="hover:bg-gym-dark">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-white">{{ schedule.className }}</div>
                  <div class="text-sm text-gym-text-secondary">{{ schedule.type }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-white">{{ schedule.trainer }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-gym-blue/20 text-gym-blue">
                  {{ getDayName(schedule.day) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gym-text-secondary">
                {{ schedule.startTime }} - {{ schedule.endTime }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                {{ schedule.capacity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm text-white mr-2">{{ schedule.enrolled }}</span>
                  <div class="w-16 bg-gym-dark rounded-full h-2">
                    <div
                      class="bg-gym-red h-2 rounded-full"
                      :style="{ width: `${(schedule.enrolled / schedule.capacity) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editSchedule(schedule)"
                    class="text-gym-blue hover:text-gym-blue/80 transition-colors"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteSchedule(schedule.id)"
                    class="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Schedule Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-md">
        <h3 class="text-xl font-oswald text-white mb-4">
          {{ showEditModal ? 'Chỉnh sửa lịch tập' : 'Thêm lịch tập mới' }}
        </h3>

        <form @submit.prevent="saveSchedule" class="space-y-4">
          <div>
            <label class="block text-gym-text font-medium mb-2">Tên lớp học</label>
            <input
              v-model="scheduleForm.className"
              type="text"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Loại lớp</label>
            <select
              v-model="scheduleForm.type"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Fitness">Fitness</option>
              <option value="Bodybuilding">Bodybuilding</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Yoga">Yoga</option>
              <option value="Boxing">Boxing</option>
              <option value="Cardio">Cardio</option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Huấn luyện viên</label>
            <select
              v-model="scheduleForm.trainer"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option v-for="trainer in adminStore.trainers" :key="trainer.id" :value="trainer.name">
                {{ trainer.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Ngày trong tuần</label>
            <select
              v-model="scheduleForm.day"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Monday">Thứ 2</option>
              <option value="Tuesday">Thứ 3</option>
              <option value="Wednesday">Thứ 4</option>
              <option value="Thursday">Thứ 5</option>
              <option value="Friday">Thứ 6</option>
              <option value="Saturday">Thứ 7</option>
              <option value="Sunday">Chủ nhật</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Giờ bắt đầu</label>
              <input
                v-model="scheduleForm.startTime"
                type="time"
                required
                class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Giờ kết thúc</label>
              <input
                v-model="scheduleForm.endTime"
                type="time"
                required
                class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Sức chứa</label>
            <input
              v-model.number="scheduleForm.capacity"
              type="number"
              min="1"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
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
const trainerFilter = ref('')
const dayFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingSchedule = ref(null)

const scheduleForm = ref({
  className: '',
  type: 'Fitness',
  trainer: '',
  day: 'Monday',
  startTime: '09:00',
  endTime: '10:00',
  capacity: 20,
  enrolled: 0
})

const filteredSchedules = computed(() => {
  return adminStore.schedules.filter(schedule => {
    const matchesSearch = schedule.className.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         schedule.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTrainer = !trainerFilter.value || schedule.trainer === trainerFilter.value
    const matchesDay = !dayFilter.value || schedule.day === dayFilter.value

    return matchesSearch && matchesTrainer && matchesDay
  })
})

const getDayName = (day) => {
  const days = {
    'Monday': 'Thứ 2',
    'Tuesday': 'Thứ 3',
    'Wednesday': 'Thứ 4',
    'Thursday': 'Thứ 5',
    'Friday': 'Thứ 6',
    'Saturday': 'Thứ 7',
    'Sunday': 'Chủ nhật'
  }
  return days[day] || day
}

const editSchedule = (schedule) => {
  editingSchedule.value = schedule
  scheduleForm.value = { ...schedule }
  showEditModal.value = true
}

const deleteSchedule = (id) => {
  if (confirm('Bạn có chắc muốn xóa lịch tập này?')) {
    adminStore.deleteSchedule(id)
  }
}

const saveSchedule = () => {
  if (showEditModal.value) {
    adminStore.updateSchedule(editingSchedule.value.id, scheduleForm.value)
  } else {
    adminStore.addSchedule(scheduleForm.value)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingSchedule.value = null
  scheduleForm.value = {
    className: '',
    type: 'Fitness',
    trainer: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    capacity: 20,
    enrolled: 0
  }
}
</script>