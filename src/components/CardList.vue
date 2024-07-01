<script setup>
import Card from "@/components/Card.vue";

defineProps({
    items: Array,
    isFavorites: Boolean,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])

</script>

<template>
    <div class="md:grid-cols-2 xl:grid-cols-3 xl:gap-4 grid grid-cols-4 gap-8 cardList" v-auto-animate>
        <Card
            v-for="item in items"
            :image-url="item.imageUrl"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :price="item.price"
            :isAdded="item.isAdded"
            :isFavorite="item.isFavorite"
            :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
            :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
        />
    </div>
</template>

<style scoped>

@media (max-width: 1024px) {
    .cardList {
        grid-template-columns: 1fr 1fr!important;
    }
}

@media (max-width: 576px) {
    .cardList {
        grid-template-columns: 1fr !important;
    }
}

</style>