<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gym-dark via-gym-dark/90 to-gym-dark-secondary"></div>
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3')] bg-cover bg-center opacity-30"></div>

      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up">
        <h1 class="text-6xl md:text-8xl font-bebas text-gym-red mb-6 tracking-wider">
          BẮT ĐẦU
        </h1>
        <h2 class="text-4xl md:text-6xl font-oswald text-white mb-8 tracking-wide">
          HÀNH TRÌNH FITNESS
        </h2>
        <p class="text-xl text-gym-text-secondary mb-12 max-w-2xl mx-auto">
          Biến đổi cơ thể và tinh thần với các chương trình fitness cao cấp dành cho các vận động viên ưu tú và những người đam mê thể dục.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/membership"
            class="bg-gym-red hover:bg-gym-orange text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            THAM GIA NGAY
          </router-link>
          <router-link
            to="/programs"
            class="border-2 border-gym-red text-gym-red hover:bg-gym-red hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
          >
            XEM CHƯƠNG TRÌNH
          </router-link>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <i class="fas fa-chevron-down text-gym-red text-2xl"></i>
      </div>
    </section>

    <!-- Programs Preview -->
    <section class="py-20 bg-gym-dark-secondary" data-aos="fade-up">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-bebas text-gym-red mb-4">CHƯƠNG TRÌNH CỦA CHÚNG TÔI</h2>
          <p class="text-xl text-gym-text-secondary">Chọn con đường để đạt hiệu suất đỉnh cao</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gym-dark p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="100">
            <div class="text-gym-red text-6xl mb-6">
              <i class="fas fa-dumbbell"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">TẬP LUYỆN SỨC MẠNH</h3>
            <p class="text-gym-text-secondary mb-6">Xây dựng sức mạnh thô và khối lượng cơ bắp với các chương trình sức mạnh toàn diện của chúng tôi.</p>
            <router-link to="/programs" class="text-gym-red hover:text-gym-orange font-semibold">Tìm hiểu thêm →</router-link>
          </div>

          <div class="bg-gym-dark p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="200">
            <div class="text-gym-red text-6xl mb-6">
              <i class="fas fa-heartbeat"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">CARDIO FITNESS</h3>
            <p class="text-gym-text-secondary mb-6">Cải thiện sức khỏe tim mạch và sức bền với các bài tập cường độ cao.</p>
            <router-link to="/programs" class="text-gym-red hover:text-gym-orange font-semibold">Tìm hiểu thêm →</router-link>
          </div>

          <div class="bg-gym-dark p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="300">
            <div class="text-gym-red text-6xl mb-6">
              <i class="fas fa-user-friends"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">HUẤN LUYỆN CÁ NHÂN</h3>
            <p class="text-gym-text-secondary mb-6">Huấn luyện 1-1 với các huấn luyện viên được chứng nhận để đạt kết quả tối đa.</p>
            <router-link to="/programs" class="text-gym-red hover:text-gym-orange font-semibold">Tìm hiểu thêm →</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Trainers Preview -->
    <section class="py-20 bg-gym-dark" data-aos="fade-up">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-bebas text-gym-red mb-4">GẶP GỠ HUẤN LUYỆN VIÊN</h2>
          <p class="text-xl text-gym-text-secondary">Các huấn luyện viên ưu tú với kết quả đã được chứng minh quả đã được chứng minh</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center" data-aos="fade-up" data-aos-delay="100">
            <div class="w-48 h-48 mx-auto mb-6 bg-gym-dark-secondary rounded-full flex items-center justify-center">
              <i class="fas fa-user text-6xl text-gym-red"></i>
            </div>
            <h3 class="text-xl font-oswald text-white mb-2">JOHN NGUYỄN</h3>
            <p class="text-gym-red font-semibold mb-2">Huấn Luyện Viên Sức Mạnh</p>
            <p class="text-gym-text-secondary text-sm">Hơn 10 năm kinh nghiệm trong powerlifting vàà bodybuilding</p>
          </div>

          <div class="text-center" data-aos="fade-up" data-aos-delay="200">
            <div class="w-48 h-48 mx-auto mb-6 bg-gym-dark-secondary rounded-full flex items-center justify-center">
              <i class="fas fa-user text-6xl text-gym-red"></i>
            </div>
            <h3 class="text-xl font-oswald text-white mb-2">SARAH NGUYỄN</h3>
            <p class="text-gym-red font-semibold mb-2">Chuyên Gia Cardio</p>
            <p class="text-gym-text-secondary text-sm">Vận động viên marathon và chuyên gia HIIT với 8 năm kinh nghiệm huấn luyệnnăm huấn luyệnnăm huấn luyện</p>
          </div>

          <div class="text-center" data-aos="fade-up" data-aos-delay="300">
            <div class="w-48 h-48 mx-auto mb-6 bg-gym-dark-secondary rounded-full flex items-center justify-center">
              <i class="fas fa-user text-6xl text-gym-red"></i>
            </div>
            <h3 class="text-xl font-oswald text-white mb-2">MIKE TRẦN</h3>
            <p class="text-gym-red font-semibold mb-2">Huấn Luyện Viên Dinh Dưỡng</p>
            <p class="text-gym-text-secondary text-sm">Chuyên gia dinh dưỡng được chứng nhận giúp vận động viên tối ưu hóa hiệu suất ưu hóa hiệu suất</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link
            to="/trainers"
            class="bg-gym-red hover:bg-gym-orange text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            XEM TẤT CẢ HUẤN LUYỆN VIÊN
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-gym-dark-secondary" data-aos="fade-up">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-bebas text-gym-red mb-4">CÂU CHUYỆN THÀNH CÔNG</h2>
          <p class="text-xl text-gym-text-secondary">Kết quả thực tế từ các vận động viên thực thụ viên thực tế</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gym-dark p-6 rounded-lg border border-gym-red/20" data-aos="fade-up" data-aos-delay="100">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gym-red rounded-full flex items-center justify-center mr-4">
                <i class="fas fa-user text-white"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold">Alex Thompson</h4>
                <div class="flex text-gym-green">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
            <p class="text-gym-text-secondary italic">"Giảm 7kg và tăng sức mạnh đáng kinh ngạc. Các huấn luyện viên ở đây đẳng cấp thế giới đẳng cấp thế giới!"</p>
          </div>

          <div class="bg-gym-dark p-6 rounded-lg border border-gym-red/20" data-aos="fade-up" data-aos-delay="200">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gym-red rounded-full flex items-center justify-center mr-4">
                <i class="fas fa-user text-white"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold">Maria Rodriguez</h4>
                <div class="flex text-gym-green">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
            <p class="text-gym-text-secondary italic">"Đầu tư tốt nhất tôi từng thực hiện. Cộng đồng và huấn luyện ở đây là vô song</p>
          </div>

          <div class="bg-gym-dark p-6 rounded-lg border border-gym-red/20 md:col-span-2 lg:col-span-1" data-aos="fade-up" data-aos-delay="300">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gym-red rounded-full flex items-center justify-center mr-4">
                <i class="fas fa-user text-white"></i>
              </div>
              <div>
                <h4 class="text-white font-semibold">David Kim</h4>
                <div class="flex text-gym-green">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
            <p class="text-gym-text-secondary italic">"Từ người lười biếng đến vận động viên fitness trong 6 tháng. Trải nghiệm thay đổi cuộc đời!"</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Home page component
</script>