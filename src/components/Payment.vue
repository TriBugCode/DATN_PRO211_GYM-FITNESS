<template>
  <section class="py-20 px-6 relative overflow-hidden min-h-screen">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-purple-50"></div>
    <div class="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-12 fade-up">
        <span class="inline-block mb-4 px-4 py-2 bg-blue-100/80 text-blue-700 rounded-full text-sm font-semibold">
          💳 Thanh Toán
        </span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Hoàn Tất Đăng Ký
        </h2>
        <p class="text-xl text-gray-600">
          Chọn phương thức thanh toán phù hợp với bạn
        </p>
      </div>

      <!-- Selected Plan Summary -->
      <div v-if="selectedPlan" class="bg-white/70 backdrop-blur rounded-2xl p-8 mb-8 fade-up">
        <h3 class="text-2xl font-bold mb-4 text-gray-900">📋 Tóm Tắt Đơn Hàng</h3>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-lg font-semibold text-gray-900">Gói: {{ selectedPlan.name }}</p>
            <p class="text-gray-600">{{ selectedPlan.price }} / {{ selectedPlan.period }}</p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-blue-600">{{ selectedPlan.price }}</p>
            <p class="text-sm text-gray-500">VAT đã bao gồm</p>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- ZaloPay -->
        <div
          @click="selectPaymentMethod('zalopay')"
          :class="[
            'card-modern glass-morphism rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105',
            selectedMethod === 'zalopay' ? 'ring-2 ring-blue-500 shadow-2xl' : ''
          ]"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900">ZaloPay</h4>
              <p class="text-gray-600">Thanh toán nhanh qua ZaloPay</p>
            </div>
          </div>
          <div class="text-sm text-gray-500">
            <p>• Thanh toán tức thì</p>
            <p>• Bảo mật cao</p>
            <p>• Không phí giao dịch</p>
          </div>
        </div>

        <!-- Momo -->
        <div
          @click="selectPaymentMethod('momo')"
          :class="[
            'card-modern glass-morphism rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105',
            selectedMethod === 'momo' ? 'ring-2 ring-blue-500 shadow-2xl' : ''
          ]"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900">MoMo</h4>
              <p class="text-gray-600">Ví điện tử MoMo</p>
            </div>
          </div>
          <div class="text-sm text-gray-500">
            <p>• Thanh toán nhanh chóng</p>
            <p>• Tích hợp ví điện tử</p>
            <p>• Bảo mật 2 lớp</p>
          </div>
        </div>

        <!-- Credit Card -->
        <div
          @click="selectPaymentMethod('creditcard')"
          :class="[
            'card-modern glass-morphism rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105',
            selectedMethod === 'creditcard' ? 'ring-2 ring-blue-500 shadow-2xl' : ''
          ]"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900">Thẻ Tín Dụng</h4>
              <p class="text-gray-600">Visa, Mastercard, JCB</p>
            </div>
          </div>
          <div class="text-sm text-gray-500">
            <p>• Thanh toán quốc tế</p>
            <p>• Bảo mật PCI DSS</p>
            <p>• Hỗ trợ nhiều loại thẻ</p>
          </div>
        </div>

        <!-- PayPal -->
        <div
          @click="selectPaymentMethod('paypal')"
          :class="[
            'card-modern glass-morphism rounded-2xl p-8 cursor-pointer transition-all transform hover:scale-105',
            selectedMethod === 'paypal' ? 'ring-2 ring-blue-500 shadow-2xl' : ''
          ]"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.23 1.48-.84 2.55-1.754 3.21-.966.68-2.31.98-4.16 1.038-.877.026-1.614.207-2.196.597-.749.473-1.511 2.134-1.711 4.055-.108.987-.582 1.799-1.14 2.657-.106.17-.222.336-.348.488-.532.663-1.75 1.317-2.972 1.317z"/>
              </svg>
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900">PayPal</h4>
              <p class="text-gray-600">Thanh toán quốc tế</p>
            </div>
          </div>
          <div class="text-sm text-gray-500">
            <p>• Thanh toán toàn cầu</p>
            <p>• Bảo vệ người mua</p>
            <p>• Không cần chia sẻ thông tin thẻ</p>
          </div>
        </div>
      </div>

      <!-- Payment Form (for Credit Card) -->
      <transition name="slide">
        <div v-if="selectedMethod === 'creditcard'" class="bg-white/70 backdrop-blur rounded-2xl p-8 mb-8 fade-up">
          <h4 class="text-xl font-bold mb-6 text-gray-900">💳 Thông Tin Thẻ Tín Dụng</h4>
          <form @submit.prevent="processPayment" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Số Thẻ</label>
                <input
                  v-model="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tên Chủ Thẻ</label>
                <input
                  v-model="cardName"
                  type="text"
                  placeholder="NGUYEN VAN A"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ngày Hết Hạn</label>
                <input
                  v-model="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  v-model="cvv"
                  type="text"
                  placeholder="123"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </transition>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="processPayment"
          :disabled="!selectedMethod || processing"
          class="btn-modern btn-gradient text-white px-12 py-4 rounded-lg font-bold hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="processing" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang Xử Lý...
          </span>
          <span v-else>
            💳 Thanh Toán Ngay - {{ selectedPlan ? selectedPlan.price : '0đ' }}
          </span>
        </button>
        <button
          @click="$router.go(-1)"
          class="glass-morphism text-gray-900 px-12 py-4 rounded-lg font-bold hover:bg-white/50 border-2 border-gray-300/50"
        >
          ← Quay Lại
        </button>
      </div>

      <!-- Terms and Conditions -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>
          Bằng việc thanh toán, bạn đồng ý với
          <a href="#" class="text-blue-600 hover:underline">Điều Khoản Sử Dụng</a> và
          <a href="#" class="text-blue-600 hover:underline">Chính Sách Bảo Mật</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '../stores/authStore'
