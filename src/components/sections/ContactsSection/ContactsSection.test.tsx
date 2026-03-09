import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import { contactInfo } from '@/config';

import ContactsSection from './';

jest.mock('../../ui/SessionOrderForm', () => {
  const { MockSessionOrderForm } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockSessionOrderForm,
  };
});

jest.mock('../../ui/BackgroundGradient', () => {
  const { MockBackgroundGradient } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockBackgroundGradient,
  };
});

jest.mock('../../ui/Typography', () => {
  const { MockTypography } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

jest.mock('../../ui/ContactInfo', () => {
  const { MockContactInfo } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockContactInfo,
  };
});

jest.mock('@/config', () => {
  const { mockContactItems } = jest.requireActual('tests/mocks');

  return {
    contactInfo: mockContactItems[0],
  };
});

jest.mock('@/lib', () => {
  const { createMockVariants } = jest.requireActual('tests/mocks');
  const mockVariant = createMockVariants();

  return {
    fadeInLeft: mockVariant,
    fadeInWithOpacity: mockVariant,
    staggerContainer: jest.fn().mockReturnValue(mockVariant),
  };
});

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests/mocks');

  return {
    motion: {
      div: createMotionComponent('div'),
      img: createMotionComponent('img'),
    },
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

    const contactInfoMock = jest.requireMock('../../ui/ContactInfo').default;
    expect(contactInfoMock).toHaveBeenCalledTimes(1);

    const [props] = contactInfoMock.mock.calls[0];
    expect(props.role).toBe('contacts');
    expect(props.items).toEqual(contactInfo);
    expect(props.variants).toBeDefined();
  });

  it('renders SessionOrderForm with correct className', () => {
    renderComponent();

    const sessionOrderFormMock = jest.requireMock('../../ui/SessionOrderForm').default;
    expect(sessionOrderFormMock).toHaveBeenCalledTimes(1);

    const [props] = sessionOrderFormMock.mock.calls[0];
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
