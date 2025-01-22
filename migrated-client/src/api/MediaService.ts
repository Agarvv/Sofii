import axios from 'axios';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dtlpkq8w3/image/upload`;

export async function uploadImage(image: File): Promise<string> {
      
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', "sofii-vsly");

  try {
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error while uploading image:', error);
    throw error;
  }
}
