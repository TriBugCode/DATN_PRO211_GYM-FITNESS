<template>
  <div class="space-y-6">
    <!-- Header -->
    <h2 class="text-3xl font-bold text-gray-900">Lịch tập</h2>

    <!-- Filters -->
    <div class="flex gap-4 flex-wrap">
      <select
        v-model="filterClass"
        class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Tất cả lớp --</option>
        <option value="fitness">Fitness</option>
        <option value="yoga">Yoga</option>
        <option value="boxing">Boxing</option>
        <option value="swimming">Swimming</option>
        <option value="aerobics">Aerobics</option>
      </select>

      <select
        v-model="filterDay"
        class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Tất cả thứ --</option>
        <option value="monday">Thứ 2</option>
        <option value="tuesday">Thứ 3</option>
        <option value="wednesday">Thứ 4</option>
        <option value="thursday">Thứ 5</option>
        <option value="friday">Thứ 6</option>
        <option value="saturday">Thứ 7</option>
        <option value="sunday">Chủ nhật</option>
      </select>
    </div>

    <!-- Schedule Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="schedule in filteredSchedules" :key="schedule.id" class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold text-gray-900">{{ schedule.className }}</h3>
            <span class="inline-block mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {{ schedule.type }}
            </span>
          </div>
          <button
            @click="registerClass(schedule)"
            :class="isRegistered(schedule.id) ? 'bg-green-600' : 'bg-blue-600'"
            class="text-white px-4 py-2 rounded hover:opacity-80 transition-opacity"
          >
            {{ isRegistered(schedule.id) ? '✓ Đã đăng ký' : 'Đăng ký' }}
          </button>
        </div>

        <div class="space-y-2 text-gray-600">
          <p>📅 {{ getDayName(schedule.day) }}</p>
          <p>🕐 {{ schedule.startTime }} - {{ schedule.endTime }}</p>
          <p>👤 Huấn luyện viên: {{ getTrainerName(schedule.trainer) }}</p>
          <p>👥 Chỗ trống: {{ getRemainingSpots(schedule) }}/{{ schedule.capacity }}</p>
        </div>

        <!-- Trainer Info -->
        <div v-if="currentUser.selectedTrainer === schedule.trainer" class="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p class="text-sm text-green-700">
            ✓ Đây là lớp của huấn luyện viên bạn chọn
          </p>
        </div>
      </div>

      <div v-if="filteredSchedules.length === 0" class="col-span-full text-center text-gray-500 py-12">
        Không có lớp học nào phù hợp với bộ lọc của bạn
      </div>
    </div>

    <!-- My Registrations -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Lớp tôi đã đăng ký</h3>
      <div v-if="myRegistrations.length === 0" class="text-center text-gray-500 py-8">
        Bạn chưa đăng ký lớp nào
      </div>
      <div v-else class="space-y-3">
        <div v-for="schedule in myRegistrations" :key="schedule.id" class="flex items-center justify-between border-b pb-3">
          <div>
            <p class="font-semibold text-gray-900">{{ schedule.className }}</p>
            <p class="text-sm text-gray-600">{{ getDayName(schedule.day) }} - {{ schedule.startTime }}</p>
          </div>
          <button
            @click="unregisterClass(schedule.id)"
            class="text-red-600 hover:text-red-800 font-medium"
          >
            Hủy đăng ký
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { authStore } from '../stores/authStore'

export default {
  name: 'ViewSchedule',
  setup() {
    const currentUser = ref(authStore.currentUser.value)
    const allSchedules = ref(JSON.parse(localStorage.getItem('schedules') || '[]'))
    const myRegistrations = ref(JSON.parse(localStorage.getItem('myRegistrations') || '[]'))
    const filterClass = ref('')
    const filterDay = ref('')

    const filteredSchedules = computed(() => {
      let result = allSchedules.value

      if (filterClass.value) {
        result = result.filter(s => s.type === filterClass.value)
      }

      if (filterDay.value) {
        result = result.filter(s => s.day === filterDay.value)
      }

      return result.sort((a, b) => {
        const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
      })
    })

    const getTrainerName = (trainerId) => {
      const trainer = authStore.getAllTrainers().find(t => t.id === trainerId)
      return trainer?.name || 'N/A'
    }

    const getDayName = (day) => {
      const dayNames = {
        monday: 'Thứ 2',
        tuesday: 'Thứ 3',
        wednesday: 'Thứ 4',
        thursday: 'Thứ 5',
        friday: 'Thứ 6',
        saturday: 'Thứ 7',
        sunday: 'Chủ nhật'
      }
      return dayNames[day] || day
    }

    const isRegistered = (scheduleId) => {
      return myRegistrations.value.some(r => r.id === scheduleId)
    }

    const getRemainingSpots = (schedule) => {
      const registered = myRegistrations.value.filter(r => r.id === schedule.id).length
      return Math.max(0, schedule.capacity - registered)
    }

    const registerClass = (schedule) => {
      if (isRegistered(schedule.id)) {
        unregisterClass(schedule.id)
        return
      }

      if (getRemainingSpots(schedule) <= 0) {
        alert('Lớp này đã đủ chỗ')
        return
      }

      myRegistrations.value.push(schedule)
      localStorage.setItem('myRegistrations', JSON.stringify(myRegistrations.value))
      alert(`Đăng ký thành công lớp ${schedule.className}`)
    }

    const unregisterClass = (scheduleId) => {
      if (confirm('Bạn chắc chắn muốn hủy đăng ký?')) {
        myRegistrations.value = myRegistrations.value.filter(r => r.id !== scheduleId)
        localStorage.setItem('myRegistrations', JSON.stringify(myRegistrations.value))
      }
    }

    return {
      currentUser,
      allSchedules,
      myRegistrations,
      filterClass,
      filterDay,
      filteredSchedules,
      getTrainerName,
      getDayName,
      isRegistered,
      getRemainingSpots,
      registerClass,
      unregisterClass
    }
  }
}
</script>
