import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import { contactInfo } from '@/config';

import ContactsSection from './';

jest.mock('@/components/ui', () => {
  const { MockSessionOrderForm, MockBackgroundGradient, MockTypography, MockContactInfo } =
    jest.requireActual('tests');

  return {
    SessionOrderForm: MockSessionOrderForm,
    BackgroundGradient: MockBackgroundGradient,
    Typography: MockTypography,
    ContactInfo: MockContactInfo,
  };
});

jest.mock('@/hooks', () => ({
  useCloudinaryUpload: jest.fn(),
}));

jest.mock('@/config', () => {
  const { mockContactItems } = jest.requireActual('tests');

  return {
    contactInfo: mockContactItems[0],
  };
});

jest.mock('@/lib', () => {
  const { createMockVariants } = jest.requireActual('tests');
  const mockVariant = createMockVariants();

  return {
    fadeInLeft: mockVariant,
    fadeInWithOpacity: mockVariant,
    staggerContainer: jest.fn().mockReturnValue(mockVariant),
  };
});

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');
  const actual = jest.requireActual('framer-motion');

  const motionFn = jest
    .fn()
    .mockImplementation((Component) => (props: any) => <Component {...props} />);
  (motionFn as any).div = createMotionComponent('div');
  (motionFn as any).img = createMotionComponent('img');

  return {
    ...actual,
    motion: motionFn,
    useScroll: jest.fn(),
    useTransform: jest.fn(),
  };
});

describe('ContactsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => render(<ContactsSection {...props} />);

  it('renders the root motion.div with correct animation props when isPage is false (default)', () => {
    renderComponent();

    const motionDivMock = motion.div as unknown as jest.Mock;
    expect(motionDivMock).toHaveBeenCalled();

    const firstCallArgs = motionDivMock.mock.calls[0][0];
    expect(firstCallArgs.initial).toBe('hidden');
    expect(firstCallArgs.whileInView).toBe('visible');
    expect(firstCallArgs.viewport).toEqual({ once: true, amount: 0.2 });
  });

  it('renders with animate instead of whileInView when isPage is true', () => {
    renderComponent({ isPage: true });

    const motionDivMock = motion.div as unknown as jest.Mock;
    expect(motionDivMock).toHaveBeenCalled();

    const firstCallArgs = motionDivMock.mock.calls[0][0];
    expect(firstCallArgs.initial).toBe('hidden');
    expect(firstCallArgs.animate).toBe('visible');
    expect(firstCallArgs.whileInView).toBeUndefined();
  });

  it('renders the main title and subtitle', () => {
    renderComponent();

    expect(screen.getByTestId('contacts-title-main')).toHaveTextContent('Контакти');
    expect(screen.getByTestId('contacts-title-sub')).toHaveTextContent('Фотографа кугіт анастасії');
  });

  it('renders ContactInfo with correct props', () => {
    renderComponent();

    const { ContactInfo } = jest.requireMock('@/components/ui');
    expect(ContactInfo).toHaveBeenCalledTimes(1);

    const [props] = ContactInfo.mock.calls[0];
    expect(props.role).toBe('contacts');
    expect(props.items).toEqual(contactInfo);
    expect(props.variants).toBeDefined();
  });

  it('renders SessionOrderForm with correct className', () => {
    renderComponent();

    const { SessionOrderForm } = jest.requireMock('@/components/ui');
    expect(SessionOrderForm).toHaveBeenCalledTimes(1);

    const [props] = SessionOrderForm.mock.calls[0];
    expect(props.className).toBe('gap-5 sm:gap-9');
  });

  it('renders two BackgroundGradient components', () => {
    renderComponent();

    const gradients = screen.getAllByTestId('background-gradient');
    expect(gradients).toHaveLength(2);
  });

  it('renders the section titles with Typography', () => {
    renderComponent();

    expect(screen.getByText('Як ми можемо зв’язатися')).toBeInTheDocument();
    expect(screen.getByText('Залишай запит')).toBeInTheDocument();
  });
});
