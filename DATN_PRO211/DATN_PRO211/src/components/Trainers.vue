<template>
  <section class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 fade-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Đội Ngũ Huấn Luyện Viên</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Gặp gỡ đội ngũ huấn luyện viên chuyên nghiệp của chúng tôi, sẵn sàng giúp bạn đạt được mục tiêu thể hình.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(trainer, index) in trainers"
          :key="index"
          :class="`text-center scale-in stagger-${index + 1} card-hover`"
        >
          <div class="mb-4">
            <img
              :src="trainer.image"
              :alt="trainer.name"
              class="w-48 h-48 rounded-full mx-auto object-cover"
            />
          </div>
          <h3 class="text-2xl font-bold mb-2">{{ trainer.name }}</h3>
          <p class="text-indigo-600 font-semibold mb-2">{{ trainer.specialty }}</p>
          <p class="text-gray-600">{{ trainer.description }}</p>
        </div>
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
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lcnxlbnwxfHx8fDE3Njc5NzM2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Trần Thị B',
          specialty: 'Huấn Luyện Viên Yoga',
          description: 'Giảng viên yoga được chứng nhận, tập trung vào sức khỏe tinh thần và thể chất.',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwaW5zdHJ1Y3RvcnxlbnwxfHx8fDE3Njc5NzM2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Lê Văn C',
          specialty: 'Chuyên Gia Dinh Dưỡng',
          description: 'Chuyên gia dinh dưỡng giúp bạn xây dựng chế độ ăn uống lành mạnh.',
          image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb25pc3R8ZW58MXx8fHwxNzY3OTczNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ]
    }
  }
}
</script>