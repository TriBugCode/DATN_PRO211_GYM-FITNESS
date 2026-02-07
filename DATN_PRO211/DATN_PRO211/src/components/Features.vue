<template>
  <section class="py-20 px-6 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Tại Sao Chọn Chúng Tôi</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Chúng tôi cung cấp mọi thứ bạn cần để đạt được mục tiêu thể hình và duy trì lối sống lành mạnh.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          :class="`bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow scale-in stagger-${index + 1} card-hover`"
        >
          <div class="bg-indigo-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            <component :is="feature.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
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
