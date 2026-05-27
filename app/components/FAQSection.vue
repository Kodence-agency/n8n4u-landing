<script setup>
import { useReveal } from '~/composables/useReveal'

const { target: t0, seen: s0 } = useReveal()

const items = [
  {
    label: 'Faut-il savoir coder pour utiliser N8N4U ?',
    content: "Absolument pas. L'interface est 100% visuelle : vous glissez des blocs, vous les reliez, vous connectez vos comptes en deux clics. Si à un moment vous voulez aller plus loin, vous pouvez ajouter du code (JavaScript ou Python) — mais ce n'est jamais obligatoire.",
  },
  {
    label: 'Pourquoi un tarif unique à 9,99€ ?',
    content: "Parce qu'on a un seul produit, et qu'il est complet. Pas de freemium frustrant, pas de palier \"team\" pour débloquer ce qui devrait être inclus. Vous payez 9,99€/mois et vous avez tout : workflows illimités, connecteurs, monitoring, support en français.",
  },
  {
    label: 'Quelle est la différence avec n8n directement ?',
    content: "n8n est puissant mais demande d'installer, d'héberger et de maintenir un serveur. N8N4U se charge de tout ça pour vous : votre instance est prête en 30 secondes, hébergée en Europe, sauvegardée, mise à jour et monitorée. Vous gardez la puissance, on enlève la friction.",
  },
]

function revealStyle(seen, delay = 0) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}
</script>

<template>
  <section id="faq" class="py-24 sm:py-32">
    <div class="max-w-3xl mx-auto px-5 sm:px-8">
      <div ref="t0" :style="revealStyle(s0)">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <p class="text-[12px] tracking-[0.18em] uppercase text-[#FF8C00] mb-3 font-semibold">FAQ</p>
          <h2 class="text-[36px] sm:text-[48px] font-extrabold tracking-[-0.02em] leading-[1.05] text-[#F0F0F5]">
            Les questions qu'on nous pose.
          </h2>
        </div>
      </div>

      <UAccordion
        :items="items"
        collapsible
        :ui="{
          root: 'space-y-3',
          item: 'rounded-2xl overflow-hidden border border-[#2A2A3A] bg-[rgba(19,19,26,0.5)] data-[state=open]:border-[rgba(255,140,0,0.4)] data-[state=open]:bg-[rgba(26,26,36,0.7)] transition-all',
          header: '',
          trigger: 'w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer',
          label: 'text-[16px] sm:text-[17px] font-semibold text-[#F0F0F5]',
          trailingIcon: 'text-[#FF8C00] flex-shrink-0 w-5 h-5',
          content: '',
          body: 'px-6 pb-5 text-[14.5px] text-[#8888A0] leading-relaxed',
        }"
        trailing-icon="heroicons:chevron-down-solid"
      />
    </div>
  </section>
</template>
