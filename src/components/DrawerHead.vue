<script setup>
    import {inject} from "vue";
    const { closeDrawer } = inject('cart')

</script>

<template>

    <div class="flex gap-3 items-center mb-6">
        <button
            @click="() => closeDrawer()"
            class="cursor-pointer opacity-50 rotate-180 hover:opacity-100 hover:-translate-x-1 transition"
            title="Вернуться">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <p class="font-2xl font-bold">Корзина</p>
    </div>

</template>

