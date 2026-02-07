<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1750698544932-c7471990f1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwZml0bmVzc3xlbnwxfHx8fDE3Njc4OTg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Gym workout"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center text-white fade-up">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        Thay Đổi Cơ Thể,<br />Thay Đổi Cuộc Sống
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-gray-200">
        Tham gia trải nghiệm thể hình tuyệt vời với huấn luyện viên chuyên nghiệp, thiết bị hiện đại và cộng đồng hỗ trợ nhiệt tình.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 rounded-md transition-colors flex items-center justify-center fade-up stagger-1">
          Dùng Thử Miễn Phí
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <button class="bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 text-lg px-8 py-4 rounded-md transition-colors fade-up stagger-2">
          Xem Lớp Học
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>
