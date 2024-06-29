<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import CardList from "@/components/CardList.vue";

const favorites = ref([])

onMounted(async () => {
    try {
        const { data } = await axios.get('https://34402a52ffa89b7c.mokky.dev/favorites?_relations=items')
        favorites.value = data
        favorites.value = data.map((obj) => obj.item)
    } catch (e) {
        console.log(e)
    }
})


</script>

<template>
    <div v-if="favorites">
        <h1 class="text-3xl font-bold mb-10">Мои закладки</h1>
        <CardList :items="favorites" is-favorites="true" />
    </div>
    <div v-else>
        Список закладок пуст.
    </div>
</template>

<style scoped>

</style>