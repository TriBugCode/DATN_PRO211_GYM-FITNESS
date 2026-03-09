<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-green-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 fade-up">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2 glow-text">
          📊 Lịch Sử Tập Luyện
        </h1>
        <p class="text-gray-600 text-lg">Theo dõi lịch check-in/check-out và lịch sử tập luyện của bạn</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 hover-lift fade-up stagger-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-indigo-700 text-sm font-bold">🏃 Tháng này</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ thisMonthCount }}</p>
              <p class="text-indigo-600 text-xs mt-1">lần tập</p>
            </div>
          </div>
        </div>

        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 hover-lift fade-up stagger-2">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-700 text-sm font-bold">📅 Tuần này</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ thisWeekCount }}</p>
              <p class="text-green-600 text-xs mt-1">lần tập</p>
            </div>
          </div>
        </div>

        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 hover-lift fade-up stagger-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-700 text-sm font-bold">🔥 Streak hiện tại</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ currentStreak }}</p>
              <p class="text-orange-600 text-xs mt-1 font-semibold">ngày liên tiếp</p>
            </div>
          </div>
        </div>

        <div class="card-modern group rounded-2xl shadow-lg p-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 hover-lift fade-up stagger-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-700 text-sm font-bold">💪 Tổng cộng</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">{{ totalSessions }}</p>
              <p class="text-blue-600 text-xs mt-1">lần tập</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Check-in/Check-out Button -->
      <div class="card-modern glass-morphism rounded-2xl shadow-lg p-8 mb-8 fade-up stagger-1">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <span>👤</span>
              <span>Điểm danh hôm nay</span>
            </h2>
            <p class="text-gray-700 text-lg">
              <span v-if="todayCheckIn" class="text-green-600 font-bold flex items-center space-x-1">
                <span>✅</span>
                <span>Đã check-in lúc {{ formatTime(todayCheckIn) }}</span>
              </span>
              <span v-else class="text-orange-600 font-bold flex items-center space-x-1">
                <span>⏳</span>
                <span>Chưa check-in hôm nay</span>
              </span>
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex gap-3 fade-up stagger-2">
            <button
              @click="handleCheckIn"
              :disabled="todayCheckIn"
              class="btn-modern group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale flex items-center space-x-2 transition"
            >
              <span>✅</span>
              <span>Check-in</span>
            </button>
            <button
              @click="handleCheckOut"
              :disabled="!todayCheckIn || todayCheckOut"
              class="btn-modern group px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale flex items-center space-x-2 transition"
            >
              <span>🚪</span>
              <span>Check-out</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card-modern glass-morphism rounded-2xl shadow-lg p-6 mb-8 fade-up stagger-2">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <span>🔍</span>
          <span>Bộ Lọc</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">📆 Lọc theo tháng</label>
            <select
              v-model="selectedMonth"
              class="input-modern w-full px-4 py-2 rounded-lg text-gray-900"
            >
              <option value="">Tất cả tháng</option>
              <option v-for="month in 12" :key="month" :value="month">
                Tháng {{ month }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">📅 Lọc theo năm</label>
            <select
              v-model.number="selectedYear"
              class="input-modern w-full px-4 py-2 rounded-lg text-gray-900"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tìm kiếm</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm hoạt động..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Attendance Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-100 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Check-in</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Check-out</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thời gian</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hoạt động</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="session in filteredSessions"
                :key="session.id"
                class="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td class="px-6 py-4 text-sm text-gray-900 font-medium">
                  {{ formatDate(session.date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <span class="text-green-600 font-semibold">{{ formatTime(session.checkIn) }}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <span v-if="session.checkOut" class="text-orange-600 font-semibold">
                    {{ formatTime(session.checkOut) }}
                  </span>
                  <span v-else class="text-gray-400">Chưa check-out</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ calculateDuration(session.checkIn, session.checkOut) }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                    {{ session.activity || 'Tập chung' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ session.notes || '-' }}
                </td>
              </tr>
              <tr v-if="filteredSessions.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                  Không có dữ liệu tập luyện
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Activity Chart -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">📈 Thống kê tập luyện</h2>
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="day in last7Days"
            :key="day.date"
            class="text-center"
          >
            <div class="text-sm text-gray-600 mb-2">{{ day.label }}</div>
            <div
              :style="{ height: (day.count * 20) + 'px' }"
              class="bg-indigo-600 rounded transition hover:bg-indigo-700"
            ></div>
            <div class="text-sm text-gray-600 mt-2">{{ day.count }}x</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceTracking',
  data() {
    return {
      selectedMonth: '',
      selectedYear: '',
      searchQuery: '',
      sessions: [
        {
          id: 1,
          date: '2026-02-13',
          checkIn: '06:00',
          checkOut: '07:30',
          activity: 'Yoga',
          notes: 'Tập luyện tốt'
        },
        {
          id: 2,
          date: '2026-02-12',
          checkIn: '17:00',
          checkOut: '18:45',
          activity: 'Weight Training',
          notes: 'Ngực + Tay'
        },
        {
          id: 3,
          date: '2026-02-11',
          checkIn: '06:15',
          checkOut: '07:45',
          activity: 'Cardio',
          notes: ''
        },
        {
          id: 4,
          date: '2026-02-10',
          checkIn: '18:00',
          checkOut: '19:30',
          activity: 'Boxing',
          notes: 'Tập cơ bản'
        },
        {
          id: 5,
          date: '2026-02-09',
          checkIn: '06:00',
          checkOut: null,
          activity: 'Tập chung',
          notes: 'Chưa hoàn thành'
        }
      ]
    }
  },
  computed: {
    filteredSessions() {
      return this.sessions.filter(session => {
        if (this.selectedMonth) {
          const month = parseInt(this.selectedMonth)
          const sessionMonth = parseInt(session.date.split('-')[1])
          if (sessionMonth !== month) return false
        }

        if (this.selectedYear) {
          const year = parseInt(this.selectedYear)
          const sessionYear = parseInt(session.date.split('-')[0])
          if (sessionYear !== year) return false
        }

        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase()
          if (
            !session.activity.toLowerCase().includes(query) &&
            !session.notes.toLowerCase().includes(query)
          ) {
            return false
          }
        }

        return true
      })
    },
    thisMonthCount() {
      const now = new Date()
      return this.sessions.filter(s => {
        const date = new Date(s.date)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      }).length
    },
    thisWeekCount() {
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return this.sessions.filter(s => {
        const date = new Date(s.date)
        return date >= weekAgo && date <= now
      }).length
    },
    currentStreak() {
      let streak = 0
      const sortedSessions = [...this.sessions].sort((a, b) => new Date(b.date) - new Date(a.date))
      const today = new Date()

      for (const session of sortedSessions) {
        const sessionDate = new Date(session.date)
        const dayDiff = Math.floor((today - sessionDate) / (1000 * 60 * 60 * 24))

        if (dayDiff === streak) {
          streak++
        } else {
          break
        }
      }

      return streak
    },
    totalSessions() {
      return this.sessions.length
    },
    todayCheckIn() {
      const today = new Date().toISOString().split('T')[0]
      const todaySession = this.sessions.find(s => s.date === today)
      return todaySession?.checkIn || null
    },
    todayCheckOut() {
      const today = new Date().toISOString().split('T')[0]
      const todaySession = this.sessions.find(s => s.date === today)
      return todaySession?.checkOut || null
    },
    last7Days() {
      const days = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        const count = this.sessions.filter(s => s.date === dateStr).length

        const labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
        days.push({
          date: dateStr,
          label: labels[date.getDay()],
          count
        })
      }
      return days
    }
  },
  methods: {
    handleCheckIn() {
      const today = new Date().toISOString().split('T')[0]
      const now = new Date()
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      const newSession = {
        id: Math.max(...this.sessions.map(s => s.id), 0) + 1,
        date: today,
        checkIn: time,
        checkOut: null,
        activity: 'Tập chung',
        notes: ''
      }

      this.sessions.unshift(newSession)
      this.$emit('notification', {
        type: 'success',
        message: 'Check-in thành công! 🎉'
      })
    },
    handleCheckOut() {
      const today = new Date().toISOString().split('T')[0]
      const todaySession = this.sessions.find(s => s.date === today)

      if (todaySession && !todaySession.checkOut) {
        const now = new Date()
        todaySession.checkOut = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
        this.$emit('notification', {
          type: 'success',
          message: 'Check-out thành công! Cảm ơn bạn đã tập luyện!'
        })
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
      return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`
    },
    formatTime(time) {
      return time
    },
    calculateDuration(checkIn, checkOut) {
      if (!checkOut) return '-'
      const [inH, inM] = checkIn.split(':').map(Number)
      const [outH, outM] = checkOut.split(':').map(Number)
      const inTotal = inH * 60 + inM
      const outTotal = outH * 60 + outM
      const diff = outTotal - inTotal
      const hours = Math.floor(diff / 60)
      const minutes = diff % 60
      return `${hours}h ${minutes}m`
    }
  }
}
</script>
