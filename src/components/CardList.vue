<!--suppress JSValidateTypes -->
<script setup>
import Card from "@/components/Card.vue";

defineProps({
    items: Array,
    isFavorites: Boolean,
    qty: Number,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])

</script>

<template>
    <div class="grid grid-cols-4 gap-8" v-auto-animate>
        <Card
            v-for="item in items"
            :image-url="item.imageUrl"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :price="item.price"
            :qty="item.qty"
            :isAdded="item.isAdded"
            :isFavorite="item.isFavorite"
            :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
            :onClickAdd="isFavorites ? null : () => emit('addToCart', item, qty)"
        />
    </div>
</template>

<style scoped>

</style>