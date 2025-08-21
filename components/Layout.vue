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
    --bg: #ffffff;
    --text: #111827;
    --muted: #6b7280;
    --primary: #ff9800;
    --primary-2: #ffc107;
    --success: #10b981;
    --ring: rgba(255, 152, 0, 0.35);
    --card-bg: #fafafa;
    --radius: 14px;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, .06);
    --shadow-md: 0 10px 30px rgba(0, 0, 0, .12);
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