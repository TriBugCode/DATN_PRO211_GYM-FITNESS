// src/composables/useScrollAnimation.js
import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
      }
    })
  }, observerOptions)

  const observeElements = () => {
    const elements = document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right, .scale-in')
    elements.forEach(el => observer.observe(el))
  }

  onMounted(() => {
    observeElements()
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return {
    observeElements
  }
}