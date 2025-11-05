import { useCallback, useEffect, useState } from 'react';
import type { FileRejection } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';

import { ErrorMessage, Typography } from '@/components';
import { uploadCategories } from '@/config';
import { useUploadPhotos } from '@/hooks';
import type { CategoriesItem } from '@/types';

import { Checkbox, FileDropzone, FilePreviewSection, Select } from '../';

const MAX_FILES = 10;

interface UploadPhotosFormData {
  addToGallery: boolean;
  sessionType: CategoriesItem['value'];
  files: File[];
}

const UploadPhotos = () => {
  const [rejected, setRejected] = useState<FileRejection[]>([]);
  const { mutateAsync, isPending } = useUploadPhotos();
  const { control, reset, handleSubmit, setValue, watch, setError, clearErrors, formState } =
    useForm<UploadPhotosFormData>({
      defaultValues: {
        sessionType: uploadCategories[0].value,
        addToGallery: false,
        files: [],
      },
    });

  const files = watch('files');
  const sessionType = watch('sessionType');

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(URL.createObjectURL(file));
      });
    };
  }, [files]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        const newFiles = [...files, ...acceptedFiles];
        const fileMap = new Map();
        const uniqueFiles: File[] = [];

        //Set only unique files
        newFiles.forEach((file) => {
          const key = `${file.name}-${file.size}`;
          if (!fileMap.has(key)) {
            fileMap.set(key, true);
            uniqueFiles.push(file);
          }
        });

        setValue('files', uniqueFiles);

        //Validation: set error of files limit
        if (uniqueFiles.length > MAX_FILES) {
          setError('files', {
            type: 'max',
            message: `Максимум ${MAX_FILES} файлів.`,
          });
        } else {
          clearErrors('files');
        }
      }

      //Set rejected files
      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    [files, setValue, clearErrors, setError],
  );

  const removeFile = useCallback(
    (indexToRemove: number) => {
      const updatedFiles = files.filter((_, index) => index !== indexToRemove);
      setValue('files', updatedFiles);

      if (updatedFiles.length <= MAX_FILES) {
        clearErrors('files');
      }
    },
    [setValue, clearErrors, files],
  );

  const clearAllFiles = useCallback(() => {
    setValue('files', []);
    clearErrors('files');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setValue, clearErrors]);

  const removeRejectedFile = (indexToRemove: number) => {
    const updatedFiles = rejected.filter((_, index) => index !== indexToRemove);
    setRejected(updatedFiles);
  };

  const clearAllRejectedFiles = useCallback(() => {
    setRejected([]);
  }, [setRejected]);

  const onSubmit = async (data: UploadPhotosFormData) => {
    const categories = [data.sessionType];
    if (data.addToGallery && data.sessionType !== 'gallery') {
      categories.push('gallery');
    }

    try {
      await mutateAsync({
        categories,
        photoFiles: files,
      });

      // Reset form on success
      reset();
      setRejected([]);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
    }
  };

  const hasFiles = files.length > 0;
  const hasFilesError = formState.errors.files?.message;

  return (
    <div className="space-y-sm mx-auto w-full max-w-5xl">
      <Typography parentAs="h3" size="5xl" align="center">
        Завантажити фото
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* FileDropzone */}
        <Controller
          name="files"
          control={control}
          defaultValue={[]}
          render={() => <FileDropzone onDrop={onDrop} disabled={files.length >= MAX_FILES} />}
        />

        {/* Select */}
        {hasFiles && (
          <Controller
            name="sessionType"
            control={control}
            render={({ field }) => (
              <Select {...field} options={uploadCategories} aria-label="Тип сесії" />
            )}
          />
        )}

        {/* Checkbox */}
        {hasFiles && sessionType !== 'gallery' && (
          <Controller
            name="addToGallery"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} label="Добавити до галереї" id="addToGallery" />
            )}
          />
        )}

        {/* Files preview section */}
        <FilePreviewSection
          title="Обрані фото:"
          files={files}
          onRemove={removeFile}
          onClearAll={clearAllFiles}
          showUploadButton
          hasError={Boolean(hasFilesError)}
          isPending={isPending}
        />

        {/* Files error */}
        {hasFilesError && (
          <ErrorMessage
            error={`${formState.errors.files?.message}. Видаліть ${files.length - MAX_FILES} файл(ів).`}
            size="sm"
            className="text-center"
            animationKey="upload-error"
          />
        )}

        {/* Rejected files preview section */}
        <FilePreviewSection
          title="Некоректні фото:"
          files={rejected}
          onRemove={removeRejectedFile}
          onClearAll={clearAllRejectedFiles}
        />
      </form>
    </div>
  );
};

export default UploadPhotos;
