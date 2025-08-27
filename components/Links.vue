<template>
    <div class="footer-wrapper">
        <div>
            <div class="footer-title">
                A propos de moi
            </div>
            <div class="footer-content">
                Diplômé d'un BTS en 2022 et d'une Licence CDA en 2023 (mention Félicitations),
                je poursuis un Master Génie Logiciel. Passionné par l'automatisation,
                je maîtrise Docker, GitLab CI/CD, Vue.js et les environnements Linux,
                avec une solide expérience en développement full-stack.
            </div>
        </div>
        <div>

        </div>
        <div>
            <div class="footer-title">
                Suivez-nous
            </div>
            <div class="footer-contact">
                <a href="https://discord.gg/uxC5NgxvVu" target="_blank">🎮 Discord</a>
                <a href="https://github.com/JesseeDantonio" target="_blank">
                    <> GitHub
                </a>
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