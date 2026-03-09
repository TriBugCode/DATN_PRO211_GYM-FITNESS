<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Lịch tập của tôi</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Thêm lịch tập
      </button>
    </div>

    <!-- Weekly Schedule View -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-oswald text-white">Lịch trong tuần</h2>
        <div class="flex gap-2">
          <button
            @click="previousWeek"
            class="px-3 py-1 bg-gym-dark text-white rounded hover:bg-gym-dark/80 transition-colors"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="px-4 py-1 bg-gym-red text-white rounded font-medium">
            Tuần {{ currentWeek }}
          </span>
          <button
            @click="nextWeek"
            class="px-3 py-1 bg-gym-dark text-white rounded hover:bg-gym-dark/80 transition-colors"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-4">
        <div
          v-for="day in weekDays"
          :key="day.name"
          class="bg-gym-dark rounded-lg p-4 min-h-[200px]"
        >
          <h3 class="text-white font-medium mb-3 text-center">{{ day.name }}</h3>
          <div class="space-y-2">
            <div
              v-for="schedule in getSchedulesForDay(day.fullName)"
              :key="schedule.id"
              class="bg-gym-red/20 p-3 rounded text-sm cursor-pointer hover:bg-gym-red/30 transition-colors"
              @click="editSchedule(schedule)"
            >
              <div class="font-medium text-white">{{ schedule.className }}</div>
              <div class="text-gym-text-secondary">{{ schedule.startTime }} - {{ schedule.endTime }}</div>
              <div class="text-gym-text-secondary">{{ schedule.enrolled }}/{{ schedule.capacity }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule List -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20">
      <div class="px-6 py-4 border-b border-gym-red/20">
        <h3 class="text-xl font-oswald text-white">Danh sách lịch tập</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gym-dark">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Lớp học</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Ngày</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Thời gian</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Sức chứa</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Đã đăng ký</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gym-red/10">
            <tr v-for="schedule in trainerStore.schedules" :key="schedule.id" class="hover:bg-gym-dark">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-white">{{ schedule.className }}</div>
                  <div class="text-sm text-gym-text-secondary">{{ schedule.type }}</div>
                </div>
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
import { ref, computed, onMounted } from 'vue'
import { useTrainerStore } from '../../stores/trainerStore'

const trainerStore = useTrainerStore()

const currentWeek = ref(1)
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingSchedule = ref(null)

const scheduleForm = ref({
  className: '',
  type: 'Fitness',
  day: 'Monday',
  startTime: '09:00',
  endTime: '10:00',
  capacity: 20,
  enrolled: 0
})

const weekDays = [
  { name: 'T2', fullName: 'Monday' },
  { name: 'T3', fullName: 'Tuesday' },
  { name: 'T4', fullName: 'Wednesday' },
  { name: 'T5', fullName: 'Thursday' },
  { name: 'T6', fullName: 'Friday' },
  { name: 'T7', fullName: 'Saturday' },
  { name: 'CN', fullName: 'Sunday' }
]

const getSchedulesForDay = (dayName) => {
  return trainerStore.schedules.filter(schedule =>
    schedule.day === dayName && schedule.trainer === trainerStore.currentTrainer?.name
  )
}

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

const previousWeek = () => {
  if (currentWeek.value > 1) {
    currentWeek.value--
  }
}

const nextWeek = () => {
  currentWeek.value++
}

const editSchedule = (schedule) => {
  editingSchedule.value = schedule
  scheduleForm.value = { ...schedule }
  showEditModal.value = true
}

const deleteSchedule = (id) => {
  if (confirm('Bạn có chắc muốn xóa lịch tập này?')) {
    trainerStore.deleteSchedule(id)
  }
}

const saveSchedule = () => {
  const scheduleData = {
    ...scheduleForm.value,
    trainer: trainerStore.currentTrainer?.name
  }

  if (showEditModal.value) {
    trainerStore.updateSchedule(editingSchedule.value.id, scheduleData)
  } else {
    trainerStore.addSchedule(scheduleData)
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
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    capacity: 20,
    enrolled: 0
  }
}

onMounted(() => {
  // Set current trainer based on logged in user
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  if (currentUser.role === 'trainer') {
    trainerStore.setCurrentTrainer(currentUser.id)
  }
})
</script>