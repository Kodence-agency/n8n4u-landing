<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const currentStep = ref(0)

const steps = [
  { label: 'Paiement confirmé', duration: 2000 },
  { label: 'Allocation de votre serveur', duration: 18000 },
  { label: 'Installation de n8n', duration: 35000 },
  { label: 'Configuration de votre espace', duration: 25000 },
  { label: 'Envoi de votre lien d\'accès', duration: 10000 },
]

const totalDuration = steps.reduce((acc, s) => acc + s.duration, 0)

let startTime: number
let rafId: number

function animate(ts: number) {
  if (!startTime) startTime = ts
  const elapsed = ts - startTime
  progress.value = Math.min((elapsed / totalDuration) * 100, 98)

  let cumulative = 0
  for (let i = 0; i < steps.length; i++) {
    cumulative += steps[i].duration
    if (elapsed < cumulative) {
      currentStep.value = i
      break
    }
    currentStep.value = steps.length - 1
  }

  if (progress.value < 98) {
    rafId = requestAnimationFrame(animate)
  }
}

onMounted(() => {
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-16" style="background: #0D0D12">

    <!-- Glow background -->
    <div
      class="fixed inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,77,0,0.12), transparent 70%)"
    />

    <div class="relative w-full max-w-lg text-center">

      <!-- Icon -->
      <div
        class="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-8"
        style="background: linear-gradient(135deg,#FF4D00,#FF8C00); box-shadow: 0 0 80px -10px rgba(255,140,0,0.6)"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] text-[#F0F0F5] mb-3">
        Merci pour votre confiance !
      </h1>
      <p class="text-[#8888A0] text-[15px] mb-10 leading-relaxed">
        Votre espace n8n personnel est en cours de création.<br />
        Vous recevrez votre lien d'accès par e-mail dans <span class="text-[#F0F0F5] font-semibold">1 à 2 minutes</span>.
      </p>

      <!-- Progress card -->
      <div
        class="rounded-3xl p-7 sm:p-9 mb-8 text-left"
        style="background: linear-gradient(180deg,rgba(26,26,36,0.9),rgba(19,19,26,0.9)); border: 1px solid rgba(255,140,0,0.2); backdrop-filter: blur(12px)"
      >
        <!-- Progress bar -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[13px] font-semibold text-[#F0F0F5]">Provisionnement en cours…</span>
            <span class="text-[13px] text-[#FF8C00] font-semibold tabular-nums">{{ Math.round(progress) }}%</span>
          </div>
          <div class="h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.07)">
            <div
              class="h-full rounded-full transition-all duration-300"
              style="background: linear-gradient(90deg,#FF4D00,#FF8C00)"
              :style="{ width: progress + '%' }"
            />
          </div>
        </div>

        <!-- Steps -->
        <ul class="space-y-3">
          <li
            v-for="(step, i) in steps"
            :key="i"
            class="flex items-center gap-3 transition-all duration-500"
            :class="i <= currentStep ? 'opacity-100' : 'opacity-30'"
          >
            <!-- Dot -->
            <div class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" :style="i < currentStep
              ? 'background: linear-gradient(135deg,#FF4D00,#FF8C00)'
              : i === currentStep
                ? 'border: 2px solid #FF8C00; background: transparent'
                : 'border: 2px solid rgba(255,255,255,0.12); background: transparent'
            ">
              <svg v-if="i < currentStep" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div v-else-if="i === currentStep" class="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
            </div>

            <span class="text-[14px]" :class="i <= currentStep ? 'text-[#F0F0F5]' : 'text-[#8888A0]'">
              {{ step.label }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Info box -->
      <div
        class="rounded-2xl p-5 mb-8 text-left space-y-3"
        style="background: rgba(255,140,0,0.06); border: 1px solid rgba(255,140,0,0.15)"
      >
        <div class="flex items-start gap-3">
          <span class="text-[#FF8C00] mt-0.5 flex-shrink-0">→</span>
          <p class="text-[#8888A0] text-[13px]">Vérifiez votre boîte e-mail, y compris le dossier <span class="text-[#F0F0F5]">spam</span>.</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-[#FF8C00] mt-0.5 flex-shrink-0">→</span>
          <p class="text-[#8888A0] text-[13px]">À la première connexion, créez votre compte <span class="text-[#F0F0F5]">owner</span> avec votre e-mail et mot de passe.</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-[#FF8C00] mt-0.5 flex-shrink-0">→</span>
          <p class="text-[#8888A0] text-[13px]">Enregistrez le lien reçu dans vos <span class="text-[#F0F0F5]">favoris</span> — c'est votre accès exclusif.</p>
        </div>
      </div>

      <NuxtLink
        to="/"
        class="inline-block text-[#8888A0] hover:text-[#F0F0F5] text-[13px] transition-colors duration-200"
      >
        ← Retour à l'accueil
      </NuxtLink>
    </div>
  </div>
</template>
