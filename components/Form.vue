<template>
  <div class="wrapper" v-if="plan && selected && priceCalculator">
    <div class="title">Formulaire</div>
    <div class="subtitle">Nous avons besoin de vos informations.</div>
    <div class="input-container">
      <input v-model="pseudo" class="input" type="text" placeholder="UUID/Pseudo en jeu" />
    </div>
    <div class="input-container">
      <input v-model="email" class="input" type="text" placeholder="Email" />
    </div>
    <div class="action">
      <button class="button" :disabled="isLoading" @click="handleCheckout(plan.key, selected.months)">
        <span v-if="!isLoading && plan && priceCalculator">Continuer {{ priceCalculator.formatCents(priceCalculator.total(plan, selected)) }}</span>
        <span v-else>Redirection…</span>
      </button>
      <!-- <span>
        DEBUG: plan={{ plan }} selected={{ selected }}
      </span> -->
    </div>
  </div>
  <div v-else>Attente des données…</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
import { PriceCalculator } from '~/server/class/PriceCalculator';

const config = useRuntimeConfig()
const publishableKey = config.public?.stripePublishableKey || ''
const stripePromise = loadStripe(publishableKey)

const router = useRouter();
const planStore = usePlanStore()
const selectedStore = useSelectedStore()

const pseudo = ref('');
const email = ref('');
const plan = computed(() => planStore.plan)
const selected = computed(() => selectedStore.selected)

onMounted(() => {
  if (!plan.value || !selected.value) {
    router.push({ name: 'shop' });
  }
});

const priceCalculator = computed(() => {
  if (!plan.value || !selected.value) return null
  return new PriceCalculator(selected.value)
})

const props = defineProps({
  title: String,
  description: String
})

const isLoading = ref(false)

const handleCheckout = async (name: string, months: number) => {
  if (!(await Promise.resolve(window.confirm('Confirmer pour continuer !')))) return
  if (!plan.value || !selected.value) {
    goToShop()
    return
  }

  if (pseudo.value.length == 0) {
    alert("Le champ Pseudo n'est pas rempli.")
    return
  }

  if (email.value.length == 0) {
    alert("Le champ Email n'est pas rempli.")
    return
  }

isLoading.value = true
try {
  const plainName = String(name)
  const plainMonths = Number(months)
  const plainPseudo = String(pseudo.value)
  const plainEmail = String(email.value)

  const res = await $fetch('/api/checkout-session', {
    method: 'POST',
    body: {
      name: plainName,
      months: plainMonths,
      pseudo: plainPseudo,
      email: plainEmail,
    }
  })

  const stripe = await stripePromise
  if (!stripe) {
    alert('Stripe non configuré. Vérifiez votre clé publique.')
    return
  }
  await stripe.redirectToCheckout({ sessionId: (res as any).id })
} catch (e: any) {
  console.error(e)
  const msg = e?.data?.statusMessage || e?.data?.message || e?.message || 'Erreur inconnue'
  alert(`Impossible de démarrer le paiement. ${e}`)
} finally {
  isLoading.value = false
}
}

function goToShop() {
  alert("Une erreur s'est produite, redirection..")
  router.push({ name: 'shop' })
}
</script>

<style scoped>
.wrapper {
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px
}

.title {
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: gray;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.input-container {
  height: 50px;
  position: relative;
  width: 30%;
}

.input {
  border-radius: 12px;
  border-color: transparent;
  background: #FFC107;
  font-size: 18px;
  height: 100%;
  padding: 4px 20px 0;
  width: 100%;
}

.submit {
  background: linear-gradient(90deg, var(--primary), var(--primary-2));
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 10%;
}

.button {
  appearance: none;
  background: linear-gradient(90deg, var(--primary), var(--primary-2));
  border-radius: 10px;
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
  text-align: center;
  border: 0;
  outline: 0;
  width: 100%;
  padding: .85rem 1rem;
  text-decoration: none;
  margin-top: .5rem;
  cursor: pointer;
}

.input:active,
.input:focus {
  outline: none;
  box-shadow: none;
  border-color: transparent;
}

@media screen and (max-width: 900px) {
  .input-container {
    width: 100%;
  }

  .submit {
    width: 100%;
  }
}
</style>