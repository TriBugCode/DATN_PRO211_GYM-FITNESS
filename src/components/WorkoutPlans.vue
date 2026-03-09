<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">💪 Kế Hoạch Tập Luyện</h1>
        <p class="text-gray-600">Các chương trình tập luyện được đề xuất dựa trên mục tiêu của bạn</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Mục tiêu</label>
            <select
              v-model="selectedGoal"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả mục tiêu</option>
              <option value="weight-loss">Giảm cân</option>
              <option value="muscle-gain">Tăng cơ</option>
              <option value="endurance">Tăng sức bền</option>
              <option value="flexibility">Tăng tính mềm dẻo</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Độ khó</label>
            <select
              v-model="selectedLevel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả cấp độ</option>
              <option value="beginner">Người mới bắt đầu</option>
              <option value="intermediate">Trung bình</option>
              <option value="advanced">Nâng cao</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Thời lượng</label>
            <select
              v-model="selectedDuration"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả thời lượng</option>
              <option value="4-week">4 tuần</option>
              <option value="8-week">8 tuần</option>
              <option value="12-week">12 tuần</option>
              <option value="24-week">24 tuần</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Plans -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div v-for="plan in filteredPlans" :key="plan.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
          <!-- Plan Header -->
          <div :style="{ backgroundColor: plan.color }" class="text-white p-6">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h2 class="text-2xl font-bold mb-1">{{ plan.name }}</h2>
                <p class="opacity-90">{{ plan.description }}</p>
              </div>
              <span class="text-3xl">{{ plan.emoji }}</span>
            </div>
          </div>

          <!-- Plan Details -->
          <div class="p-6">
            <!-- Meta Info -->
            <div class="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div class="text-center">
                <p class="text-2xl font-bold text-indigo-600">{{ plan.weeks }}</p>
                <p class="text-xs text-gray-600 mt-1">{{ plan.weeks > 1 ? 'Tuần' : 'Tuần' }}</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-green-600">{{ plan.sessionsPerWeek }}</p>
                <p class="text-xs text-gray-600 mt-1">Lần/tuần</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-orange-600">{{ plan.minutesPerSession }}</p>
                <p class="text-xs text-gray-600 mt-1">Phút</p>
              </div>
            </div>

            <!-- Goals -->
            <div class="mb-6">
              <p class="font-semibold text-gray-900 mb-3">Mục tiêu:</p>
              <ul class="space-y-2">
                <li v-for="(goal, index) in plan.goals" :key="index" class="flex items-start text-sm text-gray-700">
                  <span class="text-green-600 mr-2">✓</span>
                  {{ goal }}
                </li>
              </ul>
            </div>

            <!-- Weekly Schedule -->
            <div class="mb-6">
              <p class="font-semibold text-gray-900 mb-3">Lịch tập trong tuần:</p>
              <div class="space-y-2">
                <div v-for="(day, index) in plan.schedule" :key="index" class="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span class="font-medium text-gray-700">{{ day.day }}</span>
                  <span class="text-sm text-gray-600">{{ day.focus }}</span>
                </div>
              </div>
            </div>

            <!-- Level Badge -->
            <div class="mb-6">
              <span :class="{
                'bg-green-100 text-green-800': plan.level === 'beginner',
                'bg-blue-100 text-blue-800': plan.level === 'intermediate',
                'bg-red-100 text-red-800': plan.level === 'advanced'
              }" class="px-3 py-1 rounded-full text-sm font-semibold">
                {{ getLevelLabel(plan.level) }}
              </span>
            </div>

            <!-- Action Button -->
            <button
              @click="selectPlan(plan)"
              :class="selectedPlan?.id === plan.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'"
              class="w-full py-3 rounded-lg font-semibold transition"
            >
              {{ selectedPlan?.id === plan.id ? '✓ Đã chọn' : 'Chọn kế hoạch' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Selected Plan Details -->
      <div v-if="selectedPlan" class="bg-white rounded-lg shadow p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ selectedPlan.name }} - Chi tiết đầy đủ</h2>

        <!-- Weekly Breakdown -->
        <div class="grid grid-cols-1 md:grid-cols-{{ Math.ceil(selectedPlan.schedule.length / 2) }} gap-6 mb-8">
          <div v-for="(day, index) in selectedPlan.schedule" :key="index" class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ day.day }}</h3>
            <div class="space-y-3">
              <div class="bg-white p-3 rounded">
                <p class="text-sm text-gray-600 mb-1">Focus:</p>
                <p class="font-semibold text-gray-900">{{ day.focus }}</p>
              </div>
              <div class="bg-white p-3 rounded">
                <p class="text-sm text-gray-600 mb-1">Exercises:</p>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li v-for="(exercise, i) in day.exercises || []" :key="i">• {{ exercise }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-bold text-gray-900 mb-3">💡 Lời khuyên:</h3>
          <ul class="space-y-2">
            <li v-for="(tip, index) in selectedPlan.tips" :key="index" class="text-sm text-gray-700">
              <span class="text-blue-600 mr-2">→</span> {{ tip }}
            </li>
          </ul>
        </div>

        <!-- Start Plan Button -->
        <button
          @click="startPlan"
          class="w-full mt-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          🚀 Bắt đầu kế hoạch
        </button>
      </div>

      <!-- My Active Plans -->
      <div v-if="activePlans.length > 0" class="mt-8 bg-white rounded-lg shadow p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">📊 Kế hoạch đang thực hiện</h2>
        <div class="space-y-4">
          <div v-for="plan in activePlans" :key="plan.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p class="font-semibold text-gray-900">{{ plan.name }}</p>
              <p class="text-sm text-gray-600">Tuần {{ plan.currentWeek }}/{{ plan.weeks }} - {{ Math.round((plan.currentWeek / plan.weeks) * 100) }}% hoàn thành</p>
              <div class="mt-2 w-48 bg-gray-200 rounded-full h-2">
                <div
                  :style="{ width: ((plan.currentWeek / plan.weeks) * 100) + '%' }"
                  class="bg-green-600 h-2 rounded-full transition"
                ></div>
              </div>
            </div>
            <button
              @click="completePlan(plan.id)"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              ✓ Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkoutPlans',
  data() {
    return {
      selectedGoal: '',
      selectedLevel: '',
      selectedDuration: '',
      selectedPlan: null,
      activePlans: [
        {
          id: 1,
          name: 'Giảm cân - 8 tuần',
          currentWeek: 3,
          weeks: 8
        }
      ],
      plans: [
        {
          id: 1,
          name: 'Giảm cân nhanh',
          emoji: '🔥',
          description: 'Chương trình cardio và HIIT để giảm cân hiệu quả',
          color: '#FF6B6B',
          weeks: 8,
          sessionsPerWeek: 5,
          minutesPerSession: 45,
          level: 'intermediate',
          goal: 'weight-loss',
          duration: '8-week',
          goals: [
            'Đốt calo hiệu quả',
            'Tăng sức bền tim mạch',
            'Giảm 4-8kg trong 8 tuần',
            'Cải thiện tâm trạng'
          ],
          schedule: [
            { day: 'Thứ 2', focus: 'Cardio + Core', exercises: ['30 phút chạy bộ', '3 set plank', 'Crunch'] },
            { day: 'Thứ 3', focus: 'Yoga & Stretching', exercises: ['45 phút yoga', 'Stretching'] },
            { day: 'Thứ 4', focus: 'HIIT Training', exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats'] },
            { day: 'Thứ 5', focus: 'Cycling', exercises: ['45 phút đạp xe', 'Core strengthening'] },
            { day: 'Thứ 6', focus: 'Boxing', exercises: ['Punch bag', 'Shadowboxing'] },
          ],
          tips: [
            'Phai ăn cơm tối trước 19h',
            'Uống nước đầy đủ mỗi ngày (2-3L)',
            'Tránh đồ ăn nhanh và nước ngọt',
            'Ngủ đủ 7-8 tiếng mỗi đêm'
          ]
        },
        {
          id: 2,
          name: 'Tăng cơ bắp',
          emoji: '💪',
          description: 'Tập tạ toàn thân để xây dựng cơ bắp',
          color: '#4ECDC4',
          weeks: 12,
          sessionsPerWeek: 4,
          minutesPerSession: 60,
          level: 'advanced',
          goal: 'muscle-gain',
          duration: '12-week',
          goals: [
            'Tăng cơ bắp 2-3kg',
            'Tăng sức mạnh',
            'Cải thiện sĩ số body',
            'Tăng chỉ số BMI khỏe mạnh'
          ],
          schedule: [
            { day: 'Thứ 2', focus: 'Ngực + Tay', exercises: ['Bench press', 'Dumbbell curl', 'Tricep dips'] },
            { day: 'Thứ 3', focus: 'Lưng + Cột sống', exercises: ['Deadlifts', 'Lat pulldowns', 'Rows'] },
            { day: 'Thứ 5', focus: 'Chân + Glutes', exercises: ['Squats', 'Lunges', 'Leg press'] },
            { day: 'Thứ 7', focus: 'Vai + Core', exercises: ['Shoulder press', 'Lateral raises', 'Ab wheel'] },
          ],
          tips: [
            'Tăng protein: 2g/kg cân nặng',
            'Ăn đủ carb để có năng lượng',
            'Tập với tạ nặng: 8-12 lần/set',
            'Nghỉ ngơi giữa các set: 90-120 giây'
          ]
        },
        {
          id: 3,
          name: 'Yoga cho người bận rộn',
          emoji: '🧘',
          description: 'Yoga 30 phút hàng ngày để thư giãn và mềm dẻo',
          color: '#9B59B6',
          weeks: 4,
          sessionsPerWeek: 6,
          minutesPerSession: 30,
          level: 'beginner',
          goal: 'flexibility',
          duration: '4-week',
          goals: [
            'Tăng tính mềm dẻo',
            'Giảm căng thẳng',
            'Cải thiện tư thế',
            'Tăng sự cân bằng'
          ],
          schedule: [
            { day: 'Thứ 2', focus: 'Sunrise Yoga', exercises: ['Warm-up', 'Sun salutation', 'Stretching'] },
            { day: 'Thứ 3', focus: 'Hatha Yoga', exercises: ['Standing poses', 'Balance poses'] },
            { day: 'Thứ 4', focus: 'Restorative', exercises: ['Relaxation poses', 'Breathing'] },
            { day: 'Thứ 5', focus: 'Power Yoga', exercises: ['Core strengthening', 'Dynamic poses'] },
            { day: 'Thứ 6', focus: 'Yin Yoga', exercises: ['Deep stretches', 'Meditation'] },
            { day: 'Thứ 7', focus: 'Vinyasa', exercises: ['Flow movements', 'Cool down'] },
          ],
          tips: [
            'Tập trên thảm yoga sạch',
            'Mặc trang phục thoải mái',
            'Tập trên cơ thể trống rỗng',
            'Tập trong không gian yên tĩnh'
          ]
        },
        {
          id: 4,
          name: 'Tăng sức bền',
          emoji: '🏃',
          description: 'Chương trình chạy bộ để tăng sức bền',
          color: '#3498DB',
          weeks: 8,
          sessionsPerWeek: 4,
          minutesPerSession: 50,
          level: 'intermediate',
          goal: 'endurance',
          duration: '8-week',
          goals: [
            'Chạy liên tục 10km',
            'Tăng thể lực',
            'Giảm đau nhức',
            'Cảm thấy khoẻ khoắn hơn'
          ],
          schedule: [
            { day: 'Thứ 2', focus: 'Easy Run', exercises: ['30 phút chạy nhẹ'] },
            { day: 'Thứ 3', focus: 'Speed Work', exercises: ['Interval training'] },
            { day: 'Thứ 4', focus: 'Recovery', exercises: ['20 phút chạy nhẹ'] },
            { day: 'Thứ 6', focus: 'Long Run', exercises: ['45 phút chạy dài'] },
          ],
          tips: [
            'Đầu tư vào giày chạy tốt',
            'Chạy ở tempo vừa phải',
            'Tăng quãng đường dần dần',
            'Uống nước đầy đủ sau chạy'
          ]
        }
      ]
    }
  },
  computed: {
    filteredPlans() {
      return this.plans.filter(plan => {
        if (this.selectedGoal && plan.goal !== this.selectedGoal) return false
        if (this.selectedLevel && plan.level !== this.selectedLevel) return false
        if (this.selectedDuration && plan.duration !== this.selectedDuration) return false
        return true
      })
    }
  },
  methods: {
    getLevelLabel(level) {
      const labels = {
        'beginner': 'Người mới bắt đầu',
        'intermediate': 'Trung bình',
        'advanced': 'Nâng cao'
      }
      return labels[level]
    },
    selectPlan(plan) {
      this.selectedPlan = plan
    },
    startPlan() {
      alert(`Bắt đầu kế hoạch: ${this.selectedPlan.name}`)
      this.$emit('notification', {
        type: 'success',
        message: `Bắt đầu kế hoạch ${this.selectedPlan.name}!`
      })
    },
    completePlan(planId) {
      alert('Chúc mừng! Bạn đã hoàn thành kế hoạch!')
    }
  }
}
</script>
