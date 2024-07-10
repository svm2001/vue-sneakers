<script setup>
import {computed, ref, watch} from "vue";
    const props = defineProps({
        id: Number,
        title: String,
        price: Number,
        imageUrl: String,
    })

    const emit = defineEmits(['onClickRemove'])
</script>

<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img
            class="w-40 h-40"
            :src="imageUrl"
            :alt="title"
        />
        <div class="flex flex-col w-full">
            <b class="">{{ title }}</b>
            <div class="flex flex-col gap-2 mt-8">
                <div>Стоимость: <b>{{ price }} ₽</b></div>
                <img
                    width="36"
                    height="36"
                    @click="emit('onClickRemove')"
                    title="Удалить из корзины"
                    class="cursor-pointer absolute transition self-end"
                    src="@/assets/img/close.svg" alt="close">
            </div>
        </div>
    </div>
</template>