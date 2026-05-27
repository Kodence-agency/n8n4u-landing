<script setup>
const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 20 },
  stroke: { type: Number, default: 2 },
})

const iconMap = {
  zap: 'heroicons:bolt-solid',
  play: 'heroicons:play-solid',
  barChart: 'heroicons:chart-bar-solid',
  user: 'heroicons:user-solid',
  code: 'heroicons:code-bracket-solid',
  check: 'heroicons:check-solid',
  checkCircle: 'heroicons:check-circle-solid',
  chevronDown: 'heroicons:chevron-down-solid',
  mail: 'heroicons:envelope-solid',
  lock: 'heroicons:lock-closed-solid',
  eye: 'heroicons:eye-solid',
  eyeOff: 'heroicons:eye-slash-solid',
  alert: 'heroicons:exclamation-circle-solid',
  loader: 'heroicons:arrow-path-solid',
  arrow: 'heroicons:arrow-right-solid',
  shield: 'heroicons:shield-check-solid',
  sparkle: 'heroicons:sparkles-solid',
  twitter: 'simple-icons:x',
  linkedin: 'simple-icons:linkedin',
  github: 'simple-icons:github',
}
</script>

<template>
  <Icon :name="iconMap[name] || name" :style="{ width: `${size}px`, height: `${size}px` }" />
</template>
