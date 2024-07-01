<script setup>

import DrawerHead from "@/components/DrawerHead.vue";
import CartItemList from "@/components/CartItemList.vue";
import InfoBlock from "@/components/infoBlock.vue";
import axios from "axios";
import {inject, ref} from "vue";

const props = defineProps({
    totalPrice: Number,
    salePrice: Number,
})
const orderId = ref(null)
const { cart } = inject('cart')
const { closeDrawer } = inject('cart')
const createOrder = async () => {
    try {
        const { data } = await axios.post(`https://34402a52ffa89b7c.mokky.dev/orders`, {
            items: cart.value,
            totalPrice: props.totalPrice - props.salePrice
        })

        cart.value = []
        orderId.value = data.id

    } catch (e) {
        console.error(e)
    }
}

const cleanCart = () => {
    cart.value = []
}

const currentDate = new Date(),
    day = currentDate.getDate(),
    year = currentDate.getFullYear(),
    month = currentDate.getMonth() >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`


</script>

<template>

    <div>
        <div
            @click="() => closeDrawer()"
            class="fixed top-0 left-0 h-full w-full bg-black z-30 opacity-70"></div>
        <div class="bg-white w-1/2 h-full fixed top-0 right-0 z-30 p-8 flex flex-col drawer">
            <DrawerHead />

            <div v-if="!totalPrice || orderId" class="flex h-full items-center m-auto">
                <InfoBlock
                    v-if="!totalPrice && !orderId"
                    title="Корзина пустая"
                    description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                    image-url="https://i.ibb.co/231Qfgp/package-icon.png"
                />
                <InfoBlock
                    v-if="orderId"
                    title="Заказ оформлен!"
                    :description="`Ваш заказ №${orderId} от ${day}.${month}.${year} скоро будет передан курьерской доставке.`"
                    image-url="https://i.ibb.co/DtgjSpf/order-success-icon.png"
                />
            </div>
            <CartItemList />
            <div v-if="totalPrice" class="flex flex-col gap-5 mt-10 drawer-bot">
                <div class="flex gap-2">
                    <span>Цена без скидки:</span>
                    <div class="flex-1 border-b border-slate-300 border-dashed"></div>
                    <b>{{ totalPrice }} ₽</b>
                </div>
                <div class="flex gap-2">
                    <span>Скидка:</span>
                    <div class="flex-1 border-b border-slate-300 border-dashed"></div>
                    <b>5%</b>
                </div>
                <div class="flex gap-2">
                    <span>Сумма скидки:</span>
                    <div class="flex-1 border-b border-slate-300 border-dashed"></div>
                    <b>{{ salePrice }} ₽</b>
                </div>
                <div class="flex gap-2">
                    <span>Итого:</span>
                    <div class="flex-1 border-b border-slate-300 border-dashed"></div>
                    <b>{{ totalPrice - salePrice }} ₽</b>
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

<style scoped>
@media (max-width: 1024px) {
    .drawer {
        max-width: 100%;
        min-width: 100%;
        padding: 16px;
    }
}

@media (max-width: 576px) {
    .drawer-bot {
        gap: 8px;
    }
}
</style>

