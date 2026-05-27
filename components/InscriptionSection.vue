<script setup>
import { ref, computed } from 'vue'
import { useReveal } from '~/composables/useReveal'

const { target: t0, seen: s0 } = useReveal()
const { target: t1, seen: s1 } = useReveal()

const form = ref({ prenom: '', nom: '', email: '', pwd: '' })
const touched = ref({})
const showPwd = ref(false)
const loading = ref(false)
const done = ref(false)

const errors = computed(() => ({
  prenom: form.value.prenom.trim().length < 1 ? 'Votre prénom est requis.' : null,
  nom: form.value.nom.trim().length < 1 ? 'Votre nom est requis.' : null,
  email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) ? 'Email invalide.' : null,
  pwd: form.value.pwd.length < 8 ? 'Au moins 8 caractères.' : null,
}))

const valid = computed(() => Object.values(errors.value).every(e => !e))

function showErr(k) {
  return touched.value[k] ? errors.value[k] : null
}

function submit(e) {
  e.preventDefault()
  touched.value = { prenom: 1, nom: 1, email: 1, pwd: 1 }
  if (!valid.value) return
  loading.value = true
  setTimeout(() => { loading.value = false; done.value = true }, 1400)
}

function revealStyle(seen, delay = 0) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}

/* Floating label field state */
function fieldBorderColor(k, focusedField) {
  const err = showErr(k)
  if (err) return 'rgba(255,107,107,0.6)'
  if (focusedField.value === k) return '#FF8C00'
  return '#2A2A3A'
}

function fieldShadow(k, focusedField) {
  return focusedField.value === k ? '0 0 0 4px rgba(255,140,0,0.12)' : 'none'
}

const focusedField = ref(null)
</script>

