import type { FileRejection } from 'react-dropzone';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useUploadPhotos } from '@/hooks';

import { FileDropzone } from '../';

import UploadPhotos from './';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

jest.mock('@/components', () => {
  const { MockTypography, MockErrorMessage } = jest.requireActual('tests');

  return {
    ErrorMessage: MockErrorMessage,
    Typography: MockTypography,
  };
});

jest.mock('@/hooks', () => ({
  useUploadPhotos: jest.fn(),
}));

jest.mock('../', () => ({
  Checkbox: jest.fn(({ label, id, checked, onChange }) => (
    <div data-testid="checkbox">
      <input
        data-testid="checkbox-input"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )),
  FileDropzone: jest.fn(({ disabled }) => (
    <div data-testid="file-dropzone" data-disabled={disabled} />
  )),
  FilePreviewSection: jest.fn(
    ({ title, files, onRemove, onClearAll, showUploadButton, hasError, isPending }) => {
      if (files.length === 0) return null;
      return (
        <div data-testid="file-preview-section" data-title={title} data-files-count={files.length}>
          {files.map((fileItem: any, idx: number) => {
            const file = fileItem.file || fileItem;
            const errors = fileItem.errors || [];
            return (
              <div key={idx} data-testid={`preview-file-${idx}`}>
                <span>{file.name}</span> - <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                <button onClick={() => onRemove(idx)}>Remove</button>
                {errors.length > 0 && (
                  <ul data-testid="file-errors">
                    {errors.map((err: any) => (
                      <li key={err.code}>{err.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
          <button onClick={onClearAll} data-testid="clear-all">
            Clear All
          </button>
          {showUploadButton && <button data-testid="upload-btn">Upload</button>}
          {hasError && <span>Error</span>}
          {isPending && <span>Loading</span>}
        </div>
      );
    },
  ),
  Select: jest.fn(({ value, onChange, options, 'aria-label': ariaLabel }) => (
    <select
      data-testid="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )),
}));

jest.mock('@/config', () => ({
  uploadCategories: [
    { value: 'individual', label: 'індивідуальна' },
    { value: 'group', label: 'групова' },
    { value: 'gallery', label: 'галерея' },
  ],
}));

const mockCreateObjectURL = jest.fn();
const mockRevokeObjectURL = jest.fn();
window.URL.createObjectURL = mockCreateObjectURL;
window.URL.revokeObjectURL = mockRevokeObjectURL;

const createMockFile = (name: string, sizeInMB: number, type = 'image/jpeg'): File => {
  const size = sizeInMB * 1024 * 1024;
  const blob = new Blob([new ArrayBuffer(size)], { type });
  return new File([blob], name, { type });
};

const createMockRejection = (file: File, message: string): FileRejection => ({
  file,
  errors: [{ code: 'mock-error', message }],
});

const mockFile1 = createMockFile('photo1.jpg', 2.5);
const mockFile2 = createMockFile('photo2.png', 1.8);
const mockRejectionFile = createMockFile('bad.pdf', 0.5);
const mockRejection = createMockRejection(mockRejectionFile, 'File type not allowed');

const mockUseUploadPhotos = jest.mocked(useUploadPhotos);
const mockMutateAsync = jest.fn();
const mockOnUpload = jest.fn();

describe('UploadPhotos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockImplementation(() => 'blob:mock-url');
    mockUseUploadPhotos.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as any);
  });

  afterEach(() => {
    mockRevokeObjectURL.mockClear();
  });

  const renderComponent = () => render(<UploadPhotos onUpload={mockOnUpload} />);

  const triggerFileDrop = async () => {
    const fileDropzoneMock = FileDropzone as jest.Mock;
    const lastCall = fileDropzoneMock.mock.calls[fileDropzoneMock.mock.calls.length - 1];
    const onDropProp = lastCall?.[0]?.onDrop;
    if (!onDropProp) throw new Error('FileDropzone not rendered or onDrop missing');
    await act(async () => {
      onDropProp([mockFile1, mockFile2], [mockRejection]);
    });
  };

  it('renders initial state with no files', () => {
    renderComponent();
    expect(screen.getByText('Завантажити фото')).toBeInTheDocument();
    expect(screen.getByTestId('file-dropzone')).toBeInTheDocument();
    expect(screen.queryByTestId('file-preview-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select')).not.toBeInTheDocument();
    expect(screen.queryByTestId('checkbox')).not.toBeInTheDocument();
  });

  describe('file drop interactions', () => {
    it('handles accepted files correctly', async () => {
      renderComponent();
      await triggerFileDrop();

      const previewSections = await screen.findAllByTestId('file-preview-section');
      const acceptedSection = previewSections[0];
      expect(acceptedSection).toHaveAttribute('data-files-count', '2');

      expect(screen.getByTestId('select')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox')).toBeInTheDocument();
      expect(screen.getByTestId('upload-btn')).toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    it('handles rejected files separately', async () => {
      renderComponent();
      await triggerFileDrop();

      const previewSections = await screen.findAllByTestId('file-preview-section');
      expect(previewSections).toHaveLength(2);

      const rejectedSection = previewSections[1];
      expect(rejectedSection).toHaveAttribute('data-title', 'Некоректні фото:');

      const errorMsg = await within(rejectedSection).findByText('File type not allowed');
      expect(errorMsg).toBeInTheDocument();
    });

    it('prevents duplicate files', async () => {
      renderComponent();
      await triggerFileDrop();
      await triggerFileDrop(); // same files again

      const previewSections = await screen.findAllByTestId('file-preview-section');
      const acceptedSection = previewSections[0];
      expect(acceptedSection).toHaveAttribute('data-files-count', '2'); // still 2
    });

    it('shows error when file count exceeds MAX_FILES', async () => {
      const manyFiles = Array.from({ length: 11 }, (_, i) => createMockFile(`file${i}.jpg`, 1));

      renderComponent();

      const fileDropzoneMock = FileDropzone as jest.Mock;
      const lastCall = fileDropzoneMock.mock.calls[fileDropzoneMock.mock.calls.length - 1];
      const onDropProp = lastCall?.[0]?.onDrop;

      await act(async () => {
        onDropProp(manyFiles, []);
      });

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });
      expect(screen.getByTestId('error-message')).toHaveTextContent(/Максимум 10 файлів/);
    });

    it('clears all files when clear all clicked', async () => {
      const user = userEvent.setup();
      renderComponent();
      await triggerFileDrop();

      const clearAllButtons = await screen.findAllByTestId('clear-all');
      await user.click(clearAllButtons[0]); // first clear-all is for accepted files

      await waitFor(() => {
        // Both accepted and rejected sections should be gone
        expect(screen.queryAllByTestId('file-preview-section')).toHaveLength(0);
      });
      expect(screen.queryByTestId('select')).not.toBeInTheDocument();
      expect(screen.queryByTestId('checkbox')).not.toBeInTheDocument();
    });
  });

  describe('conditional UI based on session type', () => {
    it('shows checkbox only when sessionType is not "gallery"', async () => {
      const user = userEvent.setup();
      renderComponent();
      await triggerFileDrop();

      // Initially sessionType is 'individual' -> checkbox visible
      expect(await screen.findByTestId('checkbox')).toBeInTheDocument();

      const select = screen.getByTestId('select');
      await user.selectOptions(select, 'gallery');

      await waitFor(() => {
        expect(screen.queryByTestId('checkbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('submits with correct categories when addToGallery checked', async () => {
      const user = userEvent.setup();
      renderComponent();
      await triggerFileDrop();

      const checkboxInput = await screen.findByTestId('checkbox-input');
      await user.click(checkboxInput);

      const form = screen.getByTestId('upload-form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          categories: ['individual', 'gallery'],
          photoFiles: [mockFile1, mockFile2],
        });
      });
      expect(mockOnUpload).toHaveBeenCalledWith('individual');
    });

    it('submits with single category when addToGallery unchecked', async () => {
      renderComponent();
      await triggerFileDrop();

      const form = screen.getByTestId('upload-form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          categories: ['individual'],
          photoFiles: [mockFile1, mockFile2],
        });
      });
    });

    it('submits with gallery only when sessionType = gallery (checkbox hidden)', async () => {
      const user = userEvent.setup();
      renderComponent();
      await triggerFileDrop();

      const select = await screen.findByTestId('select');
      await user.selectOptions(select, 'gallery');

      const form = screen.getByTestId('upload-form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          categories: ['gallery'],
          photoFiles: [mockFile1, mockFile2],
        });
      });
    });

    it('handles submission error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
      mockMutateAsync.mockRejectedValue(new Error('Upload failed'));

      renderComponent();
      await triggerFileDrop();

      const form = screen.getByTestId('upload-form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Upload failed'));
      });

      consoleErrorSpy.mockRestore();
    });

    it('resets form and rejected files after successful upload', async () => {
      mockMutateAsync.mockResolvedValue(undefined);
      renderComponent();
      await triggerFileDrop();

      const form = screen.getByTestId('upload-form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.queryAllByTestId('file-preview-section')).toHaveLength(0);
        expect(screen.queryByTestId('select')).not.toBeInTheDocument();
        expect(screen.queryByTestId('checkbox')).not.toBeInTheDocument();
      });
    });
  });
});
