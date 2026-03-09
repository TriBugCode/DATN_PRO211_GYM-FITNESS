<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gym-text-secondary text-sm">Tổng thành viên</p>
            <p class="text-3xl font-bebas text-gym-red">{{ totalMembers }}</p>
          </div>
          <div class="w-12 h-12 bg-gym-red/20 rounded-lg flex items-center justify-center">
            <i class="fas fa-users text-gym-red text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gym-text-secondary text-sm">Thành viên hoạt động</p>
            <p class="text-3xl font-bebas text-gym-green">{{ activeMembers }}</p>
          </div>
          <div class="w-12 h-12 bg-gym-green/20 rounded-lg flex items-center justify-center">
            <i class="fas fa-user-check text-gym-green text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gym-text-secondary text-sm">Doanh thu tháng này</p>
            <p class="text-3xl font-bebas text-gym-orange">${{ monthlyRevenue }}</p>
          </div>
          <div class="w-12 h-12 bg-gym-orange/20 rounded-lg flex items-center justify-center">
            <i class="fas fa-dollar-sign text-gym-orange text-xl"></i>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gym-text-secondary text-sm">Tổng doanh thu</p>
            <p class="text-3xl font-bebas text-gym-red">${{ totalRevenue }}</p>
          </div>
          <div class="w-12 h-12 bg-gym-red/20 rounded-lg flex items-center justify-center">
            <i class="fas fa-chart-line text-gym-red text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Members -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <h3 class="text-xl font-oswald text-white mb-4">Thành viên mới</h3>
        <div class="space-y-3">
          <div v-for="member in recentMembers" :key="member.id" class="flex items-center justify-between p-3 bg-gym-dark rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gym-red rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-user text-white text-xs"></i>
              </div>
              <div>
                <p class="text-white font-semibold">{{ member.name }}</p>
                <p class="text-gym-text-secondary text-sm">{{ member.membership }}</p>
              </div>
            </div>
            <span class="text-gym-green text-sm">{{ formatDate(member.joinDate) }}</span>
          </div>
        </div>
      </div>

      <!-- Recent Payments -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <h3 class="text-xl font-oswald text-white mb-4">Thanh toán gần đây</h3>
        <div class="space-y-3">
          <div v-for="payment in recentPayments" :key="payment.id" class="flex items-center justify-between p-3 bg-gym-dark rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gym-green rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-credit-card text-white text-xs"></i>
              </div>
              <div>
                <p class="text-white font-semibold">{{ payment.member }}</p>
                <p class="text-gym-text-secondary text-sm">{{ payment.plan }}</p>
              </div>
            </div>
            <span class="text-gym-green font-semibold">${{ payment.amount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
      <h3 class="text-xl font-oswald text-white mb-4">Hành động nhanh</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link
          to="/admin/members"
          class="bg-gym-red hover:bg-gym-orange text-white p-4 rounded-lg text-center transition-colors"
        >
          <i class="fas fa-user-plus text-2xl mb-2 block"></i>
          <span class="text-sm">Thêm thành viên</span>
        </router-link>

        <router-link
          to="/admin/trainers"
          class="bg-gym-red hover:bg-gym-orange text-white p-4 rounded-lg text-center transition-colors"
        >
          <i class="fas fa-user-tie text-2xl mb-2 block"></i>
          <span class="text-sm">Thêm HLV</span>
        </router-link>

        <router-link
          to="/admin/schedules"
          class="bg-gym-red hover:bg-gym-orange text-white p-4 rounded-lg text-center transition-colors"
        >
          <i class="fas fa-calendar-plus text-2xl mb-2 block"></i>
          <span class="text-sm">Tạo lịch tập</span>
        </router-link>

        <router-link
          to="/admin/reports"
          class="bg-gym-red hover:bg-gym-orange text-white p-4 rounded-lg text-center transition-colors"
        >
          <i class="fas fa-chart-bar text-2xl mb-2 block"></i>
          <span class="text-sm">Xem báo cáo</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/adminStore'

const adminStore = useAdminStore()

const totalMembers = computed(() => adminStore.totalMembers)
const activeMembers = computed(() => adminStore.activeMembers)
const totalRevenue = computed(() => adminStore.totalRevenue)
const monthlyRevenue = computed(() => adminStore.monthlyRevenue)

const recentMembers = computed(() => adminStore.members.slice(-3).reverse())
const recentPayments = computed(() => adminStore.payments.slice(-3).reverse())

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

onMounted(() => {
  // Data is already loaded from store
})
</script>