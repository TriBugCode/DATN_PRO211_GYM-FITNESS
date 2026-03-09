<template>
  <div class="min-h-screen bg-gym-dark py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-bebas text-gym-red mb-4">THANH TOÁN</h1>
        <p class="text-gym-text-secondary">Hoàn tất thanh toán để kích hoạt gói thành viên</p>
      </div>

      <!-- Selected Plan -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 mb-8" data-aos="fade-up">
        <h2 class="text-xl font-oswald text-white mb-4">Gói Đã Chọn</h2>
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-2xl font-bebas text-gym-red uppercase">{{ selectedPlan?.name || 'Pro' }}</h3>
            <p class="text-gym-text-secondary">Thành viên {{ selectedPlan?.duration || 'tháng' }}</p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bebas text-gym-red">{{ formatPrice(selectedPlan?.price || 59) }}</p>
            <p class="text-gym-text-secondary">VND/{{ selectedPlan?.duration || 'tháng' }}</p>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 mb-8" data-aos="fade-up">
        <h2 class="text-xl font-oswald text-white mb-6">Chọn Phương Thức Thanh Toán</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <!-- PayPal -->
          <button
            @click="selectMethod('paypal')"
            class="p-4 rounded-lg border-2 transition-all duration-300"
            :class="selectedMethod === 'paypal' ? 'border-gym-red bg-gym-red/10' : 'border-gym-red/20 hover:border-gym-red'"
          >
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-2 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xl">P</span>
              </div>
              <h3 class="text-white font-semibold">PayPal</h3>
            </div>
          </button>

          <!-- Momo -->
          <button
            @click="selectMethod('momo')"
            class="p-4 rounded-lg border-2 transition-all duration-300"
            :class="selectedMethod === 'momo' ? 'border-gym-red bg-gym-red/10' : 'border-gym-red/20 hover:border-gym-red'"
          >
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-2 bg-pink-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-xl">M</span>
              </div>
              <h3 class="text-white font-semibold">MoMo</h3>
            </div>
          </button>

          <!-- Credit Card -->
          <button
            @click="selectMethod('creditcard')"
            class="p-4 rounded-lg border-2 transition-all duration-300"
            :class="selectedMethod === 'creditcard' ? 'border-gym-red bg-gym-red/10' : 'border-gym-red/20 hover:border-gym-red'"
          >
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-2 bg-green-600 rounded-full flex items-center justify-center">
                <i class="fas fa-credit-card text-white text-2xl"></i>
              </div>
              <h3 class="text-white font-semibold">Thẻ Tín Dụng</h3>
            </div>
          </button>
        </div>

        <!-- Payment Form -->
        <div v-if="selectedMethod" class="mt-6">
          <!-- PayPal Form -->
          <div v-if="selectedMethod === 'paypal'" class="space-y-4">
            <div class="bg-blue-600/20 p-4 rounded-lg border border-blue-600/30">
              <p class="text-blue-400 text-sm">
                <i class="fas fa-info-circle mr-2"></i>
                Bạn sẽ được chuyển hướng đến PayPal để hoàn tất thanh toán an toàn.
              </p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Email PayPal</label>
              <input
                v-model="paypalForm.email"
                type="email"
                class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <!-- Momo Form -->
          <div v-if="selectedMethod === 'momo'" class="space-y-4">
            <div class="bg-pink-600/20 p-4 rounded-lg border border-pink-600/30">
              <p class="text-pink-400 text-sm">
                <i class="fas fa-info-circle mr-2"></i>
                Thanh toán qua ứng dụng MoMo. Quét mã QR hoặc nhập số điện thoại.
              </p>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Số Điện Thoại MoMo</label>
              <input
                v-model="momoForm.phone"
                type="tel"
                class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
                placeholder="0912 345 678"
              />
            </div>
            <div class="flex justify-center my-4">
              <div class="bg-white p-4 rounded-lg">
                <div class="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-500">QR Code</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Credit Card Form -->
          <div v-if="selectedMethod === 'creditcard'" class="space-y-4">
            <div>
              <label class="block text-gym-text font-medium mb-2">Số Thẻ</label>
              <input
                v-model="cardForm.number"
                type="text"
                maxlength="19"
                class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gym-text font-medium mb-2">Ngày Hết Hạn</label>
                <input
                  v-model="cardForm.expiry"
                  type="text"
                  maxlength="5"
                  class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label class="block text-gym-text font-medium mb-2">CVV</label>
                <input
                  v-model="cardForm.cvv"
                  type="text"
                  maxlength="3"
                  class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
                  placeholder="123"
                />
              </div>
            </div>
            <div>
              <label class="block text-gym-text font-medium mb-2">Tên Chủ Thẻ</label>
              <input
                v-model="cardForm.name"
                type="text"
                class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
                placeholder="NGUYEN VAN A"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- User Info -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 mb-8" data-aos="fade-up">
        <h2 class="text-xl font-oswald text-white mb-4">Thông Tin Thành Viên</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gym-text font-medium mb-2">Họ và Tên</label>
            <input
              v-model="userInfo.name"
              type="text"
              class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div>
            <label class="block text-gym-text font-medium mb-2">Email</label>
            <input
              v-model="userInfo.email"
              type="email"
              class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label class="block text-gym-text font-medium mb-2">Số Điện Thoại</label>
            <input
              v-model="userInfo.phone"
              type="tel"
              class="w-full px-4 py-3 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
              placeholder="0912 345 678"
            />
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 mb-8" data-aos="fade-up">
        <h2 class="text-xl font-oswald text-white mb-4">Tổng Tiền</h2>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gym-text-secondary">Gói thành viên</span>
            <span class="text-white">{{ formatPrice(selectedPlan?.price || 59) }} VND</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gym-text-secondary">Phí dịch vụ</span>
            <span class="text-white">0 VND</span>
          </div>
          <div class="border-t border-gym-red/20 pt-2 mt-2">
            <div class="flex justify-between">
              <span class="text-white font-semibold">Tổng cộng</span>
              <span class="text-gym-red font-bold text-xl">{{ formatPrice(selectedPlan?.price || 59) }} VND</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirm Button -->
      <button
        @click="processPayment"
        :disabled="!isFormValid || processing"
        class="w-full bg-gym-red hover:bg-gym-orange disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-glow"
        data-aos="fade-up"
      >
        <span v-if="processing">
          <i class="fas fa-spinner fa-spin mr-2"></i> Đang xử lý...
        </span>
        <span v-else>
          <i class="fas fa-lock mr-2"></i> Thanh Toán An Toàn
        </span>
      </button>

      <!-- Security Note -->
      <p class="text-center text-gym-text-secondary text-sm mt-4">
        <i class="fas fa-shield-alt text-gym-green mr-2"></i>
        Thanh toán được bảo mật bởi công nghệ mã hóa SSL
      </p>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-green/30 max-w-md w-full text-center">
        <div class="w-20 h-20 bg-gym-green rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-check text-white text-4xl"></i>
        </div>
        <h2 class="text-3xl font-bebas text-gym-green mb-4">THANH TOÁN THÀNH CÔNG!</h2>
        <p class="text-gym-text-secondary mb-6">
          Cảm ơn bạn đã đăng ký gói {{ selectedPlan?.name }}. 
          Email xác nhận đã được gửi đến {{ userInfo.email }}
        </p>
        <router-link
          to="/dashboard"
          class="inline-block bg-gym-red hover:bg-gym-orange text-white px-8 py-3 rounded-lg font-bold transition-colors"
        >
          Đi Đến Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMembershipStore } from '../stores/membershipStore'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const route = useRoute()
