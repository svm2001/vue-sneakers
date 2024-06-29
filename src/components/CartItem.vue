<script setup>
import {computed, ref, watch} from "vue";
    const props = defineProps({
        id: Number,
        title: String,
        price: Number,
        imageUrl: String,
        quantity: Number,
        maxValue: Number,
        finalPrice: Number,
    })

    const quantity = ref(1)
    const maxValue = 50
    const finalPrice = computed(() => (quantity.value * props.price))
    const errorMsg = `Максимальное количество: ${maxValue}`
    const isError = ref(false)

    watch(quantity, (newValue) => {
        if (newValue === '') {
            quantity.value = 1
            isError.value = false
        } else if (newValue >= maxValue) {
            quantity.value = maxValue
            isError.value = true
        }
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
                <div>Осталось: <b>{{ maxValue }} шт.</b></div>
                <label for="" class="flex gap-4 items-center">
                    Количество:
                    <input
                        v-model="quantity"
                        class="border border-black px-2 py-1 text-black rounded-xl outline-none focus:border-lime-500 font-bold text-center"
                        type="number"
                        min="1"
                        max="100"
                        maxlength="3"
                        placeholder="1"
                    >
                    <span class="text-rose-500 text-xs font-bold" v-if="isError">{{ errorMsg }}</span>
                </label>
                <div>Итог: <b>{{ finalPrice }} ₽</b></div>
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