<template>
    <section class="presentation">
        <div class="p-content">
            <h1 class="p-title">
                {{ title }}
            </h1>
            <p class="p-text">
                {{ description }}
            </p>
            <NuxtImg class="p-img" src="/img/presentation.png" alt="Mon image" format="webp" loading="lazy"></NuxtImg>
            <div class="mc-server-wrapper">
                <div class="mc-server-card">
                    <div v-html="safeMotdHtml"  class="mc-server-title"></div>
                    <div v-if="players != undefined || maxPlayers != undefined" class="mc-server-bar">
                        <div class="mc-server-bar-fill"
                            :style="{ width: ((players ?? 0) / (maxPlayers ?? 1) * 100) + '%' }"></div>
                    </div>
                    <div v-else style="color: red;">
                        Serveur déconnecté
                    </div>
                    <div v-if="players != undefined || maxPlayers != undefined" class="mc-server-players">
                        {{ players }}/{{ maxPlayers }} joueurs en ligne
                    </div>
                    <div v-html="safeVersionHtml" class="mc-server-address"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { McstatusResponse } from '~/iface/McstatusResponse';
import { sanitizeHtml } from '~/util/sanitize';
import { ref, computed, watchEffect } from 'vue';

const { data, pending, error } = await useFetch<McstatusResponse>('/api/mc-status');

// computed pour réactivité
const players = computed(() => data.value?.players?.online ?? 0);
const maxPlayers = computed(() => data.value?.players?.max ?? 1); // pour éviter division par zéro
const rawMotdHtml = computed(() => data.value?.motd?.html ?? '');
const rawVersionHtml = computed(() => data.value?.version?.name_html ?? '');
const safeVersionHtml = ref('');
const safeMotdHtml = ref('');


watchEffect(async () => {
  safeMotdHtml.value = await sanitizeHtml(rawMotdHtml.value);
  safeVersionHtml.value = await sanitizeHtml(rawVersionHtml.value);
});

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
.presentation {
    padding: 1vh;
}

.p-title {
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: bold;
}

.p-content {
    display: grid;
    grid-template-columns: 2fr 2.2fr;
}

.p-img {
    grid-column: 2;
    width: calc(100% - 1.0vw);
    /* 1.0vw = gap */
    height: 100%;
    aspect-ratio: 2/1;
    object-fit: cover;
    border-radius: 1rem;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.06);
    margin-left: 1vw;
    grid-row: 1 / 4;
}

.p-text {
    margin-bottom: 3vh;
    font-size: large;
}

.mc-server-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.mc-server-card {
    background: #222739;
    border: 1px solid #68708c30;
    padding: 1rem;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.10);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    height: 100%;
    width: 100%;
}

.mc-server-title {
    color: #dbe6ff;
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 0.2rem;
    text-align: center;
    letter-spacing: 0.01em;
}

.mc-server-bar {
    width: 100%;
    height: 18px;
    background: #151823;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 0.7rem;
    margin-top: 0.4rem;
    position: relative;
}

.mc-server-bar-fill {
    background: #4261fc;
    height: 100%;
    transition: width 0.5s;
}

.mc-server-players {
    color: #dbe6ff;
    font-size: 1.13rem;
    margin-bottom: 0.15rem;
    margin-top: 0.4rem;
    text-align: center;
}

.mc-server-address {
    color: #b4c6ef;
    font-size: 1.08rem;
    margin-top: 0.2rem;
    text-align: center;
    letter-spacing: 0.01em;
}

@media screen and (max-width: 900px) {
    .p-content {
        grid-template-columns: 1fr;
        gap: 4vh;
    }

    .p-container-button {
        justify-content: space-around;
    }

    .p-img {
        grid-column: 1;
        grid-row: 2;
    }

    .p-title {
        font-size: 10vw
    }

    .p-text,
    .p-title {
        padding: 1vh;
    }

    .mc-server-card {
        margin-bottom: 1rem;
    }
}
</style>