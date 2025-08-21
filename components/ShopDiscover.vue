<template>
    <section class="discover">
        <header class="d-titleSection">
            <h2>{{ title || 'Découvrez nos offres' }}</h2>
            <p class="subtitle">
                {{ description || 'Choisissez la durée et profitez de remises automatiques. Paiement sécurisé via Stripe.' }}
            </p>
        </header>

        <!-- Sélection durée / réductions -->
        <div class="duration">
            <div id="reductions-mois" role="radiogroup" aria-label="Sélection de durée">
                <button v-for="opt in monthsOptions" :key="opt.months" type="button" class="duration__btn"
                    :class="{ 'is-active': selected.months === opt.months }" role="radio"
                    :aria-checked="selected.months === opt.months" @click="selected = opt">
                    <span class="duration__label">{{ opt.label }}</span>
                    <span v-if="opt.discount < 1" class="duration__badge">-{{ Math.round((1 - opt.discount) * 100)
                        }}%</span>
                </button>
            </div>

            <p v-if="selected.discount < 1" class="duration__hint">
                Économisez jusqu’à {{ Math.round((1 - selected.discount) * 100) }}% avec l’engagement {{ selected.months
                }} mois
            </p>
        </div>

        <!-- Cartes -->
        <div class="d-cards">
            <article v-for="plan in plans" :key="plan.key" class="d-card" :aria-label="`Offre ${plan.name}`">
                <div v-if="plan.popular" class="d-ribbon" aria-hidden="true">Populaire</div>

                <div class="card-content">
                    <div class="inner">
                        <div class="content">
                            <h3 class="title">{{ plan.name }}</h3>
                            <p class="info">{{ plan.tagline }}</p>

                            <ul class="features">
                                <li v-for="(feat, i) in plan.features" :key="i">
                                    <span class="icon" aria-hidden="true">
                                        <svg height="24" width="24" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor"
                                                d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                                        </svg>
                                    </span>
                                    <span>{{ feat }}</span>
                                </li>
                            </ul>

                            <div class="price-block" aria-live="polite">
                                <div class="price-line">
                                    <span class="price-total">{{ formatCents(total(plan)) }}</span>
                                    <span class="price-month">
                                        soit {{ formatCents(perMonth(plan)) }}/mois<span v-if="selected.months > 1"> •
                                            {{ selected.months }} mois</span>
                                    </span>
                                </div>

                                <div v-if="selected.discount < 1" class="price-savings">
                                    <span class="old">{{ formatCents(baseTotal(plan)) }}</span>
                                    <span class="save">Économie {{ formatCents(saved(plan)) }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="action">
                            <button class="button" type="button" :disabled="isLoading" @click="goToForm(plan, selected)">
                                <span v-if="!isLoading">Payer {{ formatCents(total(plan)) }}</span>
                                <span v-else>Redirection…</span>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { usePlanStore } from '@/stores/plan'
import { useSelectedStore } from '@/stores/selected'
import { useRouter } from 'vue-router'

const router = useRouter()
const planStore = usePlanStore()
const selectedStore = useSelectedStore()

defineProps({
    title: String,
    description: String
})

// Options de durée et remises
const monthsOptions = [
    { months: 1, discount: 1.00, label: '1 mois' },
    { months: 3, discount: 0.90, label: '3 mois' },
    { months: 6, discount: 0.80, label: '6 mois' },
    { months: 12, discount: 0.60, label: '12 mois' },
    { months: 24, discount: 0.50, label: '24 mois' }
]
const selected = ref(monthsOptions[0])

// Prix mensuels de base (centimes)
const BASE_PRICES = {
    premium: 390,       // 3,90 €
    premiumPlus: 990    // 9,90 €
}

const plans = [
    {
        key: 'premium',
        name: 'Premium',
        tagline: 'Conçu pour les joueurs réguliers et passionnés.',
        priceCents: BASE_PRICES.premium,
        popular: true,
        features: [
            'Accès contenus premium',
            'Accès prioritaire',
            'Préfix [PREMIUM]'
        ]
    },
    {
        key: 'premiumPlus',
        name: 'Premium Plus',
        tagline: 'Conçu pour les joueurs engagés ou les créateurs de contenu.',
        priceCents: BASE_PRICES.premiumPlus,
        popular: false,
        features: [
            'Avantages Premium',
            'Entretiens développeur',
            'Accès salons vocaux privés'
        ]
    }
]

const fmtEUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const formatCents = (c) => fmtEUR.format((c || 0) / 100)
const clampCents = (c) => Math.max(0, Math.round(c))

const totalFor = (monthly) => clampCents(monthly * selected.value.months * selected.value.discount)
const baseTotalFor = (monthly) => clampCents(monthly * selected.value.months)

const total = (plan) => totalFor(plan.priceCents)
const baseTotal = (plan) => baseTotalFor(plan.priceCents)
const perMonth = (plan) => clampCents(total(plan) / Math.max(1, selected.value.months))
const saved = (plan) => clampCents(baseTotal(plan) - total(plan))



function goToForm(plan, selected) {
  planStore.setPlan(plan)
  selectedStore.setSelected(selected)
  router.push({ name: 'form' })
}

const isLoading = ref(false)
</script>

<style scoped>
/* Palette et tokens */
.discover {
    text-align: center;
    color: var(--text);
}

/* Titre */
.d-titleSection h2 {
    font-size: clamp(1.6rem, 2.5vw + 1rem, 2.2rem);
    margin: 0 0 .25rem 0;
}

.d-titleSection .subtitle {
    margin: 0;
    color: var(--muted);
}

/* Sélecteur de durée */
.duration {
    margin-top: 3rem;
}

#reductions-mois {
    display: flex;
    justify-content: center;
    gap: .6rem;
    flex-wrap: wrap;
}

