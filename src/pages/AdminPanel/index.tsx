// import { Typography } from '@/components';

// import AdminGallerySection from './components/AdminGallerySection';
// import UploadPhotos from './components/UploadPhotosSection';

// const AdminPanel = () => {
//   return (
//     <div className="margin-t padding-y flex flex-col justify-center">
//       <div className="space-y-lg container">
//         <Typography parentAs="h1" size="extraLarge" align="center">
//           Адмін панель
//         </Typography>

//         {/* Upload photos section */}
//         <UploadPhotos />

//         {/* Gallery section */}
//         <AdminGallerySection />
//       </div>
//     </div>
//   );
// };

import { useRef, useState } from 'react';

import { Typography } from '@/components';
import { allPhotoCategories } from '@/config';
import type { CategoriesItem } from '@/types';

import AdminGallerySection from './components/AdminGallerySection';
import UploadPhotos from './components/UploadPhotosSection';

const AdminPanel = () => {
  const [galleryCategory, setGalleryCategory] = useState<CategoriesItem['value']>(
    allPhotoCategories[0].value,
  );
  const gallerySectionRef = useRef<HTMLDivElement>(null);

  const onUpload = (category: string) => {
    setGalleryCategory(category);

    // Scroll to the gallery section after upload photos
    gallerySectionRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="margin-t padding-y flex flex-col justify-center">
      <div className="space-y-lg container">
        <Typography parentAs="h1" size="extraLarge" align="center">
          Адмін панель
        </Typography>

        {/* Upload photos section */}
        <UploadPhotos onUpload={onUpload} />

        {/* Gallery section */}
        <AdminGallerySection
          ref={gallerySectionRef}
          category={galleryCategory}
          setCategory={setGalleryCategory}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
