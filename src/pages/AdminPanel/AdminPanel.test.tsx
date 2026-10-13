import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AdminPanel from './';

jest.mock('./components/UploadPhotosSection', () => ({
  __esModule: true,
  default: jest.fn(({ onUpload }) => (
    <div data-testid="upload-photos">
      <button data-testid="trigger-upload" onClick={() => onUpload('new-category')}>
        Upload
      </button>
    </div>
  )),
}));

jest.mock('./components/AdminGallerySection', () => {
  const MockAdminGallerySection = React.forwardRef<HTMLDivElement, any>(
    ({ category, setCategory }, ref) => (
      <div ref={ref} data-testid="admin-gallery-section">
        <span data-testid="gallery-category">{category}</span>
        <button data-testid="change-category" onClick={() => setCategory('changed-category')}>
          Change
        </button>
      </div>
    ),
  );
  MockAdminGallerySection.displayName = 'MockAdminGallerySection';
  return {
    __esModule: true,
    default: MockAdminGallerySection,
  };
});

jest.mock('@/config', () => ({
  allPhotoCategories: [
    { value: 'individual', label: 'індивідуальна' },
    { value: 'group', label: 'групова' },
  ],
}));

jest.mock('@/components', () => {
  const { MockTypography } = jest.requireActual('tests');

  return {
    Typography: MockTypography,
  };
});

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

describe('AdminPanel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title, upload section and gallery section', () => {
    render(<AdminPanel />);
    expect(screen.getByTestId('typography')).toHaveTextContent('Адмін панель');
    expect(screen.getByTestId('upload-photos')).toBeInTheDocument();
    expect(screen.getByTestId('admin-gallery-section')).toBeInTheDocument();
  });

  it('passes default category to AdminGallerySection', () => {
    render(<AdminPanel />);
    expect(screen.getByTestId('gallery-category')).toHaveTextContent('individual');
  });

  it('updates category and scrolls when onUpload is called', async () => {
    const user = userEvent.setup();
    render(<AdminPanel />);

    const uploadButton = screen.getByTestId('trigger-upload');
    await user.click(uploadButton);

    expect(screen.getByTestId('gallery-category')).toHaveTextContent('new-category');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });

  it('allows manual category change via setCategory', async () => {
    const user = userEvent.setup();
    render(<AdminPanel />);

    const changeButton = screen.getByTestId('change-category');
    await user.click(changeButton);

    expect(screen.getByTestId('gallery-category')).toHaveTextContent('changed-category');
  });
});
