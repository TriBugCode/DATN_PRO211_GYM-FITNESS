<template>
  <div class="space-y-6">
    <!-- Header -->
    <h2 class="text-3xl font-bold text-gray-900">Báo cáo thống kê</h2>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Tổng Hội viên</p>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalMembers }}</p>
          </div>
          <span class="text-4xl">👥</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Huấn luyện viên</p>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalTrainers }}</p>
          </div>
          <span class="text-4xl">💪</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Nhân viên</p>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalStaff }}</p>
          </div>
          <span class="text-4xl">📋</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Doanh thu ước tính</p>
            <p class="text-3xl font-bold text-gray-900">{{ estimatedRevenue }}đ</p>
          </div>
          <span class="text-4xl">💰</span>
        </div>
      </div>
    </div>

    <!-- Member Packages Chart -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Phân bổ Gói tập</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1">
            <span class="text-gray-700 w-32">Basic</span>
            <div class="flex-1 bg-gray-200 rounded-full h-4 mx-4">
              <div 
                class="bg-blue-500 h-4 rounded-full transition-all"
                :style="`width: ${getPackagePercentage('basic')}%`"
              ></div>
            </div>
          </div>
          <span class="text-gray-900 font-semibold w-16 text-right">
            {{ stats.membersByPackage.basic }} ({{ getPackagePercentage('basic') }}%)
          </span>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1">
            <span class="text-gray-700 w-32">Premium</span>
            <div class="flex-1 bg-gray-200 rounded-full h-4 mx-4">
              <div 
                class="bg-green-500 h-4 rounded-full transition-all"
                :style="`width: ${getPackagePercentage('premium')}%`"
              ></div>
            </div>
          </div>
          <span class="text-gray-900 font-semibold w-16 text-right">
            {{ stats.membersByPackage.premium }} ({{ getPackagePercentage('premium') }}%)
          </span>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1">
            <span class="text-gray-700 w-32">Elite</span>
            <div class="flex-1 bg-gray-200 rounded-full h-4 mx-4">
              <div 
                class="bg-purple-500 h-4 rounded-full transition-all"
                :style="`width: ${getPackagePercentage('elite')}%`"
              ></div>
            </div>
          </div>
          <span class="text-gray-900 font-semibold w-16 text-right">
            {{ stats.membersByPackage.elite }} ({{ getPackagePercentage('elite') }}%)
          </span>
        </div>
      </div>
    </div>

    <!-- Detailed Reports -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Members Report -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Danh sách Hội viên</h3>
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div v-if="members.length === 0" class="text-center text-gray-500 py-8">
            Không có hội viên
          </div>
          <div v-for="member in members.slice(0, 10)" :key="member.id" class="flex items-center justify-between border-b pb-3">
            <div>
              <p class="font-semibold text-gray-900">{{ member.name }}</p>
              <p class="text-sm text-gray-600">{{ member.email }}</p>
            </div>
            <span class="text-sm font-medium" :class="getPackageColor(member.packageLevel)">
              {{ getPackageName(member.packageLevel) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Trainers Report -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Danh sách Huấn luyện viên</h3>
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div v-if="trainers.length === 0" class="text-center text-gray-500 py-8">
            Không có huấn luyện viên
          </div>
          <div v-for="trainer in trainers" :key="trainer.id" class="flex items-center justify-between border-b pb-3">
            <div>
              <p class="font-semibold text-gray-900">{{ trainer.name }}</p>
              <p class="text-sm text-gray-600">{{ trainer.specialty }}</p>
            </div>
            <p class="text-sm text-gray-600">{{ trainer.phone }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Statistics -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Chi tiết thống kê</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <p class="text-3xl font-bold text-blue-600">{{ stats.totalMembers }}</p>
          <p class="text-gray-600 mt-2">Tổng Hội viên</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-green-600">{{ stats.totalTrainers }}</p>
          <p class="text-gray-600 mt-2">Huấn luyện viên</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-purple-600">{{ stats.totalStaff }}</p>
          <p class="text-gray-600 mt-2">Nhân viên</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-orange-600">{{ memberConversionRate }}%</p>
          <p class="text-gray-600 mt-2">Tỉ lệ chuyên đổi</p>
        </div>
      </div>
    </div>

    <!-- Export Button -->
    <div class="flex justify-end">
      <button
        @click="exportReport"
        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        📥 Xuất báo cáo
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { authStore, PACKAGES } from '../stores/authStore'

export default {
  name: 'ManageReports',
  setup() {
    const stats = ref(authStore.getStatistics())
    const members = ref(authStore.getAllMembers())
    const trainers = ref(authStore.getAllTrainers())
    const staff = ref(authStore.getAllStaff())

    const memberConversionRate = computed(() => {
      if (members.value.length === 0) return 0
      const premiumCount = stats.value.membersByPackage.premium + stats.value.membersByPackage.elite
      return Math.round((premiumCount / members.value.length) * 100)
    })

    const estimatedRevenue = computed(() => {
      // Rough estimate based on package levels
      // Basic: 300k, Premium: 600k, Elite: 1000k
      const basicRevenue = stats.value.membersByPackage.basic * 300000
      const premiumRevenue = stats.value.membersByPackage.premium * 600000
      const eliteRevenue = stats.value.membersByPackage.elite * 1000000
      return (basicRevenue + premiumRevenue + eliteRevenue).toLocaleString('vi-VN')
    })

    const getPackagePercentage = (packageLevel) => {
      const total = stats.value.totalMembers
      if (total === 0) return 0
      return Math.round((stats.value.membersByPackage[packageLevel] / total) * 100)
    }

    const getPackageName = (packageLevel) => {
      const names = {
        basic: 'Basic',
        premium: 'Premium',
        elite: 'Elite'
      }
      return names[packageLevel] || packageLevel
    }

    const getPackageColor = (packageLevel) => {
      const colors = {
        basic: 'bg-blue-100 text-blue-800',
        premium: 'bg-green-100 text-green-800',
        elite: 'bg-purple-100 text-purple-800'
      }
      return colors[packageLevel] || 'bg-gray-100 text-gray-800'
    }

    const exportReport = () => {
      const reportData = {
        timestamp: new Date().toLocaleString('vi-VN'),
        statistics: stats.value,
        estimatedRevenue: estimatedRevenue.value,
        memberConversionRate: memberConversionRate.value + '%',
        totalUsers: {
          members: members.value.length,
          trainers: trainers.value.length,
          staff: staff.value.length
        }
      }

      // Create CSV content
      let csvContent = 'Báo cáo thống kê GYM\n'
      csvContent += `Thời gian: ${reportData.timestamp}\n\n`
      csvContent += 'THỐNG KÊ CHUNG\n'
      csvContent += `Tổng Hội viên,${reportData.totalUsers.members}\n`
      csvContent += `Huấn luyện viên,${reportData.totalUsers.trainers}\n`
      csvContent += `Nhân viên,${reportData.totalUsers.staff}\n`
      csvContent += `Doanh thu ước tính,${reportData.estimatedRevenue}đ\n`
      csvContent += `Tỉ lệ chuyên đổi,${reportData.memberConversionRate}\n\n`
      csvContent += 'PHÂN BỔ GÓI TẬP\n'
      csvContent += `Basic,${stats.value.membersByPackage.basic},${getPackagePercentage('basic')}%\n`
      csvContent += `Premium,${stats.value.membersByPackage.premium},${getPackagePercentage('premium')}%\n`
      csvContent += `Elite,${stats.value.membersByPackage.elite},${getPackagePercentage('elite')}%\n`

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `gym_report_${new Date().getTime()}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return {
      stats,
      members,
      trainers,
      staff,
      memberConversionRate,
      estimatedRevenue,
      getPackagePercentage,
      getPackageName,
      getPackageColor,
      exportReport
    }
  }
}
</script>
