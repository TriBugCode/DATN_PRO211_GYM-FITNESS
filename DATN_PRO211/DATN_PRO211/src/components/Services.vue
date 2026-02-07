<template>
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Các chương trình toàn diện được thiết kế để giúp bạn thành công trên hành trình thể hình.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          :class="`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow scale-in stagger-${index + 1} card-hover`"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="p-6 bg-white">
            <h3 class="text-2xl font-bold mb-3">{{ service.title }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      services: [
        {
          title: 'Huấn Luyện Cá Nhân',
          description: 'Huấn luyện một-kèm-một được thiết kế riêng cho nhu cầu và mục tiêu của bạn.',
          image: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluaW5nJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzY3OTczNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          title: 'Lớp Học Nhóm',
          description: 'Các lớp học năng lượng cao bao gồm yoga, HIIT, spinning và nhiều hơn nữa.',
          image: 'https://images.unsplash.com/photo-1630415188550-9e454489ce3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMGZpdG5lc3MlMjBjbGFzc3xlbnwxfHx8fDE3Njc4ODI4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          title: 'Lập Kế Hoạch Dinh Dưỡng',
          description: 'Thực đơn tùy chỉnh được thiết kế để bổ sung cho hành trình thể hình của bạn.',
          image: 'https://images.unsplash.com/photo-1750698544932-c7471990f1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwZml0bmVzc3xlbnwxfHx8fDE3Njc4OTg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ]
    }
  }
}
</script>
