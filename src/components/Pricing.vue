<template>
  <section class="py-20 px-6 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-purple-50"></div>
    <div class="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-16 fade-up">
        <span class="inline-block mb-4 px-4 py-2 bg-blue-100/80 text-blue-700 rounded-full text-sm font-semibold">
          💎 Gói Thành Viên
        </span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Chọn Gói Phù Hợp Với Bạn
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Đầu tư vào sức khỏe của bạn với các gói linh hoạt và giá cả phải chăng.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          :class="[
            'card-modern glass-morphism rounded-2xl p-8 group relative stagger-' + (index + 1),
            selectedPlan === plan.name
              ? 'ring-2 ring-blue-500 shadow-2xl scale-105 transform' 
              : ''
          ]"
        >
          <!-- Badge -->
          <div v-if="plan.popular && selectedPlan !== plan.name" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-4 py-1 rounded-full font-bold shadow-lg">
              ⭐ Phổ Biến Nhất
            </span>
          </div>
          <div v-else-if="selectedPlan === plan.name" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-4 py-1 rounded-full font-bold shadow-lg">
              ✅ Đã Chọn
            </span>
          </div>

          <!-- Plan Title & Price -->
          <h3 class="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            {{ plan.name }}
          </h3>
          <div class="mb-6 pb-6 border-b border-gray-200/50">
            <div class="flex items-end">
              <span class="text-6xl font-bold text-gray-900">{{ plan.price.split('.')[0] }}</span>
              <span class="text-gray-600 ml-2 mb-1">{{ plan.period }}</span>
            </div>
            <p class="text-gray-600 text-sm mt-2">Thanh toán theo tháng, hủy bất cứ lúc nào</p>
          </div>

          <!-- Features List -->
          <ul class="space-y-3 mb-8">
            <li
              v-for="(feature, featureIndex) in plan.features"
              :key="featureIndex"
              class="flex items-start group/item"
            >
              <div class="flex-shrink-0 mr-3 mt-1">
                <div class="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <span class="text-gray-700 group-hover/item:text-blue-600 transition-colors">{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <button
            @click="selectPlan(plan.name)"
            :class="[
              'w-full py-3 rounded-lg font-bold transition-all transform hover:scale-105',
              selectedPlan === plan.name
                ? 'btn-modern btn-gradient text-white shadow-lg' 
                : 'glass-morphism text-gray-900 hover:bg-white/50 border-2 border-gray-300/50'
            ]"
          >
            {{ selectedPlan === plan.name ? '✓ Gói Được Chọn' : 'Chọn Gói' }}
          </button>
        </div>
      </div>

      <!-- Confirmation Section -->
      <transition name="slide">
        <div v-if="selectedPlan" class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 text-center fade-up">
          <h4 class="text-2xl font-bold text-gray-900 mb-2">
            Gói được chọn: <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{{ selectedPlan }}</span>
          </h4>
          <p class="text-gray-600 mb-6">Bạn sắp chọn gói tuyệt vời! Hãy tiếp tục để hoàn tất đăng ký.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="confirmSelection"
              class="btn-modern btn-gradient text-white px-8 py-3 rounded-lg font-bold hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105"
            >
              ✅ Xác Nhận Gói
            </button>
            <button
              @click="selectedPlan = null"
              class="glass-morphism text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-white/50 border-2 border-gray-300/50"
            >
              ❌ Chọn Lại
            </button>
          </div>
        </div>
      </transition>

      <!-- Comparison Table (Optional) -->
      <div class="mt-16 bg-white/50 backdrop-blur rounded-2xl p-8 fade-up stagger-4">
        <h3 class="text-2xl font-bold mb-6 text-gray-900">📊 So Sánh Chi Tiết</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b-2 border-gray-300">
                <th class="text-left py-4 px-4 font-bold text-gray-900">Tính Năng</th>
                <th class="text-center py-4 px-4 font-bold text-gray-900">Cơ Bản</th>
                <th class="text-center py-4 px-4 font-bold text-gray-900">Cao Cấp</th>
                <th class="text-center py-4 px-4 font-bold text-gray-900">Ưu Tú</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in comparisonFeatures" :key="feature.name" class="border-b border-gray-200/50 hover:bg-blue-50/50 transition-colors">
                <td class="py-4 px-4 font-medium text-gray-700">{{ feature.name }}</td>
                <td class="text-center py-4 px-4">
                  <span v-if="feature.basic" class="text-green-600 text-lg">✓</span>
                  <span v-else class="text-gray-400">—</span>
                </td>
                <td class="text-center py-4 px-4">
                  <span v-if="feature.premium" class="text-green-600 text-lg">✓</span>
                  <span v-else class="text-gray-400">—</span>
                </td>
                <td class="text-center py-4 px-4">
                  <span v-if="feature.elite" class="text-green-600 text-lg">✓</span>
                  <span v-else class="text-gray-400">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      ],
      comparisonFeatures: [
        { name: '24/7 Access', basic: true, premium: true, elite: true },
        { name: 'Lớp Nhóm', basic: false, premium: true, elite: true },
        { name: 'Personal Trainer', basic: false, premium: true, elite: true },
        { name: 'Nutrition Plan', basic: false, premium: false, elite: true },
        { name: 'Locker', basic: true, premium: true, elite: true },
        { name: 'WiFi', basic: true, premium: true, elite: true },
        { name: 'App Mobile', basic: true, premium: true, elite: true },
        { name: 'Guest Passes', basic: false, premium: true, elite: true },
        { name: 'Priority Booking', basic: false, premium: false, elite: true },
        { name: 'Recovery & Spa', basic: false, premium: false, elite: true }
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
        // Redirect to payment page
        this.$router.push('/payment')
      }
    }
  }
}
</script>