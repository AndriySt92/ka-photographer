import { render, screen } from '@testing-library/react';

import FooterSection from './';

jest.mock('@/components/ui/Typography', () => {
  const { MockTypography } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

jest.mock('@/lib', () => {
  const { mockCn } = jest.requireActual('tests/mocks');

  return {
    cn: mockCn,
  };
});

jest.mock('@/hooks', () => ({
  useCloudinaryUpload: jest.fn(),
}));

jest.mock('@/config', () => {
  const { mockContactInfo, mockNavigation, mockSocialMediaPlatforms } =
    jest.requireActual('tests/mocks');

  return {
    contactInfo: mockContactInfo,
    navigation: mockNavigation,
    socialMediaPlatforms: mockSocialMediaPlatforms,
  };
});
describe('FooterSection', () => {
  const defaultProps = {
    title: 'Test Title',
    children: <div data-testid="child">Child content</div>,
  };

  it('renders title and children', () => {
    render(<FooterSection {...defaultProps} />);

    const title = screen.getByTestId('typography');
    expect(title).toHaveTextContent('Test Title');
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('passes correct props to Typography', () => {
    render(<FooterSection {...defaultProps} />);

    const title = screen.getByTestId('typography');
    expect(title).toHaveAttribute('data-parent', 'h6');
    expect(title).toHaveAttribute('data-size', '2xl');
  });

  it('applies default classes to container', () => {
    render(<FooterSection {...defaultProps} />);

    const root = screen.getByTestId('footer-section');
    expect(root).toHaveClass('space-y-2', 'xl:space-y-5');
  });

  it('applies custom className to container', () => {
    const customClass = 'my-custom-class';
    render(<FooterSection {...defaultProps} className={customClass} />);

    const root = screen.getByTestId('footer-section');
    expect(root).toHaveClass('space-y-2', 'xl:space-y-5', customClass);
  });

  it('renders children inside a flex column container', () => {
    render(<FooterSection {...defaultProps} />);

    const childrenContainer = screen.getByTestId('children-wrapper');
    expect(childrenContainer).toHaveClass('flex', 'flex-col');
  });
});
