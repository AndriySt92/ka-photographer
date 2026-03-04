import { useNavigate } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GoBackButton from './';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../Button', () => ({
  Button: jest.fn().mockImplementation(({ children, onClick, size, intent }) => (
    <button data-testid="go-back-button" data-size={size} data-intent={intent} onClick={onClick}>
      {children}
    </button>
  )),
}));

jest.mock('../Icon', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(({ icon, name, size }) => (
      <div data-testid="icon" data-icon={icon} data-name={name} data-size={size} />
    )),
}));

describe('GoBackButton', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders a button with correct props', () => {
    render(<GoBackButton />);

    const button = screen.getByTestId('go-back-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-size', 'iconLg');
    expect(button).toHaveAttribute('data-intent', 'primary');
  });

  it('renders Icon with correct props', () => {
    render(<GoBackButton />);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('data-name', 'arrow-left');
    expect(icon).toHaveAttribute('data-size', 'h-8 w-8');
  });

  it('calls navigate(-1) when clicked', async () => {
    const user = userEvent.setup();
    render(<GoBackButton />);

    const button = screen.getByTestId('go-back-button');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
