import { ref, onMounted } from 'vue'

export function useScrollAnimation(options = {}) {
  const elementRefs = ref([])
  const threshold = options.threshold || 0.1
  const once = options.once !== false
  const animateClass = options.animateClass || 'animate'

  // Create a ref function that Vue can use
  const setRef = (el) => {
    if (el && !elementRefs.value.includes(el)) {
      elementRefs.value.push(el)
    }
  }

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animateClass)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          entry.target.classList.remove(animateClass)
        }
      })
    }, {
      threshold,
      ...options.observerOptions
    })

    elementRefs.value.forEach(el => {
      if (el) observer.observe(el)
    })
  })

  return {
    setRef
  }
}