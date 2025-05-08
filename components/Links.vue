<template>
    <div class="footer-wrapper">
        <div>
            <div class="footer-title">
                Liens utiles
            </div>
            <div class="footer-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quisquam nihil laborum quas molestias
                similique repellendus ab aliquid, natus nobis sint consequatur beatae sunt esse. Possimus id molestiae
                maxime perferendis?
            </div>
        </div>
        <div>

        </div>
        <div>
            <div class="footer-title">
                Suivez-nous
            </div>
            <div class="footer-contact">
                <a href="#" target="_blank">🐦 X</a>
                <a href="https://discord.com" target="_blank">🎮 Discord</a>
                <a href="#" target="_blank">🎥 YouTube</a>
            </div>
        </div>

    </div>

    <hr>

    <div class="footer-copyright">
        @ 2025 Dylan Jessee D'antonio
    </div>

</template>

<script setup>

</script>

<style>
.footer-title {
    margin-bottom: 1.5vh;
    font-weight: bolder;
}

.footer-wrapper {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 440fr 375fr 200fr;
    padding: 10vh 3vh;
}

.footer-contact {
    display: flex;
    flex-direction: column;
}

.footer-wrapper,
.footer-copyright {
    background: linear-gradient(to right, #FFC107, #FF9800);
}

@media screen and (max-width: 900px) {

    .footer-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 1em;
    }
}
</style>