import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isTrainer = computed(() => user.value?.role === 'trainer')
  const isMember = computed(() => user.value?.role === 'member' || !user.value?.role)

  const login = (userData) => {
    // Ensure user has a role, default to member
    if (!userData.role) {
      userData.role = 'member'
    }
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = (userData) => {
    // Ensure user has a role, default to member
    if (!userData.role) {
      userData.role = 'member'
    }
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const updateProfile = (updatedData) => {
    user.value = { ...user.value, ...updatedData }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isTrainer,
    isMember,
    login,
    register,
    logout,
    updateProfile
  }
})
