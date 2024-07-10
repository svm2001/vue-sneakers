<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    item: Object
});

const emit = defineEmits(['onClickRemove', 'onClickRemoveAll'])

</script>

<template>

    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img
            class="w-40 h-40"
            :src="item.imageUrl"
            :alt="item.title"
        />
        <div class="flex flex-col w-full">
            <b class="">{{ item.title }}</b>
            <div class="flex flex-col gap-2 mt-8">
                <div>Стоимость 1 шт: <b>{{ item.price }} ₽</b></div>
                <div>Стоимость {{ item.quantity }} шт: {{ item.price * item.quantity }} ₽</div>
                <img
                    width="36"
                    height="36"
                    @click="emit('onClickRemove')"
                    title="Удалить из корзины"
                    class="cursor-pointer absolute transition self-end"
                    src="@/assets/img/close.svg" alt="close">
                <img
                    width="36"
                    height="36"
                    @click="emit('onClickRemoveAll')"
                    title="Удалить из корзины все товары данной категории"
                    class="cursor-pointer transition self-start"
                    src="@/assets/img/close.svg" alt="close">
            </div>
        </div>
    </div>
</template>