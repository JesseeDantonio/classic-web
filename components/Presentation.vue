<template>
    <section class="presentation">
        <div class="p-title">
            {{ title }}
        </div>
        <div class="p-content">
            <p class="p-text">
                {{ description }}
            </p>

            <div class="p-container-button">
                <NuxtLink class="p-button p-first-button" :to="primaryLink">{{ primaryButtonText }}</NuxtLink>
                <NuxtLink class="p-button p-second-button" :to="secondaryLink">{{ secondaryButtonText }}</NuxtLink>
            </div>
        </div>
        <div class="p-img">
            
        </div>
    </section>
</template>

<script setup>

defineProps({
  title: String,
  description: String,
  primaryButtonText: String,
  primaryLink: String,
  secondaryButtonText: String,
  secondaryLink: String,
  imageSrc: String,
  imageAlt: String
});
</script>

<style>
.p-container-button {
    display: flex;
}

.presentation {
    min-width: auto;
    min-height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    padding: 1vh;
}

.p-button {
    width: 30%;
    margin: 1vh;
    background-color: #FFC300;
    border-radius: 0.25rem;
    border: none;
    font-weight: bolder;
    font-size: large;
    color: white;
    text-align: center;
}

.p-first-button {
    background-color: #FFC300;
    padding: 1vh;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.p-first-button:hover {
    background-color: #FF8C00;
    transform: scale(1.05);
}


.p-first-button a {
    color: white;
}

.p-second-button {
    background-color: #FFC300;
    padding: 1vh;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.p-second-button a {
    color: white;
}

.p-second-button:hover {
    background-color: #FF8C00;
    transform: scale(1.05);
}

.p-title {
    grid-column: 1;
    margin-bottom: 1.5vh;
    font-size: 8vh;
    font-weight: bolder;
}

.p-content {
    grid-column: 1;
    padding: 1vh;
    margin-bottom: 1vh;
}

.p-img {
    grid-column: 2;
    grid-row: 1 / 3;
    background-image: url(@/assets/img/presentation.png);
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
}

.p-text {
    margin-bottom: 3vh;
}

@media screen and (max-width: 900px) {
    .presentation {
        grid-template-columns: 1fr;
        grid-column: 1;
    }

    .p-container-button {
        justify-content: space-around;
    }

    .p-img {
        grid-column: 1;
        grid-row: 2;
        background-image: url(@/assets/img/presentation.png);
        width: 100%;
        height: 20vh;
    }

    .p-title {
        font-size: 10vw
    }

    .p-button {
        margin: 1vh;
        width: 40%;
    }
}
</style>