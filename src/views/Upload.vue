<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="pt-20 bg-[#F8F8F8] min-h-screen">
        <div class="flex w-full items-center justify-center py-16">
            <div class="upload-container flex flex-col bg-white shadow px-8 pt-4 pb-8 rounded">
                <div class="upload-handler flex">
                    <Uploader />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Uploader from '../components/Uploader.vue';
export default {
    components: {
        Uploader
    }
}
</script>