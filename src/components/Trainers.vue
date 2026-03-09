<template>
  <section class="py-20 px-6 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-white via-purple-50 to-white"></div>
    <div class="absolute top-20 right-0 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 left-0 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-16 fade-up">
        <span class="inline-block mb-4 px-4 py-2 bg-purple-100/80 text-purple-700 rounded-full text-sm font-semibold">
          👥 Đội Ngũ Chuyên Nghiệp
        </span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Đội Ngũ Huấn Luyện Viên Xuất Sắc
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Gặp gỡ các chuyên gia sẵn sàng giúp bạn biến những ước mơ thành hiện thực.
        </p>
      </div>

      <!-- Trainers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div
          v-for="(trainer, index) in trainers"
          :key="index"
          :class="`card-modern group rounded-2xl overflow-hidden hover-lift stagger-${(index % 3) + 1}`"
        >
          <!-- Image Container -->
          <div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
            <img
              :src="trainer.image"
              :alt="trainer.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
              <div class="w-full p-4">
                <div class="space-y-2">
                  <p class="text-yellow-300 font-bold flex items-center">
                    ⭐ {{ trainer.rating }}/5 ({{ trainer.reviews }} reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {{ trainer.name }}
            </h3>
            <p class="text-purple-600 font-bold mb-3 flex items-center space-x-1">
              <span class="text-lg">🎯</span>
              <span>{{ trainer.specialty }}</span>
            </p>
            <p class="text-gray-600 mb-4 text-sm leading-relaxed">{{ trainer.description }}</p>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-3 py-4 border-y border-gray-200/50">
              <div class="text-center">
                <p class="text-xl font-bold text-blue-600">{{ trainer.experience }}</p>
                <p class="text-xs text-gray-600">Năm kinh nghiệm</p>
              </div>
              <div class="text-center">
                <p class="text-xl font-bold text-purple-600">{{ trainer.members }}+</p>
                <p class="text-xs text-gray-600">Học viên</p>
              </div>
            </div>

            <!-- CTA Button -->
            <button class="w-full mt-4 btn-modern bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105">
              📞 Tư Vấn
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8 text-center fade-up">
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Chọn HLV Phù Hợp Cho Bạn</h3>
        <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
          Mỗi huấn luyện viên của chúng tôi được huấn luyện chuyên nghiệp và có kinh nghiệm trong việc giúp những người có nhu cầu khác nhau đạt được mục tiêu của họ.
        </p>
        <router-link 
          to="/dang-ki"
          class="inline-block btn-modern btn-gradient text-white px-8 py-3 rounded-lg font-bold hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105"
        >
          🚀 Bắt Đầu Ngay
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Trainers',
  data() {
    return {
      trainers: [
        {
          name: 'Nguyễn Văn A',
          specialty: 'Huấn Luyện Viên Cá Nhân',
          description: 'Chuyên gia về tập luyện sức mạnh với hơn 10 năm kinh nghiệm.',
          experience: 10,
          members: 150,
          rating: 4.9,
          reviews: 87,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lcnxlbnwxfHx8fDE3Njc5NzM2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Trần Thị B',
          specialty: 'Huấn Luyện Viên Yoga',
          description: 'Giảng viên yoga được chứng nhận, tập trung vào sức khỏe tinh thần và thể chất.',
          experience: 8,
          members: 120,
          rating: 4.8,
          reviews: 76,
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwaW5zdHJ1Y3RvcnxlbnwxfHx8fDE3Njc5NzM2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Lê Văn C',
          specialty: 'Chuyên Gia Dinh Dưỡng',
          description: 'Chuyên gia dinh dưỡng giúp bạn xây dựng chế độ ăn uống lành mạnh.',
          experience: 12,
          members: 180,
          rating: 5.0,
          reviews: 95,
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb25pc3R8ZW58MXx8fHwxNzY3OTczNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ]
    }
  }
}
</script>