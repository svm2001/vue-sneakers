<script setup>
import {computed, ref, watch} from "vue";

const props = defineProps({
    id: Number,
    title: String,
    price: Number,
    imageUrl: String,
    quantity: Number,
})

const emit = defineEmits(['onClickRemove'])
</script>

<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 relative">
        <img
            class="w-40 h-40 img"
            :src="imageUrl"
            :alt="title"
        />
        <div class="flex flex-col w-full gap-2">
            <b class="cartitem-title">{{ title }}</b>
            <div>Стоимость: <b>{{ price }} ₽</b></div>
            <img
                width="36"
                height="36"
                @click="emit('onClickRemove')"
                title="Удалить из корзины"
                class="cursor-pointer absolute transition self-end close"
                src="@/assets/img/close.svg" alt="close">
        </div>
    </div>
</template>

<style scoped>
.cartitem-title {
    padding-right: 50px;
}

.close {
    position: absolute;
    top: 10px;
    bottom: auto;
    right: 10px;
}

@media (max-width: 576px) {
    .img {
        width: 60px;
        height: 60px;
    }

    .cartitem-title {
        padding-right: 35px;
        font-size: 15px;
    }
}
</style>