<template>
  <section id="inscription" class="py-24 sm:py-32 relative scroll-mt-24">
    <div
      class="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
      style="background: radial-gradient(ellipse 50% 60% at 50% 40%, rgba(255,77,0,0.18), transparent 70%)"
    />
    <div class="relative max-w-xl mx-auto px-5 sm:px-8">
      <div :ref="t0" :style="revealStyle(s0)">
        <div class="text-center mb-10">
          <p class="text-[12px] tracking-[0.18em] uppercase text-[#FF8C00] mb-3 font-semibold">Inscription</p>
          <h2 class="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] leading-[1.05] text-[#F0F0F5]">
            Créez votre compte N8N4U<br />en 30 secondes.
          </h2>
          <p class="mt-4 text-[15px] text-[#8888A0]">Votre espace automatisation personnel, prêt en quelques clics.</p>
        </div>
      </div>

      <div :ref="t1" :style="revealStyle(s1, 120)">
        <div class="relative">
          <div
            class="absolute -inset-4 rounded-[28px] pointer-events-none"
            style="background: radial-gradient(closest-side, rgba(255,77,0,0.25), transparent 70%)"
          />
          <div
            class="relative rounded-3xl p-7 sm:p-10"
            style="background: linear-gradient(180deg,rgba(26,26,36,0.85),rgba(19,19,26,0.85)); border: 1px solid rgba(255,140,0,0.25); backdrop-filter: blur(12px)"
          >
            <!-- Success state -->
            <div v-if="done" class="text-center py-10">
              <div
                class="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 success-pop"
                style="background: linear-gradient(135deg,#FF4D00,#FF8C00); box-shadow: 0 0 60px -10px rgba(255,140,0,0.7)"
              >
                <AppIcon name="check" :size="32" class="text-white" :stroke="3" />
              </div>
              <h3 class="text-[22px] font-bold text-[#F0F0F5] mb-2">🎉 Bienvenue, {{ form.prenom }} !</h3>
              <p class="text-[14.5px] text-[#8888A0]">
                Votre espace est en cours de création.<br />
                Un email de confirmation arrive à <span class="text-[#F0F0F5]">{{ form.email }}</span>.
              </p>
            </div>

            <!-- Form -->
            <form v-else @submit="submit" novalidate class="space-y-4">
              <!-- Prenom + Nom row -->
              <div class="grid grid-cols-2 gap-4">
                <!-- Prénom -->
                <div>
                  <div class="relative">
                    <div
                      class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                      :style="{ color: focusedField === 'prenom' ? '#FF8C00' : showErr('prenom') ? '#FF6B6B' : '#8888A0' }"
                    >
                      <AppIcon name="user" :size="18" />
                    </div>
                    <input
                      id="prenom"
                      type="text"
                      v-model="form.prenom"
                      autocomplete="given-name"
                      @focus="focusedField = 'prenom'"
                      @blur="focusedField = null; touched = { ...touched, prenom: 1 }"
                      class="w-full pl-11 pr-4 pt-6 pb-2.5 text-[14.5px] text-[#F0F0F5] outline-none rounded-xl bg-[#1A1A24] transition-all"
                      :style="{
                        border: `1px solid ${fieldBorderColor('prenom', focusedField)}`,
                        boxShadow: fieldShadow('prenom', focusedField),
                      }"
                    />
                    <label
                      for="prenom"
                      class="absolute left-11 pointer-events-none transition-all"
                      :style="{
                        top: focusedField === 'prenom' || form.prenom ? '8px' : '50%',
                        transform: focusedField === 'prenom' || form.prenom ? 'translateY(0)' : 'translateY(-50%)',
                        fontSize: focusedField === 'prenom' || form.prenom ? '11px' : '14.5px',
                        color: showErr('prenom') ? '#FF8B8B' : focusedField === 'prenom' ? '#FF8C00' : '#8888A0',
                        letterSpacing: focusedField === 'prenom' || form.prenom ? '0.04em' : '0',
                        fontWeight: focusedField === 'prenom' || form.prenom ? 600 : 400,
                        textTransform: focusedField === 'prenom' || form.prenom ? 'uppercase' : 'none',
                      }"
                    >
                      Prénom
                    </label>
                  </div>
                  <p v-if="showErr('prenom')" class="mt-1.5 text-[12px] text-[#FF8B8B] flex items-center gap-1.5">
                    <AppIcon name="alert" :size="13" /> {{ showErr('prenom') }}
                  </p>
                </div>

                <!-- Nom -->
                <div>
                  <div class="relative">
                    <div
                      class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                      :style="{ color: focusedField === 'nom' ? '#FF8C00' : showErr('nom') ? '#FF6B6B' : '#8888A0' }"
                    >
                      <AppIcon name="user" :size="18" />
                    </div>
                    <input
                      id="nom"
                      type="text"
                      v-model="form.nom"
                      autocomplete="family-name"
                      @focus="focusedField = 'nom'"
                      @blur="focusedField = null; touched = { ...touched, nom: 1 }"
                      class="w-full pl-11 pr-4 pt-6 pb-2.5 text-[14.5px] text-[#F0F0F5] outline-none rounded-xl bg-[#1A1A24] transition-all"
                      :style="{
                        border: `1px solid ${fieldBorderColor('nom', focusedField)}`,
                        boxShadow: fieldShadow('nom', focusedField),
                      }"
                    />
                    <label
                      for="nom"
                      class="absolute left-11 pointer-events-none transition-all"
                      :style="{
                        top: focusedField === 'nom' || form.nom ? '8px' : '50%',
                        transform: focusedField === 'nom' || form.nom ? 'translateY(0)' : 'translateY(-50%)',
                        fontSize: focusedField === 'nom' || form.nom ? '11px' : '14.5px',
                        color: showErr('nom') ? '#FF8B8B' : focusedField === 'nom' ? '#FF8C00' : '#8888A0',
                        letterSpacing: focusedField === 'nom' || form.nom ? '0.04em' : '0',
                        fontWeight: focusedField === 'nom' || form.nom ? 600 : 400,
                        textTransform: focusedField === 'nom' || form.nom ? 'uppercase' : 'none',
                      }"
                    >
                      Nom
                    </label>
                  </div>
                  <p v-if="showErr('nom')" class="mt-1.5 text-[12px] text-[#FF8B8B] flex items-center gap-1.5">
                    <AppIcon name="alert" :size="13" /> {{ showErr('nom') }}
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div>
                <div class="relative">
                  <div
                    class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                    :style="{ color: focusedField === 'email' ? '#FF8C00' : showErr('email') ? '#FF6B6B' : '#8888A0' }"
                  >
                    <AppIcon name="mail" :size="18" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    v-model="form.email"
                    autocomplete="email"
                    @focus="focusedField = 'email'"
                    @blur="focusedField = null; touched = { ...touched, email: 1 }"
                    class="w-full pl-11 pr-4 pt-6 pb-2.5 text-[14.5px] text-[#F0F0F5] outline-none rounded-xl bg-[#1A1A24] transition-all"
                    :style="{
                      border: `1px solid ${fieldBorderColor('email', focusedField)}`,
                      boxShadow: fieldShadow('email', focusedField),
                    }"
                  />
                  <label
                    for="email"
                    class="absolute left-11 pointer-events-none transition-all"
                    :style="{
                      top: focusedField === 'email' || form.email ? '8px' : '50%',
                      transform: focusedField === 'email' || form.email ? 'translateY(0)' : 'translateY(-50%)',
                      fontSize: focusedField === 'email' || form.email ? '11px' : '14.5px',
                      color: showErr('email') ? '#FF8B8B' : focusedField === 'email' ? '#FF8C00' : '#8888A0',
                      letterSpacing: focusedField === 'email' || form.email ? '0.04em' : '0',
                      fontWeight: focusedField === 'email' || form.email ? 600 : 400,
                      textTransform: focusedField === 'email' || form.email ? 'uppercase' : 'none',
                    }"
                  >
                    Adresse email
                  </label>
                </div>
                <p v-if="showErr('email')" class="mt-1.5 text-[12px] text-[#FF8B8B] flex items-center gap-1.5">
                  <AppIcon name="alert" :size="13" /> {{ showErr('email') }}
                </p>
              </div>

              <!-- Password -->
              <div>
                <div class="relative">
                  <div
                    class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                    :style="{ color: focusedField === 'pwd' ? '#FF8C00' : showErr('pwd') ? '#FF6B6B' : '#8888A0' }"
                  >
                    <AppIcon name="lock" :size="18" />
                  </div>
                  <input
                    id="pwd"
                    :type="showPwd ? 'text' : 'password'"
                    v-model="form.pwd"
                    autocomplete="new-password"
                    @focus="focusedField = 'pwd'"
                    @blur="focusedField = null; touched = { ...touched, pwd: 1 }"
                    class="w-full pl-11 pr-12 pt-6 pb-2.5 text-[14.5px] text-[#F0F0F5] outline-none rounded-xl bg-[#1A1A24] transition-all"
                    :style="{
                      border: `1px solid ${fieldBorderColor('pwd', focusedField)}`,
                      boxShadow: fieldShadow('pwd', focusedField),
                    }"
                  />
                  <label
                    for="pwd"
                    class="absolute left-11 pointer-events-none transition-all"
                    :style="{
                      top: focusedField === 'pwd' || form.pwd ? '8px' : '50%',
                      transform: focusedField === 'pwd' || form.pwd ? 'translateY(0)' : 'translateY(-50%)',
                      fontSize: focusedField === 'pwd' || form.pwd ? '11px' : '14.5px',
                      color: showErr('pwd') ? '#FF8B8B' : focusedField === 'pwd' ? '#FF8C00' : '#8888A0',
                      letterSpacing: focusedField === 'pwd' || form.pwd ? '0.04em' : '0',
                      fontWeight: focusedField === 'pwd' || form.pwd ? 600 : 400,
                      textTransform: focusedField === 'pwd' || form.pwd ? 'uppercase' : 'none',
                    }"
                  >
                    Mot de passe (8 caractères min.)
                  </label>
                  <button
                    type="button"
                    @click="showPwd = !showPwd"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888A0] hover:text-[#FF8C00] transition-colors"
                    :aria-label="showPwd ? 'Cacher' : 'Afficher'"
                  >
                    <AppIcon :name="showPwd ? 'eyeOff' : 'eye'" :size="18" />
                  </button>
                </div>
                <p v-if="showErr('pwd')" class="mt-1.5 text-[12px] text-[#FF8B8B] flex items-center gap-1.5">
                  <AppIcon name="alert" :size="13" /> {{ showErr('pwd') }}
                </p>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                @mousedown="touched = { prenom: 1, nom: 1, email: 1, pwd: 1 }"
                :disabled="loading"
                class="cta-grad w-full text-white font-semibold text-[15px] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
                :style="{
                  boxShadow: '0 0 44px -10px rgba(255,77,0,0.7)',
                  opacity: valid ? 1 : 0.45,
                  cursor: valid ? 'pointer' : 'not-allowed',
                  filter: valid ? 'none' : 'grayscale(0.2)',
                }"
              >
                <template v-if="loading">
                  <AppIcon name="loader" :size="18" class="spin" /> Création en cours…
                </template>
                <template v-else>
                  Créer mon espace N8N <AppIcon name="arrow" :size="18" />
                </template>
              </button>

              <p class="text-center text-[11.5px] text-[#8888A0] leading-relaxed pt-1">
                En créant un compte, vous acceptez nos
                <a href="#" class="text-[#F0F0F5] underline-offset-2 hover:underline">CGU</a>
                et notre
                <a href="#" class="text-[#F0F0F5] underline-offset-2 hover:underline">politique de confidentialité</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
