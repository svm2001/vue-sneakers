<script setup>
import CardList from "@/components/CardList.vue";
import axios from "axios";
import { inject, ref, onMounted, reactive, watch } from "vue";

const { cart, addToCart, removeFromCart } = inject('cart');

const addToFavorite = async (item) => {
    try {
        console.log(item.isFavorite)
        if (!item.isFavorite) {
            const obj = {
                item_id: item.id
            }
            item.isFavorite = true
            const { data } = await axios.post("https://34402a52ffa89b7c.mokky.dev/favorites", obj);
            item.favoriteId = data.id;
        } else {
            item.isFavorite = false;
            await axios.delete(`https://34402a52ffa89b7c.mokky.dev/favorites/${item.favoriteId}`);
            item.favoriteId = null;
        }
    } catch (e) {
        console.log(e)
    }
}

const onClickAddPlus = (item) => {
    addToCart(item);
}

const onClickAddMinus = (item) => {
    removeFromCart(item);
}

const filters = reactive({
    sortBy: 'default',
    searchQuery: ''
});
const items = ref([]);

const fetchItems = async () => {
    try {
        const params = {sortBy: filters.sortBy}
        if (filters.searchQuery) params.title = `*${filters.searchQuery}*`
        const {data} = await axios.get("https://34402a52ffa89b7c.mokky.dev/items", {params});
        items.value = data.map(obj => ({...obj, isFavorite: false, favoriteId: null}));
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

const onChangeSelect = (event) => filters.sortBy = event.target.value

const onChangeSearchInput = (event) => filters.searchQuery = event.target.value

onMounted(async () => {
    await fetchItems();
    await fetchFavorites()
})

watch(cart, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})

</script>

<template>
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
            <div>
                <select @change="onChangeSelect" class="py-3 px-3 border rounded-xl outline-none" name="" id="">
                    <option value="name">По названию</option>
                    <option value="-price">По цене (по убыванию)</option>
                    <option value="price">По цене (по возрастанию)</option>
                </select>
            </div>
            <div class="relative">
                <img class="absolute left-3 top-3" src="@/assets/img/search.svg" alt="search">
                <input
                    @input="onChangeSearchInput"
                    class="border border-gray-200 rounded-xl py-2 pl-9 pr-4 outline-none focus:border-gray-400"
                    type="text" placeholder="Поиск...">
            </div>
        </div>
    </div>
    <CardList :items="items" @addToCart="onClickAddPlus" @removeFromCart="onClickAddMinus" @add-to-favorite="addToFavorite"/>
</template>