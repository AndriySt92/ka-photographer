import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GroupButtons from './';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    LayoutGroup: jest
      .fn()
      .mockImplementation(({ children }) => <div data-testid="layout-group">{children}</div>),
    motion: {
      div: jest.fn().mockImplementation(({ children, ...props }) => {
        // Filter out animation props to avoid React DOM warnings
        const { layoutId, ...domProps } = props;
        return (
          <div data-layout-id={layoutId} {...domProps}>
            {children}
          </div>
        );
      }),
    },
  };
});

jest.mock('../Button', () => ({
  Button: jest.fn().mockImplementation(({ children, onClick, intent, type, className }) => (
    <button
      data-testid="button"
      data-intent={intent}
      data-type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )),
}));

jest.mock('../Typography', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ children, size, className }) => (
    <div data-testid="typography" data-size={size} className={className}>
      {children}
    </div>
  )),
}));

jest.mock('../ErrorMessage', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ error, animationKey }) =>
    error ? (
      <div data-testid="error-message" data-animation-key={animationKey}>
        {error}
      </div>
    ) : null,
  ),
}));

const mockOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

describe('GroupButtons', () => {
  const defaultProps = {
    options: mockOptions,
    selectedOption: 'opt1',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders options with correct labels', () => {
    render(<GroupButtons {...defaultProps} />);

    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('Option 1');
    expect(buttons[1]).toHaveTextContent('Option 2');
    expect(buttons[2]).toHaveTextContent('Option 3');
  });

  it('applies selected styles to the active option', () => {
    render(<GroupButtons {...defaultProps} />);

    const buttons = screen.getAllByTestId('button');
    expect(buttons[0]).toHaveClass('opacity-100');
    expect(buttons[0]).not.toHaveClass('opacity-80');
    expect(buttons[1]).toHaveClass('opacity-80');
  });

  it('calls onChange with correct value when option is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<GroupButtons {...defaultProps} onChange={handleChange} />);

    const buttons = screen.getAllByTestId('button');
    await user.click(buttons[1]); // click Option 2
    expect(handleChange).toHaveBeenCalledWith('opt2');
  });

  it('renders label when provided', () => {
    render(<GroupButtons {...defaultProps} label="Select an option" />);

    const typography = screen.getByTestId('typography');
    expect(typography).toHaveTextContent('Select an option');
  });

  it('renders error message when error is provided', () => {
    render(<GroupButtons {...defaultProps} error="Something went wrong" />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('Something went wrong');
  });

  it('does not render error message when no error', () => {
    render(<GroupButtons {...defaultProps} />);
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('applies custom className to root container', () => {
    render(<GroupButtons {...defaultProps} className="my-custom-class" />);
    expect(screen.getByTestId('group-buttons')).toHaveClass('my-custom-class');
  });

  it('renders LayoutGroup', () => {
    render(<GroupButtons {...defaultProps} />);
    expect(screen.getByTestId('layout-group')).toBeInTheDocument();
  });
});
