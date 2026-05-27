<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const entered = ref(false)
const open = ref(false)

const links = [
  ['Fonctionnalités', '#valeur'],
  ['Tarif', '#tarif'],
  ['Témoignages', '#temoignage'],
  ['FAQ', '#faq'],
]

function scrollToSignup() {
  const el = document.getElementById('inscription')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleNav(href) {
  return (e) => {
    e.preventDefault()
    open.value = false
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function onKeydown(e) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  requestAnimationFrame(() => { entered.value = true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-5 pt-3 sm:pt-5"
    :style="{
      transform: entered ? 'translateY(0)' : 'translateY(-24px)',
      opacity: entered ? 1 : 0,
      transition: 'transform 600ms ease-out, opacity 600ms ease-out',
    }"
  >
    <nav
      class="w-full max-w-5xl transition-all duration-300"
      :style="{
        background: scrolled ? 'rgba(19,19,26,0.78)' : 'rgba(19,19,26,0.55)',
        border: `1px solid ${scrolled ? 'rgba(255,140,0,0.18)' : 'rgba(42,42,58,0.7)'}`,
        backdropFilter: 'blur(18px) saturate(150%)',
        WebkitBackdropFilter: 'blur(18px) saturate(150%)',
        borderRadius: open ? '22px' : '9999px',
        boxShadow: scrolled
          ? '0 12px 40px -16px rgba(0,0,0,0.6), 0 0 32px -12px rgba(255,140,0,0.25)'
          : '0 8px 28px -16px rgba(0,0,0,0.5)',
      }"
    >
      <!-- Top row -->
      <div class="flex items-center justify-between gap-2 px-4 sm:px-5 h-14">
        <a
          href="#top"
          @click="handleNav('#top')($event)"
          class="font-extrabold tracking-tight text-[19px] flex-shrink-0"
        >
          <span class="text-[#F0F0F5]">N8N</span>
          <span style="background: linear-gradient(135deg,#FF4D00,#FF8C00); -webkit-background-clip: text; color: transparent">4U</span>
        </a>

        <!-- Desktop links -->
        <ul class="hidden md:flex items-center gap-1 text-[13.5px] text-[#8888A0]">
          <li v-for="[label, href] in links" :key="label">
            <a
              :href="href"
              @click="handleNav(href)($event)"
              class="px-3.5 py-1.5 rounded-full hover:text-[#F0F0F5] hover:bg-white/[0.04] transition-all"
            >
              {{ label }}
            </a>
          </li>
        </ul>

        <!-- Desktop CTA -->
        <UButton
          @click="scrollToSignup"
          class="hidden md:flex cta-grad text-[13px] font-semibold pl-4 pr-2 py-1.5 rounded-full text-white items-center gap-2"
          style="box-shadow: 0 0 24px -6px rgba(255,77,0,0.6)"
        >
          Commencer pour 9,99€
          <template #trailing>
            <span class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
              <AppIcon name="arrow" :size="12" />
            </span>
          </template>
        </UButton>

        <!-- Mobile hamburger -->
        <button
          @click="open = !open"
          :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="open"
          class="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all"
          :style="{
            background: open ? 'rgba(255,140,0,0.18)' : 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(42,42,58,0.8)',
          }"
        >
          <span class="relative w-4 h-3 flex flex-col justify-between">
            <span
              class="block h-[2px] rounded bg-[#F0F0F5] origin-center transition-all"
              :style="{ transform: open ? 'translateY(5px) rotate(45deg)' : 'none' }"
            />
            <span
              class="block h-[2px] rounded bg-[#F0F0F5] transition-all"
              :style="{ opacity: open ? 0 : 1 }"
            />
            <span
              class="block h-[2px] rounded bg-[#F0F0F5] origin-center transition-all"
              :style="{ transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none' }"
            />
          </span>
        </button>
      </div>

      <!-- Mobile expanded panel -->
      <div
        class="md:hidden grid transition-all duration-300 overflow-hidden"
        :style="{ gridTemplateRows: open ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <div class="px-3 pb-3 pt-1">
            <ul class="flex flex-col">
              <li v-for="[label, href] in links" :key="label">
                <a
                  :href="href"
                  @click="handleNav(href)($event)"
                  class="block px-3 py-3 rounded-xl text-[15px] font-medium text-[#F0F0F5] hover:bg-white/[0.05] transition-colors"
                >
                  {{ label }}
                </a>
              </li>
            </ul>
            <UButton
              @click="open = false; scrollToSignup()"
              block
              class="cta-grad mt-2 text-[14px] font-semibold py-3 rounded-xl text-white"
              style="box-shadow: 0 0 30px -8px rgba(255,77,0,0.7)"
              trailing-icon="heroicons:arrow-right-solid"
            >
              Commencer pour 9,99€
            </UButton>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
