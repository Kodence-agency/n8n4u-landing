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
    <UButton
      @click="scrollToSignup"
      block
      class="cta-grad text-white font-semibold text-[15px] py-3.5 rounded-2xl"
      style="box-shadow: 0 0 36px -6px rgba(255,77,0,0.7)"
      trailing-icon="heroicons:arrow-right-solid"
    >
      Commencer pour 9,99€
    </UButton>
  </div>
</template>
