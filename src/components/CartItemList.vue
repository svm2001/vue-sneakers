<script setup>
import CartItem from "@/components/CartItem.vue";
import {inject} from "vue";

const { cart, removeFromCart } = inject('cart')
</script>

<template>
    <div
        v-auto-animate
        class="flex flex-col gap-4 flex-1 cartItemList"
        style="overflow-y: auto">
        <CartItem
            :title="item.title"
            :price="item.price"
            :image-url="item.imageUrl"
            v-for="item in cart"
            :key="item.id"
            @onClickRemove="() => removeFromCart(item)"
        />
    </div>
</template>