<script setup>
function scrollToSignup() {
  const el = document.getElementById('inscription')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div
    class="fixed bottom-0 inset-x-0 z-40 sm:hidden p-3"
    style="padding-bottom: max(12px, env(safe-area-inset-bottom)); background: linear-gradient(180deg,rgba(13,13,18,0),rgba(13,13,18,0.95) 30%)"
  >
    <button
      @click="scrollToSignup"
      class="cta-grad w-full text-white font-semibold text-[15px] py-3.5 rounded-2xl flex items-center justify-center gap-2"
      style="box-shadow: 0 0 36px -6px rgba(255,77,0,0.7)"
    >
      Commencer pour 9,99€ <AppIcon name="arrow" :size="17" />
    </button>
  </div>
</template>
