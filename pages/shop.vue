<template>
    <Layout>
        <template v-slot:header>
            <Navbar></Navbar>
        </template>
        <template v-slot:main>
            <ShopDiscover title="Découvre nos offres !" description="Contribue au développement de nos projets actuels et avenir."></ShopDiscover>
            <Reassurance titlePrimary="Pourquoi nous faire confiance ?" item-one-icon="🔒"
                item-one-title="Paiement sécurisé"
                item-one-description="Le paiement est traité via Stripe, leader mondial du paiement en ligne. Aucune donnée bancaire n’est stockée chez nous."
                item-two-icon="💬"
                item-two-title="Support réactif"
                item-two-description="Une question ? Une équipe est disponible sur Discord pour vous aider rapidement."
                item-three-icon="✅"
                item-three-title="Accès immédiat"
                item-three-description="Vos avantages sont activés automatiquement dès que le paiement est validé."></Reassurance>
        </template>
        <template v-slot:footer>
            <Links></Links>
        </template>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '../components/Layout.vue';
import Navbar from '../components/Navbar.vue';
import Links from '../components/Links.vue';
import ShopDiscover from '@/components/ShopDiscover.vue';
import Reassurance from '@/components/Reassurance.vue';
</script>