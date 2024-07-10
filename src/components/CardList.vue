<script setup>
import { defineProps, defineEmits } from 'vue';
import Card from '@/components/Card.vue';

const props = defineProps({
    items: Array,
    isFavorites: Boolean,
    qty: Number,
});
const emits = defineEmits(['addToCart', 'addToFavorite', 'removeFromCart']);

const handleAddToCart = (item) => {
    emits('addToCart', item);
}

const handleRemoveFromCart = (item) => {
    emits('removeFromCart', item);
}

</script>

<template>
    <div class="grid grid-cols-4 gap-8" v-auto-animate>
        <Card
            v-for="item in items"
            :key="item.id"
            :item="item"
            @addToCart="handleAddToCart"
            @removeFromCart="handleRemoveFromCart"
            :onClickFavorite="isFavorites ? null : () => emits('addToFavorite', item)"
        />
    </div>
</template>