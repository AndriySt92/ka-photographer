import { render, screen } from '@testing-library/react';

import Home from './';

jest.mock('@/components', () => {
  const { MockContactsSection, MockCursorFollower, MockHoverCircles } =
    jest.requireActual('tests/mocks');

  return {
    ContactsSection: MockContactsSection,
    CursorFollower: MockCursorFollower,
    HoverCircles: MockHoverCircles,
  };
});

jest.mock('./components', () => ({
  About: jest.fn(() => <div data-testid="about-section" />),
  Banner: jest.fn(() => <div data-testid="banner-section" />),
  HomeGallery: jest.fn(() => <div data-testid="gallery-section" />),
  Reviews: jest.fn(() => <div data-testid="reviews-section" />),
  Services: jest.fn(() => <div data-testid="services-section" />),
  Terms: jest.fn(() => <div data-testid="terms-section" />),
}));

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main sections', () => {
    render(<Home />);

    expect(screen.getByTestId('banner-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-section')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-section')).toBeInTheDocument();
    expect(screen.getByTestId('terms-section')).toBeInTheDocument();
    expect(screen.getByTestId('contacts-section')).toBeInTheDocument();
  });

  it('renders two CursorFollower components', () => {
    render(<Home />);
    const cursorFollowers = screen.getAllByTestId('cursor-follower');
    expect(cursorFollowers).toHaveLength(2);
  });

  it('renders two HoverCircles components', () => {
    render(<Home />);
    const hoverCircles = screen.getAllByTestId('hover-circles');
    expect(hoverCircles).toHaveLength(2);
  });
});
