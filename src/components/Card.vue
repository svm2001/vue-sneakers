<script setup>
import {defineProps, defineEmits, ref} from 'vue';

const props = defineProps({
    item: Object,
    isFavorite: Boolean,
    onClickFavorite: Function,
});


const emits = defineEmits(['addToCart', 'removeFromCart']);

const qty = ref(0)
const maxCount = 10

const resetQty = () => {
    qty.value = 0;
}

const handleAddToCart = () => {
    emits('addToCart', props.item);
    qty.value++
}

const handleRemoveFromCart = () => {
    emits('removeFromCart', props.item);
    qty.value--
}


</script>

<template>

    <div
        style="border: 2px solid rgba(66, 184, 131, .77); transition: .4s ease; box-shadow: 0 0 6px 2px rgba(66, 184, 131, .77); user-select:none;"
        class="relative flex flex-col justify-between bg-white rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
    >
        <img
            v-if="onClickFavorite"
            class="absolute top-8 left-8"
            :src="!item.isFavorite ? '@/assets/img/like-1.svg' : '@/assets/img/like-2.svg'"
            alt="like"
            @click="onClickFavorite"
            :title="!item.isFavorite ? 'Добавить в закладки' : 'Убрать из закладок'"
        />

        <img :src="item.imageUrl" alt="Sneaker"/>
        <p class="mt-2 hover:text-green-500" style="min-height: 48px; max-height: 48px; font-size: 18px;">{{
                item.title
            }}</p>
        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ item.price }} ₽</b>
            </div>

            <div class="flex gap-4 items-center relative">

                <img
                    v-if="qty >= 1"
                    @click="handleRemoveFromCart"
                    src="/img/close-red.svg"
                    alt="Убрать из корзины"
                    title="Убрать из корзины"
                />

                <b v-if="qty >= 1" :class="qty > 0 ? 'opacity-100' : 'opacity-30'"> {{ qty }} </b>

                <img
                    v-if="qty < maxCount"
                    @click="handleAddToCart"
                    src="/img/plus.svg"
                    alt="Добавить в корзину"
                    title="Добавить в корзину"
                />

                <span class="absolute text-red-500 font-bold"
                      style="bottom: -15px; white-space: nowrap; font-size: 12px; left: -20px"
                      v-if="qty === maxCount"
                >
                    Максимум: {{ maxCount }} шт.
                </span>
            </div>
        </div>
    </div>
</template>