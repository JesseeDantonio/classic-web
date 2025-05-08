<template>
    <!-- Bouton Burger -->
    <button class="burger" @click="menuOpen = !menuOpen">
      <span :class="{ 'open': menuOpen }"></span>
      <span :class="{ 'open': menuOpen }"></span>
      <span :class="{ 'open': menuOpen }"></span>
    </button>
  
    <!-- Arrière-plan semi-transparent -->
    <div v-if="menuOpen" class="overlay" @click="closeMenu"></div>
  
    <!-- Menu mobile -->
    <Transition name="slide">
      <nav v-if="menuOpen" class="mobile-menu">
        <button class="close-btn" @click="closeMenu">✖</button>
        <ul>
          <li><router-link to="/" @click="closeMenu">Accueil</router-link></li>
          <li><router-link to="/shop" @click="closeMenu">Boutique</router-link></li>
        </ul>
      </nav>
    </Transition>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // État du menu (ouvert ou fermé)
  const menuOpen = ref(false);
  
  // Fonction pour fermer le menu
  const closeMenu = () => {
    menuOpen.value = false;
  };
  </script>
  
  <style scoped>
  /* ======== BOUTON BURGER ======== */
  .burger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    border: none;
    background: none;
    z-index: 1100;
  }
  
  .burger span {
    width: 30px;
    height: 3px;
    background: black;
    transition: all 0.3s ease-in-out;
  }
  
  /* Animation du burger */
  .burger span.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .burger span.open:nth-child(2) {
    opacity: 0;
  }
  
  .burger span.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
  
  /* ======== OVERLAY (fond semi-transparent) ======== */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
  }
  
  /* ======== MENU MOBILE ======== */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100%;
    background: white;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: center;
    z-index: 1100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  /* Bouton fermer */
  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 5vh;
    cursor: pointer;
  }
  
  /* Liens du menu */
  .mobile-menu ul {
    list-style: none;
    padding: 0;
  }
  
  .mobile-menu li {
    margin: 20px 0;
  }
  
  .mobile-menu a {
    color: black;
    text-decoration: none;
    font-size: 3vh;
    font-weight: bold;
  }
  
  /* ======== ANIMATION ======== */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  
  .slide-enter-from {
    transform: translateX(100%);
  }
  
  .slide-leave-to {
    transform: translateX(100%);
  }
  
  /* ======== RESPONSIVE ======== */
  @media screen and (max-width: 900px) {
    .burger {
      display: flex;
    }
  }
  
  @media screen and (min-width: 901px) {
    .burger {
      display: none;
    }
  }
  </style>