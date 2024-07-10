<script setup>
import DrawerHead from "@/components/DrawerHead.vue";
import InfoBlock from "@/components/infoBlock.vue";
import axios from "axios";
import {computed, inject, ref} from "vue";
import CartItemList from '@/components/CartItemList.vue';

const props = defineProps({
    totalPrice: Number,
    totalItems: Number,
})

const orderId = ref(null)

const { cart, totalPrice, totalItems, closeDrawer } = inject('cart');

const currentDate = new Date(),
    day = currentDate.getDate(),
    year = currentDate.getFullYear(),
    month = currentDate.getMonth() >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`

const resetValues = () => {
    totalItems._value = 0
    totalPrice._value = 0
    cart.clear()
}

const cleanCart = () => {
    resetValues()
}

const createOrder = async () => {
    try {
        const { data } = await axios.post(`https://34402a52ffa89b7c.mokky.dev/orders`, {
            items: cart.value
        })
        orderId.value = data.id
        resetValues()
    } catch (e) {
        console.error(e)
    }
}

</script>

<template>

    <div>
        <div
            @click="() => closeDrawer()"
            class="fixed top-0 left-0 h-full w-full bg-black z-30 opacity-70"></div>
        <div class="bg-white w-1/2 h-full fixed top-0 right-0 z-30 p-8 flex flex-col">
            <DrawerHead />

            <div v-if="!totalPrice || orderId" class="flex h-full items-center m-auto">
                <InfoBlock
                    v-if="!totalPrice && !orderId"
                    title="Корзина пустая"
                    description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                    image-url="./img/package-icon.png"
                />
                <InfoBlock
                    v-if="orderId"
                    title="Заказ оформлен!"
                    :description="`Ваш заказ №${orderId} от ${day}.${month}.${year} скоро будет передан курьерской доставке.`"
                    image-url="./img/order-success-icon.png"
                />
            </div>
            <CartItemList :items="Array.from(cart.values())" />
            <div v-if="totalPrice" class="flex flex-col gap-5 mt-10">

                <div class="flex gap-2">
                    <span>Итого:</span>
                    <div class="flex-1 border-b border-slate-300 border-dashed"></div>
                    <b>{{ totalPrice }} ₽</b>
                </div>
                <button
                    @click="cleanCart"
                    class="w-full rounded-xl mt-4 py-3 text-white bg-rose-500 transition hover:bg-rose-600 active:bg-rose-700 disabled:bg-slate-400">Очистить корзину</button>
                <button
                    :disabled="totalPrice ? false : true"
                    @click="createOrder"
                    class="w-full rounded-xl mt-0 py-3 text-white bg-lime-500 transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400">Оформить заказ</button>
            </div>
        </div>
    </div>

</template>