<template>
  <section class="py-20 px-6 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 fade-up">
        <span class="inline-block mb-4 px-4 py-2 bg-blue-100/80 text-blue-700 rounded-full text-sm font-semibold hover-glow">
          💡 Tính Năng Nổi Bật
        </span>
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tại Sao Chọn Chúng Tôi
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Chúng tôi cung cấp mọi thứ bạn cần để đạt được mục tiêu thể hình và duy trì lối sống lành mạnh.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          :class="`card-modern glass-morphism p-8 rounded-2xl stagger-${(index % 4) + 1} group`"
        >
          <!-- Icon Container -->
          <div class="relative mb-6 inline-block">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
          </div>

          <!-- Content -->
          <h3 class="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
            {{ feature.description }}
          </p>

          <!-- Accent Line -->
          <div class="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Features',
  data() {
    return {
      features: [
        {
          icon: 'DumbbellIcon',
          title: 'Thiết Bị Cao Cấp',
          description: 'Máy tập hiện đại và tạ tự do cho mọi cấp độ tập luyện.'
        },
        {
          icon: 'UsersIcon',
          title: 'HLV Chuyên Nghiệp',
          description: 'Chuyên gia được chứng nhận, tận tâm giúp bạn đạt mục tiêu.'
        },
        {
          icon: 'ClockIcon',
          title: 'Mở Cửa 24/7',
          description: 'Tập luyện theo lịch trình của bạn với quyền truy cập suốt ngày đêm.'
        },
        {
          icon: 'TrophyIcon',
          title: 'Hướng Đến Kết Quả',
          description: 'Chương trình đã được chứng minh mang lại kết quả thực tế, có thể đo lường.'
        }
      ]
    }
  },
  components: {
    DumbbellIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h2m0 0v12m0-12h2m-2 0V4m0 14H3m2 0v2m0-2h2m12-14h-2m0 0v12m0-12h-2m2 0V4m0 14h2m-2 0v2m0-2h-2M9 12h6" />
        </svg>
      `
    },
    UsersIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      `
    },
    ClockIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `
    },
    TrophyIcon: {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      `
    }
  }
}
</script>
