import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useReveal(opts = { threshold: 0.18 }) {
  const target = ref(null)
  const seen = ref(false)

  useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry.isIntersecting && !seen.value) {
        seen.value = true
      }
    },
    opts
  )

  return { target, seen }
}
