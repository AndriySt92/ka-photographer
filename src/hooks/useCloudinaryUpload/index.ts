import axios from 'axios';

import { cloudinaryConfig } from '@/config';
import type { UploadedPhoto } from '@/types';
import { getCloudinaryErrorMessage } from '@/utils';

interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

const useCloudinaryUpload = (config: CloudinaryConfig = cloudinaryConfig) => {
  const { cloudName, uploadPreset } = config;

  const uploadToCloudinary = async (file: File): Promise<UploadedPhoto> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await axios.post<{ secure_url: string; public_id: string }>(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 120000,
        },
      );
      return { url: res.data.secure_url, publicId: res.data.public_id };
    } catch (error) {
      throw new Error(getCloudinaryErrorMessage(error, file.name));
    }
  };

  const uploadMultiple = async (files: File[]): Promise<UploadedPhoto[]> => {
    const results = await Promise.allSettled(files.map(uploadToCloudinary));
    const failed = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
    if (failed.length) {
      const errors = failed.map((r) => r.reason.message).join(', ');
      throw new Error(`Не вдалося завантажити ${failed.length} файл(ів): ${errors}`);
    }
    return results.map((r) => (r as PromiseFulfilledResult<UploadedPhoto>).value);
  };

  return { uploadMultiple };
};

export default useCloudinaryUpload;
