<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background: #0D0D12">
    <div class="w-full max-w-md">
      <div class="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div class="mb-6">
          <span class="text-4xl">⚡</span>
        </div>

        <h1 class="text-3xl font-bold text-white mb-3">
          Abonnez-vous à n8n4you
        </h1>

        <p class="text-white/60 mb-6 leading-relaxed">
          Obtenez votre instance n8n auto-hébergée, isolée et prête en moins de 2 minutes.
          Automatisations illimitées, aucune limite de workflow.
        </p>

        <div class="rounded-xl bg-white/5 border border-white/10 py-5 px-6 mb-8">
          <span class="text-5xl font-bold text-white">9,99 €</span>
          <span class="text-white/50 ml-2">/ mois</span>
        </div>

        <ul class="text-left text-white/70 text-sm space-y-2 mb-8">
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Instance n8n dédiée et isolée</li>
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> SSL automatique avec domaine personnalisé</li>
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Activation en moins de 2 minutes</li>
          <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Résiliez quand vous voulez</li>
        </ul>

        <button
          :disabled="loading"
          class="w-full rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed
                 text-white font-semibold py-4 text-lg transition-colors duration-200"
          @click="startCheckout"
        >
          <span v-if="loading">Chargement...</span>
          <span v-else>S'abonner maintenant</span>
        </button>

        <p v-if="error" class="mt-4 text-red-400 text-sm">
          {{ error }}
        </p>

        <p class="mt-4 text-white/30 text-xs">
          Paiement sécurisé via Stripe · Résiliez à tout moment
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref('')

async function startCheckout() {
  loading.value = true
  error.value = ''

  try {
    const data = await $fetch<{ url: string }>('/api/stripe/create-checkout', { method: 'POST' })
    if (data.url) {
      window.location.href = data.url
    }
  } catch {
    error.value = 'Une erreur est survenue. Veuillez réessayer dans quelques instants.'
    loading.value = false
  }
}
</script>
