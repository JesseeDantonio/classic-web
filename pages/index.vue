<template>
    <Layout>
        <template v-slot:header>
            <Navbar></Navbar>
        </template>
        <template v-slot:main>
            <Presentation title="Projet: HungerGames"
                description="Notre dernier plugin Minecraft qui remet au goût du jour le célèbre mode de jeu. Ce mode est plus axé sur la survie. On peut casser et construire des blocs, les mondes sont générés aléatoirement, et il faut s’équiper en récoltant des ressources ou en tuant d’autres joueurs. Les parties sont plus longues et peuvent inclure jusqu'à 100 joueurs ou plus."
                primary-button-text="Jouer" primary-link="#" secondary-button-text="Boutique" secondary-link="shop"
                image-src="/assets/img.spve.png" image-alt="Hunger Games Image"></Presentation>
            <Banner title="Rejoins le serveur dès maintenant !"
                ip="classicstudiohub.fr"></Banner>
            <Discover title="Découvre nos fonctionnalités !" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."></Discover>
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
import Presentation from '../components/Presentation.vue';
import Banner from '@/components/Banner.vue';
import Discover from '@/components/Discover.vue';
</script>
