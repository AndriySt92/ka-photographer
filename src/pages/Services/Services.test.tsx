import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { motion } from 'framer-motion';

import { useModal } from '@/hooks';

import Services from './';

jest.mock('@/components', () => {
  const { MockTypography, MockSessionOrderModal, MockButton } = jest.requireActual('tests');

  return {
    SessionOrderModal: MockSessionOrderModal,
    Typography: MockTypography,
    MButton: MockButton,
  };
});

jest.mock('./components', () => ({
  ServiceCard: jest.fn(({ item }) => (
    <div data-testid={`service-card-${item.title}`}>{item.title}</div>
  )),
}));

jest.mock('@/hooks', () => ({
  useModal: jest.fn(),
}));

jest.mock('@/config', () => ({
  services: [
    { title: 'Service 1', description: 'Desc 1' },
    { title: 'Service 2', description: 'Desc 2' },
    { title: 'Service 3', description: 'Desc 3' },
    { title: 'Service 4', description: 'Desc 4' },
  ],
}));

jest.mock('@/lib', () => ({
  fadeInBottom: { initial: {}, animate: {} },
  fadeInWithOpacity: { initial: {}, animate: {} },
  staggerContainer: jest.fn().mockReturnValue({}),
}));

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');
  const actual = jest.requireActual('framer-motion');

  const motionFn = jest
    .fn()
    .mockImplementation((Component) => (props: any) => <Component {...props} />);

  (motionFn as any).div = createMotionComponent('div');
  (motionFn as any).section = createMotionComponent('section');

  return {
    ...actual,
    motion: motionFn,
  };
});

describe('Services', () => {
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

  const renderComponent = () => render(<Services />);

  it('renders the main title as animated letters', () => {
    renderComponent();

    const typographyElements = screen.getAllByTestId('typography');
    // First typography is the main title (content array)
    const titleTypography = typographyElements[0];
    expect(titleTypography).toHaveAttribute('data-parent', 'h1');
    expect(titleTypography).toHaveAttribute('data-size', 'extraLarge');
    expect(titleTypography).toHaveAttribute('data-align', 'center');
    expect(titleTypography).toHaveTextContent('послуги');
  });

  it('renders the subtitle text', () => {
    renderComponent();
    const subtitle = screen.getByText(/Кожна зйомка — це простір для відчуттів/);
    expect(subtitle).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    renderComponent();
    const services = ['Service 1', 'Service 2', 'Service 3', 'Service 4'];
    services.forEach((service) => {
      expect(screen.getByTestId(`service-card-${service}`)).toBeInTheDocument();
    });
  });

  it('renders the call to action section with button', () => {
    renderComponent();

    expect(screen.getByText(/Готові створити свою історію\?/)).toBeInTheDocument();
    expect(screen.getByText(/Зв'яжіться з нами/)).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('opens modal when button is clicked', async () => {
    const user = userEvent.setup();
    renderComponent();

    const button = screen.getByTestId('button');
    await user.click(button);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });

  it('renders SessionOrderModal with correct props', () => {
    renderComponent();

    const { SessionOrderModal } = jest.requireMock('@/components');
    expect(SessionOrderModal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: false,
        onClose: mockCloseModal,
      }),
      undefined,
    );
  });

  it('passes the correct variants to motion.div for the grid', () => {
    renderComponent();

    const motionDivMock = motion.div as unknown as jest.Mock;
    // Find the call for the grid container (the one with className containing 'grid')
    const gridCall = motionDivMock.mock.calls.find((call) => call[0]?.className?.includes('grid'));
    expect(gridCall).toBeDefined();
    expect(gridCall[0]).toMatchObject({
      variants: expect.any(Object),
      initial: 'hidden',
      animate: 'visible',
    });
  });
});
