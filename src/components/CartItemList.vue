<script setup>
import { defineProps } from 'vue';
import CartItem from '@/components/CartItem.vue';

const props = defineProps({
    items: Array
});

import {inject} from "vue";
const { removeFromCart, removeFromCartAll } = inject('cart')

</script>

<template>
    <div v-auto-animate
         class="flex flex-col gap-4 flex-1"
         style="overflow-y: auto">
        <CartItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            :image-url="item.imageUrl"
            @onClickRemove="() => removeFromCart(item)"
            @onClickRemoveAll="() => removeFromCartAll(item)"
        />
    </div>
</template>