const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const getCloudinaryUrl = (publicId: string, width: number) => {
  return `${CLOUDINARY_BASE_URL}/f_auto,q_auto,w_${width},c_limit/${publicId}`;
};

export const getCloudinarySrcSet = (publicId: string) => {
  const widths = [480, 640, 768, 1024];

  return widths.map((width) => `${getCloudinaryUrl(publicId, width)} ${width}w`).join(', ');
};
