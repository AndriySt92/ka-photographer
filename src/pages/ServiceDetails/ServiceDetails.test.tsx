import { useParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import ServiceDetails from './';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/components', () => {
  const { MockShowcasePageLayout } = jest.requireActual('tests');

  return {
    ShowcasePageLayout: MockShowcasePageLayout,
  };
});

jest.mock('./components', () => ({
  ServiceBannerContent: jest.fn(({ name, details, value }) => (
    <div
      data-testid="service-banner-content"
      data-name={name}
      data-details={details}
      data-value={value}
    />
  )),
}));

// Mock config
jest.mock('@/config', () => ({
  serviceDetails: {
    wedding: {
      name: 'Wedding',
      value: 'wedding-value',
      description: 'Wedding description',
      bannerPhoto: 'wedding.jpg',
      bannerPhotoMobile: 'wedding-mobile.jpg',
      details: 'Wedding details',
    },
    portrait: {
      name: 'Portrait',
      value: 'portrait-value',
      description: 'Portrait description',
      bannerPhoto: 'portrait.jpg',
      bannerPhotoMobile: 'portrait-mobile.jpg',
      details: 'Portrait details',
    },
  },
}));

describe('ServiceDetails', () => {
  const mockUseParams = useParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ShowcasePageLayout with correct props based on URL param', () => {
    mockUseParams.mockReturnValue({ type: 'wedding' });

    render(<ServiceDetails />);

    const layout = screen.getByTestId('showcase-layout');
    expect(layout).toBeInTheDocument();

    const props = JSON.parse(layout.getAttribute('data-props') || '{}');
    expect(props).toMatchObject({
      category: 'wedding',
      descriptionProps: {
        description: 'Wedding description',
        title: 'Що таке Wedding?',
      },
      bannerProps: {
        bannerPhoto: 'wedding.jpg',
        bannerPhotoMobile: 'wedding-mobile.jpg',
      },
      motionKey: 'wedding',
    });
  });

  it('renders ServiceBannerContent with correct props based on service', () => {
    mockUseParams.mockReturnValue({ type: 'wedding' });

    render(<ServiceDetails />);

    const bannerContent = screen.getByTestId('service-banner-content');
    expect(bannerContent).toHaveAttribute('data-name', 'Wedding');
    expect(bannerContent).toHaveAttribute('data-details', 'Wedding details');
    expect(bannerContent).toHaveAttribute('data-value', 'wedding-value');
  });

  it('passes children correctly to ShowcasePageLayout', () => {
    mockUseParams.mockReturnValue({ type: 'portrait' });

    render(<ServiceDetails />);

    const layout = screen.getByTestId('showcase-layout');
    expect(layout).toContainElement(screen.getByTestId('service-banner-content'));
  });

  it('handles different service types', () => {
    mockUseParams.mockReturnValue({ type: 'portrait' });

    render(<ServiceDetails />);

    const layout = screen.getByTestId('showcase-layout');
    const props = JSON.parse(layout.getAttribute('data-props') || '{}');
    expect(props).toMatchObject({
      category: 'portrait',
      descriptionProps: {
        description: 'Portrait description',
        title: 'Що таке Portrait?',
      },
      bannerProps: {
        bannerPhoto: 'portrait.jpg',
        bannerPhotoMobile: 'portrait-mobile.jpg',
      },
      motionKey: 'portrait',
    });

    const bannerContent = screen.getByTestId('service-banner-content');
    expect(bannerContent).toHaveAttribute('data-name', 'Portrait');
    expect(bannerContent).toHaveAttribute('data-details', 'Portrait details');
    expect(bannerContent).toHaveAttribute('data-value', 'portrait-value');
  });
});
