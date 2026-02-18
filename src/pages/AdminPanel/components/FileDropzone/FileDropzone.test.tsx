import { useDropzone } from 'react-dropzone';
import { render, screen } from '@testing-library/react';

import FileDropzone from './';

jest.mock('@/components', () => ({
  Icon: jest.fn(({ name, icon, size, className }) => (
    <div
      data-testid="icon"
      data-name={name}
      data-icon={icon}
      data-size={size}
      className={className}
    >
      {name}
    </div>
  )),
  Typography: jest.fn(({ children, parentAs, size, className }) => {
    const Tag = parentAs || 'div';
    return (
      <Tag data-testid="typography" data-size={size} className={className}>
        {children}
      </Tag>
    );
  }),
  Button: jest.fn(({ children, onClick, type, disabled }) => (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )),
}));

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
    const { container } = render(<FileDropzone onDrop={mockOnDrop} disabled={true} />);
    // eslint-disable-next-line testing-library/no-node-access
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass('opacity-40');
  });
});
