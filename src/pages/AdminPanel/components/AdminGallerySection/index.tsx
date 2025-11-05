import { useState } from 'react';

import { Button, ErrorMessage, GroupButtons, Loader, Modal, Typography } from '@/components';
import { allPhotoCategories } from '@/config';
import { useCurrentUser, useInfiniteScroll, useModal, usePhotos, useRemovePhoto } from '@/hooks';
import type { PhotoItem } from '@/types';

import AdminGallery from './AdminGallery';

const AdminGallerySection = () => {
  const [photoToDelete, setPhotoToDelete] = useState<PhotoItem | null>(null);
  const [category, setCategory] = useState<string>(allPhotoCategories[0].value);
  const { mutateAsync, isPending } = useRemovePhoto();
  const {
    data: photos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
    error,
  } = usePhotos({ category: category as string });

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
        categories: photoToDelete.categories,
      });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography parentAs="h1" size="5xl" align="center" className="mb-2 sm:mb-6">
        Фотографії
      </Typography>

      <GroupButtons
        options={allPhotoCategories}
        selectedOption={category}
        onChange={setCategory}
        className="mx-auto mb-8 w-fit sm:mb-12"
      />

      {status === 'success' && photos.length > 0 ? (
        <AdminGallery photos={photos} onDelete={onDelete} isAdmin={isAdmin} />
      ) : (
        <Typography size="2xl" align="center">
          Немає фотографій для відображення!
        </Typography>
      )}

      {/* Infinite scroll trigger */}
      {hasNextPage && <div ref={triggerRef} className="h-2" />}

      {/* Loading state */}
      {isFetching && isFetchingNextPage && <Loader />}

      {/* Error state */}
      {status === 'error' && (
        <ErrorMessage
          error={String((error as Error).message)}
          size="lg"
          animationKey="server-error"
        />
      )}

      {/* Delete Confirmation Modal */}
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
            disabled={isPending}
            isLoading={isPending}
            loadingText="Видалення..."
          >
            Видалити
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminGallerySection;
