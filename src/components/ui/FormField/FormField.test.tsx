import { useWatch } from 'react-hook-form';
import { fireEvent, render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import FormField from './';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useWatch: jest.fn(),
}));

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
      label: createMotionComponent('label'),
    },
  };
});

jest.mock('../ErrorMessage', () => {
  const { MockErrorMessage } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockErrorMessage,
  };
});

const mockUseWatch = useWatch as jest.Mock;

describe('FormField', () => {
  const mockRegister = jest.fn().mockImplementation((name) => ({
    name,
    ref: jest.fn(),
    onChange: jest.fn(),
    onBlur: jest.fn(),
  }));
  const mockControl = {} as any;
  const defaultProps = {
    name: 'testField',
    label: 'Test Label',
    register: mockRegister,
    control: mockControl,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWatch.mockReturnValue('');
  });

  it('renders input with label and no error', () => {
    render(<FormField {...defaultProps} />);

    expect(screen.getByTestId('label-testField')).toBeInTheDocument();
    expect(screen.getByTestId('field-testField')).toBeInTheDocument();
    expect(screen.getByTestId('field-testField').tagName).toBe('INPUT');
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('renders textarea when as="textarea"', () => {
    render(<FormField {...defaultProps} as="textarea" />);
    expect(screen.getByTestId('field-testField').tagName).toBe('TEXTAREA');
  });

  it('displays error message when error prop provided', () => {
    render(<FormField {...defaultProps} error="This field is required" />);

    expect(screen.getByTestId('error-message')).toHaveTextContent('This field is required');
    expect(screen.getByTestId('field-testField')).toHaveClass('border-red-500');
  });

  it('calls register with name and validation', () => {
    const validation = { required: true };
    render(<FormField {...defaultProps} validation={validation} />);

    expect(mockRegister).toHaveBeenCalledWith('testField', validation);
  });

  it('passes additional props to input', () => {
    const testProps = {
      ...defaultProps,
      placeholder: 'Enter text',
      'data-custom': 'value',
    } as any;
    render(<FormField {...testProps} />);

    const input = screen.getByTestId('field-testField');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('data-custom', 'value');
  });

  describe('focus and value states', () => {
    it('label animates up on focus', () => {
      render(<FormField {...defaultProps} />);

      const input = screen.getByTestId('field-testField');
      fireEvent.focus(input);

      const motionLabelMock = motion.label as unknown as jest.Mock;
      const lastCall = motionLabelMock.mock.calls[motionLabelMock.mock.calls.length - 1][0];
      expect(lastCall.animate.y).toBe(-16);
    });

    it('label moves down on blur when value empty', () => {
      mockUseWatch.mockReturnValue('');
      render(<FormField {...defaultProps} />);

      const input = screen.getByTestId('field-testField');
      fireEvent.focus(input);
      fireEvent.blur(input);

      const motionLabelMock = motion.label as unknown as jest.Mock;
      const lastCall = motionLabelMock.mock.calls[motionLabelMock.mock.calls.length - 1][0];
      expect(lastCall.animate.y).toBe(10);
    });

    it('label stays up on blur when value not empty', () => {
      mockUseWatch.mockReturnValue('some value');
      render(<FormField {...defaultProps} />);

      const input = screen.getByTestId('field-testField');
      fireEvent.focus(input);
      fireEvent.blur(input);

      const motionLabelMock = motion.label as unknown as jest.Mock;
      const lastCall = motionLabelMock.mock.calls[motionLabelMock.mock.calls.length - 1][0];
      expect(lastCall.animate.y).toBe(-16);
    });
  });

  describe('textarea auto-resize', () => {
    it('adjusts height on input', () => {
      render(<FormField {...defaultProps} as="textarea" />);

      const textarea = screen.getByTestId('field-testField') as HTMLTextAreaElement;
      Object.defineProperty(textarea, 'scrollHeight', { value: 100, configurable: true });
      fireEvent.input(textarea);
      expect(textarea).toHaveStyle({ height: '100px' });
    });
  });

  describe('underline animation', () => {
    it('shows underline when focused', () => {
      render(<FormField {...defaultProps} />);

      const motionDivMock = motion.div as unknown as jest.Mock;
      const calls = motionDivMock.mock.calls;
      const lastCallBeforeFocus = calls[calls.length - 1][0];

      expect(lastCallBeforeFocus.animate.scaleX).toBe(0);

      const input = screen.getByTestId('field-testField');
      fireEvent.focus(input);

      const lastCallAfterFocus = motionDivMock.mock.calls[motionDivMock.mock.calls.length - 1][0];
      expect(lastCallAfterFocus.animate.scaleX).toBe(1);
    });

    it('shows error color when error present', () => {
      render(<FormField {...defaultProps} error="Error" />);

      const underline = screen.getByTestId('field-underline');
      expect(underline).toHaveClass('bg-red-500');
    });
  });
});
