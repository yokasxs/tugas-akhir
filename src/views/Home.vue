<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="md:pt-20 pt-10 bg-[#F8F8F8] min-h-screen">
        <div class="flex flex-col gap-y-8 w-full items-center justify-center py-16">
            <div class="flex flex-col bg-white shadow px-8 py-4 rounded md:w-3/5 w-3/4">
                <div class="flex lg:flex-row flex-col md:gap-y-0 gap-y-4 md:px-4 md:py-8 py-4">
                    <div class="text-[#7A7A7A] flex flex-col gap-y-4 ">
                        <div class="">
                            <p class="md:text-[20px] text-[16px] font-light text-[#5C8EF1]">Hello, user !</p>
                            <h1 class="md:text-[28px] text-[20px] max-[321px]:text-[16px] font-bold text-[#5C8EF1]">Welcome
                                to Skinlyze</h1>
                        </div>
                        <p class="lg:inline hidden">With advanced technology, Skinlyze empowers users to detect and
                            identify various skin
                            diseases effortlessly. </p>
                        <router-link to="/analyze" class="lg:w-1/4 mt-4 lg:inline hidden">
                            <button type="button"
                                class="bg-[#5C8EF1] hover:bg-[#4d75c5] border-none w-full text-white rounded-md py-2">
                                Start
                            </button>
                        </router-link>
                    </div>
                    <div class="flex justify-center">
                        <img class="md:w-[22em] w-[10em] h-auto" src="../assets/illust.jpg" alt="Logo" />
                    </div>
                    <router-link to="/analyze" class="lg:w-1/4 mt-8 lg:hidden inline">
                        <button type="button"
                            class="bg-[#5C8EF1] hover:bg-[#4d75c5] border-none w-full text-white rounded-md py-2">
                            Start
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="flex flex-col gap-y-4 justify-start md:w-3/5 w-3/4">
                <div class="text-[#7A7A7A] font-bold md:text-xl text-md">Application</div>
                <div class="flex lg:flex-row flex-col gap-x-4  gap-y-4">
                    <router-link to="/consultation" class="lg:w-1/3">
                        <div
                            class="flex gap-x-6 items-center bg-white shadow px-8 py-6 rounded cursor-pointer hover:bg-[#5C8EF1]/10">
                            <unicon style="width: auto; height: 36px;" name="comments" class=" fill-[#5C8EF1]" />
                            <div class="text-[#7A7A7A]">
                                <h3 class="font-semibold md:text-xl text-lg">Consultation</h3>
                                <p class="text-xs">Start chat with doctor</p>
                            </div>
                        </div>
                    </router-link>
                    <!-- <router-link to="/upload" class="lg:w-1/3">
                        <div
                            class="flex gap-x-6 items-center bg-white shadow px-8 py-6 rounded cursor-pointer hover:bg-[#5C8EF1]/10">
                            <unicon style="width: auto; height: 40px;" name="cloud-upload" class=" fill-[#5C8EF1]" />
                            <div class="text-[#7A7A7A]">
                                <h3 class="font-semibold md:text-xl text-lg">Uploader</h3>
                                <p class="text-xs">Image uploader for detection</p>
                            </div>
                        </div>
                    </router-link> -->

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        redirectToConsultation() {
            window.open('https://wa.me/+6281998885728', '_blank');
        },
    }
}
</script>