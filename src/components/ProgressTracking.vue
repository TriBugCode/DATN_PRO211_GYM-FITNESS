<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 fade-up">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 glow-text">
          📈 Theo Dõi Tiến Độ
        </h1>
        <p class="text-gray-600 text-lg">Cập nhật số cân, body metrics và theo dõi tiến độ tập luyện của bạn</p>
      </div>

      <!-- Add New Measurement -->
      <div class="card-modern glass-morphism rounded-2xl shadow-lg p-8 mb-8 fade-up stagger-1">
        <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <span>➕</span>
          <span>Cập nhật số liệu hôm nay</span>
        </h2>
        <form @submit.prevent="addMeasurement" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="fade-up stagger-1">
            <label class="block text-sm font-bold text-gray-700 mb-2">⚖️ Cân nặng (kg)</label>
            <input
              v-model.number="newMeasurement.weight"
              type="number"
              step="0.1"
              placeholder="70.5"
              class="input-modern w-full px-4 py-3 rounded-lg text-gray-900"
            />
          </div>
          <div class="fade-up stagger-2">
            <label class="block text-sm font-bold text-gray-700 mb-2">📊 Chỉ số BMI</label>
            <input
              v-model.number="newMeasurement.bmi"
              type="number"
              step="0.1"
              placeholder="24.2"
              class="input-modern w-full px-4 py-3 rounded-lg text-gray-900"
            />
          </div>
          <div class="fade-up stagger-3">
            <label class="block text-sm font-bold text-gray-700 mb-2">💪 % Mỡ cơ thể</label>
            <input
              v-model.number="newMeasurement.bodyFat"
              type="number"
              step="0.1"
              placeholder="20.5"
              class="input-modern w-full px-4 py-3 rounded-lg text-gray-900"
            />
          </div>
          <div class="flex items-end fade-up stagger-4">
            <button
              type="submit"
              class="w-full btn-modern btn-gradient text-white font-bold py-3 rounded-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>💾</span>
              <span>Lưu</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Progress Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 hover-lift fade-up stagger-1">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-blue-700 text-sm font-bold mb-1">⚖️ Cân nặng hiện tại</p>
              <p class="text-3xl font-bold text-gray-900">{{ latestMeasurement?.weight || 'N/A' }} <span class="text-lg">kg</span></p>
              <p class="text-blue-700 text-sm mt-2 font-semibold">
                {{ weightChange >= 0 ? '📈 +' : '📉 ' }}{{ Math.abs(weightChange).toFixed(1) }} kg
              </p>
            </div>
          </div>
        </div>

        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 hover-lift fade-up stagger-2">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-green-700 text-sm font-bold mb-1">📊 Chỉ số BMI</p>
              <p class="text-3xl font-bold text-gray-900">{{ latestMeasurement?.bmi || 'N/A' }}</p>
              <p class="text-green-700 text-sm mt-2 font-semibold">
                {{ bmiStatus }}
              </p>
            </div>
          </div>
        </div>

        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 hover-lift fade-up stagger-3">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-orange-700 text-sm font-bold mb-1">💪 % Mỡ cơ thể</p>
              <p class="text-3xl font-bold text-gray-900">{{ latestMeasurement?.bodyFat || 'N/A' }}<span class="text-lg">%</span></p>
              <p class="text-orange-700 text-sm mt-2 font-semibold">
                {{ fatChange >= 0 ? '📈 +' : '📉 ' }}{{ Math.abs(fatChange).toFixed(1) }}%
              </p>
            </div>
          </div>
        </div>

        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 hover-lift fade-up stagger-4">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-purple-700 text-sm font-bold mb-1">📝 Tổng cập nhật</p>
              <p class="text-3xl font-bold text-gray-900">{{ measurements.length }}</p>
              <p class="text-purple-700 text-sm mt-2 font-semibold">lần ghi nhận</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Weight Chart -->
        <div class="card-modern glass-morphism rounded-2xl shadow-lg p-6 fade-up stagger-1">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <span>📈</span>
            <span>Biểu đồ cân nặng</span>
          </h2>
          <div class="flex items-end justify-between h-64 px-4 py-8 bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-200/50">
            <div
              v-for="(measurement, index) in measurements"
              :key="index"
              class="flex flex-col items-center flex-1 mx-1 zoom-in"
              :style="{ 'animation-delay': (index * 50) + 'ms' }"
            >
              <div
                :style="{ height: (measurement.weight / maxWeight * 100) + '%' }"
                class="w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition hover:from-blue-700 hover:to-blue-500 cursor-pointer group relative hover:scale-110 transform duration-300"
              >
                <div class="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap mb-1 z-10 font-bold">
                  {{ measurement.weight }} kg
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-2 font-semibold">{{ formatDateShort(measurement.date) }}</p>
            </div>
          </div>
        </div>

        <!-- Body Fat Chart -->
        <div class="card-modern glass-morphism rounded-2xl shadow-lg p-6 fade-up stagger-2">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <span>💪</span>
            <span>Biểu đồ % mỡ cơ thể</span>
          </h2>
          <div class="flex items-end justify-between h-64 px-4 py-8 bg-gradient-to-b from-orange-50 to-white rounded-xl border border-orange-200/50">
            <div
              v-for="(measurement, index) in measurements"
              :key="index"
              class="flex flex-col items-center flex-1 mx-1 zoom-in"
              :style="{ 'animation-delay': (index * 50) + 'ms' }"
            >
              <div
                :style="{ height: (measurement.bodyFat / maxBodyFat * 100) + '%' }"
                class="w-6 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t transition hover:from-orange-700 hover:to-orange-500 cursor-pointer group relative hover:scale-110 transform duration-300"
              >
                <div class="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap mb-1 z-10 font-bold">
                  {{ measurement.bodyFat }}%
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-2 font-semibold">{{ formatDateShort(measurement.date) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Measurement History -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">📋 Lịch sử cập nhật</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-100 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cân nặng</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">BMI</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">% Mỡ</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thay đổi</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(measurement, index) in [...measurements].reverse()"
                :key="index"
                class="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td class="px-6 py-4 text-sm text-gray-900 font-medium">
                  {{ formatDate(measurement.date) }}
                </td>
                <td class="px-6 py-4 text-sm font-semibold">
                  <span class="text-blue-600">{{ measurement.weight }} kg</span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    {{ measurement.bmi }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="text-orange-600 font-semibold">{{ measurement.bodyFat }}%</span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span v-if="index === 0" class="text-gray-400">-</span>
                  <span v-else :class="measurements[measurements.length - index].weight > measurement.weight ? 'text-green-600' : 'text-red-600'" class="font-semibold">
                    {{ measurements[measurements.length - index].weight > measurement.weight ? '📉' : '📈' }}
                    {{ Math.abs(measurements[measurements.length - index].weight - measurement.weight).toFixed(1) }} kg
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <button
                    @click="deleteMeasurement(measurements.length - index - 1)"
                    class="text-red-600 hover:text-red-800 font-semibold"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Goals -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">🎯 Mục tiêu của tôi</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
            <p class="text-gray-600 text-sm mb-2">Mục tiêu cân nặng</p>
            <p class="text-2xl font-bold text-indigo-600">65 kg</p>
            <div class="mt-3 w-full bg-gray-300 rounded-full h-2">
              <div
                class="bg-indigo-600 h-2 rounded-full transition"
                :style="{ width: ((latestMeasurement?.weight || 70) / 65 * 100) + '%' }"
              ></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              Còn {{ ((latestMeasurement?.weight || 70) - 65).toFixed(1) }} kg
            </p>
          </div>

          <div class="border border-green-200 rounded-lg p-4 bg-green-50">
            <p class="text-gray-600 text-sm mb-2">Mục tiêu BMI</p>
            <p class="text-2xl font-bold text-green-600">22</p>
            <div class="mt-3 w-full bg-gray-300 rounded-full h-2">
              <div
                class="bg-green-600 h-2 rounded-full transition"
                :style="{ width: (Math.min((latestMeasurement?.bmi || 24) / 22 * 100, 100)) + '%' }"
              ></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              {{ (latestMeasurement?.bmi || 24) > 22 ? 'Cần giảm ' + ((latestMeasurement?.bmi || 24) - 22).toFixed(1) : 'Đạt mục tiêu!' }}
            </p>
          </div>

          <div class="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <p class="text-gray-600 text-sm mb-2">Mục tiêu % mỡ</p>
            <p class="text-2xl font-bold text-orange-600">15%</p>
            <div class="mt-3 w-full bg-gray-300 rounded-full h-2">
              <div
                class="bg-orange-600 h-2 rounded-full transition"
                :style="{ width: (Math.min((latestMeasurement?.bodyFat || 20) / 15 * 100, 100)) + '%' }"
              ></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              {{ (latestMeasurement?.bodyFat || 20) > 15 ? 'Cần giảm ' + ((latestMeasurement?.bodyFat || 20) - 15).toFixed(1) + '%' : 'Đạt mục tiêu!' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressTracking',
  data() {
    return {
      newMeasurement: {
        weight: null,
        bmi: null,
        bodyFat: null
      },
      measurements: [
        { date: '2026-01-13', weight: 73, bmi: 25.2, bodyFat: 24 },
        { date: '2026-01-20', weight: 71.5, bmi: 24.7, bodyFat: 23 },
        { date: '2026-02-03', weight: 70, bmi: 24.2, bodyFat: 22 },
        { date: '2026-02-10', weight: 69, bmi: 23.9, bodyFat: 21 },
        { date: '2026-02-13', weight: 68.5, bmi: 23.7, bodyFat: 20.5 }
      ]
    }
  },
  computed: {
    latestMeasurement() {
      return this.measurements[this.measurements.length - 1] || null
    },
    weightChange() {
      if (this.measurements.length < 2) return 0
      return this.measurements[this.measurements.length - 1].weight - this.measurements[0].weight
    },
    fatChange() {
      if (this.measurements.length < 2) return 0
      return this.measurements[this.measurements.length - 1].bodyFat - this.measurements[0].bodyFat
    },
    bmiStatus() {
      const bmi = this.latestMeasurement?.bmi || 0
      if (bmi < 18.5) return '😢 Thiếu cân'
      if (bmi < 25) return '✅ Bình thường'
      if (bmi < 30) return '⚠️ Thừa cân'
      return '🚨 Béo phì'
    },
    maxWeight() {
      return Math.max(...this.measurements.map(m => m.weight)) + 5
    },
    maxBodyFat() {
      return Math.max(...this.measurements.map(m => m.bodyFat)) + 3
    }
  },
  methods: {
    addMeasurement() {
      if (!this.newMeasurement.weight || !this.newMeasurement.bmi || !this.newMeasurement.bodyFat) {
        alert('Vui lòng điền đầy đủ thông tin')
        return
      }

      this.measurements.push({
        date: new Date().toISOString().split('T')[0],
        weight: this.newMeasurement.weight,
        bmi: this.newMeasurement.bmi,
        bodyFat: this.newMeasurement.bodyFat
      })

      this.newMeasurement = { weight: null, bmi: null, bodyFat: null }
      this.$emit('notification', {
        type: 'success',
        message: 'Cập nhật số liệu thành công!'
      })
    },
    deleteMeasurement(index) {
      this.measurements.splice(index, 1)
      this.$emit('notification', {
        type: 'warning',
        message: 'Đã xóa bản ghi'
      })
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    },
    formatDateShort(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
    }
  }
}
</script>