.duration__btn {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    border: 1.5px solid #d1d5db;
    background: #fff;
    color: var(--text);
    padding: .55rem .9rem;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: transform .12s ease, border-color .12s ease, box-shadow .12s ease, background-color .12s ease;
}

.duration__btn:hover {
    transform: translateY(-1px);
    border-color: #cbd5e1;
    box-shadow: 0 4px 14px rgba(0, 0, 0, .08);
}

.duration__btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px var(--ring);
}

.duration__btn.is-active {
    background: #fff7ed;
    /* orange-50 */
    border-color: #fdba74;
    /* orange-300 */
}

.duration__label {
    font-weight: 600;
}

.duration__badge {
    background: #fde68a;
    color: #7c2d12;
    border-radius: 999px;
    padding: .1rem .5rem;
    font-size: .8rem;
    font-weight: 700;
}

.duration__hint {
    margin-top: .5rem;
    color: var(--muted);
    font-size: .95rem;
}

/* Grille de cartes */
.d-cards {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
    justify-content: center;
    gap: 1.4rem;
    align-items: stretch;
}

/* Carte */
.d-card {
    position: relative;
    background: transparent;
    width: 100%;
    max-width: 380px;
    overflow: hidden;
    border-radius: 10px;
    transition: transform .18s ease, box-shadow .18s ease;
    box-shadow: var(--shadow-md);
}

.inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.2rem 1.2rem 1.2rem 1.2rem;
    background: var(--card-bg);
    border-radius: var(--radius);
    color: #212121;
    text-align: start;
    min-height: 100%;
}

.d-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, .16);
}

/* Ruban */
.d-ribbon {
    position: absolute;
    top: 18px;
    left: -42px;
    transform: rotate(-45deg);
    background-color: #db0000;
    color: white;
    padding: 6px 48px;
    font-size: .9rem;
    font-weight: 800;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
    z-index: 2;
    pointer-events: none;
}

/* Contenu carte */
.title {
    font-weight: 800;
    font-size: 1.2rem;
    color: var(--primary);
    text-align: center;
    margin: 0;
}

.title+* {
    margin-top: .5rem;
    text-align: center;
}

.info {
    margin: 0;
    color: var(--text);
    margin-bottom: 1rem;
}

/* Features */
.features {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding-left: 0;
    list-style: none;
}

.features li {
    display: flex;
    align-items: center;
    gap: .6rem;
}

.features li+li {
    margin-top: .6rem;
}

.icon {
    background-color: var(--success);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.icon svg {
    width: 16px;
    height: 16px;
}

/* Prix */
.price-block {
    display: grid;
    gap: .35rem;
    margin: 1rem;
}

.price-line {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: .5rem;
    margin-top: .25rem;
}

.price-total {
    font-size: 1.4rem;
    font-weight: 800;
}

.price-month {
    font-size: .98rem;
    color: var(--muted);
}

.price-savings {
    display: flex;
    justify-content: center;
    gap: .6rem;
    align-items: center;
    font-size: .92rem;
}

.price-savings .old {
    color: #9ca3af;
    text-decoration: line-through;
}

.price-savings .save {
    color: #065f46;
    background: #d1fae5;
    border-radius: 999px;
    padding: .12rem .5rem;
    font-weight: 700;
}

/* Action */
.action {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: stretch;
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

.button:hover {
    filter: saturate(1.05);
}

.button:focus-visible {
    box-shadow: 0 0 0 4px var(--ring), 0 8px 18px rgba(255, 152, 0, .25);
}

.button:disabled {
    opacity: .7;
    cursor: not-allowed;
}

/* Responsive */
@media (max-width: 900px) {
    .inner {
        padding: 1rem;
    }

    .discover {
        /* Horizontal: gouttières + largeur max, sans dépasser */
        --gutter: clamp(16px, 4vw, 40px);
        width: min(1100px, calc(100% - 2 * var(--gutter)));
        margin-inline: auto;
        /* Évite un scroll horizontal dû au ruban/ombres */
        overflow-x: clip;
    }

    .d-ribbon {
        top: 0px;
        left: 0px;
        transform: rotate(0deg);
        position: relative;
        ;
        font-size: large;
    }
}

@media (prefers-reduced-motion: reduce) {

    .duration__btn,
    .inner,
    .button {
        transition: none;
    }
}
</style>