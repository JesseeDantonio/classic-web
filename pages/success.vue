<template>
    <Layout>
        <template v-slot:header>
            <Navbar />
        </template>

        <template v-slot:main>
            <div class="wrapper">
                <h1 class="success-title success">Paiement réussi ✅</h1>
                <p class="success-msg">
                    Merci pour votre achat ! Votre commande est en cours de traitement.
                </p>
                <NuxtLink to="/" class="success-btn">Retour à l’accueil</NuxtLink>
            </div>
        </template>

        <template v-slot:footer>
            <Links />
        </template>
    </Layout>
</template>



<script setup lang="ts">
import Layout from '../components/Layout.vue';
import Navbar from '../components/Navbar.vue';
import Links from '../components/Links.vue';
</script>

<style scoped>
.wrapper {
    text-align: center;
    padding: 4rem 1rem;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.success-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.success {
    color: #2ecc71;
}

.success-msg {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #333;
    max-width: 600px;
}

.success-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    background-color: #FF8C00;
    color: white;
}

.success-btn:hover {
    transform: translateY(-5px);
}
</style>
