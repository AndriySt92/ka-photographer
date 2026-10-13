import type { FileRejection } from 'react-dropzone';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FilePreviewSection from '.';

// Mock dependencies
jest.mock('@/assets/icons', () => ({
  close: 'close-icon-mock',
}));

jest.mock('@/components', () => {
  const { MockTypography, MockButton, MockIcon } = jest.requireActual('tests');

  return {
    Button: MockButton,
    Icon: MockIcon,
    Typography: MockTypography,
  };
});

jest.mock('@/lib', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

const mockCreateObjectURL = jest.fn();
window.URL.createObjectURL = mockCreateObjectURL;

const createMockFile = (name: string, sizeInMB: number, type = 'image/jpeg'): File => {
  const size = sizeInMB * 1024 * 1024;
  const blob = new Blob([new ArrayBuffer(size)], { type });
  return new File([blob], name, { type });
};

const createMockFileRejection = (
  file: File,
  errors: { code: string; message: string }[],
): FileRejection => ({
  file,
  errors,
});

describe('FilePreviewSection', () => {
  const defaultProps = {
    title: 'Test Files',
    files: [] as (File | FileRejection)[],
    onRemove: jest.fn(),
    onClearAll: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockImplementation(() => 'blob:mock-url');
  });

  describe('with files', () => {
    const mockFile1 = createMockFile('photo1.jpg', 2.5);
    const mockFile2 = createMockFile('photo2.png', 1.8);
    const mockRejectionFile = createMockFile('bad.pdf', 0.5);
    const mockRejection = createMockFileRejection(mockRejectionFile, [
      { code: 'file-invalid-type', message: 'File type must be image' },
    ]);

    const propsWithFiles = {
      ...defaultProps,
      files: [mockFile1, mockFile2, mockRejection],
    };

    const renderComponent = () => render(<FilePreviewSection {...propsWithFiles} />);

    it('renders the component with files', () => {
      const { container } = renderComponent();
      expect(container).not.toBeEmptyDOMElement();
    });

    it('renders title', () => {
      renderComponent();
      expect(screen.getByText('Test Files')).toBeInTheDocument();
    });

    it('renders correct number of preview items', () => {
      renderComponent();
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });

    it('displays file names and sizes', () => {
      renderComponent();

      expect(screen.getByText('photo1.jpg')).toBeInTheDocument();
      expect(screen.getByText('2.50 MB')).toBeInTheDocument();
      expect(screen.getByText('photo2.png')).toBeInTheDocument();
      expect(screen.getByText('1.80 MB')).toBeInTheDocument();
      expect(screen.getByText('bad.pdf')).toBeInTheDocument();
      expect(screen.getByText('0.50 MB')).toBeInTheDocument();
    });

    it('shows error messages for rejected files', () => {
      renderComponent();
      expect(screen.getByText('File type must be image')).toBeInTheDocument();
    });

    it('calls URL.createObjectURL for each file', () => {
      renderComponent();

      expect(mockCreateObjectURL).toHaveBeenCalledTimes(3);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockFile1);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockFile2);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockRejectionFile);
    });

    it('renders remove buttons for each file', () => {
      renderComponent();
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(4); // 3 remove + 1 clear
    });

    it('calls onRemove with correct index when remove button clicked', async () => {
      const user = userEvent.setup();
      renderComponent();
      const buttons = screen.getAllByRole('button');
      // The first 3 buttons are remove buttons
      await user.click(buttons[0]);
      expect(defaultProps.onRemove).toHaveBeenCalledWith(0);
    });

    it('renders "Очистити всі" button', () => {
      renderComponent();
      expect(screen.getByRole('button', { name: 'Очистити всі' })).toBeInTheDocument();
    });

    it('calls onClearAll when clear button clicked', async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole('button', { name: 'Очистити всі' }));
      expect(defaultProps.onClearAll).toHaveBeenCalled();
    });

    it('does NOT render upload button by default', () => {
      renderComponent();
      expect(screen.queryByRole('button', { name: /Завантажити/ })).not.toBeInTheDocument();
    });
  });

  describe('upload button behavior', () => {
    const mockFile = createMockFile('test.jpg', 1);
    const propsWithUpload = {
      ...defaultProps,
      files: [mockFile],
      showUploadButton: true,
    };

    it('renders upload button when showUploadButton=true and files exist', () => {
      render(<FilePreviewSection {...propsWithUpload} />);
      expect(screen.getByRole('button', { name: 'Завантажити 1 фото' })).toBeInTheDocument();
    });

    it('disables upload button when hasError=true', () => {
      render(<FilePreviewSection {...propsWithUpload} hasError={true} />);
      const uploadBtn = screen.getByRole('button', { name: 'Завантажити 1 фото' });
      expect(uploadBtn).toBeDisabled();
    });

    it('disables upload button when isPending=true and shows loading text', () => {
      render(<FilePreviewSection {...propsWithUpload} isPending={true} />);
      const uploadBtn = screen.getByRole('button', { name: 'Завантаження' });
      expect(uploadBtn).toBeDisabled();
    });

    it('upload button type is "submit"', () => {
      render(<FilePreviewSection {...propsWithUpload} />);
      const uploadBtn = screen.getByRole('button', { name: 'Завантажити 1 фото' });
      expect(uploadBtn).toHaveAttribute('type', 'submit');
    });
  });

  describe('clear button behavior', () => {
    const mockFile = createMockFile('test.jpg', 1);
    const propsWithFiles = {
      ...defaultProps,
      files: [mockFile],
    };

    it('clear button is always enabled even when hasError or isPending', () => {
      render(<FilePreviewSection {...propsWithFiles} hasError={true} isPending={true} />);
      const clearBtn = screen.getByRole('button', { name: 'Очистити всі' });
      expect(clearBtn).toBeEnabled();
    });

    it('clear button type is "button"', () => {
      render(<FilePreviewSection {...propsWithFiles} />);
      const clearBtn = screen.getByRole('button', { name: 'Очистити всі' });
      expect(clearBtn).toHaveAttribute('type', 'button');
    });
  });
});
