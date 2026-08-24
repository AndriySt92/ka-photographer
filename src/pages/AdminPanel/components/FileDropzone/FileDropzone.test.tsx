import { useDropzone } from 'react-dropzone';
import { render, screen } from '@testing-library/react';

import FileDropzone from './';

jest.mock('@/components', () => {
  const { MockTypography, MockButton, MockIcon } = jest.requireActual('tests');

  return {
    Button: MockButton,
    Icon: MockIcon,
    Typography: MockTypography,
  };
});

jest.mock('@/config', () => ({
  contactInfo: {},
  allPhotoCategories: [],
  homePhotos: [],
  navigation: [],
  reviews: [],
}));

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

describe('FileDropzone', () => {
  const mockOnDrop = jest.fn();
  const mockUseDropzone = useDropzone as jest.Mock;

  beforeEach(() => {
    mockUseDropzone.mockReturnValue({
      getRootProps: () => ({}),
      getInputProps: () => ({}),
      isDragActive: false,
    });
  });

  it('renders default state', () => {
    render(<FileDropzone onDrop={mockOnDrop} disabled={false} />);
    expect(screen.getByText(/Перетягніть сюди/i)).toBeInTheDocument();
  });

  it('shows active state when dragging', () => {
    mockUseDropzone.mockReturnValue({
      getRootProps: () => ({}),
      getInputProps: () => ({}),
      isDragActive: true,
    });

    render(<FileDropzone onDrop={mockOnDrop} disabled={false} />);
    expect(screen.getByText(/Відпустіть зображення/i)).toBeInTheDocument();
  });

  it('has dimmed style when disabled', () => {
    render(<FileDropzone onDrop={mockOnDrop} disabled={true} />);
    const element = screen.getByTestId('file-dropzone');
    expect(element).toHaveClass('opacity-40');
  });
});
