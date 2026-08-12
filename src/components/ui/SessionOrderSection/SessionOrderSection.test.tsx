import { fireEvent, render, screen } from '@testing-library/react';

import { useModal } from '@/hooks';

import SessionOrderSection from './';

jest.mock('@/hooks', () => ({
  useModal: jest.fn(),
}));

jest.mock('../Icon', () => {
  const { MockIcon } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockIcon,
  };
});

jest.mock('../Button', () => {
  const { MockButton } = jest.requireActual('tests');
  return { MButton: MockButton };
});

jest.mock('../Typography', () => {
  const { MockTypography } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

jest.mock('../SessionOrderModal', () => {
  const { MockSessionOrderModal } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockSessionOrderModal,
  };
});

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
  };
});

jest.mock('@/lib', () => {
  const { createMockVariants } = jest.requireActual('tests');
  const mockVariants = createMockVariants();

  return {
    fadeInBottom: mockVariants,
    fadeInWithOpacity: mockVariants,
  };
});

describe('SessionOrderSection', () => {
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useModal as jest.Mock).mockReturnValue({
      isOpenModal: false,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
    });
  });

  const renderComponent = () => render(<SessionOrderSection />);

  it('renders the section with heading and description', () => {
    renderComponent();

    const typographyElements = screen.getAllByTestId('typography');
    expect(typographyElements).toHaveLength(2);
    expect(typographyElements[0]).toHaveTextContent('Готові створити свою історію?');
    expect(typographyElements[1]).toHaveTextContent(
      "Зв'яжіться з нами для обговорення деталей та бронювання дати зйомки",
    );
  });

  it('renders the order button', () => {
    renderComponent();

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Замовити зйомку');
    expect(button).toHaveAttribute('data-size', 'textLg');
  });

  it('opens modal when button is clicked', () => {
    renderComponent();

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });

  it('does not render modal when closed', () => {
    renderComponent();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders modal when open', () => {
    (useModal as jest.Mock).mockReturnValue({
      isOpenModal: true,
      openModal: mockOpenModal,
      closeModal: mockCloseModal,
    });
    renderComponent();

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });
});
