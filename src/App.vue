<script setup>
import Header from '@/components/Header.vue'
import Drawer from "@/components/Drawer.vue";
import { ref, reactive, computed, provide } from "vue";

const drawerOpen = ref(false)
const cart = reactive(new Map())
const closeDrawer = () => drawerOpen.value = false
const openDrawer = () => drawerOpen.value = true
const totalItems = computed(() => Array.from(cart.values()).reduce((total, item) => total + item.quantity, 0))
const totalPrice = computed(() => Array.from(cart.values()).reduce((total, item) => total + item.price * item.quantity, 0))


const addToCart = (item) => {
    if (!cart.has(item.id)) {
        cart.set(item.id, { ...item, quantity: 1 });
    } else {
        cart.get(item.id).quantity += 1;
    }
}

const removeFromCart = (item) => {
    if (cart.has(item.id)) {
        const currentItem = cart.get(item.id);
        if (currentItem.quantity > 1) {
            currentItem.quantity -= 1;
        } else {
            cart.delete(item.id);
        }
    }
}

const removeFromCartAll = (item) => {
    if (cart.has(item.id)) {
        cart.delete(item.id);
    }
}

provide('cart', {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    removeFromCartAll,
    openDrawer,
    closeDrawer
})

</script>

<template>
    <Drawer v-if="drawerOpen" />
    <div class="w-4/5 m-auto bg-white rounded-3xl mt-10 mb-10" style="box-shadow: 0px 0px 14px 0px #003319; min-height: 90vh;">
        <Header :total-items="totalItems" :total-price="totalPrice" @openDrawer="openDrawer"/>
        <div class="p-10">
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
.router-link-active span {
    color: #003319;
    text-decoration: underline;
}
</style>