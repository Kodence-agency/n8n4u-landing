<script setup>
const cols = [
  {
    title: 'Produit',
    links: [['Fonctionnalités','#valeur'], ['Tarif','#tarif'], ['FAQ','#faq'], ['Connecteurs','#']],
  },
  {
    title: 'Légal',
    links: [['CGU','#'], ['Confidentialité','#'], ['Mentions légales','#'], ['RGPD','#']],
  },
  {
    title: 'Contact',
    links: [['contact@n8n4u.fr','mailto:contact@n8n4u.fr'], ['Support','#'], ['Statut','#'], ['Roadmap','#']],
  },
]

const socials = [
  { name: 'twitter',  label: 'Twitter' },
  { name: 'linkedin', label: 'LinkedIn' },
  { name: 'github',   label: 'GitHub' },
]
</script>

<template>
  <footer
    class="pt-20 pb-32 sm:pb-12 border-t border-[#2A2A3A]/60"
    style="background: linear-gradient(180deg,rgba(13,13,18,0),rgba(19,19,26,0.5))"
  >
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand column -->
        <div>
          <a href="#top" class="font-extrabold tracking-tight text-[22px] inline-block">
            <span class="text-[#F0F0F5]">N8N</span>
            <span style="background: linear-gradient(135deg,#FF4D00,#FF8C00); -webkit-background-clip: text; color: transparent">4U</span>
          </a>
          <p class="mt-3 text-[13px] text-[#8888A0] max-w-xs leading-relaxed">
            L'automatisation pour tout le monde. Conçu en France, hébergé en Europe.
          </p>
          <div class="mt-5 flex gap-2">
            <a
              v-for="s in socials"
              :key="s.label"
              href="#"
              :aria-label="s.label"
              class="w-9 h-9 rounded-lg flex items-center justify-center text-[#8888A0] hover:text-[#FF8C00] transition-all"
              style="background: rgba(26,26,36,0.6); border: 1px solid #2A2A3A"
            >
              <AppIcon :name="s.name" :size="16" />
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="col in cols" :key="col.title">
          <p class="text-[12px] uppercase tracking-[0.16em] text-[#F0F0F5] font-semibold mb-4">{{ col.title }}</p>
          <ul class="space-y-2.5">
            <li v-for="[label, href] in col.links" :key="label">
              <a :href="href" class="text-[13.5px] text-[#8888A0] hover:text-[#F0F0F5] transition-colors">
                {{ label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t border-[#2A2A3A]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#8888A0]">
        <p>© 2025 N8N4U — Tous droits réservés.</p>
        <p>Fait avec ❤ à Paris, déployé partout en Europe.</p>
      </div>
    </div>
  </footer>
</template>
