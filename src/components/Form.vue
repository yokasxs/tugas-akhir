<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="flex flex-col gap-y-8 w-full items-center justify-center py-10">
        <div class="flex flex-col bg-white shadow px-8 py-4 rounded md:w-2/5 w-5/6">
            <form @submit.prevent="submitForm">
                <div class="flex flex-col gap-y-1 ">
                    <div class="">
                        <h1 class="font-semibold md:text-lg text-md ">Personal Information</h1>
                        <div class="flex flex-col gap-y-2 pb-4 pt-2">
                            <div class="flex flex-col gap-y-2">
                                <label class="md:text-md text-sm ">Nama Lengkap</label>
                                <input v-model="namaLengkap" type="text"
                                    class="border-2 md:text-md text-sm py-1 px-4 rounded focus:outline-[#5C8EF1]">
                            </div>
                            <div class="flex flex-col gap-y-2">
                                <label class="md:text-md text-sm ">Tanggal Lahir</label>
                                <input v-model="tanggalLahir" type="date"
                                    class="border-2 md:text-md text-sm py-1 px-4 rounded focus:outline-[#5C8EF1]">
                            </div>
                        </div>
                    </div>
                    <div class="pb-2">
                        <hr />
                    </div>
                    <div class="">
                        <h1 class="font-semibold md:text-lg text-md ">Consult Information</h1>
                        <div class="flex flex-col gap-y-2 pt-2">
                            <div class="flex flex-col gap-y-2">
                                <label class="md:text-md text-sm ">Penyakit Kulit </label>
                                <select v-model="selectedLabel" :disabled="label !== null"
                                    class="border-2 md:text-md text-sm py-1 px-4 rounded focus:outline-none"
                                    :class="{ 'border-none bg-black/10 text-black/50': label !== null }">
                                    <option :value="null" disabled selected>{{ placeholderText }}</option>
                                    <option value="Dermatitis">Dermatitis</option>
                                    <option value="Prosiaris">Prosiaris</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option4">Option 4</option>
                                    <option value="option5">Option 5</option>
                                </select>
                            </div>
                            <div class="flex flex-col gap-y-2">
                                <label class="md:text-md text-sm ">Tanggal Sakit</label>
                                <input v-model="tanggalSakit" type="date"
                                    class="border-2 md:text-md text-sm py-1 px-4 rounded focus:outline-[#5C8EF1]">
                            </div>
                            <div class="flex flex-col gap-y-2">
                                <label class="md:text-md text-sm ">Gejala</label>
                                <textarea v-model="gejala" name="" id="" cols="30" rows="2"
                                    class="border-2 md:text-md text-sm py-2 px-4 rounded focus:outline-[#5C8EF1]"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <button type="submit"
                        class="bg-[#5C8EF1] hover:bg-[#4d75c5] border-none w-full text-white rounded-md py-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
const PHONE = import.meta.env.VITE_API_PHONE

export default {
    data() {
        return {
            namaLengkap: "",
            tanggalLahir: "",
            tanggalSakit: "",
            gejala: "",
            label: this.$route.query.label || null,
            selectedLabel: null
        };
    },
    mounted() {
        this.selectedLabel = this.label === null ? null : this.label
        console.log(this.label)
        console.log('selected: ', this.selectedLabel)
    },
    computed: {
        placeholderText() {
            return this.selectedLabel === null ? 'Pilih penyakit' : 'Pilih penyakit';
        }
    },
    methods: {
        submitForm() {
            const greetings = encodeURIComponent('Hallo, saya mau berkonsultasi. Berikut data saya : ')
            const namaLengkap = encodeURIComponent(`Nama : ${this.namaLengkap}`)
            const tanggalLahir = encodeURIComponent(`Lahir : ${this.tanggalLahir}`)
            const tanggalSakit = encodeURIComponent(`Sakit : ${this.tanggalSakit}`)
            const gejala = encodeURIComponent(`Gejala : ${this.gejala}`)
            const label = encodeURIComponent(`Label : ${this.selectedLabel}`)

            const message = `${greetings}%0A%0A${namaLengkap}%0A${tanggalLahir}%0A${tanggalSakit}%0A${gejala}%0A${label}`

            window.open(`https://api.whatsapp.com/send?phone=${PHONE}&text=${message}`, '_blank')
            this.resetForm();
        },
        resetForm() {
            this.namaLengkap = "";
            this.tanggalLahir = "";
            this.tanggalSakit = "";
            this.gejala = "";
        },
    },
};
</script>
