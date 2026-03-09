<template>
  <div class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16" data-aos="fade-up">
        <h1 class="text-5xl md:text-7xl font-bebas text-gym-red mb-4">CHƯƠNG TRÌNH CỦA CHÚNG TÔI</h1>
        <p class="text-xl text-gym-text-secondary">Chọn chương trình hoàn hảo cho mục tiêu fitness của bạn</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="100">
          <div class="text-center">
            <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-dumbbell text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">TẬP LUYỆN SỨC MẠNH</h3>
            <p class="text-gym-text-secondary mb-6">Xây dựng sức mạnh thô và khối lượng cơ bắp với các chương trình sức mạnh toàn diện dành cho những người nâng tạ nghiêm túc.</p>
            <ul class="text-left text-gym-text-secondary mb-6 space-y-2">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Huấn luyện tăng tải dần</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tập trung vào động tác phức hợp</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Lập kế hoạch theo chu kỳ</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tối ưu hóa phục hồi</li>
            </ul>
            <button class="w-full bg-gym-red hover:bg-gym-orange text-white py-3 rounded-lg font-semibold transition-colors">
              BẮT ĐẦU NGAY
            </button>
          </div>
        </div>

        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="200">
          <div class="text-center">
            <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-heartbeat text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">CARDIO FITNESS</h3>
            <p class="text-gym-text-secondary mb-6">Cải thiện sức khỏe tim mạch và sức bền với các bài tập cường độ cao xen kẽ.</p>
            <ul class="text-left text-gym-text-secondary mb-6 space-y-2">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Bài tập HIIT</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Xây dựng sức bền</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Theo dõi nhịp tim</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Theo dõi hiệu suất</li>
            </ul>
            <button class="w-full bg-gym-red hover:bg-gym-orange text-white py-3 rounded-lg font-semibold transition-colors">
              BẮT ĐẦU NGAY
            </button>
          </div>
        </div>

        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="300">
          <div class="text-center">
            <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-weight text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">GIẢM CÂN</h3>
            <p class="text-gym-text-secondary mb-6">Đạt được việc giảm cân bền vững với các kế hoạch dinh dưỡng và tập luyện dựa trên khoa học.</p>
            <ul class="text-left text-gym-text-secondary mb-6 space-y-2">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tối ưu hóa thâm hụt calo</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Huấn luyện chuyển hóa</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tư vấn dinh dưỡng</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Theo dõi tiến độ</li>
            </ul>
            <button class="w-full bg-gym-red hover:bg-gym-orange text-white py-3 rounded-lg font-semibold transition-colors">
              BẮT ĐẦU NGAY
            </button>
          </div>
        </div>

        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="400">
          <div class="text-center">
            <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-user-friends text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">HUẤN LUYỆN CÁ NHÂN</h3>
            <p class="text-gym-text-secondary mb-6">Huấn luyện 1-1 với các huấn luyện viên được chứng nhận để đạt kết quả tối đa và trách nhiệm.</p>
            <ul class="text-left text-gym-text-secondary mb-6 space-y-2">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Chương trình tùy chỉnh</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Sửa tư thế</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Động lực & hỗ trợ</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Lịch trình linh hoạt</li>
            </ul>
            <button class="w-full bg-gym-red hover:bg-gym-orange text-white py-3 rounded-lg font-semibold transition-colors">
              BẮT ĐẦU NGAY
            </button>
          </div>
        </div>

        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="500">
          <div class="text-center">
            <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-running text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">BODYBUILDING</h3>
            <p class="text-gym-text-secondary mb-6">Điêu khắc thân hình của bạn với các chương trình bodybuilding chuyên biệt và chuẩn bị thi đấu.</p>
            <ul class="text-left text-gym-text-secondary mb-6 space-y-2">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Cô lập cơ bắp</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Chuẩn bị thi đấu</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Huấn luyện pose</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Lập kế hoạch dinh dưỡng</li>
            </ul>
            <button class="w-full bg-gym-red hover:bg-gym-orange text-white py-3 rounded-lg font-semibold transition-colors">
              BẮT ĐẦU NGAY
            </button>
          </div>
        </div>

        <div class="bg-gym-dark-secondary p-8 rounded-lg border border-gym-red/20 hover:border-gym-red transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay="600">
          <div class="text-center">
            <div class="w-20 h-20 bg-gym-red rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-brain text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-oswald text-white mb-4">SỨC KHỎE TÂM THẦN</h3>
            <p class="text-gym-text-secondary mb-6">Tăng cường tinh thần cùng với cơ thể của bạn với mindfulness và huấn luyện sức mạnh tinh thần.</p>
            <ul class="text-left text-gym-text-secondary mb-6 space-y-2">
              <li><i class="fas fa-check text-gym-green mr-2"></i>Thiền mindfulness</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Quản lý căng thẳng</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Sức mạnh tinh thần</li>
              <li><i class="fas fa-check text-gym-green mr-2"></i>Tâm lý hiệu suất</li>
            </ul>
            <button class="w-full bg-gym-red hover:bg-gym-orange text-white py-3 rounded-lg font-semibold transition-colors">
              BẮT ĐẦU NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Programs page component
</script>