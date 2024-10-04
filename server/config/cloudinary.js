const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,       
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadFileToCloudinary(filePath, folder, resourceType = 'auto') {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder, 
            resource_type: resourceType, 
        });
        return result;
    } catch (error) {
        console.error(`Error al subir archivo a Cloudinary en la carpeta ${folder}:`, error);
        throw new Error('Error al subir archivo a Cloudinary');
    }
}


async function uploadImage(filePath) {
    return uploadFileToCloudinary(filePath, 'images', 'image');
}


async function uploadAudio(filePath) {
    return uploadFileToCloudinary(filePath, 'audios', 'raw'); 
}

async function uploadVideo(filePath) {
    return uploadFileToCloudinary(filePath, 'videos', 'video');
}


module.exports = {
    cloudinary,
    uploadImage,
    uploadAudio,
    uploadVideo,
};