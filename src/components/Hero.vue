<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
    <!-- Animated Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1750698544932-c7471990f1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwZml0bmVzc3xlbnwxfHx8fDE3Njc4OTg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Gym workout"
        class="w-full h-full object-cover zoom-in"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      
      <!-- Animated Gradient Blobs -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse rotate-slow"></div>
      <div class="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
      <!-- Badge -->
      <div class="mb-8 inline-block fade-up">
        <span class="glass-morphism px-4 py-2 rounded-full text-sm font-semibold text-blue-300 border border-blue-500/50">
          ✨ Phòng Tập Hiện Đại Nhất Thành Phố
        </span>
      </div>

      <!-- Main Title -->
      <h1 class="text-5xl md:text-7xl font-bold mb-6 fade-up stagger-1 leading-tight">
        <span class="glow-text">Thay Đổi Cơ Thể,</span><br />
        <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">Thay Đổi Cuộc Sống</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-xl md:text-2xl mb-8 text-gray-200 fade-up stagger-2 max-w-2xl mx-auto">
        Tham gia trải nghiệm thể hình tuyệt vời với huấn luyện viên chuyên nghiệp, thiết bị hiện đại và cộng đồng hỗ trợ nhiệt tình.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center fade-up stagger-3">
        <button class="group btn-modern btn-gradient text-white text-lg px-8 py-4 rounded-lg font-semibold flex items-center justify-center hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105">
          <span class="relative z-10">Dùng Thử Miễn Phí</span>
          <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <button class="glass-morphism text-white border-2 border-blue-400/50 hover:border-blue-300 text-lg px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 hover:backdrop-blur-md">
          Xem Lớp Học
        </button>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-3 gap-4 mt-16 fade-up stagger-4">
        <div class="glass-morphism rounded-lg p-6 hover-lift">
          <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">500+</div>
          <div class="text-gray-300 text-sm">Hội Viên Hoạt Động</div>
        </div>
        <div class="glass-morphism rounded-lg p-6 hover-lift">
          <div class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50+</div>
          <div class="text-gray-300 text-sm">Lớp Học Mỗi Tuần</div>
        </div>
        <div class="glass-morphism rounded-lg p-6 hover-lift">
          <div class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">30+</div>
          <div class="text-gray-300 text-sm">HLV Chuyên Nghiệp</div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
      <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>
