import { FancyboxLayout } from '@/components';
import { cn } from '@/lib';
import type { PhotoItem } from '@/types';

import AdminGalleryItem from './AdminGalleryItem';

interface AdminGalleryProps {
  photos: PhotoItem[];
  className?: string;
  isAdmin: boolean;
  onDelete: (photo: PhotoItem) => void;
}

const AdminGallery = ({ photos, className, isAdmin, onDelete }: AdminGalleryProps) => {
  return (
    <FancyboxLayout>
      <div
        className={cn(
          'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:gap-8',
          className,
        )}
      >
        {photos.map((photo) => (
          <AdminGalleryItem photo={photo} key={photo._id} isAdmin={isAdmin} onDelete={onDelete} />
        ))}
      </div>
    </FancyboxLayout>
  );
};

export default AdminGallery;
