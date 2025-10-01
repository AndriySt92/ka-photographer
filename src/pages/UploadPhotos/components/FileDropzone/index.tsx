import { type FileRejection, useDropzone } from 'react-dropzone';

import { upload } from '@/assets/icons';
import { Icon, Typography } from '@/components';
import { cn } from '@/lib';

interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  disabled: boolean;
}

const FileDropzone = ({ onDrop, disabled }: FileDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', 'webp'],
    },
    maxSize: 1024 * 1024 * 10, // 10 MB in bytes
    multiple: true,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'rounded-xl border-2 border-dashed border-secondary/40 p-12 text-center transition-colors ',
        isDragActive ? 'border-secondary/80 bg-secondary/10 ' : 'border-secondary/40',
        disabled ? 'opacity-40' : 'cursor-pointer hover:bg-secondary/10',
      )}
    >
      <input {...getInputProps()} />
      <div className="mx-auto mb-4 h-16 w-16 text-secondary">
        <Icon icon={upload} name="upload-file" size="h-16 aspect-auto" />
      </div>
      <Typography parentAs="p" size="base" align="center" className={cn('normal-case', disabled)}>
        {isDragActive
          ? 'Відпустіть зображення сюди...'
          : 'Перетягніть сюди зображення або натисніть, щоб вибрати'}
      </Typography>
    </div>
  );
};

export default FileDropzone;
