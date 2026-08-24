import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useCreateBooking } from '@/hooks';

import SessionOrderForm from './';

jest.mock('@/hooks', () => ({
  useCreateBooking: jest.fn(),
}));

jest.mock('@/config', () => ({
  sessionOptions: [
    { value: 'wedding', label: 'Весільна' },
    { value: 'portrait', label: 'Портрет' },
    { value: 'family', label: 'Сімейна' },
  ],
}));

jest.mock('@/lib', () => {
  const { mockCn, createMockVariants } = jest.requireActual('tests');

  return {
    cn: mockCn,
    fadeInWithOpacity: createMockVariants(),
  };
});

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  const motionFn = jest
    .fn()
    .mockImplementation((Component) => (props: any) => <Component {...props} />);

  (motionFn as any).div = createMotionComponent('div');
  (motionFn as any).label = createMotionComponent('label');
  (motionFn as any).span = createMotionComponent('span');

  (motionFn as any).create = jest
    .fn()
    .mockImplementation((Component) => (props: any) => <Component {...props} />);

  return {
    motion: motionFn,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    LayoutGroup: ({ children }: any) => <>{children}</>,
  };
});

describe('SessionOrderForm', () => {
  const mockMutateAsync = jest.fn();
  const mockOnSubmitSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateBooking as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });
  });

  const renderComponent = (props = {}) => {
    return render(<SessionOrderForm {...props} />);
  };

  it('renders all form fields', () => {
    renderComponent();

    expect(screen.getByTestId('field-name')).toBeInTheDocument();
    expect(screen.getByTestId('field-contact')).toBeInTheDocument();
    expect(screen.getByText(/обери тип зйомки/i)).toBeInTheDocument();
    expect(screen.getByTestId('field-sessionDate')).toBeInTheDocument();
    expect(screen.getByTestId('field-comment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /замовити/i })).toBeInTheDocument();
  });

  it('displays validation errors when fields are empty on submit', async () => {
    const user = userEvent.setup();
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /замовити/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByText("Обов'язкове поле");
      expect(errorMessages).toHaveLength(2); // name and contact errors
      expect(screen.getByText('Оберіть тип зйомки')).toBeInTheDocument();
    });
  });

  it('validates name field correctly', async () => {
    const user = userEvent.setup();
    renderComponent();

    const nameInput = screen.getByTestId('field-name');

    await user.type(nameInput, 'A');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/Ім'я має містити щонайменше 2 символів/i)).toBeInTheDocument();
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'John123');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/Ім'я може містити лише літери, пробіли, апострофи та дефіси/i),
      ).toBeInTheDocument();
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'Іван-Петро');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText(/Ім'я має містити/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Ім'я може містити/i)).not.toBeInTheDocument();
    });
  });

  it('validates contact field for phone/instagram', async () => {
    const user = userEvent.setup();
    renderComponent();

    const contactInput = screen.getByTestId('field-contact');

    // Too short (2 chars) – should trigger min length error
    await user.type(contactInput, '12');
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText(/Контакт має містити щонайменше 3 символів/i)).toBeInTheDocument();
    });

    await user.clear(contactInput);
    // Invalid format – use a string with disallowed character (e.g., 'invalid!')
    await user.type(contactInput, 'invalid!');
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText(/Будь ласка, введіть коректний номер телефону/i)).toBeInTheDocument();
    });

    await user.clear(contactInput);
    // Valid Instagram
    await user.type(contactInput, '@valid_username');
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText(/Контакт має містити/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Будь ласка, введіть/i)).not.toBeInTheDocument();
    });

    await user.clear(contactInput);
    // Valid phone
    await user.type(contactInput, '+380501234567');
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText(/Контакт має містити/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Будь ласка, введіть/i)).not.toBeInTheDocument();
    });
  });

  it('selects session type via GroupButtons', async () => {
    const user = userEvent.setup();
    renderComponent();

    const portraitButton = screen.getByRole('button', { name: 'Портрет' });
    await user.click(portraitButton);

    expect(portraitButton).toHaveClass('opacity-100');
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    renderComponent({ onSubmitSuccess: mockOnSubmitSuccess });

    await user.type(screen.getByTestId('field-name'), 'Іван Петров');
    await user.type(screen.getByTestId('field-contact'), '@testuser');
    await user.click(screen.getByRole('button', { name: 'Весільна' }));
    await user.type(screen.getByTestId('field-sessionDate'), 'червень 2024');
    await user.type(screen.getByTestId('field-comment'), 'some comment');

    await user.click(screen.getByRole('button', { name: /замовити/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        name: 'Іван Петров',
        contact: '@testuser',
        sessionType: 'wedding',
        sessionDate: 'червень 2024',
        comment: 'some comment',
      });
    });

    expect(mockOnSubmitSuccess).toHaveBeenCalled();
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByTestId('field-name'), 'Іван');
    await user.type(screen.getByTestId('field-contact'), '@test');
    await user.click(screen.getByRole('button', { name: 'Портрет' }));

    await user.click(screen.getByRole('button', { name: /замовити/i }));

    await waitFor(() => {
      expect(screen.getByTestId('field-name')).toHaveValue('');
      expect(screen.getByTestId('field-contact')).toHaveValue('');
      // After reset, no button should have the exact class 'opacity-100'
      const buttons = screen.getAllByRole('button');
      const selectedButton = buttons.find((btn) => btn.classList.contains('opacity-100'));
      expect(selectedButton).toBeUndefined();
    });
  });

  it('shows loading state on button while submitting', async () => {
    // Override the hook to return isPending: true from the start
    (useCreateBooking as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    });

    renderComponent();

    const submitButton = screen.getByRole('button', { name: /відправлення/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Відправлення');
  });

  it('handles submission error and logs to console', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Network error');
    mockMutateAsync.mockRejectedValue(error);

    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByTestId('field-name'), 'Іван');
    await user.type(screen.getByTestId('field-contact'), '@test');
    await user.click(screen.getByRole('button', { name: 'Весільна' }));

    await user.click(screen.getByRole('button', { name: /замовити/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    consoleErrorSpy.mockRestore();
  });

  it('accepts initial sessionType prop', () => {
    renderComponent({ sessionType: 'family' });

    const familyButton = screen.getByRole('button', { name: 'Сімейна' });
    expect(familyButton).toHaveClass('opacity-100');
  });
});
