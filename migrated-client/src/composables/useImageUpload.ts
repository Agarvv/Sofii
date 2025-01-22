import { uploadImage } from "@/api/MediaService";

interface UseImageUploadOptions {
    file: File
}

export async function useImageUpload({ file }: UseImageUploadOptions): Promise<string> {
    const uploadedUrl = await uploadImage(file); 
    return uploadedUrl; 
}