<template>
    <div class="layout">
        <header v-if="$slots.header">
            <slot name="header"></slot>
        </header>
        <aside v-if="$slots.aside">
            <slot name="aside"></slot>
        </aside>
        <main v-if="$slots.main">
            <slot name="main"></slot>
        </main>
        <footer v-if="$slots.footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<style>

:root {
    --bg-primary: #FFC300;
}

.layout main {
    min-height: 100vh;
}

.layout {
    display: grid;
    grid-template-columns: 1fr;
}


.layout header {
    height: 8vh;
    padding: 1vh;
}

.layout footer {
    min-height: 30vh;
    background-color: transparent
}

.layout header,
footer {
    grid-column: 1 / -1;
}


</style>