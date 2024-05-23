<script setup lang="ts">
import useFileList from "~/composables/file-list"
import createUploader from "~/composables/file-uploader"

// File Management
const { files, addFiles, removeFile } = useFileList()

function onInputChange(e) {
    addFiles(e.target.files)
    e.target.value = null
}

// Uploader
const { uploadFiles } = createUploader('YOUR URL HERE')
</script>

<template>
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
                        or <strong><em >click here</em></strong> to select files
                    </span>
                </span>

                <input type="file" id="file-input" class="hidden" multiple @change="onInputChange" />
            </label>
            <div class="flex gap-2 " v-show="files?.length">
                <FilePreview v-for="file of files" :key="file.id" :file="file" @remove="removeFile" />
            </div>
        </DropZone>
        <!-- <button @click.prevent="uploadFiles(files)" class="upload-button">Upload</button> -->
    </div>
</template>


<style scoped>
.container{
    background: #ffffff;
}

.drop-area {
    width: 100%;
    max-width: 500px;
    height: 640px;
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

button {
    cursor: pointer;
}
</style>