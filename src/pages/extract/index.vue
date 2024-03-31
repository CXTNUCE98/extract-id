<script setup lang="ts">
import axios from 'axios'

// Đường dẫn URL của API
const apiUrl = 'http://localhost:9000/upload-file/';
const imageUrl = ref('');
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
function extractId() {

    // axios
    //     .post(apiUrl, imgUrl.value, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //     })
    //     .then(function (response) {
    //         console.log("Response:", response);
    //     })
    //     .catch(function (error) {
    //         console.error("Error:", error);
    //     });

    axios.post(apiUrl, { file: imgUrl.value }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then(response => {
            console.log('response: ', response);
            cardInfo.value = response.data
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleChange(file: any, fileList: any) {
    // Handle file change event
    if (file.raw) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target?.result as string;
        };
        reader.readAsDataURL(file.raw);
    }
};

function handleBeforeUpload(file: any) {
    imgUrl.value = file
    // Validate file before uploading (if needed)
    return true; // or false to prevent upload
};



</script>

<template>
    <div class="flex justify-center">
        <div class="w-[80%]">
            <h1 class="font-bold text-2xl text-center">
                Chip-based Vietnamese ID Card Extractor v2.0
            </h1>
            <div class="flex gap-4 pt-10 h-[700px]">
                <div class="flex-1 bg-white p-2 rounded-lg flex items-center justify-center">
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
                </div>
                <el-button @click="extractId">extractID</el-button>
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
/* .drop-area {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
}

.file-input {
  display: none;
}

.drop-area img {
    max-width: 100%;
    max-height: 200px;
    margin-top: 10px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
} */
</style>