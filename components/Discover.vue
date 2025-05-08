<template>
    <section class="discover">
        <div class="d-titleSection">
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
        <div class="d-cards">
            <div class="d-card">
                <img src=""
                    alt="image">
                <div class="card-content">
                    <h2>
                        Card Heading
                    </h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste,
                        voluptatum, quia explicabo laboriosam rem adipisci voluptates cumque.
                    </p>
                </div>
            </div>
            <div class="d-card">
                <img src="" alt="image">
            </div>
            <div class="d-card">
                <img src="" alt="image">
            </div>
            <div class="d-card">
                <img src="" alt="image">
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
    }
}

@media screen and (max-width: 900px) {
    .d-cards {
        flex-direction: column;
        margin-left: 5vh;
    }

    .d-card {
        margin-bottom: 4vh;
    }


}
</style>