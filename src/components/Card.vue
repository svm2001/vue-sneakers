<script setup>
defineProps({
    id: Number,
    imageUrl: String,
    title: '',
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function,
})

</script>

<template>
    <div
        style="border: 2px solid rgba(66, 184, 131, .77); transition: .4s ease; box-shadow: 0px 0px 6px 2px rgba(66, 184, 131, .77)"
        class="relative flex flex-col justify-between bg-white rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl
        xl:p-5 lg:hover:transform-none
        "
    >
        <img
            v-if="onClickFavorite"
            class="absolute top-8 left-8 xl:top-5 xl:left-5"
            :src="!isFavorite ? 'https://svgshare.com/i/17my.svg' : 'https://svgshare.com/i/17mz.svg'"
            alt="like"
            @click="onClickFavorite"
            :title="!isFavorite ? 'Добавить в закладки' : 'Убрать из закладок'"
        />

        <img :src="imageUrl" alt="Sneaker"/>
        <p class="mt-2 hover:text-green-500 text-lg">{{ title }}</p>
        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ price }} ₽</b>
            </div>

            <img
                v-if="onClickFavorite"
                @click="onClickAdd"
                :src="!isAdded ? 'https://svgshare.com/i/17nf.svg' : 'https://svgshare.com/i/17mD.svg'"
                :alt="!isAdded ? 'Plus' : 'Checked'"
                :title="!isAdded ? 'Добавить в корзину' : 'Убрать из корзины'"
            />
        </div>
    </div>
</template>

<style scoped>

</style>