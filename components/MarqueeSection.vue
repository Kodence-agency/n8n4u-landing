<script setup>
const apps = [
  'Slack','Gmail','Notion','Google Sheets','Stripe','Airtable',
  'GitHub','HubSpot','Salesforce','Trello','Discord','Calendly',
]
</script>

<template>
  <section
    class="py-14 sm:py-20 border-y border-[#2A2A3A]/60"
    style="background: linear-gradient(180deg,rgba(19,19,26,0.4),rgba(13,13,18,0))"
  >
    <p class="text-center text-[12px] tracking-[0.18em] uppercase text-[#8888A0] mb-8">
      Connecté à vos outils du quotidien
    </p>
    <div class="relative overflow-hidden">
      <div
        class="absolute left-0 top-0 bottom-0 w-32 z-10"
        style="background: linear-gradient(to right,#0D0D12,transparent)"
      />
      <div
        class="absolute right-0 top-0 bottom-0 w-32 z-10"
        style="background: linear-gradient(to left,#0D0D12,transparent)"
      />
      <div class="flex marquee-track">
        <span
          v-for="(app, i) in [...apps, ...apps]"
          :key="i"
          class="mx-10 text-[22px] font-bold text-[#8888A0] hover:text-[#F0F0F5] transition-colors whitespace-nowrap tracking-tight"
        >
          {{ app }}
        </span>
      </div>
    </div>
  </section>
</template>
