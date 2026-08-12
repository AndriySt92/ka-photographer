import { screen } from '@testing-library/react';

import Footer from './';

jest.mock('@/components', () => {
  const { MockTypography, MockContactInfo, MockNavLink } = jest.requireActual('tests');

  return {
    Typography: MockTypography,
    ContactInfo: MockContactInfo,
    NavLink: MockNavLink,
  };
});

jest.mock('./components/FooterSection', () => ({
  __esModule: true,
  default: jest.fn(({ title, children }) => (
    <div data-testid="footer-section" data-title={title}>
      {children}
    </div>
  )),
}));

jest.mock('@/config', () => {
  const { mockContactInfo, mockNavigation, mockSocialMediaPlatforms } = jest.requireActual('tests');

  return {
    contactInfo: mockContactInfo,
    navigation: mockNavigation,
    socialMediaPlatforms: mockSocialMediaPlatforms,
  };
});

jest.mock('@/lib', () => {
  const { mockCn } = jest.requireActual('tests');

  return {
    cn: mockCn,
  };
});

describe('Footer', () => {
  const { renderWithRouter } = jest.requireActual('tests');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render root element of footer', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  describe('top navigation', () => {
    it('renders the first two NavLink items from navigation', () => {
      renderWithRouter(<Footer />);

      const navLinks = screen.getAllByTestId('nav-link');
      expect(navLinks[0]).toHaveAttribute('data-to', '/');
      expect(navLinks[0]).toHaveTextContent('Головна');
      expect(navLinks[1]).toHaveAttribute('data-to', '/services');
      expect(navLinks[1]).toHaveTextContent('Послуги');
    });

    it('renders the special photographer link', () => {
      renderWithRouter(<Footer />);

      const link = screen.getByRole('link', { name: 'telegram' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://t.me');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveTextContent('ФОТОГРАФ ІВАНО-ФРАНКІВСЬК, ЛЬВІВ');
    });
  });

  describe('FooterSection components', () => {
    it('renders three FooterSection components with correct titles', () => {
      renderWithRouter(<Footer />);

      const sections = screen.getAllByTestId('footer-section');
      expect(sections).toHaveLength(3);
      expect(sections[0]).toHaveAttribute('data-title', 'ПОСЛУГИ ТА ЦІНИ');
      expect(sections[1]).toHaveAttribute('data-title', 'СТОРІНКИ');
      expect(sections[2]).toHaveAttribute('data-title', 'КОНТАКТИ');
    });

    it('passes correct children to the Services section (from navigation)', () => {
      renderWithRouter(<Footer />);

      const navLinks = screen.getAllByTestId('nav-link');
      const serviceLinks = navLinks.slice(2, 3);
      expect(serviceLinks).toHaveLength(1);
      expect(serviceLinks[0]).toHaveTextContent('Love Story');
    });

    it('passes correct children to the Pages section (from PAGE_ITEMS)', () => {
      renderWithRouter(<Footer />);

      const navLinks = screen.getAllByTestId('nav-link');
      const pageLinks = navLinks.slice(3, 7);
      expect(pageLinks).toHaveLength(4);
      const expectedPages = ['Головна', 'Послуги', 'Галерея', 'Контакти'];
      pageLinks.forEach((link, index) => {
        expect(link).toHaveTextContent(expectedPages[index]);
      });
    });
  });

  it('renders the copyright text', () => {
    renderWithRouter(<Footer />);
    const copyright = screen.getByText(
      /Анастасія Кугіт - Фотограф в м. Івано-Франківськ, Львів. 2025 \| Політика конфіденційності/,
    );
    expect(copyright).toBeInTheDocument();
  });
});
