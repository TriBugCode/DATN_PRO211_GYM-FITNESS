import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMembershipStore = defineStore('membership', () => {
  const memberships = ref([
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      duration: 'tháng',
      features: [
        'Truy cập thiết bị gym',
        'Truy cập phòng thay đồ',
        'Lớp fitness cơ bản',
        'Truy cập ứng dụng di động'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 59,
      duration: 'tháng',
      features: [
        'Tất cả tính năng Basic',
        'Buổi tập HLV cá nhân (2x/tháng)',
        'Tư vấn dinh dưỡng',
        'Đặt lịch ưu tiên',
        'Vé khách (2/tháng)'
      ],
      recommended: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 99,
      duration: 'tháng',
      features: [
        'Tất cả tính năng Pro',
        'HLV cá nhân không giới hạn',
        'Lập kế hoạch dinh dưỡng cao cấp',
        'Truy cập phòng VIP',
        'Dịch vụ spa & phục hồi',
        'Sự kiện độc quyền'
      ]
    }
  ])

  const selectedPlanId = ref(localStorage.getItem('selectedPlanId') || null)
  const userMembership = ref(JSON.parse(localStorage.getItem('userMembership')) || null)

  const selectMembership = (membershipId) => {
    const membership = memberships.value.find(m => m.id === membershipId)
    if (membership) {
      selectedPlanId.value = membershipId
      localStorage.setItem('selectedPlanId', membershipId)
      
      userMembership.value = {
        ...membership,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
      localStorage.setItem('userMembership', JSON.stringify(userMembership.value))
    }
  }

  const upgradeMembership = (membershipId) => {
    selectMembership(membershipId)
  }

  const isMembershipActive = computed(() => {
    if (!userMembership.value) return false
    return new Date(userMembership.value.endDate) > new Date()
  })

  return {
    memberships,
    selectedPlanId,
    userMembership,
    selectMembership,
    upgradeMembership,
    isMembershipActive
  }
})
