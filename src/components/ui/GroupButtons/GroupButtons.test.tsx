import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GroupButtons from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent, MockLayoutGroup } = jest.requireActual('tests');

  return {
    LayoutGroup: MockLayoutGroup,
    motion: {
      div: createMotionComponent('div'),
    },
  };
});

jest.mock('../Button', () => {
  const { MockButton } = jest.requireActual('tests');
  return { Button: MockButton };
});

jest.mock('../Typography', () => {
  const { MockTypography } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

jest.mock('../ErrorMessage', () => {
  const { MockErrorMessage } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockErrorMessage,
  };
});

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