import { useAdminStore } from '../stores/adminStore'

export default {
  name: 'Payment',
  data() {
    return {
      selectedMethod: null,
      processing: false,
      // Credit card form data
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      // Selected plan data
      selectedPlan: null
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    adminStore() {
      return useAdminStore()
    }
  },
  mounted() {
    // Load selected plan from localStorage
    const planData = localStorage.getItem('userSelectedPlan')
    if (planData) {
      // Find plan details from pricing data
      const plans = [
        {
          name: 'Cơ Bản',
          price: '500.000đ',
          period: 'mỗi tháng',
          amount: 500000
        },
        {
          name: 'Cao Cấp',
          price: '1.000.000đ',
          period: 'mỗi tháng',
          amount: 1000000
        },
        {
          name: 'Ưu Tú',
          price: '1.700.000đ',
          period: 'mỗi tháng',
          amount: 1700000
        }
      ]
      this.selectedPlan = plans.find(p => p.name === planData)
    } else {
      // Redirect back to pricing if no plan selected
      this.$router.push('/pricing')
    }
  },
  methods: {
    selectPaymentMethod(method) {
      this.selectedMethod = method
    },
    async processPayment() {
      if (!this.selectedMethod || !this.selectedPlan) {
        alert('Vui lòng chọn phương thức thanh toán và gói thành viên!')
        return
      }

      this.processing = true

      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Create payment record
        const paymentData = {
          memberId: this.authStore.user?.id || Date.now(),
          memberName: this.authStore.user?.name || 'Guest User',
          memberEmail: this.authStore.user?.email || 'guest@example.com',
          membership: this.selectedPlan.name,
          amount: this.selectedPlan.amount,
          method: this.getPaymentMethodName(this.selectedMethod),
          status: 'completed'
        }

        // Add payment to admin store
        this.adminStore.addPayment(paymentData)

        // Clear selected plan
        localStorage.removeItem('userSelectedPlan')

        // Show success message and redirect
        alert(`🎉 Thanh toán thành công! Chào mừng bạn đến với Gymshark Việt Nam - Gói ${this.selectedPlan.name}`)
        this.$router.push('/dashboard')

      } catch (error) {
        console.error('Payment error:', error)
        alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại!')
      } finally {
        this.processing = false
      }
    },
    getPaymentMethodName(method) {
      const methods = {
        zalopay: 'ZaloPay',
        momo: 'MoMo',
        creditcard: 'Credit Card',
        paypal: 'PayPal'
      }
      return methods[method] || method
    }
  }
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>