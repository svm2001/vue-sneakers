<script setup>
    const emit = defineEmits(['openDrawer']);
    defineProps({
        totalPrice: Number
    })
</script>

<template>
    <header class="sticky top-0 z-20 bg-white rounded-2xl flex items-center justify-between px-8 py-6 border-b border-slate-200"
            style="box-shadow: rgb(66, 184, 131, .5) 0 5px 14px 1px"
    >
        <router-link to="/">
            <div class="flex items-center gap-4 logo">
                <div class="flex flex-col gap-1">
                    <h2 class="text-xl font-bold uppercase flex items-center gap-1">
                        <img src="/img/logo.png" alt="logo" class="w-24">
                        Sneakers
                    </h2>
                    <p class="text-slate-400">Магазин лучших кроссовок</p>
                </div>
            </div>
        </router-link>
        <ul class="flex items-center gap-8">
            <li @click="() => emit('openDrawer')" class=" link flex items-center gap-3 cursor-pointer text-gray-600 hover:text-black">
                <img src="@/assets/img/cart.svg" alt="cart">
                <b class="totalprice">{{ totalPrice }} ₽</b>
            </li>
            <router-link to="/favorites">
                <li class="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-black link">
                    <img src="@/assets/img/heart.svg" alt="favourites">
                    <span>Закладки</span>
                </li>
            </router-link>
            <router-link to="/account">
                <li class="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-black link">
                    <img src="@/assets/img/profile.svg" alt="profile">
                    <span>Профиль</span>
                </li>
            </router-link>
        </ul>
    </header>
</template>

<style scoped>

@media (max-width: 768px) {
    header {
        .logo {
            p {
                display: none;
            }

            h2 {
                font-size: 0;
            }
        }

        .link span {
            display: none;
        }
    }
}

@media (max-width: 576px) {
    header {
        padding: 16px;
        border-radius: 0;

        .totalprice {
            font-size: 15px;
        }

        .link {
            gap: 4px;
        }

        ul {
            gap: 16px;
        }
    }
}

</style>