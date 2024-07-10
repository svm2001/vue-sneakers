<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    totalItems: Number,
    totalPrice: Number
});
const emits = defineEmits(['openDrawer']);

const handleOpenDrawer = () => {
    emits('openDrawer');
}

</script>

<template>

    <header class="sticky top-0 z-20 bg-white rounded-2xl flex items-center justify-between px-8 py-6 border-b border-slate-200"
            style="box-shadow: rgb(66, 184, 131, .5) 0 5px 14px 1px"
    >
        <router-link to="/">
            <div class="flex items-center gap-4">
                <img src="@/assets/img/logo.png" alt="logo" class="w-10">
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-400">Магазин лучших кроссовок</p>
                </div>
            </div>
        </router-link>
        <ul class="flex items-center gap-8">
            <li @click="handleOpenDrawer" class="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-black">
                <img src="@/assets/img/cart.svg" alt="cart">
                <b>{{ totalItems }} шт.</b>
            </li>
            <router-link to="/favorites">
                <li class="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-black">
                    <img src="@/assets/img/heart.svg" alt="favourites">
                    <span>Закладки</span>
                </li>
            </router-link>
            <router-link to="/account">
                <li class="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-black">
                    <img src="@/assets/img/profile.svg" alt="profile">
                    <span>Профиль</span>
                </li>
            </router-link>
        </ul>
    </header>

<!--    <header>-->
<!--        <p>Total Items: {{ totalItems }}</p>-->
<!--        <p>Total Price: {{ totalPrice }} ₽</p>-->
<!--    </header>-->
</template>