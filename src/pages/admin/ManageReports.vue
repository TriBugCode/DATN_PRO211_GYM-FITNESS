<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Báo cáo và thống kê</h1>
      <div class="flex gap-2">
        <button
          @click="exportReport"
          class="bg-gym-blue hover:bg-gym-blue/80 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <i class="fas fa-download mr-2"></i>Xuất báo cáo
        </button>
      </div>
    </div>

    <!-- Date Range Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div>
          <label class="block text-gym-text font-medium mb-2">Từ ngày</label>
          <input
            v-model="dateFrom"
            type="date"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gym-text font-medium mb-2">Đến ngày</label>
          <input
            v-model="dateTo"
            type="date"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          />
        </div>
        <button
          @click="applyDateFilter"
          class="bg-gym-red hover:bg-gym-orange text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Áp dụng
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-red/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-users text-gym-red text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Tổng thành viên</p>
            <p class="text-2xl font-bebas text-white">{{ adminStore.members.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-blue/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-user-tie text-gym-blue text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Huấn luyện viên</p>
            <p class="text-2xl font-bebas text-white">{{ adminStore.trainers.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-green/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-dollar-sign text-gym-green text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Doanh thu tháng</p>
            <p class="text-2xl font-bebas text-white">{{ formatCurrency(monthlyRevenue) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gym-orange/20 rounded-lg flex items-center justify-center mr-4">
            <i class="fas fa-calendar-alt text-gym-orange text-xl"></i>
          </div>
          <div>
            <p class="text-gym-text-secondary text-sm">Lớp học</p>
            <p class="text-2xl font-bebas text-white">{{ adminStore.schedules.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Membership Distribution -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <h3 class="text-xl font-oswald text-white mb-4">Phân bố gói thành viên</h3>
        <div class="space-y-3">
          <div v-for="membership in membershipStats" :key="membership.type" class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-gym-text-secondary">{{ membership.type }}</span>
            </div>
            <div class="flex items-center">
              <div class="w-24 bg-gym-dark rounded-full h-2 mr-3">
                <div
                  class="bg-gym-red h-2 rounded-full"
                  :style="{ width: `${membership.percentage}%` }"
                ></div>
              </div>
              <span class="text-white text-sm">{{ membership.count }} ({{ membership.percentage }}%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Chart -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <h3 class="text-xl font-oswald text-white mb-4">Doanh thu theo tháng</h3>
        <div class="space-y-3">
          <div v-for="month in revenueByMonth" :key="month.month" class="flex items-center justify-between">
            <span class="text-gym-text-secondary">{{ month.month }}</span>
            <div class="flex items-center">
              <div class="w-24 bg-gym-dark rounded-full h-2 mr-3">
                <div
                  class="bg-gym-green h-2 rounded-full"
                  :style="{ width: `${(month.revenue / maxRevenue) * 100}%` }"
                ></div>
              </div>
              <span class="text-white text-sm">{{ formatCurrency(month.revenue) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Payments Table -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20">
      <div class="px-6 py-4 border-b border-gym-red/20">
        <h3 class="text-xl font-oswald text-white">Thanh toán gần đây</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gym-dark">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Thành viên</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Gói</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Số tiền</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Ngày thanh toán</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Trạng thái</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gym-red/10">
            <tr v-for="payment in recentPayments" :key="payment.id" class="hover:bg-gym-dark">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-white">{{ payment.memberName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-gym-blue/20 text-gym-blue">
                  {{ payment.membership }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                {{ formatCurrency(payment.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gym-text-secondary">
                {{ formatDate(payment.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="payment.status === 'completed' ? 'bg-gym-green/20 text-gym-green' : 'bg-yellow-500/20 text-yellow-400'">
                  {{ payment.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/adminStore'

const adminStore = useAdminStore()

const dateFrom = ref('')
const dateTo = ref('')

const monthlyRevenue = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return adminStore.payments
    .filter(payment => {
      const paymentDate = new Date(payment.date)
      return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear
    })
    .reduce((total, payment) => total + payment.amount, 0)
})

const membershipStats = computed(() => {
  const stats = {}
  adminStore.members.forEach(member => {
    stats[member.membership] = (stats[member.membership] || 0) + 1
  })

  const total = adminStore.members.length
  return Object.entries(stats).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / total) * 100)
  }))
})

const revenueByMonth = computed(() => {
  const monthlyData = {}
  adminStore.payments.forEach(payment => {
    const date = new Date(payment.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + payment.amount
  })

  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // Last 6 months
    .map(([month, revenue]) => ({
      month: formatMonth(month),
      revenue
    }))
})

const maxRevenue = computed(() => {
  return Math.max(...revenueByMonth.value.map(m => m.revenue))
})

const recentPayments = computed(() => {
  return adminStore.payments
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const formatMonth = (monthKey) => {
  const [year, month] = monthKey.split('-')
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short' })
}

const applyDateFilter = () => {
  // Implement date filtering logic if needed
  console.log('Applying date filter:', dateFrom.value, 'to', dateTo.value)
}

const exportReport = () => {
  // Implement export functionality
  alert('Chức năng xuất báo cáo sẽ được triển khai')
}

onMounted(() => {
  // Set default date range to current month
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  dateFrom.value = firstDay.toISOString().split('T')[0]
  dateTo.value = lastDay.toISOString().split('T')[0]
})
</script>