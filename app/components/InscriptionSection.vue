<script setup>
import { ref, reactive } from 'vue'
import { useReveal } from '~/composables/useReveal'
import * as z from 'zod'

const { target: t0, seen: s0 } = useReveal()
const { target: t1, seen: s1 } = useReveal()

const schema = z.object({
  prenom: z.string().min(1, 'Votre prénom est requis.'),
  nom: z.string().min(1, 'Votre nom est requis.'),
  email: z.string().email('Email invalide.'),
  pwd: z.string().min(8, 'Au moins 8 caractères.'),
})

const state = reactive({ prenom: '', nom: '', email: '', pwd: '' })
const loading = ref(false)
const done = ref(false)
const showPwd = ref(false)

async function onSubmit() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1400))
  loading.value = false
  done.value = true
}

function revealStyle(seen, delay = 0) {
  return {
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
  }
}
</script>

<template>
  <section id="inscription" class="py-24 sm:py-32 relative scroll-mt-24">
    <div
      class="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
      style="background: radial-gradient(ellipse 50% 60% at 50% 40%, rgba(255,77,0,0.18), transparent 70%)"
    />
    <div class="relative max-w-xl mx-auto px-5 sm:px-8">
      <div ref="t0" :style="revealStyle(s0)">
        <div class="text-center mb-10">
          <p class="text-[12px] tracking-[0.18em] uppercase text-[#FF8C00] mb-3 font-semibold">Inscription</p>
          <h2 class="text-[32px] sm:text-[40px] font-extrabold tracking-[-0.02em] leading-[1.05] text-[#F0F0F5]">
            Créez votre compte N8N4U<br />en 30 secondes.
          </h2>
          <p class="mt-4 text-[15px] text-[#8888A0]">Votre espace automatisation personnel, prêt en quelques clics.</p>
        </div>
      </div>

      <div ref="t1" :style="revealStyle(s1, 120)">
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
              <h3 class="text-[22px] font-bold text-[#F0F0F5] mb-2">🎉 Bienvenue, {{ state.prenom }} !</h3>
              <p class="text-[14.5px] text-[#8888A0]">
                Votre espace est en cours de création.<br />
                Un email de confirmation arrive à <span class="text-[#F0F0F5]">{{ state.email }}</span>.
              </p>
            </div>

            <!-- Form -->
            <UForm v-else :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <UFormField name="prenom" label="Prénom">
                  <UInput
                    v-model="state.prenom"
                    placeholder="Prénom"
                    leading-icon="heroicons:user-solid"
                    autocomplete="given-name"
                    class="w-full"
                    :ui="{
                      base: 'bg-[#1A1A24] text-[#F0F0F5] rounded-xl border-[#2A2A3A] focus:border-[#FF8C00]',
                    }"
                  />
                </UFormField>
                <UFormField name="nom" label="Nom">
                  <UInput
                    v-model="state.nom"
                    placeholder="Nom"
                    leading-icon="heroicons:user-solid"
                    autocomplete="family-name"
                    class="w-full"
                    :ui="{
                      base: 'bg-[#1A1A24] text-[#F0F0F5] rounded-xl border-[#2A2A3A] focus:border-[#FF8C00]',
                    }"
                  />
                </UFormField>
              </div>
              <UFormField name="email" label="Adresse email">
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="votre@email.fr"
                  leading-icon="heroicons:envelope-solid"
                  autocomplete="email"
                  class="w-full"
                  :ui="{
                    base: 'bg-[#1A1A24] text-[#F0F0F5] rounded-xl border-[#2A2A3A] focus:border-[#FF8C00]',
                  }"
                />
              </UFormField>
              <UFormField name="pwd" label="Mot de passe">
                <UInput
                  v-model="state.pwd"
                  :type="showPwd ? 'text' : 'password'"
                  placeholder="8 caractères min."
                  leading-icon="heroicons:lock-closed-solid"
                  autocomplete="new-password"
                  class="w-full"
                  :ui="{
                    base: 'bg-[#1A1A24] text-[#F0F0F5] rounded-xl border-[#2A2A3A] focus:border-[#FF8C00]',
                  }"
                >
                  <template #trailing>
                    <button type="button" @click="showPwd = !showPwd" class="text-[#8888A0] hover:text-[#FF8C00] transition-colors flex items-center">
                      <Icon :name="showPwd ? 'heroicons:eye-slash-solid' : 'heroicons:eye-solid'" class="w-4 h-4" />
                    </button>
                  </template>
                </UInput>
              </UFormField>
              <UButton
                type="submit"
                :loading="loading"
                block
                class="cta-grad text-white font-semibold text-[15px] py-4 rounded-2xl"
                style="box-shadow: 0 0 44px -10px rgba(255,77,0,0.7)"
              >
                <template v-if="!loading">
                  Créer mon espace N8N <AppIcon name="arrow" :size="18" class="inline-block ml-1" />
                </template>
                <template v-else>
                  Création en cours…
                </template>
              </UButton>

              <p class="text-center text-[11.5px] text-[#8888A0] leading-relaxed pt-1">
                En créant un compte, vous acceptez nos
                <a href="#" class="text-[#F0F0F5] underline-offset-2 hover:underline">CGU</a>
                et notre
                <a href="#" class="text-[#F0F0F5] underline-offset-2 hover:underline">politique de confidentialité</a>.
              </p>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
