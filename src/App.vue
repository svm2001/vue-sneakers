<script setup>
import Header from '@/components/Header.vue'
import Drawer from "@/components/Drawer.vue";
import axios from "axios";
import {onMounted, reactive, ref, watch, provide, computed} from "vue";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const cart = ref([])
const drawerOpen = ref(false)
const closeDrawer = () => {
    drawerOpen.value = false
    enablePageScroll()
}
const openDrawer = () => {
    drawerOpen.value = true
    disablePageScroll();
}
const totalPrice = computed(() => cart.value.reduce((total, item) => total + item.price, 0))
const salePrice = computed(() => Math.round(totalPrice.value * 5) / 100)

const addToCart = (item) => {
    cart.value.push(item)
    item.isAdded = true
}

const removeFromCart = (item) => {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
}


provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
})

</script>

<template>
    <Drawer
        v-if="drawerOpen"
        :total-price="totalPrice"
        :sale-price="salePrice"
    />
    <div class="w-4/5 m-auto bg-white rounded-3xl mt-10 mb-10 md:w-full md:m-0 container" style="box-shadow: 0px 0px 14px 0px #003319; min-height: 90vh;">
        <Header :total-price="totalPrice" @openDrawer="openDrawer"/>
        <div class="p-10 sm:p-6 container-inner">
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
    .router-link-active span {
        color: #003319;
        text-decoration: underline;
    }

    @media (max-width: 576px) {
        .container {
            padding: 0px;
            border-radius: 0;
        }

        .container-inner {
            padding: 16px;
        }
    }
</style>