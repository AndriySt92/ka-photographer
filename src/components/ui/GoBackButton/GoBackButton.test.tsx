import { useNavigate } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GoBackButton from './';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../Button', () => {
  const { MockButton } = jest.requireActual('tests');
  return { Button: MockButton };
});

jest.mock('../Icon', () => {
  const { MockIcon } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockIcon,
  };
});

describe('GoBackButton', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders a button with correct props', () => {
    render(<GoBackButton />);

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-size', 'iconLg');

    const buttonMock = jest.requireMock('../Button').Button;
    expect(buttonMock).toHaveBeenCalled();
    const [props] = buttonMock.mock.calls[0];
    expect(props.intent).toBe('primary');
  });

  it('renders Icon with correct props', () => {
    render(<GoBackButton />);

    const icon = screen.getByTestId('icon-arrow-left');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-size', 'h-8 w-8');
    expect(icon).toHaveTextContent('arrow-left');
  });

  it('calls navigate(-1) when clicked', async () => {
    const user = userEvent.setup();
    render(<GoBackButton />);

    const button = screen.getByTestId('button');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
