<script setup>
import { useReveal } from '~/composables/useReveal'

const { target: t0, seen: s0 } = useReveal()
const { target: t1, seen: s1 } = useReveal()

function scrollToSignup() {
  const el = document.getElementById('inscription')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function revealStyle(seen, delay = 0) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}

const features = [
  'Workflows illimités',
  'Connecteurs à plus de 400 apps',
  'Exécutions illimitées (fair-use)',
  'Hébergement cloud en Europe',
  'Monitoring & alertes inclus',
  'Support en français sous 24h',
]
</script>

<template>
  <section id="tarif" class="py-24 sm:py-32 relative">
    <div
      class="absolute inset-x-0 top-1/4 bottom-1/4 pointer-events-none"
      style="background: radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,77,0,0.18), transparent 70%)"
    />
    <div class="relative max-w-4xl mx-auto px-5 sm:px-8">
      <div :ref="t0" :style="revealStyle(s0)">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <p class="text-[12px] tracking-[0.18em] uppercase text-[#FF8C00] mb-3 font-semibold">Tarif</p>
          <h2 class="text-[36px] sm:text-[48px] font-extrabold tracking-[-0.02em] leading-[1.05] text-[#F0F0F5]">
            Un prix. Tout inclus.
          </h2>
          <p class="mt-4 text-[16px] text-[#8888A0]">Pas de plan "team", pas de palier "entreprise". Juste un prix juste.</p>
        </div>
      </div>

      <div :ref="t1" :style="revealStyle(s1, 150)">
        <div class="relative">
          <div
            class="absolute -inset-6 rounded-[36px] pointer-events-none"
            style="background: radial-gradient(closest-side, rgba(255,77,0,0.35), transparent 70%)"
          />
          <div
            class="relative rounded-3xl p-8 sm:p-12"
            style="background: linear-gradient(180deg,rgba(26,26,36,0.9),rgba(19,19,26,0.9)); border: 1px solid rgba(255,140,0,0.35); backdrop-filter: blur(10px)"
          >
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
              <div>
                <p class="text-[13px] uppercase tracking-[0.18em] text-[#FF8C00] font-semibold mb-2">Offre N8N4U</p>
                <div class="flex items-baseline gap-2">
                  <span
                    class="text-[64px] sm:text-[80px] font-extrabold leading-none tracking-[-0.03em]"
                    style="background: linear-gradient(135deg,#FF4D00,#FF8C00); -webkit-background-clip: text; color: transparent"
                  >
                    9,99€
                  </span>
                  <span class="text-[18px] text-[#8888A0] font-medium">/ mois</span>
                </div>
                <p class="text-[13px] text-[#8888A0] mt-2">Sans engagement · Résiliable à tout moment</p>
              </div>
              <div
                class="flex items-center gap-2 px-3 py-1.5 rounded-full self-start sm:self-end"
                style="background: rgba(255,140,0,0.08); border: 1px solid rgba(255,140,0,0.25)"
              >
                <span class="w-2 h-2 rounded-full bg-[#FF8C00] animate-pulse" />
                <span class="text-[12px] text-[#F0F0F5] font-medium">Offre de lancement</span>
              </div>
            </div>

            <ul class="grid sm:grid-cols-2 gap-3.5 mb-9">
              <li
                v-for="f in features"
                :key="f"
                class="flex items-start gap-3 text-[14.5px] text-[#F0F0F5]"
              >
                <AppIcon name="checkCircle" :size="20" class="text-[#FF8C00] flex-shrink-0 mt-0.5" />
                <span>{{ f }}</span>
              </li>
            </ul>

            <button
              @click="scrollToSignup"
              class="cta-grad w-full text-white font-semibold text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
              style="box-shadow: 0 0 60px -10px rgba(255,77,0,0.8)"
            >
              Démarrer maintenant <AppIcon name="arrow" :size="18" />
            </button>

            <p class="mt-4 text-center text-[13px] text-[#8888A0] flex items-center justify-center gap-2">
              <AppIcon name="shield" :size="14" class="text-[#FF8C00]" />
              Satisfait ou remboursé pendant 14 jours
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
