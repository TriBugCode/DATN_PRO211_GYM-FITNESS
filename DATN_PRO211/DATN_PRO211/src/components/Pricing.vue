<template>
  <section class="py-20 px-6 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Gói Thành Viên</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Chọn gói hoàn hảo phù hợp với mục tiêu thể hình và lối sống của bạn.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          :class="[
            'bg-white rounded-lg p-8 scale-in stagger-' + (index + 1),
            selectedPlan === plan.name
              ? 'ring-2 ring-indigo-600 shadow-xl transform scale-105 card-hover' 
              : 'shadow-lg card-hover'
          ]"
        >
          <div v-if="plan.popular && selectedPlan !== plan.name" class="bg-indigo-600 text-white text-sm px-4 py-1 rounded-full inline-block mb-4">
            Phổ Biến Nhất
          </div>
          <div v-else-if="selectedPlan === plan.name" class="bg-green-600 text-white text-sm px-4 py-1 rounded-full inline-block mb-4">
            ✓ Đã Chọn
          </div>
          <div v-else class="h-10"></div>
          <h3 class="text-2xl font-bold mb-2">{{ plan.name }}</h3>
          <div class="mb-6">
            <span class="text-5xl font-bold">{{ plan.price }}</span>
            <span class="text-gray-600 ml-2">{{ plan.period }}</span>
          </div>
          <ul class="space-y-4 mb-8">
            <li
              v-for="(feature, featureIndex) in plan.features"
              :key="featureIndex"
              class="flex items-start"
            >
              <svg class="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>
          <button
            @click="selectPlan(plan.name)"
            :class="[
              'w-full px-6 py-3 rounded-md transition-colors font-semibold btn-animate',
              selectedPlan === plan.name
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            ]"
          >
            {{ selectedPlan === plan.name ? '✓ Gói Được Chọn' : 'Chọn Gói' }}
          </button>
        </div>
      </div>
      <div v-if="selectedPlan" class="mt-10 text-center">
        <p class="text-lg text-gray-700 mb-4">Gói được chọn: <span class="font-bold text-indigo-600">{{ selectedPlan }}</span></p>
        <button
          @click="confirmSelection"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
        >
          Xác Nhận Gói
        </button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Pricing',
  data() {
    return {
      selectedPlan: null,
      plans: [
        {
          name: 'Cơ Bản',
          price: '500.000đ',
          period: 'mỗi tháng',
          features: [
            'Sử dụng thiết bị gym',
            'Phòng thay đồ',
            'WiFi miễn phí',
            'Ứng dụng di động'
          ]
        },
        {
          name: 'Cao Cấp',
          price: '1.000.000đ',
          period: 'mỗi tháng',
          popular: true,
          features: [
            'Tất cả trong gói Cơ Bản',
            'Lớp học nhóm không giới hạn',
            '2 buổi huấn luyện cá nhân',
            'Tư vấn dinh dưỡng',
            'Thẻ khách mời (2/tháng)'
          ]
        },
        {
          name: 'Ưu Tú',
          price: '1.700.000đ',
          period: 'mỗi tháng',
          features: [
            'Tất cả trong gói Cao Cấp',
            'Huấn luyện cá nhân không giới hạn',
            'Kế hoạch ăn uống tùy chỉnh',
            'Phục hồi & spa',
            'Ưu tiên đặt lớp'
          ]
        }
      ]
    }
  },
  mounted() {
    // Load selected plan from localStorage if exists
    const userPlan = localStorage.getItem('userSelectedPlan')
    if (userPlan) {
      this.selectedPlan = userPlan
    }
  },
  methods: {
    selectPlan(planName) {
      this.selectedPlan = planName
    },
    confirmSelection() {
      if (this.selectedPlan) {
        localStorage.setItem('userSelectedPlan', this.selectedPlan)
        alert(`Bạn đã chọn gói: ${this.selectedPlan}`)
      }    }
  }
}
</script>