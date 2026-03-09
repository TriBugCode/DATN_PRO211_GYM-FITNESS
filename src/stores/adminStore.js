import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  // Load data from localStorage or use defaults
  const loadData = (key, defaultValue) => {
    const stored = localStorage.getItem(`admin_${key}`)
    return stored ? JSON.parse(stored) : defaultValue
  }

  // Mock data for members
  const members = ref(loadData('members', [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      membership: 'Pro',
      joinDate: '2024-01-15',
      status: 'active',
      trainer: 'John Nguyễn',
      lastPayment: '2024-03-01'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0987654321',
      membership: 'Basic',
      joinDate: '2024-02-20',
      status: 'active',
      trainer: 'Sarah Nguyễn',
      lastPayment: '2024-03-01'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      phone: '0111111111',
      membership: 'Elite',
      joinDate: '2023-12-10',
      status: 'inactive',
      trainer: 'Mike Trần',
      lastPayment: '2024-02-01'
    }
  ]))

  // Mock data for trainers
  const trainers = ref(loadData('trainers', [
    {
      id: 1,
      name: 'John Nguyễn',
      email: 'john@gymshark.vn',
      phone: '0123456789',
      specialization: 'Fitness',
      experience: 10,
      status: 'active',
      joinDate: '2023-01-01',
      clients: 15,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Sarah Nguyễn',
      email: 'sarah@gymshark.vn',
      phone: '0987654321',
      specialization: 'Cardio & Endurance',
      experience: 8,
      status: 'active',
      joinDate: '2023-03-15',
      clients: 12,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Mike Trần',
      email: 'mike@gymshark.vn',
      phone: '0111111111',
      specialization: 'Nutrition',
      experience: 6,
      status: 'active',
      joinDate: '2022-11-20',
      clients: 10,
      rating: 4.7
    }
  ]))

  // Mock data for schedules
  const schedules = ref(loadData('schedules', [
    {
      id: 1,
      className: 'Fitness Morning',
      type: 'Fitness',
      trainer: 'John Nguyễn',
      day: 'Monday',
      startTime: '07:00',
      endTime: '08:00',
      capacity: 20,
      enrolled: 15
    },
    {
      id: 2,
      className: 'Yoga Flow',
      type: 'Yoga',
      trainer: 'Sarah Nguyễn',
      day: 'Tuesday',
      startTime: '18:00',
      endTime: '19:00',
      capacity: 15,
      enrolled: 12
    },
    {
      id: 3,
      className: 'Strength Training',
      type: 'Bodybuilding',
      trainer: 'Mike Trần',
      day: 'Wednesday',
      startTime: '19:00',
      endTime: '20:30',
      capacity: 10,
      enrolled: 8
    }
  ]))

  // Mock data for payments
  const payments = ref(loadData('payments', [
    {
      id: 1,
      memberId: 1,
      memberName: 'Nguyễn Văn A',
      memberEmail: 'nguyenvana@example.com',
      membership: 'Pro',
      amount: 800000,
      date: '2024-03-01',
      method: 'Bank Transfer',
      status: 'completed'
    },
    {
      id: 2,
      memberId: 2,
      memberName: 'Trần Thị B',
      memberEmail: 'tranthib@example.com',
      membership: 'Basic',
      amount: 500000,
      date: '2024-03-01',
      method: 'Cash',
      status: 'completed'
    },
    {
      id: 3,
      memberId: 3,
      memberName: 'Lê Văn C',
      memberEmail: 'levanc@example.com',
      membership: 'Elite',
      amount: 1200000,
      date: '2024-02-01',
      method: 'Credit Card',
      status: 'completed'
    }
  ]))

  // Computed properties
  const totalMembers = computed(() => members.value.length)
  const activeMembers = computed(() => members.value.filter(m => m.status === 'active').length)
  const totalRevenue = computed(() => payments.value.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0))
  const monthlyRevenue = computed(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    return payments.value
      .filter(p => {
        const paymentDate = new Date(p.date)
        return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear && p.status === 'completed'
      })
      .reduce((sum, p) => sum + p.amount, 0)
  })

  // Actions
  const addMember = (memberData) => {
    const newMember = {
      id: Date.now(),
      ...memberData,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }
    members.value.push(newMember)
    localStorage.setItem('admin_members', JSON.stringify(members.value))
  }

  const updateMember = (id, updatedData) => {
    const index = members.value.findIndex(m => m.id === id)
    if (index !== -1) {
      members.value[index] = { ...members.value[index], ...updatedData }
      localStorage.setItem('admin_members', JSON.stringify(members.value))
    }
  }

  const deleteMember = (id) => {
    members.value = members.value.filter(m => m.id !== id)
    localStorage.setItem('admin_members', JSON.stringify(members.value))
  }

  const addTrainer = (trainerData) => {
    const newTrainer = {
      id: Date.now(),
      ...trainerData,
      status: 'active',
      clients: 0,
      rating: 0
    }
    trainers.value.push(newTrainer)
    localStorage.setItem('admin_trainers', JSON.stringify(trainers.value))
  }

  const updateTrainer = (id, updatedData) => {
    const index = trainers.value.findIndex(t => t.id === id)
    if (index !== -1) {
      trainers.value[index] = { ...trainers.value[index], ...updatedData }
      localStorage.setItem('admin_trainers', JSON.stringify(trainers.value))
    }
  }

  const deleteTrainer = (id) => {
    trainers.value = trainers.value.filter(t => t.id !== id)
    localStorage.setItem('admin_trainers', JSON.stringify(trainers.value))
  }

  const addSchedule = (scheduleData) => {
    const newSchedule = {
      id: Date.now(),
      ...scheduleData,
      status: 'pending'
    }
    schedules.value.push(newSchedule)
    localStorage.setItem('admin_schedules', JSON.stringify(schedules.value))
  }

  const updateSchedule = (id, updatedData) => {
    const index = schedules.value.findIndex(s => s.id === id)
    if (index !== -1) {
      schedules.value[index] = { ...schedules.value[index], ...updatedData }
      localStorage.setItem('admin_schedules', JSON.stringify(schedules.value))
    }
  }

  const deleteSchedule = (id) => {
    schedules.value = schedules.value.filter(s => s.id !== id)
    localStorage.setItem('admin_schedules', JSON.stringify(schedules.value))
  }

  const addPayment = (paymentData) => {
    const newPayment = {
      id: Date.now(),
      ...paymentData,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    }
    payments.value.push(newPayment)
    localStorage.setItem('admin_payments', JSON.stringify(payments.value))
  }

  return {
    // State
    members,
    trainers,
    schedules,
    payments,

    // Computed
    totalMembers,
    activeMembers,
    totalRevenue,
    monthlyRevenue,

    // Actions
    addMember,
    updateMember,
    deleteMember,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    addPayment
  }
})

