<template>
  <div>
    <Hero />
    <Features />
    <Services />
    <Pricing />
    <Contact />
  </div>
</template>

<script>
import Hero from './Hero.vue'
import Features from './Features.vue'
import Services from './Services.vue'
import Pricing from './Pricing.vue'
import Contact from './Contact.vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

export default {
  name: 'Home',
  components: {
    Hero,
    Features,
    Services,
    Pricing,
    Contact
  },
  setup() {
    useScrollAnimation()
  }
}
</script>