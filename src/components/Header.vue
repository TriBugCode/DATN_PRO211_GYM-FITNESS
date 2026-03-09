<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="text-2xl font-bold text-indigo-600">Phòng Gym</div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-indigo-600 transition-colors">Trang Chủ</router-link>
          <router-link to="/lop-hoc" class="text-gray-700 hover:text-indigo-600 transition-colors">Lớp Học</router-link>
          <router-link to="/hlv" class="text-gray-700 hover:text-indigo-600 transition-colors">HLV</router-link>
          <router-link to="/bang-gia" class="text-gray-700 hover:text-indigo-600 transition-colors">Bảng Giá</router-link>
          <router-link to="/lien-he" class="text-gray-700 hover:text-indigo-600 transition-colors">Liên Hệ</router-link>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <template v-if="isLoggedIn">
            <!-- User Dropdown -->
            <div class="relative">
              <button 
                @click="toggleDropdown"
                class="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <span>{{ currentUserEmail }}</span>
                <svg class="w-4 h-4" :class="{ 'rotate-180': dropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div 
                v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                @click="dropdownOpen = false"
              >
                <router-link 
                  to="/dashboard"
                  class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  📊 Dashboard
                </router-link>
                <button 
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  🚪 Đăng Xuất
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="space-x-4">
              <router-link to="/dang-nhap" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors">
                Đăng Nhập
              </router-link>
              <router-link to="/dang-ki" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors">
                Đăng Kí
              </router-link>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden" @click="toggleMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <nav v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 flex flex-col space-y-4">
        <router-link to="/" class="text-gray-700 hover:text-indigo-600 transition-colors">Trang Chủ</router-link>
        <router-link to="/lop-hoc" class="text-gray-700 hover:text-indigo-600 transition-colors">Lớp Học</router-link>
        <router-link to="/hlv" class="text-gray-700 hover:text-indigo-600 transition-colors">HLV</router-link>
        <router-link to="/bang-gia" class="text-gray-700 hover:text-indigo-600 transition-colors">Bảng Giá</router-link>
        <router-link to="/lien-he" class="text-gray-700 hover:text-indigo-600 transition-colors">Liên Hệ</router-link>
        <template v-if="isLoggedIn">
          <router-link 
            to="/dashboard"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors block text-center"
          >
            📊 Dashboard
          </router-link>
          <button 
            @click="handleLogout"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors w-full text-center"
          >
            🚪 Đăng Xuất
          </button>
        </template>
        <template v-else>
          <router-link to="/dang-nhap" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors w-full text-center">
            Đăng Nhập
          </router-link>
          <router-link to="/dang-ki" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors w-full text-center">
            Đăng Kí
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authStore'

export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    
    return {
      router,
      authStore
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      dropdownOpen: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.authStore.currentUser.value !== null
    },
    currentUserEmail() {
      return this.authStore.currentUser.value?.email || ''
    }
  },
  mounted() {
    // Trigger reactivity when authStore changes
    this.$watch(() => this.authStore.currentUser.value, () => {
      this.$forceUpdate()
    })

    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdownOnClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownOnClickOutside)
  },
  methods: {
    handleLogout() {
      this.authStore.logout()
      this.mobileMenuOpen = false
      this.dropdownOpen = false
      this.$router.push('/dang-nhap')
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    closeDropdownOnClickOutside(event) {
      // Close dropdown if clicking outside
      const dropdown = this.$el.querySelector('[class*="relative"]')
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false
      }
    }
  }
}
</script>
