<script setup>
import CardList from "@/components/CardList.vue";
import axios from "axios";
import {inject, onMounted, reactive, ref, watch} from "vue";

const addToFavorite = async (item) => {
    try {
        if (!item.isFavorite) {
            const obj = {
                item_id: item.id
            }
            item.isFavorite = true
            const {data} = await axios.post(`https://34402a52ffa89b7c.mokky.dev/favorites`, obj)
            item.favoriteId = data.id
        } else {
            item.isFavorite = false
            await axios.delete(`https://34402a52ffa89b7c.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null
        }
    } catch (e) {
        console.log(e)
    }
}

const { cart, addToCart, removeFromCart } = inject('cart')

const onClickAddPlus = (item) => {
    if (!item.isAdded) {
        addToCart(item)
    } else {
        removeFromCart(item)
    }
}

const onChangeSelect = (event) => filters.sortBy = event.target.value

const onChangeSearchInput = (event) => filters.searchQuery = event.target.value

const fetchItems = async () => {
    try {
        const params = {sortBy: filters.sortBy}
        if (filters.searchQuery) params.title = `*${filters.searchQuery}*`
        const {data} = await axios.get(`https://34402a52ffa89b7c.mokky.dev/items`, {params})
        items.value = data.map(obj => ({
            ...obj,
            isFavorite: false,
            favoriteId: null,
            isAdded: false,
        }))
    } catch (e) {
        console.error(e);
    }
}

const fetchFavorites = async () => {
    try {
        const {data: favorites} = await axios.get(`https://34402a52ffa89b7c.mokky.dev/favorites`)
        items.value = items.value.map(item => {
            const favorite = favorites.find((favorite) => favorite.item_id === item.id)
            if (!favorite) return item
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id
            }
        })
    } catch (e) {
        console.error(e);
    }
}

const filters = reactive({
    sortBy: 'name',
    searchQuery: ''
})

const items = ref([])

watch(filters, fetchItems)

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})

onMounted(async () => {
    await fetchItems();
    await fetchFavorites()
})

</script>

<template>
    <div class="flex justify-between items-center mb-8 md:flex-col md:gap-4 md:items-start">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4 lg:flex-col lg:items-end md:items-start filters">
            <div class="filters-item">
                <select @change="onChangeSelect" class="py-3 px-3 border rounded-xl outline-none" name="" id="">
                    <option value="name">По названию</option>
                    <option value="-price">По цене (по убыванию)</option>
                    <option value="price">По цене (по возрастанию)</option>
                </select>
            </div>
            <div class="relative filters-item">
                <img class="absolute left-3 top-3" src="@/assets/img/search.svg" alt="search">
                <input
                    @input="onChangeSearchInput"
                    class="border border-gray-200 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-gray-400"
                    type="text" placeholder="Поиск...">
            </div>
        </div>
    </div>
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus"/>
</template>

<style scoped>

@media (max-width: 768px) {
    .filters {
        align-items: flex-start!important;
    }
}

@media (max-width: 576px) {
    .filters {
        input, select {
            min-width: 100%!important;
        }
    }

    .filters-item {
        min-width: 100%;
    }
}

</style>