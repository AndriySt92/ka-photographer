import { render, screen } from '@testing-library/react';

import Home from './';

jest.mock('@/components', () => {
  const { MockContactsSection, MockCursorFollower, MockHoverCircles } =
    jest.requireActual('tests/mocks');

  return {
    ContactsSection: MockContactsSection,
    CursorFollower: MockCursorFollower,
    HoverCircles: MockHoverCircles,
    LazySection: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

jest.mock('./components', () => ({
  __esModule: true,

  Banner: jest.fn(() => <div data-testid="banner-section" />),
}));

jest.mock('./components/About', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="about-section" />),
}));

jest.mock('./components/Services', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="services-section" />),
}));

jest.mock('./components/HomeGallery', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="gallery-section" />),
}));

jest.mock('./components/Reviews', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="reviews-section" />),
}));

jest.mock('./components/Terms', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="terms-section" />),
}));

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main sections', async () => {
    render(<Home />);

    expect(await screen.findByTestId('banner-section')).toBeInTheDocument();
    expect(await screen.findByTestId('about-section')).toBeInTheDocument();
    expect(await screen.findByTestId('services-section')).toBeInTheDocument();
    expect(await screen.findByTestId('gallery-section')).toBeInTheDocument();
    expect(await screen.findByTestId('reviews-section')).toBeInTheDocument();
    expect(await screen.findByTestId('terms-section')).toBeInTheDocument();

    expect(screen.getByTestId('contacts-section')).toBeInTheDocument();
  });

  it('renders two CursorFollower components', () => {
    render(<Home />);

    expect(screen.getAllByTestId('cursor-follower')).toHaveLength(2);
  });

  it('renders two HoverCircles components', () => {
    render(<Home />);

    expect(screen.getAllByTestId('hover-circles')).toHaveLength(2);
  });
});
