<template>
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Liên Hệ</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Sẵn sàng bắt đầu hành trình thể hình? Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white p-8 rounded-lg shadow-lg fade-in-left card-hover">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <input
                v-model="formData.name"
                type="text"
                placeholder="Họ và Tên"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <input
                v-model="formData.email"
                type="email"
                placeholder="Email của Bạn"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="Số Điện Thoại"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <textarea
                v-model="formData.message"
                placeholder="Tin Nhắn của Bạn"
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors font-semibold btn-animate"
            >
              Gửi Tin Nhắn
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8 fade-in-right">
          <div class="flex items-start card-hover">
            <div class="bg-indigo-600 p-4 rounded-lg mr-6">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Đến Thăm</h3>
              <p class="text-gray-600">123 Đường Thể Hình<br />Hà Nội, Việt Nam</p>
            </div>
          </div>

          <div class="flex items-start card-hover">
            <div class="bg-indigo-600 p-4 rounded-lg mr-6">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Gọi Cho Chúng Tôi</h3>
              <p class="text-gray-600">(024) 1234-5678<br />T2-T6: 6:00 - 22:00<br />T7-CN: 8:00 - 20:00</p>
            </div>
          </div>

          <div class="flex items-start card-hover">
            <div class="bg-indigo-600 p-4 rounded-lg mr-6">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Email</h3>
              <p class="text-gray-600">info@phonggym.vn<br />hotro@phonggym.vn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.formData)
      // Xử lý gửi form ở đây
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.')
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  }
}
</script>
