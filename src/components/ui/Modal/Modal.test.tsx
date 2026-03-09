import { act, fireEvent, render, screen } from '@testing-library/react';

import { useEventListener } from '@/hooks';

import Modal from './';

// Mock the portal root
beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  // eslint-disable-next-line testing-library/no-node-access
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
  jest.clearAllMocks();
});

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests/test-utils');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
    AnimatePresence: jest.fn().mockImplementation(({ children }) => <>{children}</>),
  };
});

jest.mock('@/hooks', () => ({
  useEventListener: jest.fn(),
}));

jest.mock('@/assets', () => ({
  close: 'close-icon-mock',
}));

jest.mock('../Button', () => {
  const { MockButton } = jest.requireActual('tests/mocks');
  return { Button: MockButton };
});

jest.mock('../Icon', () => {
  const { MockIcon } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockIcon,
  };
});

jest.mock('../Typography', () => {
  const { MockTypography } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <div data-testid="modal-child">Modal content</div>,
  };

  beforeEach(() => {
    // Reset body classes
    document.body.className = '';
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-child')).toBeInTheDocument();
  });

  it('displays the title', () => {
    render(<Modal {...defaultProps} />);

    const typography = screen.getByTestId('typography');
    expect(typography).toHaveTextContent('Test Modal');
  });

  it('shows close button by default', () => {
    render(<Modal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('hides close button when withCloseButton is false', () => {
    render(<Modal {...defaultProps} withCloseButton={false} />);
    expect(screen.queryByRole('button', { name: /close modal/i })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the content (on overlay)', () => {
    render(<Modal {...defaultProps} />);

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the content', () => {
    render(<Modal {...defaultProps} />);

    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('adds overflow-hidden to body when modal opens', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body).not.toHaveClass('overflow-hidden');

    rerender(<Modal {...defaultProps} isOpen={true} />);
    expect(document.body).toHaveClass('overflow-hidden');
  });

  it('removes overflow-hidden from body when modal closes', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);
    expect(document.body).toHaveClass('overflow-hidden');

    rerender(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body).not.toHaveClass('overflow-hidden');
  });

  it('listens for Escape key and calls onClose', () => {
    let handler: (e: KeyboardEvent) => void;
    (useEventListener as jest.Mock).mockImplementation((event, cb) => {
      if (event === 'keydown') {
        handler = cb;
      }
    });

    render(<Modal {...defaultProps} />);
    // Simulate Escape key
    act(() => {
      handler({ key: 'Escape' } as KeyboardEvent);
    });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

    // Other keys should not trigger
    act(() => {
      handler({ key: 'Enter' } as KeyboardEvent);
    });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1); // still one
  });
});
