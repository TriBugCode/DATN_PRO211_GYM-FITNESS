<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="mb-6 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
      >
        ← Quay lại
      </button>

      <!-- Trainer Header -->
      <div class="bg-white rounded-lg shadow p-8 mb-8">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <img
              :src="trainer.avatar || 'https://via.placeholder.com/200x200'"
              alt="Trainer Avatar"
              class="w-48 h-48 rounded-full object-cover shadow-lg"
            />
          </div>

          <!-- Info -->
          <div class="flex-1">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ trainer.name }}</h1>
            
            <div class="flex flex-wrap gap-3 mb-6">
              <span v-for="specialty in trainer.specialties" :key="specialty" class="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-semibold text-sm">
                {{ specialty }}
              </span>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mb-6 p-6 bg-gray-50 rounded-lg">
              <div class="text-center">
                <p class="text-2xl font-bold text-indigo-600">{{ trainer.experience }}</p>
                <p class="text-sm text-gray-600 mt-1">Năm kinh nghiệm</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-green-600">{{ trainer.totalMembers }}</p>
                <p class="text-sm text-gray-600 mt-1">Hội viên tập</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-yellow-600">⭐ {{ trainer.rating }}</p>
                <p class="text-sm text-gray-600 mt-1">Đánh giá</p>
              </div>
            </div>

            <!-- About -->
            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-900 mb-2">Về tôi</h2>
              <p class="text-gray-700 leading-relaxed">{{ trainer.bio }}</p>
            </div>

            <!-- Contact -->
            <div class="flex gap-4">
              <a href="#" class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
                📞 Liên hệ
              </a>
              <button
                @click="selectTrainer"
                :disabled="isSelected"
                :class="isSelected ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'"
                class="px-6 py-3 text-white rounded-lg transition font-semibold disabled:opacity-60"
              >
                {{ isSelected ? '✓ Đã chọn' : '💪 Chọn HLV này' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Services -->
      <div class="bg-white rounded-lg shadow p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">🎯 Dịch vụ</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="service in trainer.services" :key="service" class="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition cursor-pointer">
            <p class="font-semibold text-gray-900 mb-2">{{ service }}</p>
            <p class="text-sm text-gray-600">Tính phí theo gói membership của bạn</p>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="bg-white rounded-lg shadow p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">🏆 Chứng chỉ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="cert in trainer.certifications" :key="cert" class="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
            <span class="text-2xl mr-3">✓</span>
            <div>
              <p class="font-semibold text-gray-900">{{ cert }}</p>
              <p class="text-xs text-gray-600 mt-1">Chứng chỉ chuyên môn</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Schedule -->
      <div class="bg-white rounded-lg shadow p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">📅 Lịch tập</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-100 border-b-2 border-gray-200">
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Ngày</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Thời gian</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Loại lớp</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Nơi tập</th>
                <th class="text-left px-4 py-3 font-semibold text-gray-700">Chỗ trống</th>
                <th class="text-center px-4 py-3 font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="schedule in trainer.schedule" :key="schedule.id" class="border-b border-gray-200 hover:bg-gray-50 transition">
                <td class="px-4 py-3 font-medium text-gray-900">{{ schedule.day }}</td>
                <td class="px-4 py-3 text-gray-700">{{ schedule.startTime }} - {{ schedule.endTime }}</td>
                <td class="px-4 py-3">
                  <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                    {{ schedule.type }}
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-700">{{ schedule.location }}</td>
                <td class="px-4 py-3">
                  <span :class="schedule.available > 5 ? 'text-green-600' : schedule.available > 0 ? 'text-orange-600' : 'text-red-600'" class="font-semibold">
                    {{ schedule.available }}/{{ schedule.capacity }}
                  </span>
                </td>
                <td class="px-4 py-3 text-center">
                  <button
                    @click="bookClass(schedule)"
                    :disabled="schedule.available === 0"
                    :class="schedule.available === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'"
                    class="px-4 py-2 bg-indigo-500 text-white rounded transition"
                  >
                    {{ schedule.available === 0 ? 'Đầy' : 'Đăng ký' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Reviews -->
      <div class="bg-white rounded-lg shadow p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">⭐ Đánh giá từ hội viên</h2>
        <div class="space-y-6">
          <div v-for="review in trainer.reviews" :key="review.id" class="pb-6 border-b border-gray-200">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <img :src="review.avatar" class="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p class="font-semibold text-gray-900">{{ review.memberName }}</p>
                  <p class="text-sm text-gray-600">{{ review.date }}</p>
                </div>
              </div>
              <span class="text-yellow-400">
                <span v-for="n in review.rating" :key="n">★</span>
              </span>
            </div>
            <p class="text-gray-700">{{ review.comment }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg shadow p-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Sẵn sàng bắt đầu tập luyện?</h2>
        <p class="text-lg mb-6 opacity-90">Chọn {{ trainer.name }} làm huấn luyện viên và bắt đầu hành trình của bạn</p>
        <button
          @click="selectTrainer"
          :disabled="isSelected"
          class="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition disabled:opacity-60"
        >
          {{ isSelected ? '✓ Đã chọn HLV' : 'Chọn làm HLV của tôi' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainerProfile',
  props: {
    trainerId: String
  },
  data() {
    return {
      trainer: {
        id: 'trainer1',
        name: 'Huấn luyện viên Minh Huy',
        avatar: 'https://via.placeholder.com/200x200',
        specialties: ['Fitness', 'Weight Training', 'HIIT'],
        experience: 8,
        totalMembers: 45,
        rating: 4.8,
        bio: 'Tôi là một huấn luyện viên chuyên nghiệp với 8 năm kinh nghiệm. Tôi đặc biệt giỏi trong lĩnh vực tập tạ, cardio và HIIT training. Tôi luôn sẵn sàng giúp đỡ các hội viên đạt được mục tiêu của họ.',
        services: [
          'Personal Training',
          'Group Classes',
          'Online Coaching',
          'Nutrition Consulting'
        ],
        certifications: [
          'ACE Personal Trainer',
          'ISSA Fitness Professional',
          'Certified Nutrition Specialist',
          'HIIT Training Specialist'
        ],
        schedule: [
          {
            id: 1,
            day: 'Thứ 2',
            startTime: '06:00',
            endTime: '07:00',
            type: 'Fitness',
            location: 'Phòng A',
            available: 5,
            capacity: 15
          },
          {
            id: 2,
            day: 'Thứ 3',
            startTime: '17:00',
            endTime: '18:00',
            type: 'HIIT',
            location: 'Phòng B',
            available: 3,
            capacity: 20
          },
          {
            id: 3,
            day: 'Thứ 4',
            startTime: '06:15',
            endTime: '07:15',
            type: 'Weight Training',
            location: 'Phòng C',
            available: 8,
            capacity: 10
          },
          {
            id: 4,
            day: 'Thứ 5',
            startTime: '18:00',
            endTime: '19:00',
            type: 'Boxing',
            location: 'Phòng D',
            available: 0,
            capacity: 12
          }
        ],
        reviews: [
          {
            id: 1,
            memberName: 'Nguyễn Văn A',
            avatar: 'https://via.placeholder.com/40x40',
            rating: 5,
            date: '2 tuần trước',
            comment: 'Huấn luyện viên rất tận tâm và chuyên nghiệp. Tôi đã giảm 5kg trong 2 tháng nhờ sự hướng dẫn của anh.'
          },
          {
            id: 2,
            memberName: 'Trần Thị B',
            avatar: 'https://via.placeholder.com/40x40',
            rating: 5,
            date: '1 tuần trước',
            comment: 'Lớp HIIT của anh rất hiệu quả. Tôi cảm thấy mình mạnh mẽ hơn rất nhiều.'
          },
          {
            id: 3,
            memberName: 'Lê Minh C',
            avatar: 'https://via.placeholder.com/40x40',
            rating: 4,
            date: '3 ngày trước',
            comment: 'Tốt, nhưng có lúc lớp hơi khó. Nhưng sau một thời gian thì cơ thể thích nghi được.'
          }
        ]
      }
    }
  },
  computed: {
    isSelected() {
      return false // TODO: Check if this trainer is selected
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    selectTrainer() {
      this.$emit('notification', {
        type: 'success',
        message: `Đã chọn ${this.trainer.name} làm huấn luyện viên!`
      })
    },
    bookClass(schedule) {
      this.$emit('notification', {
        type: 'success',
        message: `Đã đăng ký lớp ${schedule.type} vào ${schedule.day}`
      })
    }
  }
}
</script>
