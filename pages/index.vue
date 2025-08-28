<template>
    <Layout>
        <template v-slot:header>
            <Navbar></Navbar>
        </template>
        <template v-slot:main>
            <Presentation 
                title="Projet: HungerGames"
                description="Notre dernier plugin Minecraft revisite le célèbre mode de jeu. Axé sur la survie, cassez et construisez des blocs dans des mondes générés aléatoirement. Équipez-vous en récoltant des ressources ou en éliminant d'autres joueurs. Les parties, pouvant inclure jusqu'à 100 joueurs, sont intenses et stratégiques."
                primary-button-text="Jouer" 
                primary-link="#" 
                secondary-button-text="Boutique" 
                secondary-link="shop"
                image-src="/assets/img.spve.png" 
                image-alt="Hunger Games Image">
            </Presentation>
            
            <Banner 
                title="Rejoins le serveur dès maintenant !" 
                ip="classicstudiohub.fr">
            </Banner>
            
            <Discover 
                title-primary="Découvre nos fonctionnalités !" 
                item-one-title="BlockBreaker" 
                item-one-description="Les zombies deviennent des machines destructrices ! 🧟‍♂️💥 Ils cassent les blocs sur leur passage et courent plus vite pour atteindre leur cible. Prêt à relever le défi et survivre à cette menace ? 🔥"
                item-two-title="SpiderShooter"
                item-two-description="Les araignées attaquent avec précision ! 🕷️❄️ Elles lancent une boule de neige qui, en touchant un bloc, place une toile. 🕸️ Si elle touche un joueur, il est immobilisé pendant 1 seconde. 😱"
                item-three-title="SmartCreeper"
                item-three-description="Les creepers gagnent en intelligence et en puissance ! 💥🔥 S'ils perdent la trace d'un joueur tout en restant proches, ils explosent instantanément. Leur surcharge amplifie leur explosion, rendant leur attaque plus dévastatrice. ⚡💀"
                item-four-title="RandomChest" 
                item-four-description="Des coffres aléatoires apparaissent sur la carte ! 🎁 Trouvez des objets rares et précieux pour prendre l'avantage sur vos adversaires. Mais attention, chaque coffre peut aussi être un piège ! ⚠️"
                description="Découvrez des mécaniques uniques qui changent les règles du jeu.">
            </Discover>
            
            <Reassurance 
                titlePrimary="Pourquoi nous faire confiance ?" 
                item-one-icon="🔒"
                item-one-title="Paiement sécurisé"
                item-one-description="Le paiement est traité via Stripe, leader mondial du paiement en ligne. Aucune donnée bancaire n’est stockée chez nous."
                item-two-icon="💬" 
                item-two-title="Support réactif"
                item-two-description="Une question ? Une équipe est disponible sur Discord pour vous aider rapidement."
                item-three-icon="✅" 
                item-three-title="Accès immédiat"
                item-three-description="Vos avantages sont activés automatiquement dès que le paiement est validé.">
            </Reassurance>
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
import Reassurance from '@/components/Reassurance.vue';

useSeoMeta({
  title: 'HungerGames Minecraft - ClassicStudioHub',
  description: "Découvrez notre plugin Minecraft HungerGames : survie, blocs destructibles, fonctionnalités uniques, parties jusqu'à 100 joueurs. Rejoignez ClassicStudioHub pour une expérience intense et stratégique !",
  ogTitle: 'HungerGames Minecraft - ClassicStudioHub',
  ogDescription: "Notre plugin Minecraft revisite le mode HungerGames : nouveaux mobs, coffres aléatoires, parties stratégiques. Rejoignez-nous et devenez le dernier survivant !",
  ogImage: '/assets/img.spve.png', // chemin absolu si possible, ex : https://classicstudiohub.fr/assets/img.spve.png
  ogUrl: 'https://classicstudiohub.fr',
  twitterCard: 'summary_large_image',
  twitterTitle: 'HungerGames Minecraft - ClassicStudio',
  twitterDescription: "Jouez à HungerGames sur Minecraft avec ClassicStudio : mécaniques innovantes, serveurs stables.",
  twitterImage: '/assets/img.spve.png',
  robots: 'index, follow'
})
</script>