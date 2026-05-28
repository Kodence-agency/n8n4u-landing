<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionId = route.query.session_id as string

const serverStep = ref(0)
const instanceUrl = ref('')
const hasError = ref(false)
let pollInterval: ReturnType<typeof setInterval> | null = null

const steps = [
  'Paiement confirmé',
  'Réception de votre commande',
  'Allocation de votre serveur',
  'Installation et configuration de n8n',
  'Envoi de votre lien d\'accès',
]

const progressPercent = computed(() => {
  const map: Record<number, number> = { 0: 10, 1: 25, 2: 55, 3: 80, 4: 100 }
  return map[serverStep.value] ?? 10
})

const isDone = computed(() => serverStep.value >= 4)

async function poll() {
  if (!sessionId) return
  try {
    const data = await $fetch<{ step: number; instanceUrl?: string; error?: string }>(
      `/api/provision-status?session_id=${sessionId}`
    )
    serverStep.value = data.step
    if (data.instanceUrl) instanceUrl.value = data.instanceUrl
    if (data.error) hasError.value = true
    if (isDone.value && pollInterval) {
      clearInterval(pollInterval)
      pollInterval = null
    }
  } catch {
    // silently ignore network errors, keep polling
  }
}

onMounted(() => {
  poll()
  pollInterval = setInterval(poll, 3000)
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-16" style="background: #0D0D12">

    <div class="fixed inset-0 pointer-events-none" style="background: radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,77,0,0.12), transparent 70%)" />

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
            <span class="text-[13px] font-semibold text-[#F0F0F5]">
              {{ isDone ? 'Provisionnement terminé ✓' : 'Provisionnement en cours…' }}
            </span>
            <span class="text-[13px] text-[#FF8C00] font-semibold tabular-nums">{{ progressPercent }}%</span>
          </div>
          <div class="h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.07)">
            <div
              class="h-full rounded-full transition-all duration-700"
              style="background: linear-gradient(90deg,#FF4D00,#FF8C00)"
              :style="{ width: progressPercent + '%' }"
            />
          </div>
        </div>

        <!-- Steps -->
        <ul class="space-y-3">
          <li
            v-for="(label, i) in steps"
            :key="i"
            class="flex items-center gap-3 transition-all duration-500"
            :class="i <= serverStep ? 'opacity-100' : 'opacity-30'"
          >
            <div
              class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
              :style="i < serverStep
                ? 'background: linear-gradient(135deg,#FF4D00,#FF8C00)'
                : i === serverStep
                  ? 'border: 2px solid #FF8C00'
                  : 'border: 2px solid rgba(255,255,255,0.12)'"
            >
              <svg v-if="i < serverStep" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div v-else-if="i === serverStep" class="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
            </div>
            <span class="text-[14px]" :class="i <= serverStep ? 'text-[#F0F0F5]' : 'text-[#8888A0]'">
              {{ label }}
            </span>
          </li>
        </ul>

        <!-- Done: show instance URL -->
        <div v-if="isDone && instanceUrl" class="mt-6 pt-6 border-t border-white/10">
          <a
            :href="instanceUrl"
            target="_blank"
            class="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-[15px] text-white transition-opacity hover:opacity-90"
            style="background: linear-gradient(135deg,#FF4D00,#FF8C00); box-shadow: 0 0 44px -10px rgba(255,77,0,0.7)"
          >
            Accéder à mon espace n8n
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
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
          <p class="text-[#8888A0] text-[13px]">Enregistrez le lien dans vos <span class="text-[#F0F0F5]">favoris</span> — c'est votre accès exclusif.</p>
        </div>
      </div>

      <NuxtLink to="/" class="inline-block text-[#8888A0] hover:text-[#F0F0F5] text-[13px] transition-colors duration-200">
        ← Retour à l'accueil
      </NuxtLink>
    </div>
  </div>
</template>
