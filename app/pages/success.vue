<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background: #0D0D12">
    <div class="w-full max-w-lg text-center">
      <div class="text-6xl mb-6">🎉</div>

      <h1 class="text-3xl font-bold text-white mb-4">
        Paiement reçu !
      </h1>

      <p class="text-white/70 text-lg mb-6 leading-relaxed">
        Votre instance n8n personnelle est en cours de préparation.
        <br>
        Vous recevrez un e-mail avec le lien d'accès dans <strong class="text-white">1 à 2 minutes</strong>.
      </p>

      <div class="rounded-xl border border-white/10 bg-white/5 p-6 mb-8 text-left space-y-3">
        <div class="flex items-start gap-3">
          <span class="text-orange-400 mt-0.5">→</span>
          <p class="text-white/70 text-sm">Vérifiez votre boîte e-mail, y compris le dossier <strong class="text-white">spam</strong>.</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-orange-400 mt-0.5">→</span>
          <p class="text-white/70 text-sm">À la première connexion, il vous sera demandé de créer le compte <strong class="text-white">owner</strong> avec votre e-mail et mot de passe.</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-orange-400 mt-0.5">→</span>
          <p class="text-white/70 text-sm">Enregistrez le lien reçu dans vos <strong class="text-white">favoris</strong> — c'est votre accès exclusif.</p>
        </div>
      </div>

      <NuxtLink
        to="/"
        class="inline-block text-white/50 hover:text-white text-sm transition-colors duration-200"
      >
        ← Retour à l'accueil
      </NuxtLink>
    </div>
  </div>
</template>
