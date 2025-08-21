<template>
    <Layout>
        <template v-slot:header>
            <Navbar />
        </template>

        <template v-slot:main>
            <Form></Form>
            <Reassurance></Reassurance>
        </template>

        <template v-slot:footer>
            <Links />
        </template>
    </Layout>
</template>

<script setup lang="ts">
import Form from '~/components/Form.vue';
</script>