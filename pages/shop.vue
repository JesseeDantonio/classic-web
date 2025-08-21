<template>
    <Layout>
        <template v-slot:header>
            <Navbar></Navbar>
        </template>
        <template v-slot:main>
            <ShopDiscover title="Découvre nos offres !" description="Contribue au développement de nos projets actuels et avenir."></ShopDiscover>
            <Reassurance></Reassurance>
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