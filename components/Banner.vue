<template>
    <section class="banner">
        <div class="b-cols">
            <div class="b-titleSection">
                <h3>{{ title }}</h3>
                <p class="">{{ description }}</p>
            </div>
        </div>
    </section>
</template>

<script setup>

defineProps({
  title: String,
  description: String,
});
</script>


<style scoped>
.banner {
    background: linear-gradient(90deg, #FF9800,  #FFC107);
    /* Dégradé moderne */
    padding: 20px 0;
    margin-top: 1vh;
    /* Espacement vertical */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.10);
}

.b-cols {
    display: flex;
    justify-content: center;
}

.b-titleSection {
    text-align: center;
    color: #FFFFFF;
    /* Texte blanc pour le contraste */
}

.b-titleSection h3 {
    font-size: 1.8rem;
    /* Taille du titre */
    margin-bottom: 10px;
}

.b-titleSection p {
    font-size: 1rem;
    /* Taille du paragraphe */
    color: #F5F5F5;
    /* Gris clair pour le texte */
}
</style>