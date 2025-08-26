<template>
    <Layout>
        <template v-slot:header>
            <Navbar />
        </template>

        <template v-slot:main>
            <Form></Form>
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
            <Links />
        </template>
    </Layout>
</template>

<script setup lang="ts">
import Form from '~/components/Form.vue';
</script>