import { forwardRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, ErrorMessage, GroupButtons, Loader, Modal, Typography } from '@/components';
import { allPhotoCategories } from '@/config';
import { useCurrentUser, useInfiniteScroll, useModal, usePhotos, useRemovePhoto } from '@/hooks';
import type { CategoriesItem, PhotoItem } from '@/types';

import AdminGallery from './AdminGallery';

interface AdminGallerySectionProps {
  category: CategoriesItem['value'];
  setCategory: (category: string) => void;
}

const AdminGallerySection = forwardRef<HTMLDivElement, AdminGallerySectionProps>(
  ({ category = allPhotoCategories[0].value, setCategory }, ref) => {
    const [photoToDelete, setPhotoToDelete] = useState<PhotoItem | null>(null);
    const { mutateAsync, isPending } = useRemovePhoto();
    const {
      data: photos,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isFetching,
      isSuccess,
      isError,
      error,
    } = usePhotos({ category });

    const { isOpenModal, closeModal, openModal } = useModal();
    const { data: user } = useCurrentUser();
    const isAdmin = user?.role === 'admin';

    const { triggerRef } = useInfiniteScroll({
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    });

    const onDelete = (photo: PhotoItem) => {
      openModal();
      setPhotoToDelete(photo);
    };

    const handleDelete = async () => {
      if (!photoToDelete) return;

      try {
        await mutateAsync({
          photoId: photoToDelete._id,
          categories: [...photoToDelete.categories, 'all'],
        });

        closeModal();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div ref={ref} className="scroll-mt-[542px] lg:scroll-mt-[600px]">
        <Typography parentAs="h1" size="5xl" align="center" className="mb-2 sm:mb-6">
          Фотографії
        </Typography>

        <GroupButtons
          options={allPhotoCategories}
          selectedOption={category}
          onChange={setCategory}
          className="mx-auto mb-8 sm:mb-12 sm:w-fit"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px] xl:min-h-[500px]"
          >
            {/* Gallery */}
            {isSuccess && photos.length > 0 && (
              <AdminGallery photos={photos} onDelete={onDelete} isAdmin={isAdmin} />
            )}

            {/* Loading state */}
            <div className="mt-6">{isFetching && <Loader />}</div>

            {/* Empty data */}
            {isSuccess && photos.length === 0 && (
              <Typography size="2xl" align="center">
                Немає фотографій для відображення!
              </Typography>
            )}

            {/* Error state */}
            {isError && (
              <ErrorMessage
                error={String((error as Error).message)}
                size="lg"
                animationKey="server-error"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Infinite scroll trigger */}
        {hasNextPage && (
          <div ref={triggerRef} className="h-2" data-testid="infinite-scroll-trigger" />
        )}

        {/* Delete confirmation Modal */}
        <Modal
          isOpen={isOpenModal}
          onClose={closeModal}
          withCloseButton={false}
          title="Ви впевнені що хочете видалити фото?"
        >
          <div className="mt-10 flex justify-center gap-10">
            <Button size="textSm" onClick={() => closeModal()}>
              Закрити
            </Button>
            <Button
              size="textSm"
              onClick={handleDelete}
              isLoading={isPending}
              loadingText="Видалення"
            >
              Видалити
            </Button>
          </div>
        </Modal>
      </div>
    );
  },
);

export default AdminGallerySection;
