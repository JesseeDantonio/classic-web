<template>
    <section class="discover">
        <div class="d-titleSection">
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
        <div class="d-cards">
            <div class="d-card">
                <div class="d-ribbon">Populaire</div>
                <div class="card-content">
                    <div class="inner">
                        <p class="title">Premium</p>
                        <p class="info">Conçu pour les joueurs réguliers et passionnés.</p>
                        <ul class="features">
                            <li>
                                <span class="icon">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path fill="currentColor"
                                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
                                        </path>
                                    </svg>
                                </span>
                                <span>Accès contenus premium</span>
                            </li>
                            <li>
                                <span class="icon">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path fill="currentColor"
                                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
                                        </path>
                                    </svg>
                                </span>
                                <span>Accès prioritaire</span>
                            </li>
                            <li>
                                <span class="icon">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path fill="currentColor"
                                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
                                        </path>
                                    </svg>
                                </span>
                                <span>Préfix [PREMIUM]</span>
                            </li>
                        </ul>
                        <div class="action">
                            <a @click="handleCheckout('Premium', 390)" class="button" href="#">
                                3.90 €
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-card">
                <div class="card-content">
                    <div class="inner">
                        <p class="title">Premium Plus</p>
                        <p class="info">Conçu pour les joueurs engagés ou les créateurs de contenu.</p>
                        <ul class="features">
                            <li>
                                <span class="icon">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path fill="currentColor"
                                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
                                        </path>
                                    </svg>
                                </span>
                                <span>Avantages Premium</span>
                            </li>
                            <li>
                                <span class="icon">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path fill="currentColor"
                                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
                                        </path>
                                    </svg>
                                </span>
                                <span>Entretien programmé avec le développeur</span>
                            </li>
                            <li>
                                <span class="icon">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path fill="currentColor"
                                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z">
                                        </path>
                                    </svg>
                                </span>
                                <span>Accès à des salons vocaux privés</span>
                            </li>
                        </ul>
                        <div class="action">
                            <a @click="handleCheckout('Premium Plus', 990)" class="button" href="#">
                                9.90 €
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

defineProps({
    title: String,
    description: String,
});

import { loadStripe } from '@stripe/stripe-js';

const config = useRuntimeConfig();
const publishableKey = config.public.stripePublishableKey;

const stripePromise = loadStripe(publishableKey || '');

const handleCheckout = async (name, amount) => {
  const res = await $fetch('/api/checkout-session', {
    method: 'POST',
    body: {
      name: name,
      amount: amount,
    },
  });

  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: res.id });
};
</script>

<style scoped>
.discover {
    text-align: center;
    color: black;
    margin-top: 1vh;
    margin-bottom: 6vh;
}

.d-ribbon {
  position: absolute;
  top: 25px;
  left: -39px;
  transform: rotate(-45deg);
  background-color: #db0000;
  color: white;
  padding: 5px 45px;
  font-size: 1.00rem;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 2;
  pointer-events: none;
}

.d-card .inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* bouton en bas */
  padding: 20px;
  padding-top: 3vh;
  background: #FAFAFA;
  border-radius: 12px;
  position: relative;
  height: 100%;
  color: #212121;
  text-align: start;
}

.d-card .card-content {
    height: 100%;
}

.d-card .title {
    font-weight: 600;
    font-size: 1.25rem;
    color: #FF9800;
    text-align: center;
}

.d-card .title+* {
    margin-top: 0.75rem;
    text-align: center;
}

.d-card .info+* {
    margin-top: 1rem;
}

.d-card .features {
    display: flex;
    flex-direction: column;
}

.d-card .features li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.d-card .features li+* {
    margin-top: 0.75rem;
}

.d-card .features .icon {
    background-color: #4CAF50;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    flex-shrink: 0
}

.d-card .features .icon svg {
    width: 16px;
    height: 16px;
}

.d-card .features+* {
    margin-top: 1.25rem;
}

.d-card .action {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
}

.d-card .button {
    background: #FF9800;
    border-radius: 6px;
    color: #fff;
    font-weight: 500;
    font-size: 1.125rem;
    text-align: center;
    border: 0;
    outline: 0;
    width: 100%;
    padding: 0.625em 0.75em;
    text-decoration: none;
    margin-top: 1.5rem;
}

.d-card .button:hover,
.d-card .button:focus {
    background: linear-gradient(90deg, #FF9800,  #FFC107);
}

.d-cards {
    margin-top: 4vh;
    display: flex;
    justify-content: center;
    gap: 4vh;
    flex-wrap: wrap;
}

.d-card {
    width: 20rem;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    color: white;
    box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    height: 30rem;

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.9;
        transition: opacity .2s ease-out;
    }

    &:hover {
        transform: scale(1.05);
    }
}

@media screen and (max-width: 900px) {
    .d-card {
        margin-bottom: 4vh;
    }
}
</style>