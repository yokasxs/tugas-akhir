<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- Show the form if an image is not uploaded -->
        <form v-if="!imageUploaded" @drop.prevent="handleDrop" @dragover.prevent="handleDragOver">
            <h1 class="text-[#7A7A7A] font-semibold text-xl py-4">Upload File</h1>
            <label for="fileInput">
                <div class="dropzone cursor-pointer border-dashed border-2 border-[#5C8EF1]/50 rounded-lg p-4 w-full flex flex-col justify-center items-center"
                    @drop.prevent="handleDrop" @dragover.prevent="handleDragOver">
                    <div class="flex flex-col md:px-52 md:py-8 min-[375px]:px-12 px-8 justify-center items-center">
                        <div class="md:p-4" @drop.prevent="handleDrop" @dragover.prevent="handleDragOver">
                            <unicon style="width: auto;" name="scenery"
                                class="fill-[#5C8EF1]/20 opacity-80 md:h-[6em] h-[4em]" />
                        </div>
                        <div class="md:text-xl text-lg text-[#7F7F7F] w-full">Drag Image Here</div>
                        <div class="text-sm text-[#7F7F7F]">Or Click For Browse</div>
                        <input type="file" id="fileInput" class="bg-[#F2F6FD]" @change="handleFileChange" ref="fileInput"
                            @drop.prevent="handleDrop" @dragover.prevent="handleDragOver" />
                    </div>
                </div>
            </label>
            <div v-if="fileName" class="mt-4 p-2 rounded border flex items-center gap-x-4">
                <unicon style="width: auto; height: 1.7em;" name="file" class="fill-[#5C8EF1] " />
                <div class="">
                    <div class="text-sm"> {{ fileName }}</div>
                    <div class="text-xs text-black/50">{{ fileSize }}</div>
                </div>
            </div>

            <!-- Loading bar -->
            <div v-if="loading" class="mt-4 progress-bar">
                <div class="progress" :style="{ width: `${uploadProgress}%` }" />
            </div>
            <div v-if="loading"
                style="margin-top: 8px;color: rgba(107, 114, 128, 1); font-size: 0.875rem; line-height: 1.25rem;"
                class="text-sm">
                Uploading... ({{ uploadLoaded }} / {{ uploadTotal }})
                {{ uploadProgress }}%
            </div>

            <span class="w-full flex justify-center py-4">
                <button type="button"
                    :class="{ 'bg-[#5C8EF1] hover:bg-[#4d75c5] text-white': fileName, 'bg-[#e8e8e8] text-[#cbcbcb] cursor-not-allowed': !fileName, }"
                    class=" border-none w-full  rounded-md py-2" @click.prevent="handleSubmit">
                    Process
                </button>
            </span>
        </form>

        <!-- Show the uploaded image if available -->
        <div v-else>
            <transition name="fade">
                <div class="" v-show="results">
                    <h1 class="font-bold text-[#7A7A7A] text-xl py-4">Results</h1>
                    <div class="md:px-52 md:py-8 min-[375px]:px-12 px-8 pb-4">
                        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
                    </div>
                    <div class="text-center pb-4 ">
                        <div class="md:text-lg text-sm"> Jenis Penyakit Kulit</div>
                        <div class="md:text-3xl text-2xl font-semibold">{{ results }}</div>
                        <div class="md:text-lg text-sm pt-2">Confidence ( {{ confidence }} % )</div>
                    </div>
                    <span class="w-full flex justify-center pt-4">
                        <router-link :to="'/consultation?' + `label=${results}`" class="w-full">
                            <button type="button"
                                class="bg-[#5C8EF1] hover:bg-[#4d75c5] border-none w-full text-white rounded-md py-2">
                                Consultation
                            </button>
                        </router-link>
                    </span>
                    <span class="w-full flex justify-center py-4">
                        <button type="button"
                            class="border border-[#5C8EF1] hover:bg-[#4d75c5] hover:text-white w-full text-[#5C8EF1] rounded-md py-2"
                            @click.prevent="imageUploaded = !imageUploaded, fileName = null">
                            Back
                        </button>
                    </span>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export default {
    data() {
        return {
            fileName: null,
            fileSize: null,
            file: null,
            uploadLoaded: 0,
            uploadTotal: 0,
            uploadProgress: 0,
            loading: false,
            imageUploaded: false,
            imageUrl: null,
            results: null,
            confidence: null
        };
    },
    methods: {
        redirectToConsultation() {
            window.open('https://wa.me/+6281998885728', '_blank');
        },
        handleFileChange(event) {
            const files = event.target.files;
            if (files.length > 0) {
                const file = files[0];
                this.fileName = file.name;
                this.fileSize = (file.size / 1024).toFixed(2) + ' KB';
            } else {
                this.fileName = null;
                this.fileSize = null;
            }
        },
        handleDragOver(event) {
            event.preventDefault();
        },
        handleDrop(event) {
            event.preventDefault();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                const fileInput = this.$refs.fileInput;
                fileInput.files = files;
                this.handleFileChange({ target: fileInput });
            }
        },

        handleSubmit() {
            this.loading = true;

            const formData = new FormData();
            const fileInput = this.$refs.fileInput;
            if (fileInput.files.length > 0) {
                formData.append('file', fileInput.files[0]);
                axios.post(`${API_ENDPOINT}/uploadImage`, formData, {
                    onUploadProgress: (progressEvent) => {
                        this.uploadLoaded = progressEvent.loaded;
                        this.uploadTotal = progressEvent.total;
                        this.uploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    },
                })
                    .then((response) => {
                        console.log('Status:', response.status);
                        console.log('Upload successful:', response.data);

                        this.imageUrl = `${API_ENDPOINT}/getImage?filename=${response.data['file']}`;
                        this.results = response.data.result.prediction
                        this.confidence = response.data.result.confidence
                        this.imageUploaded = true;
                    })
                    .catch((error) => {
                        console.error('Upload error:', error);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.uploadLoaded = 0;
                        this.uploadTotal = 0;
                        this.uploadProgress = 0;
                    });
            } else {
                console.error('No file selected');
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
input[type="file"] {
    display: none;
}

.progress {
    height: 100%;
    background-color: #5C8EF1;
    transition: width 0.3s ease;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #ddd;
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;
}
</style>
