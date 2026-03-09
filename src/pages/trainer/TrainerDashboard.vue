<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-gym-red to-gym-orange p-6 rounded-lg text-white">
      <h1 class="text-3xl font-bebas mb-2">Chào mừng, {{ trainerStore.currentTrainer?.name }}!</h1>
      <p class="text-gym-dark/80">Hôm nay là ngày tuyệt vời để giúp học viên của bạn đạt được mục tiêu.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-blue/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-users text-gym-blue text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Học viên hiện tại</p>
            <p class="text-2xl font-bebas text-white">{{ trainerStore.clients.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-green/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-calendar-check text-gym-green text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Lịch tập hôm nay</p>
            <p class="text-2xl font-bebas text-white">{{ todaysSchedules }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-orange/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-dumbbell text-gym-orange text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Kế hoạch tập luyện</p>
            <p class="text-2xl font-bebas text-white">{{ trainerStore.workoutPlans.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-red/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-chart-line text-gym-red text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Báo cáo tiến độ</p>
            <p class="text-2xl font-bebas text-white">{{ trainerStore.progressReports.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Today's Schedule -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20">
      <div class="px-6 py-4 border-b border-gym-red/20">
        <h3 class="text-xl font-oswald text-white">Lịch tập hôm nay</h3>
      </div>
      <div class="p-6">
        <div v-if="todaysScheduleList.length === 0" class="text-center py-8">
          <i class="fas fa-calendar-times text-4xl text-gym-text-secondary mb-4"></i>
          <p class="text-gym-text-secondary">Không có lịch tập nào hôm nay</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="schedule in todaysScheduleList"
            :key="schedule.id"
            class="flex items-center justify-between p-4 bg-gym-dark rounded-lg"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gym-red rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-dumbbell text-white"></i>
              </div>
              <div>
                <h4 class="text-white font-medium">{{ schedule.className }}</h4>
                <p class="text-gym-text-secondary text-sm">{{ schedule.startTime }} - {{ schedule.endTime }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-white">{{ schedule.enrolled }}/{{ schedule.capacity }}</p>
              <p class="text-gym-text-secondary text-sm">học viên</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Clients -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20">
      <div class="px-6 py-4 border-b border-gym-red/20 flex justify-between items-center">
        <h3 class="text-xl font-oswald text-white">Học viên gần đây</h3>
        <router-link
          to="/trainer/clients"
          class="text-gym-blue hover:text-gym-blue/80 transition-colors"
        >
          Xem tất cả <i class="fas fa-arrow-right ml-1"></i>
        </router-link>
      </div>
      <div class="p-6">
        <div v-if="recentClients.length === 0" class="text-center py-8">
          <i class="fas fa-users text-4xl text-gym-text-secondary mb-4"></i>
          <p class="text-gym-text-secondary">Chưa có học viên nào</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="client in recentClients"
            :key="client.id"
            class="flex items-center p-4 bg-gym-dark rounded-lg hover:bg-gym-dark/80 transition-colors cursor-pointer"
            @click="$router.push('/trainer/clients')"
          >
            <div class="w-12 h-12 bg-gym-red rounded-full flex items-center justify-center mr-4">
              <i class="fas fa-user text-white"></i>
            </div>
            <div class="flex-1">
              <h4 class="text-white font-medium">{{ client.name }}</h4>
              <p class="text-gym-text-secondary text-sm">{{ client.membership }}</p>
            </div>
            <div class="text-right">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-gym-green/20 text-gym-green">
                {{ client.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <router-link
        to="/trainer/clients"
        class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 hover:border-gym-red/40 transition-colors text-center"
      >
        <i class="fas fa-users text-3xl text-gym-blue mb-3"></i>
        <h3 class="text-white font-oswald mb-2">Quản lý học viên</h3>
        <p class="text-gym-text-secondary text-sm">Xem và cập nhật thông tin học viên</p>
      </router-link>

      <router-link
        to="/trainer/plans"
        class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 hover:border-gym-red/40 transition-colors text-center"
      >
        <i class="fas fa-dumbbell text-3xl text-gym-orange mb-3"></i>
        <h3 class="text-white font-oswald mb-2">Kế hoạch tập luyện</h3>
        <p class="text-gym-text-secondary text-sm">Tạo và chỉnh sửa kế hoạch</p>
      </router-link>

      <router-link
        to="/trainer/reports"
        class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 hover:border-gym-red/40 transition-colors text-center"
      >
        <i class="fas fa-chart-line text-3xl text-gym-green mb-3"></i>
        <h3 class="text-white font-oswald mb-2">Báo cáo tiến độ</h3>
        <p class="text-gym-text-secondary text-sm">Theo dõi sự tiến bộ</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTrainerStore } from '../../stores/trainerStore'

const trainerStore = useTrainerStore()

const todaysSchedules = computed(() => {
  const today = new Date().toLocaleLowerCase('en-US', { weekday: 'long' })
  return trainerStore.schedules.filter(schedule =>
    schedule.day.toLowerCase() === today && schedule.trainer === trainerStore.currentTrainer?.name
  ).length
})

const todaysScheduleList = computed(() => {
  const today = new Date().toLocaleLowerCase('en-US', { weekday: 'long' })
  return trainerStore.schedules.filter(schedule =>
    schedule.day.toLowerCase() === today && schedule.trainer === trainerStore.currentTrainer?.name
  )
})

const recentClients = computed(() => {
  return trainerStore.clients.slice(0, 4)
})

onMounted(() => {
  // Set current trainer based on logged in user
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  if (currentUser.role === 'trainer') {
    trainerStore.setCurrentTrainer(currentUser.id)
  }
})
</script>