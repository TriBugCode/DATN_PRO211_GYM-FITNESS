<template>
  <section class="py-20 px-6 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50 to-gray-50"></div>
    <div class="absolute top-1/3 right-0 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-16 fade-up">
        <span class="inline-block mb-4 px-4 py-2 bg-blue-100/80 text-blue-700 rounded-full text-sm font-semibold">
          🎯 Lớp Học & Chương Trình
        </span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Các Lớp Học Đa Dạng
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Các chương trình lớp học toàn diện được thiết kế để giúp bạn thành công trên hành trình thể hình.
        </p>
      </div>

      <!-- Classes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          :class="`card-modern group relative overflow-hidden rounded-2xl stagger-${(index % 3) + 1} hover-lift`"
        >
          <!-- Image Container -->
          <div class="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-blue-400 to-cyan-500">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Badge -->
            <div class="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              {{ service.level }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 bg-white">
            <h3 class="text-2xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 mb-4 text-sm">{{ service.description }}</p>

            <!-- Info Row -->
            <div class="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200/50">
              <div class="flex items-center space-x-1">
                <span>👥</span>
                <span>{{ service.capacity }} người</span>
              </div>
              <div class="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{{ service.duration }}</span>
              </div>
            </div>

            <!-- CTA Button -->
            <button class="w-full btn-modern bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all">
              📅 Đăng Ký Ngay
            </button>
          </div>

          <!-- Hover Effect Accent -->
          <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>

      <!-- Schedule Section -->
      <div class="mt-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8 fade-up">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">📅 Lịch Lớp Trong Tuần</h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div v-for="day in weekDays" :key="day.name" class="glass-morphism rounded-lg p-4 text-center hover-lift">
            <h4 class="font-bold text-gray-900 mb-3">{{ day.name }}</h4>
            <div class="space-y-2">
              <div v-for="cls in day.classes" :key="cls" class="text-xs text-gray-600 bg-white/50 rounded px-2 py-1">
                {{ cls }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-16 text-center fade-up">
        <p class="text-lg text-gray-700 mb-6">
          Bạn muốn tìm hiểu thêm về các lớp học của chúng tôi?
        </p>
        <router-link 
          to="/dang-ki"
          class="inline-block btn-modern btn-gradient text-white px-8 py-3 rounded-lg font-bold hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105"
        >
          🚀 Bắt Đầu Hôm Nay
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Classes',
  data() {
    return {
      services: [
        {
          title: 'Huấn Luyện Cá Nhân',
          description: 'Huấn luyện một-kèm-một được thiết kế riêng cho nhu cầu và mục tiêu của bạn.',
          level: 'Cá Nhân',
          capacity: '1',
          duration: '60 phút',
          image: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluaW5nJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzY3OTczNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          title: 'Lớp Học Nhóm',
          description: 'Các lớp học năng lượng cao bao gồm yoga, HIIT, spinning và nhiều hơn nữa.',
          level: 'Nhóm',
          capacity: '20-30',
          duration: '45 phút',
          image: 'https://images.unsplash.com/photo-1630415188550-9e454489ce3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMGZpdG5lc3MlMjBjbGFzc3xlbnwxfHx8fDE3Njc4ODI4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          title: 'Chương Trình Thể Hình',
          description: 'Các kế hoạch dinh dưỡng và tập luyện được cá nhân hóa để đạt được kết quả tối ưu.',
          level: 'Tùy Chỉnh',
          capacity: '1-2',
          duration: '90 phút',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcHJvZ3JhbXxlbnwxfHx8fDE3Njc5NzM2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ],
      weekDays: [
        {
          name: 'Thứ 2',
          classes: ['Yoga (7:00)', 'HIIT (18:00)', 'Boxing (19:30)']
        },
        {
          name: 'Thứ 3',
          classes: ['Spinning (7:00)', 'Pilates (18:00)']
        },
        {
          name: 'Thứ 4',
          classes: ['CrossFit (7:00)', 'Zumba (18:00)']
        },
        {
          name: 'Thứ 5',
          classes: ['Yoga (7:00)', 'HIIT (18:00)', 'Boxing (19:30)']
        },
        {
          name: 'Thứ 6',
          classes: ['Spinning (7:00)', 'Dance (18:00)']
        }
      ]
    }
  }
}
</script>