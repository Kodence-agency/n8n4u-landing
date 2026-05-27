<script setup>
import { computed } from 'vue'
import { useReveal } from '~/composables/useReveal'

function scrollToSignup() {
  const el = document.getElementById('inscription')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ---- HeroVisual data ---- */
const VB_W = 560
const VB_H = 440

const nodes = [
  { id: 'gmail',  x: 168, y: 150, glyph: 'gmail',  title: 'Nouvel email',   sub: 'GMAIL · TRIGGER',  status: 'ok' },
  { id: 'sheets', x: 168, y: 320, glyph: 'sheets', title: 'Ligne ajoutée',  sub: 'SHEETS · TRIGGER', status: 'ok' },
  { id: 'logic',  x: 320, y: 235, glyph: 'n8n4u',  title: 'Router N8N4U',   sub: 'LOGIQUE',          status: 'running', primary: true },
  { id: 'notion', x: 480, y: 150, glyph: 'notion', title: 'Créer une page', sub: 'NOTION · ACTION',  status: 'ok' },
  { id: 'slack',  x: 480, y: 320, glyph: 'slack',  title: 'Notifier #ops',  sub: 'SLACK · ACTION',   status: 'running' },
]

const W = 168
const HALF = 84

const edgeDefs = [
  { from: 'gmail',  to: 'logic'  },
  { from: 'sheets', to: 'logic'  },
  { from: 'logic',  to: 'notion' },
  { from: 'logic',  to: 'slack'  },
]

const byId = Object.fromEntries(nodes.map(n => [n.id, n]))

const paths = computed(() => edgeDefs.map((e, i) => {
  const a = byId[e.from]
  const b = byId[e.to]
  const ax = a.x + HALF, ay = a.y
  const bx = b.x - HALF, by = b.y
  const mx = (ax + bx) / 2
  return { id: `edge-${i}`, d: `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}` }
}))

function nodeStyle(n) {
  return {
    left: `${((n.x - W / 2) / VB_W) * 100}%`,
    top: `${((n.y - W / 2 * (60 / 168)) / VB_H) * 100}%`,
    width: `${(W / VB_W) * 100}%`,
  }
}

const glyphMap = {
  gmail:  { bg: 'linear-gradient(135deg,#EA4335,#FBBC04)', body: '@' },
  notion: { bg: '#111', body: 'N' },
  slack:  { bg: 'linear-gradient(135deg,#4A154B,#ECB22E)', body: '#' },
  sheets: { bg: 'linear-gradient(135deg,#0F9D58,#34A853)', body: '≡' },
  n8n4u:  { bg: 'linear-gradient(135deg,#FF4D00,#FF8C00)', body: '✦' },
}

function statusColor(s) {
  return s === 'running' ? '#FF8C00' : s === 'ok' ? '#3DD68C' : '#8888A0'
}

/* Reveal refs */
const { target: t0, seen: s0 } = useReveal()
const { target: t1, seen: s1 } = useReveal()
const { target: t2, seen: s2 } = useReveal()
const { target: t3, seen: s3 } = useReveal()
const { target: t4, seen: s4 } = useReveal()
const { target: t5, seen: s5 } = useReveal()

function revealStyle(seen, delay = 0, y = 24) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : `translateY(${y}px)`,
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}
</script>