const membershipStore = useMembershipStore()
const authStore = useAuthStore()

const selectedMethod = ref('')
const processing = ref(false)
const showSuccess = ref(false)

const selectedPlan = ref(null)

const paypalForm = ref({
  email: ''
})

const momoForm = ref({
  phone: ''
})

const cardForm = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const userInfo = ref({
  name: '',
  email: '',
  phone: ''
})

onMounted(() => {
  // Get selected plan from store
  const planId = route.query.plan || membershipStore.selectedPlanId
  if (planId) {
    selectedPlan.value = membershipStore.memberships.find(m => m.id === planId) || membershipStore.memberships[1]
  } else {
    selectedPlan.value = membershipStore.memberships[1]
  }

  // Get user info from auth store
  if (authStore.user) {
    userInfo.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || '',
      phone: authStore.user.phone || ''
    }
  }
})

const selectMethod = (method) => {
  selectedMethod.value = method
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price * 25000)
}

const isFormValid = computed(() => {
  if (!selectedMethod.value) return false
  if (!userInfo.value.name || !userInfo.value.email || !userInfo.value.phone) return false

  if (selectedMethod.value === 'paypal') {
    return paypalForm.value.email.includes('@')
  }
  if (selectedMethod.value === 'momo') {
    return momoForm.value.phone.length >= 10
  }
  if (selectedMethod.value === 'creditcard') {
    return cardForm.value.number.length >= 16 && 
           cardForm.value.expiry.length === 5 && 
           cardForm.value.cvv.length === 3 && 
           cardForm.value.name.length > 0
  }
  return false
})

const processPayment = async () => {
  processing.value = true

  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Save membership
  if (selectedPlan.value) {
    membershipStore.selectMembership(selectedPlan.value.id)
  }

  processing.value = false
  showSuccess.value = true
}
</script>

