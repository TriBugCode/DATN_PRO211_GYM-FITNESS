<template>
  <section class="py-20 px-6">
    <div class="max-w-4xl mx-auto text-center fade-up">
      <h2 class="text-4xl md:text-5xl font-bold mb-4">Tham Gia Ngay</h2>
      <p class="text-xl text-gray-600 mb-8">
        Bắt đầu hành trình thể hình của bạn hôm nay. Điền thông tin để đăng ký.
      </p>

      <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-lg scale-in card-hover">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label for="name" class="block text-left text-gray-700 font-semibold mb-2">Họ và Tên</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label for="email" class="block text-left text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label for="phone" class="block text-left text-gray-700 font-semibold mb-2">Số Điện Thoại</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label for="goal" class="block text-left text-gray-700 font-semibold mb-2">Mục Tiêu</label>
            <select
              id="goal"
              v-model="form.goal"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Chọn mục tiêu</option>
              <option value="weight-loss">Giảm Cân</option>
              <option value="muscle-gain">Tăng Cơ</option>
              <option value="fitness">Thể Hình Tổng Quát</option>
              <option value="health">Sức Khỏe</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors font-semibold btn-animate pulse-cta"
        >
          Đăng Ký Ngay
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JoinNow',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        goal: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Xử lý đăng ký ở đây, ví dụ gửi dữ liệu đến server
      alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm.')
      // Reset form
      this.form = { name: '', email: '', phone: '', goal: '' }
    }
  }
}
</script>