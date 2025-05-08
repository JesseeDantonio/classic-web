<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BurgerMenu from './BurgerMenu.vue';

const isMobile = ref(false);

const updateScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 900;
  }
};

onMounted(() => {
  updateScreenSize(); // Initial check
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
    <nav class="navbar">
        <router-link class="logo" to="/">
            <span class="logo-classic">CLASSIC</span> <span class="logo-studio orange">STUDIO</span>
        </router-link>

        <!-- Afficher les liens uniquement en mode desktop -->
        <div class="nav-links" v-if="!isMobile">
            <ul>
                <li><NuxtLink to="/">Accueil</NuxtLink></li>
                <li><NuxtLink to="/shop">Boutique</NuxtLink></li>
            </ul>
        </div>

        <!-- Afficher le BurgerMenu uniquement en mobile -->
        <BurgerMenu v-if="isMobile" />
    </nav>
</template>

<style scoped>
/* ======== NAVBAR ======== */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 20px;
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.navbar * {
    text-decoration: none;
    color: black;
}

.orange {
    color: #FFC300;
}

.navbar .logo {
    font-size: x-large;
    font-style: italic;
    background-color: transparent;
}

.logo-classic,
.logo-studio {

    display: inline-block;
    /* Permet au texte de s'agrandir sans affecter la div */

    transition: transform 0.3s ease-in-out;

    transform-origin: center;
    /* Définit le point d'agrandissement */

}

.logo-classic:hover,
.logo-studio:hover {
    transform: scale(1.1);
}

/* ======== NAVBAR LINKS (Visible sur Desktop) ======== */
.nav-links ul {
    display: flex;
    list-style: none;
}

.nav-links ul li {
    margin: 0 1vh;
    padding: 2vh;
    font-size: larger;
    font-weight:700;
}

.nav-links ul li a {
    transition: transform 0.3s ease-in-out;
    display: inline-block;
}

.nav-links ul li a:hover {
    transform: scale(1.1);
}

/* ======== RESPONSIVE ======== */
@media screen and (max-width: 900px) {
    .nav-links {
        display: none;
        /* Cacher les liens en mobile */
    }
}
</style>