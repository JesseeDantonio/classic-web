<template>
    <section class="discover">
        <div class="d-titleSection">
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
        <div class="d-cards">
            <div class="d-card">
                <img src="../assets/img/zombie_break.png" alt="image">
                <div class="card-content">
                    <h2>
                        BlockBreaker
                    </h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
                        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque.
                    </p>
                </div>
            </div>
            <div class="d-card">
                <img src="../assets/img/araignée_boule_de_neige.png" alt="image">
                <div class="card-content">
                    <h2>
                        SpiderShooter
                    </h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
                        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque.
                    </p>
                </div>
            </div>
            <div class="d-card">
                <img src="../assets/img/creeper_charger.png" alt="image">
                <div class="card-content">
                    <h2>
                        SmartCreeper
                    </h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
                        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque.
                    </p>
                </div>
            </div>
            <div class="d-card">
                <img src="../assets/img/coffres_parachute.png" alt="image">
                <div class="card-content">
                    <h2>
                        RandomChest
                    </h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
                        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque.
                    </p>
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
</script>

<style scoped>
.discover {
    text-align: center;
    color: black;
    margin-top: 1vh;
    margin-bottom: 6vh;
}

.d-cards {
    margin-top: 4vh;
    display: flex;
    justify-content: space-around;

    flex-wrap: wrap;
}

.d-card {
    width: 20rem;
    height: 30rem;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    color: white;
    box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.9;
        transition: opacity .2s ease-out;
    }

    &:hover {
        transform: scale(1.05);

        .card-content {
            visibility: visible;
        }
    }
}

.card-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    visibility: hidden;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%);
    color: white;
    text-shadow: 0 1px 6px #000;
    box-sizing: border-box;
}

@media screen and (max-width: 900px) {
    .d-card {
        margin-bottom: 4vh;
    }

    .card-content {
        visibility: visible;
    }
}
</style>