<script setup>
import { useReveal } from '~/composables/useReveal'

const { target: t0, seen: s0 } = useReveal()

const cards = [
  { icon: 'zap',      title: 'Interface visuelle no-code', delay: 0,   desc: "Glissez-déposez vos blocs, branchez vos comptes, voilà. Aucune ligne de code, aucun jargon technique." },
  { icon: 'play',     title: 'Déploiement en un clic',     delay: 120, desc: "Vos workflows tournent dans le cloud dès l'activation. Pas de serveur à gérer, pas de Docker à configurer." },
  { icon: 'barChart', title: 'Monitoring en temps réel',   delay: 240, desc: "Suivez chaque exécution, recevez une alerte au moindre incident, et ajustez vos flux en direct." },
]

const reveals = cards.map(() => useReveal())

function revealStyle(seen, delay = 0) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}
</script>

<template>
  <section id="valeur" class="py-24 sm:py-32 relative">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div ref="t0" :style="revealStyle(s0)">
        <div class="max-w-2xl mb-14">
          <p class="text-[12px] tracking-[0.18em] uppercase text-[#FF8C00] mb-3 font-semibold">Pourquoi N8N4U ?</p>
          <h2 class="text-[36px] sm:text-[48px] font-extrabold tracking-[-0.02em] leading-[1.05] text-[#F0F0F5]">
            La puissance de n8n,<br />sans la friction.
          </h2>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-5">
        <div
          v-for="(card, i) in cards"
          :key="card.title"
          :ref="reveals[i].target"
          :style="revealStyle(reveals[i].seen.value, card.delay)"
        >
          <div
            class="group relative rounded-2xl p-7 h-full transition-all duration-500 hover:-translate-y-1"
            style="background: linear-gradient(180deg,rgba(26,26,36,0.6),rgba(19,19,26,0.4)); border: 1px solid #2A2A3A; backdrop-filter: blur(8px)"
          >
            <div
              class="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style="box-shadow: 0 0 60px -12px rgba(255,140,0,0.45), inset 0 0 0 1px rgba(255,140,0,0.35)"
            />
            <div class="relative">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style="background: linear-gradient(135deg,rgba(255,77,0,0.18),rgba(255,140,0,0.08)); border: 1px solid rgba(255,140,0,0.25)"
              >
                <AppIcon :name="card.icon" :size="22" class="text-[#FF8C00]" />
              </div>
              <h3 class="text-[20px] font-bold text-[#F0F0F5] mb-2.5">{{ card.title }}</h3>
              <p class="text-[14.5px] text-[#8888A0] leading-relaxed">{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
