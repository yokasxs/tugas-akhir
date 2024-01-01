<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="bg-white shadow md:px-24 px-12 py-4 w-full fixed cursor-pointer flex items-center justify-between">
            <div class="" @click="showSidebar = true">
                <unicon style="width: auto; height: 32;" name="bars" class=" fill-black hover:fill-[#5C8EF1]"></unicon>
            </div>
            <div class="">
                <img class="w-auto h-[50px]" src="../assets/logo2.png" alt="Logo" />
            </div>
        </div>
        <transition name="slide">
            <div v-if="showSidebar" ref="sidebar" class="sidebar-container bg-white shadow w-fit pl-4 pr-16 min-h-screen">
                <div @click="showSidebar = false" class="pt-8 cursor-pointer w-fit">
                    <unicon style="width: auto; height: 32;" name="times" class="fill-[#000] hover:fill-[#5C8EF1]"></unicon>
                </div>
                <div class="pt-8 pb-4 text-[#5C8EF1] font-semibold">
                    Menu
                </div>
                <div class="flex flex-col gap-y-5">
                    <router-link v-for="menuItem in menuItems" :key="menuItem.to" :to="menuItem.to">
                        <div @click="showSidebar = false" class="flex gap-x-5 cursor-pointer items-center"
                            @mouseover="hoverEffect(menuItem.name)" @mouseout="resetEffect(menuItem.name)">
                            <unicon style="width: auto; height: 28px;" :name="menuItem.icon" :class="{
                                'fill-[#5C8EF1]': isHovered[menuItem.name] || $route.path === menuItem.to,
                                'fill-[#7A7A7A]': !(isHovered[menuItem.name] || $route.path === menuItem.to)
                            }" />
                            <span :class="{
                                'text-[#5C8EF1]': isHovered[menuItem.name] || $route.path === menuItem.to,
                                'text-[#7A7A7A]': !(isHovered[menuItem.name] || $route.path === menuItem.to)
                            }">{{ menuItem.label }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import isMobile from 'is-mobile';

export default {
    data() {
        return {
            isHovered: {
                home: false,
                history: false,
                upload: false,
            },
            showSidebar: false,
            menuItems: [
                { name: 'home', to: '/', label: 'Home', icon: 'estate' },
                // { name: 'history', to: '/history', label: 'History', icon: 'history' },
                { name: 'upload', to: '/analyze', label: 'Analyze', icon: 'microscope' },
            ],
        };
    },
    methods: {
        hoverEffect(item) {
            if (!isMobile()) {
                this.isHovered[item] = true;
            }
        },
        resetEffect(item) {
            if (!isMobile()) {
                this.isHovered[item] = false;
            }
        },
    },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}

.sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 80%;
    background-color: white;
    z-index: 1000;
}
</style>
