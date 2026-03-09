import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTrainerStore = defineStore('trainer', () => {
  // Mock data for trainer
  const myClients = ref([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      membership: 'Pro',
      joinDate: '2024-01-15',
      status: 'active',
      progress: {
        weight: 75,
        goal: 'Tăng cơ',
        sessionsCompleted: 12,
        nextSession: '2024-03-15'
      }
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0987654321',
      membership: 'Basic',
      joinDate: '2024-02-20',
      status: 'active',
      progress: {
        weight: 65,
        goal: 'Giảm cân',
        sessionsCompleted: 8,
        nextSession: '2024-03-16'
      }
    }
  ])

  const mySchedules = ref([
    {
      id: 1,
      client: 'Nguyễn Văn A',
      date: '2024-03-15',
      time: '09:00',
      type: 'Personal Training',
      status: 'confirmed',
      notes: 'Tập trung vào compound lifts'
    },
    {
      id: 2,
      client: 'Trần Thị B',
      date: '2024-03-16',
      time: '14:00',
      type: 'Cardio Session',
      status: 'confirmed',
      notes: 'HIIT workout 45 phút'
    },
    {
      id: 3,
      client: 'Nguyễn Văn A',
      date: '2024-03-18',
      time: '10:00',
      type: 'Strength Training',
      status: 'pending',
      notes: 'Upper body focus'
    }
  ])

  const workoutPlans = ref([
    {
      id: 1,
      clientId: 1,
      clientName: 'Nguyễn Văn A',
      name: 'Chương trình tăng cơ 12 tuần',
      description: 'Chương trình tập luyện toàn diện để tăng khối lượng cơ bắp',
      duration: 12,
      exercises: [
        { name: 'Squat', sets: 4, reps: '8-10', weight: '80kg' },
        { name: 'Bench Press', sets: 4, reps: '8-10', weight: '70kg' },
        { name: 'Deadlift', sets: 3, reps: '6-8', weight: '100kg' }
      ],
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      clientId: 2,
      clientName: 'Trần Thị B',
      name: 'Chương trình giảm cân HIIT',
      description: 'Kết hợp cardio cường độ cao và tập sức mạnh',
      duration: 8,
      exercises: [
        { name: 'Burpees', sets: 3, reps: '15', weight: 'Bodyweight' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', weight: 'Bodyweight' },
        { name: 'Jump Squats', sets: 3, reps: '20', weight: 'Bodyweight' }
      ],
      createdAt: '2024-02-20'
    }
  ])

  const progressReports = ref([
    {
      id: 1,
      clientId: 1,
      clientName: 'Nguyễn Văn A',
      date: '2024-03-01',
      weight: 75,
      bodyFat: 15,
      measurements: {
        chest: 100,
        waist: 80,
        arms: 35
      },
      notes: 'Tiến bộ tốt, tăng 2kg cơ trong tháng qua'
    },
    {
      id: 2,
      clientId: 2,
      clientName: 'Trần Thị B',
      date: '2024-03-01',
      weight: 65,
      bodyFat: 22,
      measurements: {
        chest: 90,
        waist: 75,
        arms: 28
      },
      notes: 'Giảm 3kg, cải thiện sức bền đáng kể'
    }
  ])

  // Computed properties for compatibility with components
  const clients = computed(() => myClients.value)
  const schedules = computed(() => mySchedules.value)
  const currentTrainer = computed(() => {
    // Get current trainer from auth store
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    if (currentUser.role === 'trainer') {
      return {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        specialty: 'Fitness',
        experience: 5,
        clientsCount: myClients.value.length
      }
    }
    return null
  })

  // Computed properties
  const totalClients = computed(() => myClients.value.length)
  const activeClients = computed(() => myClients.value.filter(c => c.status === 'active').length)
  const todaySessions = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return mySchedules.value.filter(s => s.date === today && s.status === 'confirmed')
  })
  const upcomingSessions = computed(() => {
    const today = new Date()
    return mySchedules.value
      .filter(s => new Date(s.date) >= today && s.status === 'confirmed')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  })

  // Actions
  const addClient = (clientData) => {
    const newClient = {
      id: Date.now(),
      ...clientData,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      progress: {
        weight: clientData.weight || 0,
        goal: clientData.goal || '',
        sessionsCompleted: 0,
        nextSession: null
      }
    }
    myClients.value.push(newClient)
  }

  const updateClient = (id, updatedData) => {
    const index = myClients.value.findIndex(c => c.id === id)
    if (index !== -1) {
      myClients.value[index] = { ...myClients.value[index], ...updatedData }
    }
  }

  const addSchedule = (scheduleData) => {
    const newSchedule = {
      id: Date.now(),
      ...scheduleData,
      status: 'pending'
    }
    mySchedules.value.push(newSchedule)
  }

  const updateSchedule = (id, updatedData) => {
    const index = mySchedules.value.findIndex(s => s.id === id)
    if (index !== -1) {
      mySchedules.value[index] = { ...mySchedules.value[index], ...updatedData }
    }
  }

  const cancelSchedule = (id) => {
    const index = mySchedules.value.findIndex(s => s.id === id)
    if (index !== -1) {
      mySchedules.value[index].status = 'cancelled'
    }
  }

  const createWorkoutPlan = (planData) => {
    const newPlan = {
      id: Date.now(),
      ...planData,
      createdAt: new Date().toISOString().split('T')[0]
    }
    workoutPlans.value.push(newPlan)
  }

  const updateWorkoutPlan = (id, updatedData) => {
    const index = workoutPlans.value.findIndex(p => p.id === id)
    if (index !== -1) {
      workoutPlans.value[index] = { ...workoutPlans.value[index], ...updatedData }
    }
  }

  const addProgressReport = (reportData) => {
    const newReport = {
      id: Date.now(),
      ...reportData,
      date: new Date().toISOString().split('T')[0]
    }
    progressReports.value.push(newReport)
  }

  return {
    // State
    myClients,
    mySchedules,
    workoutPlans,
    progressReports,

    // Computed
    clients,
    schedules,
    currentTrainer,
    totalClients,
    activeClients,
    todaySessions,
    upcomingSessions,

    // Actions
    addClient,
    updateClient,
    addSchedule,
    updateSchedule,
    cancelSchedule,
    createWorkoutPlan,
    updateWorkoutPlan,
    addProgressReport
  }
})