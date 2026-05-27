<script setup>
import { ref, watch } from 'vue'
import { useReveal } from '~/composables/useReveal'

function useCounter(to, duration = 1400, decimals = 0) {
  const { target, seen } = useReveal()
  const val = ref(0)

  watch(seen, (isSeen) => {
    if (!isSeen) return
    const start = performance.now()
    let raf

    function tick(t) {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      val.value = to * eased
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
  })

  const display = ref('')
  watch(val, (v) => {
    display.value = decimals
      ? v.toFixed(decimals).replace('.', ',')
      : Math.round(v).toString()
  }, { immediate: true })

  return { target, display }
}

const counter1 = useCounter(500)
const counter2 = useCounter(9.99, 1400, 2)
const counter3 = useCounter(5)

function revealStyle(seen, delay = 0) {
  return {
    opacity: seen.value ? 1 : 0,
    transform: seen.value ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}

const reveals = [useReveal(), useReveal(), useReveal()]
</script>

<template>
  <section
    class="py-20 sm:py-24 relative"
    style="background: linear-gradient(180deg,#0D0D12,#13131A 50%,#0D0D12)"
  >
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,77,0,0.08), transparent 70%)"
    />
    <div class="relative max-w-6xl mx-auto px-5 sm:px-8 grid sm:grid-cols-3 gap-10 sm:gap-6">

      <!-- Stat 1: workflows -->
      <div :ref="reveals[0].target" :style="revealStyle(reveals[0].seen)" class="text-center">
        <div
          class="text-[56px] sm:text-[68px] font-extrabold tracking-[-0.03em] leading-none"
          style="background: linear-gradient(180deg,#F0F0F5,#8888A0); -webkit-background-clip: text; color: transparent"
        >
          <span :ref="counter1.target">{{ counter1.display.value }}+</span>
        </div>
        <p class="mt-3 text-[15px] font-semibold text-[#F0F0F5]">workflows actifs</p>
        <p class="mt-1 text-[13px] text-[#8888A0]">chez nos clients en France et en Europe</p>
      </div>

      <!-- Stat 2: price -->
      <div :ref="reveals[1].target" :style="revealStyle(reveals[1].seen, 120)" class="text-center">
        <div
          class="text-[56px] sm:text-[68px] font-extrabold tracking-[-0.03em] leading-none"
          style="background: linear-gradient(180deg,#F0F0F5,#8888A0); -webkit-background-clip: text; color: transparent"
        >
          <span :ref="counter2.target">{{ counter2.display.value }}</span><span class="text-[#FF8C00]">€</span>
        </div>
        <p class="mt-3 text-[15px] font-semibold text-[#F0F0F5]">seulement par mois</p>
        <p class="mt-1 text-[13px] text-[#8888A0]">tout inclus, sans frais cachés</p>
      </div>

      <!-- Stat 3: time -->
      <div :ref="reveals[2].target" :style="revealStyle(reveals[2].seen, 240)" class="text-center">
        <div
          class="text-[56px] sm:text-[68px] font-extrabold tracking-[-0.03em] leading-none"
          style="background: linear-gradient(180deg,#F0F0F5,#8888A0); -webkit-background-clip: text; color: transparent"
        >
          <span :ref="counter3.target">{{ counter3.display.value }} min</span>
        </div>
        <p class="mt-3 text-[15px] font-semibold text-[#F0F0F5]">pour démarrer</p>
        <p class="mt-1 text-[13px] text-[#8888A0]">de l'inscription au premier workflow</p>
      </div>

    </div>
  </section>
</template>
