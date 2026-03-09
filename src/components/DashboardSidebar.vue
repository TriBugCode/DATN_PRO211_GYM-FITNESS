<template>
  <aside class="w-64 bg-gym-dark-secondary border-r border-gym-red/20 min-h-screen">
    <div class="p-6">
      <h2 class="text-xl font-bebas text-gym-red mb-8">DASHBOARD</h2>

      <nav class="space-y-2">
        <router-link
          to="/dashboard"
          class="block px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'Dashboard' }"
        >
          <i class="fas fa-home mr-3"></i>
          Dashboard Home
        </router-link>

        <router-link
          to="/dashboard/profile"
          class="block px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors"
          :class="{ 'bg-gym-red/20 text-gym-red': $route.name === 'Profile' }"
        >
          <i class="fas fa-user mr-3"></i>
          Profile Settings
        </router-link>

        <div class="pt-4 border-t border-gym-red/20">
          <button
            @click="logout"
            class="w-full text-left px-4 py-3 text-gym-text hover:bg-gym-red/10 hover:text-gym-red rounded-lg transition-colors"
          >
            <i class="fas fa-sign-out-alt mr-3"></i>
            Logout
          </button>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>