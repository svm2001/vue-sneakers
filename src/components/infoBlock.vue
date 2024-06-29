<script setup>

import {inject} from "vue";
const { closeDrawer } = inject('cart')

    defineProps({
        title: String,
        imageUrl: String,
        description: String,
    })

</script>

<template>
    <div class="flex min-h-full flex-col justify-center text-center items-center p-4 gap-4">
        <img
            width="100"
            height="100"
            :src="imageUrl"
            :alt="title">
        <h2 class="text-2xl font-medium">{{ title }}</h2>
        <p class="text-slate-500">{{ description }}</p>
        <button
            @click="() => closeDrawer()"
            class="w-1/2 rounded-xl mt-4 py-3 text-white transition bg-lime-600 hover:bg-lime-500 active:bg-lime-700 disabled:bg-slate-400"
        >Вернуться обратно</button>
    </div>
</template>

<style scoped>

</style>