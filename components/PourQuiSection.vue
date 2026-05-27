<script setup>
import { useReveal } from '~/composables/useReveal'

const { target: t0, seen: s0 } = useReveal()
const { target: t1, seen: s1 } = useReveal()
const { target: t2, seen: s2 } = useReveal()

function revealStyle(seen, delay = 0) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}

const nonDevBullets = [
  ['Templates prêts à l\'emploi', ' pour les cas d\'usage les plus fréquents.'],
  ['Connexions guidées', ' avec vos outils en quelques clics, sans clé API à manipuler.'],
  ['Assistant IA intégré', ' pour traduire vos idées en workflow automatiquement.'],
  ['Support humain en français', ', inclus dans l\'abonnement.'],
]

const devBullets = [
  ['Custom code nodes', ' — JavaScript ou Python, à l\'endroit où vous en avez besoin.'],
  ['Webhooks et API REST', ' entrants/sortants, gérés nativement.'],
  ['Versionning des workflows', ' et exports JSON pour synchroniser avec Git.'],
  ['Variables d\'environnement chiffrées', ', secrets et auth OAuth gérés pour vous.'],
]
</script>

<template>
  <section class="py-24 sm:py-32 relative">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div ref="t0" :style="revealStyle(s0)">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <p class="text-[12px] tracking-[0.18em] uppercase text-[#FF8C00] mb-3 font-semibold">Pour qui ?</p>
          <h2 class="text-[36px] sm:text-[48px] font-extrabold tracking-[-0.02em] leading-[1.05] text-[#F0F0F5]">
            Fait pour vous,<br />quelle que soit votre expertise.
          </h2>
        </div>
      </div>

      <div class="relative grid lg:grid-cols-2 gap-6 lg:gap-0">
        <!-- Glowing vertical divider -->
        <div
          class="hidden lg:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-px"
          style="background: linear-gradient(180deg,transparent,rgba(255,140,0,0.5) 30%,rgba(255,140,0,0.5) 70%,transparent)"
        />

        <!-- Non-dev column -->
        <div ref="t1" :style="revealStyle(s1)" class="lg:pr-12">
          <div
            class="rounded-2xl p-8"
            style="background: rgba(19,19,26,0.5); border: 1px solid #2A2A3A"
          >
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center"
                style="background: rgba(255,140,0,0.12); border: 1px solid rgba(255,140,0,0.25)"
              >
                <AppIcon name="user" :size="20" class="text-[#FF8C00]" />
              </div>
              <h3 class="text-[22px] font-bold text-[#F0F0F5]">Vous n'êtes pas développeur ?</h3>
            </div>
            <p class="text-[14px] text-[#8888A0] mb-5">Vous voulez juste que ça marche. Voici ce qu'on vous propose :</p>
            <ul class="space-y-3.5">
              <li
                v-for="[bold, rest] in nonDevBullets"
                :key="bold"
                class="flex items-start gap-3 text-[14.5px] text-[#8888A0] leading-relaxed"
              >
                <span
                  class="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style="background: rgba(255,140,0,0.12); border: 1px solid rgba(255,140,0,0.3)"
                >
                  <AppIcon name="check" :size="11" class="text-[#FF8C00]" :stroke="3" />
                </span>
                <span><span class="text-[#F0F0F5] font-medium">{{ bold }}</span>{{ rest }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Dev column -->
        <div ref="t2" :style="revealStyle(s2, 150)" class="lg:pl-12">
          <div
            class="rounded-2xl p-8"
            style="background: rgba(19,19,26,0.5); border: 1px solid #2A2A3A"
          >
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center"
                style="background: rgba(255,140,0,0.12); border: 1px solid rgba(255,140,0,0.25)"
              >
                <AppIcon name="code" :size="20" class="text-[#FF8C00]" />
              </div>
              <h3 class="text-[22px] font-bold text-[#F0F0F5]">Vous êtes technique ?</h3>
            </div>
            <p class="text-[14px] text-[#8888A0] mb-5">Toute la puissance de n8n, sans la maintenance :</p>
            <ul class="space-y-3.5">
              <li
                v-for="[bold, rest] in devBullets"
                :key="bold"
                class="flex items-start gap-3 text-[14.5px] text-[#8888A0] leading-relaxed"
              >
                <span
                  class="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style="background: rgba(255,140,0,0.12); border: 1px solid rgba(255,140,0,0.3)"
                >
                  <AppIcon name="check" :size="11" class="text-[#FF8C00]" :stroke="3" />
                </span>
                <span><span class="text-[#F0F0F5] font-medium">{{ bold }}</span>{{ rest }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
