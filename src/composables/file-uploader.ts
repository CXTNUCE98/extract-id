import axios from 'axios'
export async function uploadFile(file) {
	
	let formData = new FormData()
	const url = 'http://localhost:9000/upload-file/'
	formData.append('file', file)
	console.log('file: ', file);
	console.log('formData: ', formData);
	console.log('file: ', file);
	
	axios.post(url, { file: file }, {
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

export function uploadFiles(files, url) {
	return Promise.all(files.map((file) => uploadFile(file, url)))
}

export default function createUploader() {
	return {
		uploadFile: function (file) {
			return uploadFile(file)
		},
		uploadFiles: function (files) {
			return uploadFiles(files)
		},
	}
}