import type { FileRejection } from 'react-dropzone';

import { close } from '@/assets/icons';
import { Button, Icon, Typography } from '@/components';
import { cn } from '@/lib';

interface FilePreviewSectionProps {
  title: string;
  files: (File | FileRejection)[];
  onRemove: (index: number) => void;
  onClearAll: () => void;
  showUploadButton?: boolean;
  className?: string;
  hasError?: boolean;
  isPending?: boolean;
}

const FilePreviewSection = ({
  title,
  files,
  onRemove,
  onClearAll,
  showUploadButton = false,
  hasError,
  className,
  isPending,
}: FilePreviewSectionProps) => {
  if (files.length === 0) return null;

  return (
    <div className={cn('mt-6', className)}>
      {/* Title */}
      <Typography parentAs="h3" size="2xl" className="mb-3">
        {title}
      </Typography>

      {/* Files Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {files.map((fileItem, index) => {
          //extract fields
          const file = 'file' in fileItem ? fileItem.file : fileItem;
          const errors = 'errors' in fileItem ? fileItem.errors : [];

          return (
            <div key={index} className="group relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="h-56 w-full rounded-lg object-cover"
              />

              {/* Remove Button */}
              <Button
                type="button"
                intent="minimal"
                onClick={() => onRemove(index)}
                className="absolute right-1 top-1 z-10 h-8 w-8 rounded-lg bg-secondary/10 p-2 backdrop-blur-sm hover:scale-105 hover:bg-secondary/15"
              >
                <Icon name="remove" icon={close} size="h-4 aspect-auto" />
              </Button>

              {/* File Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                <Typography parentAs="p" size="xs" className="truncate normal-case text-white">
                  {file.name}
                </Typography>
                <Typography parentAs="p" size="xs" className="normal-case text-gray-300">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>

                {/* Error Messages (for rejected files) */}
                {errors && errors?.length > 0 && (
                  <Typography parentAs="ul" size="xs" className="mt-1 normal-case text-red-400">
                    {errors.map((error) => (
                      <li key={error.code} className="text-xs">
                        {error.message}
                      </li>
                    ))}
                  </Typography>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      {files.length > 0 && (
        <div className="mt-6 flex gap-4">
          {showUploadButton && (
            <Button
              type="submit"
              intent="secondary"
              disabled={hasError || isPending}
              isLoading={isPending}
              loadingText="Завантаження"
            >
              {`Завантажити ${files.length} фото`}
            </Button>
          )}
          <Button type="button" intent="secondary" onClick={onClearAll}>
            Очистити всі
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilePreviewSection;
