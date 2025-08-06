<template>
    <section class="banner">
        <div class="b-cols">
            <div class="b-titleSection">
                <h3>{{ title }}</h3>
                <div class="ip-container">
                    <button @click="copier" class="copy-btn">
                        {{ copied ? "Copié !" : "classicstudiohub.fr" }}
                    </button>
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

const ip = "classicstudiohub.fr"
const copied = ref(false)

function copier() {
    navigator.clipboard.writeText(ip)
    copied.value = true
    setTimeout(() => copied.value = false, 1000)
}
</script>


<style scoped>
.banner {
    background: linear-gradient(90deg, #FF9800, #FFC107);
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
    /* Texte blanc pour le contraste */
    color: white;
}

.b-titleSection h3 {
    font-size: 1.8rem;
    /* Taille du titre */
    margin-bottom: 10px;
}

.b-titleSection p {
    font-size: 1.5rem;
    /* Taille du paragraphe */
}

.ip-container {
    display: inline-flex;
    align-items: center;
    background: #fff9c4;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 1.1rem;
    font-family: monospace;
    color: #ef9800;
    font-weight: bold;
}

.ip-text {
    user-select: all;
    /* Permet la sélection manuelle si besoin */
}

.copy-btn {
    border: none;
    color: black;
    border-radius: 4px;
    background: #fff9c4;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.5rem;
    transition: background 0.2s;
}

.ip-container:hover {
    transform: scale(1.05);
}
</style>