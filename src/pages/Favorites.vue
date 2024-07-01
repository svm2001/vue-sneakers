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
        console.log(favorites.value.length)
    } catch (e) {
        console.log(e)
    }
})


</script>

<template>
    <div v-if="favorites.length > 0">
        <h1 class="text-3xl font-bold mb-10">Мои закладки</h1>
        <CardList :items="favorites" is-favorites="true" />
    </div>
    <div v-else>
        <div class="flex justify-center">
            <h1 class="text-3xl font-bold mb-10 flex gap-4 flex-col justify-center items-center">Список закладок пуст.
                <img src="/img/emoji-2.png" width="30" height="30" alt="" style="max-height: 30px;">
                Добавьте что-нибудь.</h1>
        </div>
    </div>
</template>

<style scoped>

</style>