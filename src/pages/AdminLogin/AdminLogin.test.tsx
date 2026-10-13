import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useLogin from '@/hooks/useLogin';
import { getErrorMessage } from '@/utils';

import SignIn from './';

jest.mock('@/components', () => {
  const { MockTypography, MockButton, MockErrorMessage, MockFormField } =
    jest.requireActual('tests');

  return {
    Typography: MockTypography,
    Button: MockButton,
    ErrorMessage: MockErrorMessage,
    FormField: MockFormField,
  };
});

jest.mock('@/hooks/useLogin', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/utils', () => ({
  getErrorMessage: jest.fn((error) => error?.message || 'Помилка'),
}));

describe('SignIn', () => {
  const mockMutate = jest.fn();
  const mockUseLogin = useLogin as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLogin.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
  });

  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText("Ім'я"), 'test@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password123');
  };

  it('renders the form with title, fields, and submit button', () => {
    render(<SignIn />);

    expect(screen.getByTestId('typography')).toHaveTextContent('Авторизація');
    expect(screen.getAllByTestId('form-field')).toHaveLength(2);
    expect(screen.getByTestId('button')).toHaveTextContent('Увійти');
  });

  describe('validation', () => {
    it('displays required error when fields are empty and form is touched', async () => {
      const user = userEvent.setup();
      render(<SignIn />);

      const emailInput = screen.getByLabelText("Ім'я");
      const passwordInput = screen.getByLabelText('Пароль');

      await user.type(emailInput, 'a');
      await user.clear(emailInput);
      await user.type(passwordInput, 'a');
      await user.clear(passwordInput);

      const errors = await screen.findAllByTestId(/error-/);
      expect(errors).toHaveLength(2);

      expect(screen.getByTestId('error-password')).toHaveTextContent("Обов'язкове поле");
      expect(screen.getByTestId('error-email')).toHaveTextContent("Обов'язкове поле");
    });

    it('validates email pattern', async () => {
      const user = userEvent.setup();
      render(<SignIn />);

      const emailInput = screen.getByLabelText("Ім'я");
      await user.type(emailInput, 'invalid-email');
      await user.tab(); // blur the input to trigger validation

      await waitFor(() => {
        expect(screen.getByTestId('error-email')).toHaveTextContent(
          'Будь ласка, введіть коректну email адресу',
        );
      });
    });

    it('validates password min length', async () => {
      const user = userEvent.setup();
      render(<SignIn />);

      const passwordInput = screen.getByLabelText('Пароль');
      await user.type(passwordInput, '12345'); // 5 chars, min is 6
      await user.tab();

      await waitFor(() => {
        expect(screen.getByTestId('error-password')).toHaveTextContent(
          'Пароль має містити щонайменше 6 символів',
        );
      });
    });

    it('button is disabled when form is invalid', async () => {
      const user = userEvent.setup();
      render(<SignIn />);

      // Initially form is empty => invalid
      expect(screen.getByTestId('button')).toBeDisabled();

      // Fill valid data
      await fillValidForm(user);

      // After typing, form becomes valid
      await waitFor(() => {
        expect(screen.getByTestId('button')).toBeEnabled();
      });
    });
  });

  describe('submission', () => {
    it('calls mutate with form data on valid submit', async () => {
      const user = userEvent.setup();
      render(<SignIn />);

      await fillValidForm(user);

      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('does not call mutate when form is invalid', async () => {
      const user = userEvent.setup();
      render(<SignIn />);

      // Leave email empty, fill only password
      await user.type(screen.getByLabelText('Пароль'), 'password123');

      const submitButton = screen.getByTestId('button');
      await user.click(submitButton);

      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  describe('loading and error states', () => {
    it('disables button and shows loading text when isPending is true', () => {
      mockUseLogin.mockReturnValue({
        mutate: mockMutate,
        isPending: true,
        error: null,
      });

      render(<SignIn />);

      const button = screen.getByTestId('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toHaveTextContent('Вхід'); // loadingText
    });

    it('displays error message from useLogin', () => {
      const testError = new Error('Невірний логін або пароль');
      mockUseLogin.mockReturnValue({
        mutate: mockMutate,
        isPending: false,
        error: testError,
      });

      render(<SignIn />);

      expect(screen.getByTestId('error-message')).toHaveTextContent('Невірний логін або пароль');
      expect(getErrorMessage).toHaveBeenCalledWith(testError);
    });
  });
});
