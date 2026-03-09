<template>
  <div v-if="notifications.length > 0" class="fixed top-6 right-6 z-50 max-w-sm space-y-3">
    <transition
      v-for="(notification, index) in notifications"
      :key="notification.id"
      name="slide-fade"
    >
      <div
        :class="getNotificationClass(notification.type)"
        class="p-4 rounded-lg shadow-lg flex items-start justify-between gap-4 animate-pulse"
      >
        <div class="flex items-start gap-3 flex-1">
          <span class="text-xl mt-1">{{ getNotificationIcon(notification.type) }}</span>
          <div>
            <p class="font-semibold">{{ notification.title || 'Thông báo' }}</p>
            <p class="text-sm opacity-90 mt-1">{{ notification.message }}</p>
          </div>
        </div>
        <button
          @click="removeNotification(index)"
          class="text-xl hover:opacity-70 transition mt-1"
        >
          ✕
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  props: {
    notifications: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getNotificationClass(type) {
      switch (type) {
        case 'success':
          return 'bg-green-100 text-green-900 border border-green-400'
        case 'error':
          return 'bg-red-100 text-red-900 border border-red-400'
        case 'warning':
          return 'bg-yellow-100 text-yellow-900 border border-yellow-400'
        case 'info':
          return 'bg-blue-100 text-blue-900 border border-blue-400'
        default:
          return 'bg-gray-100 text-gray-900 border border-gray-400'
      }
    },
    getNotificationIcon(type) {
      switch (type) {
        case 'success':
          return '✓'
        case 'error':
          return '✕'
        case 'warning':
          return '⚠️'
        case 'info':
          return 'ℹ️'
        default:
          return '•'
      }
    },
    removeNotification(index) {
      this.$emit('remove', index)
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
