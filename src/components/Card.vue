<script setup>

const props = defineProps({
    id: Number,
    imageUrl: String,
    title: '',
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function,
    qty: Number
})

</script>

<template>
    <div
        style="border: 2px solid rgba(66, 184, 131, .77); transition: .4s ease; box-shadow: 0px 0px 6px 2px rgba(66, 184, 131, .77)"
        class="relative flex flex-col justify-between bg-white rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
    >
        <img
            v-if="onClickFavorite"
            class="absolute top-8 left-8"
            :src="!isFavorite ? './img/like-1.svg' : './img/like-2.svg'"
            alt="like"
            @click="onClickFavorite"
            :title="!isFavorite ? 'Добавить в закладки' : 'Убрать из закладок'"
        />

        <img :src="imageUrl" alt="Sneaker"/>
        <p class="mt-2 hover:text-green-500" style="min-height: 48px; max-height: 48px; font-size: 18px;">{{ title }}</p>
        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ price }} ₽</b>
            </div>

            <img
                @click="onClickAdd"
                v-if="!isAdded"
                :src="!isAdded ? './img/plus.svg' : './img/checked.svg'"
                :alt="!isAdded ? 'Plus' : 'Checked'"
                :title="!isAdded ? 'Добавить в корзину' : 'Убрать из корзины'"
            />
            <div class="flex gap-2" v-else>
                <button class="px-3 border border-green-600 rounded-lg font-bold">+</button>
                <input class="w-10 text-center border border-green-600 rounded-lg font-bold outline-none" type="text">
                <button class="px-3 border border-green-600 rounded-lg font-bold">-</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>