<template>
  <div class="min-h-screen">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useScrollAnimation } from './composables/useScrollAnimation.js'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    useScrollAnimation()
  }
}
</script>
