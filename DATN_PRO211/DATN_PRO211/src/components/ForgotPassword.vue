<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Quên Mật Khẩu</h2>
        <p class="mt-2 text-gray-600">Nhập email để đặt lại mật khẩu</p>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <!-- Step 1: Email Verification -->
        <div v-if="step === 1" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@gmail.com"
            />
          </div>

          <div v-if="displayOtp" class="bg-green-50 border border-green-300 rounded-md p-4">
            <p class="text-sm text-green-800">
              <strong>OTP để test:</strong> {{ displayOtp }}
              <br/>
              <small>(Mã này chỉ hiển thị vì đây là demo)</small>
            </p>
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm text-center">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {{ isLoading ? 'Đang gửi...' : 'Gửi Mã OTP' }}
          </button>
        </div>

        <!-- Step 2: OTP Verification (Simulated) -->
        <div v-if="step === 2" class="space-y-6">
          <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p class="text-sm text-blue-800">
              Mã xác nhận đã được gửi đến <strong>{{ email }}</strong>
            </p>
          </div>

          <div>
            <label for="otp" class="block text-sm font-medium text-gray-700">
              Mã Xác Nhận
            </label>
            <input
              id="otp"
              v-model="otp"
              type="text"
              placeholder="Nhập mã 6 chữ số"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm text-center">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {{ isLoading ? 'Đang xác nhận...' : 'Xác Nhận' }}
          </button>

          <button
            type="button"
            @click="step = 1"
            class="w-full text-blue-600 hover:text-blue-700 font-medium"
          >
            Quay lại
          </button>
        </div>

        <!-- Step 3: Reset Password -->
        <div v-if="step === 3" class="space-y-6">
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">
              Mật Khẩu Mới
            </label>
            <input
              id="newPassword"
              v-model="newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p class="mt-1 text-gray-500 text-xs">Mật khẩu phải có ít nhất 6 ký tự</p>
          </div>

          <div>
            <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700">
              Xác Nhận Mật Khẩu
            </label>
            <input
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm text-center">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {{ isLoading ? 'Đang xử lý...' : 'Đặt Lại Mật Khẩu' }}
          </button>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="text-green-600 text-sm text-center">
          {{ successMessage }}
        </div>
      </form>

      <!-- Login Link -->
      <div class="text-center">
        <router-link to="/dang-nhap" class="text-blue-600 hover:text-blue-700 text-sm">
          Quay lại đăng nhập
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ForgotPassword',
  setup() {
    const router = useRouter()
    const email = ref('')
    const otp = ref('')
    const newPassword = ref('')
    const confirmNewPassword = ref('')
    const step = ref(1)
    const isLoading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    const displayOtp = ref('')
    let generatedOtp = ''
    let otpExpireTime = null

    const generateOtp = () => {
      generatedOtp = String(Math.floor(Math.random() * 999999)).padStart(6, '0')
      displayOtp.value = generatedOtp
      // OTP expires in 10 minutes
      otpExpireTime = Date.now() + 10 * 60 * 1000
      return generatedOtp
    }

    const sendOtpEmail = async (recipientEmail, otpCode) => {
      try {
        // Using EmailJS service (from ../services/emailService.js)
        // For now, we'll use a simulated version
        
        // Simulated email sending (in production, use EmailJS or your backend)
        console.log(`Email sent to ${recipientEmail} with OTP: ${otpCode}`)
        
        // Alternative: You can implement this with your backend API
        // const response = await fetch('/api/send-otp', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: recipientEmail, otp: otpCode })
        // })
        
        return true
      } catch (error) {
        console.error('Error sending email:', error)
        return false
      }
    }

    const handleSubmit = async () => {
      errorMessage.value = ''

      if (step.value === 1) {
        await verifyEmail()
      } else if (step.value === 2) {
        verifyOtp()
      } else if (step.value === 3) {
        await resetPassword()
      }
    }

    const verifyEmail = async () => {
      if (!email.value) {
        errorMessage.value = 'Vui lòng nhập email'
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Email không hợp lệ'
        return
      }

      isLoading.value = true

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Check if email exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const userExists = users.some(u => u.email === email.value)

        if (userExists) {
          // Generate OTP
          const otpCode = generateOtp()
          
          // Send OTP email
          const emailSent = await sendOtpEmail(email.value, otpCode)
          
          if (emailSent) {
            successMessage.value = 'Mã xác nhận đã được gửi đến email của bạn!'
            step.value = 2
            setTimeout(() => {
              successMessage.value = ''
            }, 3000)
          } else {
            errorMessage.value = 'Không thể gửi email. Vui lòng thử lại.'
          }
        } else {
          errorMessage.value = 'Email này không được đăng kí'
        }
      } catch (error) {
        errorMessage.value = 'Lỗi: ' + error.message
      } finally {
        isLoading.value = false
      }
    }

    const verifyOtp = () => {
      if (!otp.value) {
        errorMessage.value = 'Vui lòng nhập mã xác nhận'
        return
      }

      // Check if OTP expired
      if (otpExpireTime && Date.now() > otpExpireTime) {
        errorMessage.value = 'Mã xác nhận đã hết hạn. Vui lòng yêu cầu gửi lại.'
        step.value = 1
        displayOtp.value = ''
        return
      }

      // Verify OTP
      if (otp.value === generatedOtp) {
        step.value = 3
        errorMessage.value = ''
      } else {
        errorMessage.value = 'Mã xác nhận không chính xác'
      }
    }

    const resetPassword = async () => {
      if (!newPassword.value || !confirmNewPassword.value) {
        errorMessage.value = 'Vui lòng điền tất cả các trường'
        return
      }

      if (newPassword.value.length < 6) {
        errorMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự'
        return
      }

      if (newPassword.value !== confirmNewPassword.value) {
        errorMessage.value = 'Mật khẩu xác nhận không khớp'
        return
      }

      isLoading.value = true

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Update password in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const userIndex = users.findIndex(u => u.email === email.value)

        if (userIndex !== -1) {
          users[userIndex].password = newPassword.value
          users[userIndex].updatedAt = new Date().toISOString()
          localStorage.setItem('users', JSON.stringify(users))
          
          successMessage.value = 'Đặt lại mật khẩu thành công! Đang chuyển hướng đến đăng nhập...'
          
          // Reset form
          setTimeout(() => {
            email.value = ''
            otp.value = ''
            newPassword.value = ''
            confirmNewPassword.value = ''
            step.value = 1
            displayOtp.value = ''
            router.push('/dang-nhap')
          }, 1500)
        }
      } catch (error) {
        errorMessage.value = 'Lỗi: ' + error.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      otp,
      newPassword,
      confirmNewPassword,
      step,
      isLoading,
      errorMessage,
      successMessage,
      displayOtp,      handleSubmit
    }
  }
}
</script>