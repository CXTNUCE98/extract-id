<script setup lang="ts">
// import axios from 'axios'
import useFileList from "~/composables/file-list"
import createUploader from "~/composables/file-uploader"

// const apiUrl = 'http://localhost:9000/upload-file/';
// const imageUrl = ref('');
const imgUrl = ref()
const cardInfo = ref({
    Address: "",
    DoB: "",
    DoE: "",
    Home_town: "",
    ID: "",
    Name: "",
    Nationality: "",
    Sex: "",
})
// function extractId() {
//     console.log('imgUrl: ', imgUrl)
//     axios.post(apiUrl, { file: imgUrl.value }, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     })
//         .then(response => {
//             console.log('response: ', response);
//             cardInfo.value = response.data
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// function handleChange(file: any, fileList: any) {
//     // Handle file change event
//     if (file.raw) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             imageUrl.value = e.target?.result as string;
//         };
//         reader.readAsDataURL(file.raw);
//     }
// };

// function handleBeforeUpload(file: any) {
//     imgUrl.value = file
//     return true; 
// };

// File Management
const { files, addFiles, removeFile } = useFileList()

function onInputChange(e) {    
    addFiles(e.target.files)
    imgUrl.value = e.target.files[0]
    e.target.value = null
}

// Uploader
const { uploadFiles, uploadFile } = createUploader()

function uploadImg() {
    uploadFile(imgUrl)
}
</script>

<template>
    <div class="flex justify-center">
        <div class="w-[80%]">
            <h1 class="font-bold text-2xl text-center">
                Chip-based Vietnamese ID Card Extractor v2.0
            </h1>
            <div class="flex gap-4 pt-10 h-[700px]">
                <!-- <div class="flex-1 bg-white p-2 rounded-lg flex items-center justify-center">
                    <div class="h-[400px] w-500px">
                        <h3 class="pb-2">Upload your image :</h3>

                        <div>
                            <el-upload class="upload-demo" action="/upload" :on-change="handleChange"
                                :before-upload="handleBeforeUpload" drag multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                            </el-upload>
                            <el-image v-if="imageUrl" :src="imageUrl" style="max-width: 300px;" />
                        </div>
                    </div>
                </div> -->
                <div class="w-520px container p-10">
                    <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
                        <label class="flex items-center justify-center cursor-pointer" for="file-input">
                            <span v-if="dropZoneActive">
                                <span>Drop Them Here</span>
                                <span class="smaller">to add them</span>
                            </span>
                            <span v-else>
                                <span>Drag Your Files Here</span>
                                <span class="smaller">
                                    or <strong><em>click here</em></strong> to select files
                                </span>
                            </span>

                            <input type="file" id="file-input" class="hidden" multiple  @change="onInputChange" />
                            
                        </label>
                        <div class="flex gap-2 " v-show="files?.length">
                            <FilePreview v-for="file of files" :key="file.id" :file="file" @remove="removeFile" />
                        </div>
                    </DropZone>
                    <!-- <button @click.prevent="uploadFiles(files)" class="upload-button">Upload</button> -->
                </div>
                <el-button @click="uploadImg">extractID</el-button>
                <div class="flex-1 bg-white p-2 rounded-lg">
                    <div class="p-4">
                        <div class="flex justify-end">
                            <button class="bg-blue-500 text-center rounded px-4 py-1 text-white" type="button">
                                Download
                            </button>
                        </div>
                        <div>
                            <div>Your ID information</div>
                        </div>

                        <div class="flex justify-center py-2">
                            <img src="https://photo.znews.vn/w660/Uploaded/kbd_pilk/2022_10_09/chau_da19.jpg"
                                class="h-[100px]" alt="user_img" />
                        </div>

                        <div>
                            <label>Số (ID):</label>
                            <span>{{ cardInfo.ID }}</span>
                        </div>
                        <div>
                            <label>Họ và tên (Full name):</label>
                            <span>{{ cardInfo.Name }}</span>
                        </div>
                        <div>
                            <label>Ngày sinh (Date of birth):</label>
                            <span>{{ cardInfo.DoB }}</span>
                        </div>
                        <div>
                            <label>Giới tính (Sex):</label>
                            <span>{{ cardInfo.Sex }}</span>
                        </div>
                        <div>
                            <label>Quốc tịch (Nationality):</label>
                            <span>{{ cardInfo.Nationality }}</span>
                        </div>
                        <div>
                            <label>Quê quán (Place of origin):</label>
                            <span>{{ cardInfo.Home_town }}</span>
                        </div>
                        <div>
                            <label>Nơi thường trú (Place of residence):</label>
                            <span>{{ cardInfo.Address }}</span>
                        </div>
                        <div>
                            <label>Ngày hết hạn (Date of expiry):</label>
                            <span>{{ cardInfo.DoE }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    background: #ffffff;
}

.drop-area {
    width: 100%;
    max-width: 500px;
    height: 600px;
    margin: 0 auto;
    padding: 20px;
    transition: .2s ease;
    border: 2px dotted #333;
    border-radius: 10px;
}

label {
    font-size: 16px;
    cursor: pointer;
    display: block;
}

</style>