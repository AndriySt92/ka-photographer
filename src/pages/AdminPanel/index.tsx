import { Typography } from '@/components';

import AdminGallerySection from './components/AdminGallerySection';
import UploadPhotos from './components/UploadPhotosSection';

const AdminPanel = () => {
  return (
    <div className="margin-t padding-y flex flex-col justify-center">
      <div className="space-y-lg container">
        <Typography parentAs="h1" size="extraLarge" align="center">
          Адмін панель
        </Typography>

        {/* Upload photos section */}
        <UploadPhotos />

        {/* Gallery section */}
        <AdminGallerySection />
      </div>
    </div>
  );
};

export default AdminPanel;
