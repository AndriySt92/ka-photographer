import axios from 'axios';

import type { UploadedPhoto } from '@/types';
import { getCloudinaryErrorMessage } from '@/utils';

const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

const useCloudinaryUpload = () => {
  const uploadToCloudinary = async (file: File): Promise<UploadedPhoto> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    try {
      const res = await axios.post<CloudinaryUploadResponse>(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 120000,
        },
      );

      return {
        url: res.data.secure_url,
        publicId: res.data.public_id,
      };
    } catch (error) {
      const errorMessage = getCloudinaryErrorMessage(error, file.name);
      throw new Error(errorMessage);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<UploadedPhoto[]> => {
    const uploadResults = await Promise.allSettled(files.map(uploadToCloudinary));

    const failedUploads = uploadResults.filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    );
    if (failedUploads.length) {
      const errors = failedUploads.map((failedResult) => failedResult.reason.message).join(', ');
      throw new Error(`Не вдалося завантажити ${failedUploads.length} файл(ів): ${errors}`);
    }

    return uploadResults.map((result) => (result as PromiseFulfilledResult<UploadedPhoto>).value);
  };

  return {
    uploadMultiple,
  };
};

export default useCloudinaryUpload;
