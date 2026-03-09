<template>
  <div class="min-h-screen bg-gym-dark flex">
    <DashboardSidebar />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import DashboardSidebar from '../components/DashboardSidebar.vue'
</script>