<template>
  <section id="top" class="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
      style="background: radial-gradient(closest-side, rgba(255,77,0,0.18), rgba(255,77,0,0) 70%)"
    />
    <div class="grain absolute inset-0 pointer-events-none opacity-[0.05]" />

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
      <!-- Left column -->
      <div>
        <div ref="t0" :style="revealStyle(s0, 0)">
          <span
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#F0F0F5]"
            style="background: rgba(255,140,0,0.08); border: 1px solid rgba(255,140,0,0.25)"
          >
            <AppIcon name="sparkle" :size="14" class="text-[#FF8C00]" />
            L'automatisation N8N, enfin pour tout le monde
          </span>
        </div>

        <div ref="t1" :style="revealStyle(s1, 120)">
          <h1 class="mt-6 font-extrabold tracking-[-0.02em] leading-[1.02] text-[44px] sm:text-[56px] lg:text-[68px]">
            <span class="text-[#F0F0F5]">Automatisez tout.</span><br />
            <span style="background: linear-gradient(120deg,#FF4D00 0%,#FF6B35 45%,#FF8C00 100%); -webkit-background-clip: text; color: transparent">
              Sans coder. Sans galérer.
            </span>
          </h1>
        </div>

        <div ref="t2" :style="revealStyle(s2, 240)">
          <p class="mt-6 text-[17px] sm:text-[19px] text-[#8888A0] max-w-[560px] leading-relaxed">
            Puissant comme n8n, simple comme un outil no-code. Lancez vos premiers workflows en 5 minutes,
            <span class="text-[#F0F0F5] font-medium"> dès 9,99€/mois.</span>
          </p>
        </div>

        <div ref="t3" :style="revealStyle(s3, 360)">
          <div class="mt-9 flex flex-wrap items-center gap-4">
            <button
              @click="scrollToSignup"
              class="cta-grad text-white font-semibold text-[15px] px-7 py-4 rounded-2xl flex items-center gap-2 transition-all"
              style="box-shadow: 0 0 44px -8px rgba(255,77,0,0.7)"
            >
              Créer mon compte gratuitement <AppIcon name="arrow" :size="18" />
            </button>
            <a
              href="#valeur"
              class="text-[15px] font-medium text-[#F0F0F5] px-6 py-4 rounded-2xl border border-[#2A2A3A] hover:border-[#FF8C00]/50 hover:bg-white/[0.02] transition-all"
            >
              Voir comment ça marche
            </a>
          </div>
        </div>

        <div ref="t4" :style="revealStyle(s4, 500)">
          <div class="mt-8 flex items-center gap-4 text-[12px] text-[#8888A0]">
            <div class="flex -space-x-2">
              <div
                v-for="(c, i) in ['#FF4D00','#FF6B35','#FF8C00','#2A2A3A']"
                :key="i"
                class="w-7 h-7 rounded-full border-2 border-[#0D0D12]"
                :style="{ background: c }"
              />
            </div>
            <span><span class="text-[#F0F0F5] font-semibold">+500 équipes</span> automatisent déjà avec N8N4U</span>
          </div>
        </div>
      </div>

      <!-- Right column — HeroVisual -->
      <div ref="t5" :style="revealStyle(s5, 300)">
        <div class="relative">
          <div
            class="absolute inset-0 -m-10 rounded-[36px] pointer-events-none"
            style="background: radial-gradient(closest-side, rgba(255,77,0,0.25), rgba(255,77,0,0) 70%)"
          />

          <!-- HeroVisual wrapper -->
          <div class="relative w-full" :style="{ aspectRatio: `${VB_W} / ${VB_H}` }">
            <!-- Window chrome -->
            <div
              class="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
              style="background: linear-gradient(180deg, #15151E 0%, #0F0F16 100%); border: 1px solid #2A2A3A; box-shadow: 0 30px 80px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)"
            >
              <!-- Toolbar -->
              <div
                class="flex items-center justify-between px-4 py-2.5 border-b border-[#23232F] flex-shrink-0"
                style="background: linear-gradient(180deg,#1A1A24,#15151E)"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="flex gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#2A2A3A]" />
                    <span class="w-2.5 h-2.5 rounded-full bg-[#2A2A3A]" />
                    <span class="w-2.5 h-2.5 rounded-full bg-[#2A2A3A]" />
                  </div>
                  <span class="hidden sm:block w-px h-3.5 bg-[#2A2A3A] mx-1" />
                  <span class="text-[11.5px] font-semibold text-[#F0F0F5] truncate">Onboarding clients</span>
                  <span
                    class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase"
                    style="background: rgba(61,214,140,0.12); color: #3DD68C; border: 1px solid rgba(61,214,140,0.3)"
                  >
                    <span class="w-1 h-1 rounded-full bg-[#3DD68C] animate-pulse" /> Live
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="hidden sm:inline text-[10.5px] text-[#8888A0]">Sauvegardé · il y a 3 s</span>
                  <button
                    class="cta-grad text-white text-[10.5px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1"
                    style="box-shadow: 0 0 18px -4px rgba(255,140,0,0.7)"
                  >
                    <AppIcon name="play" :size="9" :stroke="3" /> Exécuter
                  </button>
                </div>
              </div>

              <!-- Canvas -->
              <div
                class="relative flex-1 overflow-hidden"
                style="background: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0) 0 0 / 22px 22px, radial-gradient(ellipse 40% 60% at 50% 50%, rgba(255,77,0,0.08), transparent 70%)"
              >
                <!-- SVG paths + particles -->
                <svg
                  :viewBox="`0 44 ${VB_W} ${VB_H - 78}`"
                  preserveAspectRatio="none"
                  class="absolute inset-0 w-full h-full pointer-events-none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="edgeFill" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#FF4D00" stop-opacity="0" />
                      <stop offset="50%" stop-color="#FF8C00" stop-opacity="0.9" />
                      <stop offset="100%" stop-color="#FF4D00" stop-opacity="0" />
                    </linearGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="2.5" /></filter>
                    <path v-for="p in paths" :key="p.id + '-def'" :id="p.id" :d="p.d" />
                  </defs>

                  <!-- Base lines -->
                  <use v-for="p in paths" :key="p.id + '-b'" :href="`#${p.id}`" fill="none" stroke="#2A2A3A" stroke-width="1.4" />

                  <!-- Animated gradient overlays -->
                  <use
                    v-for="(p, i) in paths"
                    :key="p.id + '-g'"
                    :href="`#${p.id}`"
                    fill="none"
                    stroke="url(#edgeFill)"
                    stroke-width="2"
                    stroke-dasharray="100 220"
                    stroke-linecap="round"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-320" dur="3.6s" repeatCount="indefinite" :begin="`${i * 0.45}s`" />
                  </use>

                  <!-- Glow particles -->
                  <circle v-for="(p, i) in paths" :key="p.id + '-pg'" r="5" fill="#FF8C00" filter="url(#glow)" opacity="0.85">
                    <animateMotion :dur="`${3.4 + i * 0.15}s`" repeatCount="indefinite" :begin="`${i * 0.55}s`" rotate="auto">
                      <mpath :href="`#${p.id}`" />
                    </animateMotion>
                  </circle>

                  <!-- White core particles -->
                  <circle v-for="(p, i) in paths" :key="p.id + '-pw'" r="2" fill="#FFFFFF">
                    <animateMotion :dur="`${3.4 + i * 0.15}s`" repeatCount="indefinite" :begin="`${i * 0.55}s`">
                      <mpath :href="`#${p.id}`" />
                    </animateMotion>
                  </circle>
                </svg>

                <!-- HTML nodes -->
                <div
                  v-for="n in nodes"
                  :key="n.id"
                  class="absolute"
                  :style="nodeStyle(n)"
                >
                  <div
                    class="absolute -inset-3 rounded-2xl pointer-events-none"
                    :style="{ background: `radial-gradient(closest-side, ${n.primary ? 'rgba(255,140,0,0.45)' : 'rgba(255,140,0,0.18)'}, transparent 70%)` }"
                  />
                  <div
                    class="relative rounded-xl flex items-center gap-2.5 px-3 py-2.5"
                    :style="{
                      background: n.primary
                        ? 'linear-gradient(135deg,#FF4D00,#FF6B35)'
                        : 'linear-gradient(180deg,#1A1A24,#13131A)',
                      border: `1px solid ${n.primary ? 'rgba(255,255,255,0.25)' : '#2A2A3A'}`,
                      boxShadow: n.primary ? '0 8px 28px -8px rgba(255,77,0,0.7)' : '0 6px 18px -8px rgba(0,0,0,0.6)',
                    }"
                  >
                    <!-- Glyph badge -->
                    <span
                      class="inline-flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 text-[13px] font-bold text-white"
                      :style="{ background: glyphMap[n.glyph].bg, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }"
                    >
                      {{ glyphMap[n.glyph].body }}
                    </span>
                    <div class="min-w-0 flex-1">
                      <div
                        class="text-[12px] font-bold leading-tight truncate"
                        :style="{ color: n.primary ? '#fff' : '#F0F0F5' }"
                      >
                        {{ n.title }}
                      </div>
                      <div
                        class="text-[9.5px] tracking-[0.12em] uppercase font-semibold leading-none mt-0.5 truncate"
                        :style="{ color: n.primary ? 'rgba(255,255,255,0.85)' : '#8888A0' }"
                      >
                        {{ n.sub }}
                      </div>
                    </div>
                    <span class="relative flex items-center justify-center w-2 h-2 flex-shrink-0">
                      <span
                        v-if="n.status === 'running'"
                        class="absolute inset-0 rounded-full animate-ping"
                        :style="{ background: statusColor(n.status), opacity: 0.7 }"
                      />
                      <span
                        class="relative w-2 h-2 rounded-full"
                        :style="{ background: statusColor(n.status) }"
                      />
                    </span>
                  </div>
                </div>
              </div>

              <!-- Bottom log strip -->
              <div
                class="flex items-center justify-between px-4 py-1.5 border-t border-[#23232F] flex-shrink-0 text-[10px] font-mono"
                style="background: linear-gradient(180deg,#13131A,#0F0F16)"
              >
                <span class="text-[#8888A0] truncate">
                  <span class="text-[#3DD68C]">✓</span>&nbsp; 14:32:08 · slack.send · <span class="text-[#F0F0F5]">200 OK</span> · 142&nbsp;ms
                </span>
                <span class="text-[#8888A0] hidden sm:inline">4&nbsp;nœuds&nbsp;·&nbsp;1.2k&nbsp;exec/j</span>
              </div>
            </div>

            <!-- Floating card top-right: stats -->
            <div
              class="absolute hidden sm:block float-card"
              style="top: -6%; right: -7%; width: 44%; max-width: 230px"
            >
              <div
                class="rounded-xl p-3.5"
                style="background: linear-gradient(180deg,#1A1A24,#13131A); border: 1px solid #2A2A3A; box-shadow: 0 18px 50px -18px rgba(0,0,0,0.9), 0 0 40px -16px rgba(255,140,0,0.35); backdrop-filter: blur(10px)"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] uppercase tracking-[0.14em] text-[#8888A0] font-semibold">Exécutions · 7j</span>
                  <span class="text-[10px] font-bold text-[#3DD68C] flex items-center gap-0.5">↑ 18%</span>
                </div>
                <div class="flex items-end gap-1 h-8 mb-2">
                  <div
                    v-for="(h, i) in [40, 55, 35, 70, 60, 85, 100]"
                    :key="i"
                    class="flex-1 rounded-sm"
                    :style="{
                      height: `${h}%`,
                      background: i === 6 ? 'linear-gradient(180deg,#FF8C00,#FF4D00)' : 'rgba(255,140,0,0.25)',
                      boxShadow: i === 6 ? '0 0 12px rgba(255,140,0,0.6)' : 'none',
                    }"
                  />
                </div>
                <div class="text-[18px] font-extrabold text-[#F0F0F5] leading-none tracking-tight">1&nbsp;243</div>
                <div class="text-[11px] text-[#8888A0] mt-0.5">runs aujourd'hui</div>
              </div>
            </div>

            <!-- Floating card bottom-left: AI suggestion -->
            <div
              class="absolute hidden sm:block float-card-2"
              style="bottom: -8%; left: -6%; width: 46%; max-width: 240px"
            >
              <div
                class="rounded-xl p-3"
                style="background: linear-gradient(180deg,rgba(26,26,36,0.95),rgba(19,19,26,0.95)); border: 1px solid rgba(255,140,0,0.4); box-shadow: 0 18px 50px -18px rgba(0,0,0,0.9), 0 0 50px -10px rgba(255,77,0,0.45); backdrop-filter: blur(10px)"
              >
                <div class="flex items-start gap-2.5">
                  <div
                    class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style="background: linear-gradient(135deg,#FF4D00,#FF8C00)"
                  >
                    <AppIcon name="sparkle" :size="13" class="text-white" :stroke="2.5" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-[10px] uppercase tracking-[0.12em] text-[#FF8C00] font-bold mb-0.5">Suggestion IA</div>
                    <div class="text-[12px] text-[#F0F0F5] leading-snug font-medium">Ajouter une condition « facture &gt; 500€ » ?</div>
                    <div class="flex gap-1.5 mt-2">
                      <button class="cta-grad text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">Appliquer</button>
                      <button class="text-[10px] text-[#8888A0] px-2 py-1 rounded-md hover:text-[#F0F0F5] transition-colors">Plus tard</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
