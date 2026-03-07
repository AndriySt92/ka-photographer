import { fireEvent, render, screen } from '@testing-library/react';

import SessionOrderModal from './';

jest.mock('../Modal', () => ({
  __esModule: true,
  default: jest.fn(({ isOpen, onClose, title, children }) =>
    isOpen ? (
      <div data-testid="modal" data-title={title}>
        <button data-testid="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    ) : null,
  ),
}));

jest.mock('../SessionOrderForm', () => ({
  __esModule: true,
  default: jest.fn(({ sessionType, onSubmitSuccess }) => (
    <div data-testid="session-order-form" data-session-type={sessionType}>
      <button data-testid="trigger-success" onClick={() => onSubmitSuccess && onSubmitSuccess()}>
        Submit Success
      </button>
    </div>
  )),
}));

describe('SessionOrderModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    sessionType: 'wedding',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Modal with correct props when open', () => {
    render(<SessionOrderModal {...defaultProps} />);

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('data-title', 'Замовити фотосесію');
  });

  it('renders with custom title', () => {
    render(<SessionOrderModal {...defaultProps} title="Custom Title" />);

    const modal = screen.getByTestId('modal');
    expect(modal).toHaveAttribute('data-title', 'Custom Title');
  });

  it('passes sessionType to SessionOrderForm', () => {
    render(<SessionOrderModal {...defaultProps} />);

    const form = screen.getByTestId('session-order-form');
    expect(form).toHaveAttribute('data-session-type', 'wedding');
  });

  it('does not render Modal when isOpen is false', () => {
    render(<SessionOrderModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('calls onClose when Modal close button is clicked', () => {
    render(<SessionOrderModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId('modal-close'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when form triggers onSubmitSuccess', () => {
    render(<SessionOrderModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId('trigger-success'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
