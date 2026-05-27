<script setup>
import { useReveal } from '~/composables/useReveal'
const { target, seen } = useReveal()

function revealStyle(seen) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 700ms cubic-bezier(.2,.7,.2,1), transform 700ms cubic-bezier(.2,.7,.2,1)',
  }
}
</script>

<template>
  <section id="temoignage" class="py-24 sm:py-32">
    <div class="max-w-3xl mx-auto px-5 sm:px-8">
      <div :ref="target" :style="revealStyle(seen)">
        <div
          class="relative rounded-3xl p-10 sm:p-14"
          style="background: linear-gradient(160deg,rgba(26,26,36,0.85),rgba(19,19,26,0.85)); border: 1px solid rgba(255,140,0,0.25); box-shadow: 0 0 80px -20px rgba(255,77,0,0.35)"
        >
          <div
            class="absolute -top-2 left-8 text-[140px] leading-none font-serif select-none pointer-events-none"
            style="background: linear-gradient(180deg,#FF4D00,#FF8C00); -webkit-background-clip: text; color: transparent; opacity: 0.45"
          >
            "
          </div>
          <blockquote
            class="relative pt-10 text-[20px] sm:text-[24px] leading-[1.45] text-[#F0F0F5] font-medium tracking-[-0.01em]"
          >
            On a remplacé trois outils Zapier en une après-midi. Notre équipe ops gagne huit heures par semaine,
            et pour la première fois je peux brancher un webhook moi-même
            <span style="background: linear-gradient(120deg,#FF6B35,#FF8C00); -webkit-background-clip: text; color: transparent">
              sans appeler la DSI
            </span>.
          </blockquote>
          <div class="relative mt-8 flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[14px] text-white"
              style="background: linear-gradient(135deg,#FF4D00,#FF8C00)"
            >
              MC
            </div>
            <div>
              <p class="text-[15px] font-semibold text-[#F0F0F5]">Margaux Chassard</p>
              <p class="text-[13px] text-[#8888A0]">Responsable Ops · PME industrielle, Lyon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
