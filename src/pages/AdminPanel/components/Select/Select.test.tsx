import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useClickOutside } from '@/hooks';

import Select from './';

jest.mock('@/components', () => {
  const { MockButton, MockIcon } = jest.requireActual('tests');

  return {
    Button: MockButton,
    Icon: MockIcon,
  };
});

jest.mock('@/hooks', () => ({
  useClickOutside: jest.fn(),
}));

jest.mock('framer-motion', () => {
  const { createMotionComponent, MockAnimatePresence } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
    AnimatePresence: MockAnimatePresence,
  };
});

jest.mock('@/assets/icons', () => ({
  dropdownArrow: 'dropdown-arrow-mock',
}));

describe('Select', () => {
  const mockOptions = [
    { value: 'option1', label: 'Опція 1' },
    { value: 'option2', label: 'Опція 2' },
  ];

  const mockSetIsOpen = jest.fn();
  const dummyOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useClickOutside as jest.Mock).mockReturnValue([false, mockSetIsOpen]);
  });

  it('renders with selected option', () => {
    render(<Select options={mockOptions} value="option1" onChange={dummyOnChange} />);
    expect(screen.getByRole('button', { name: /Опція 1/ })).toBeInTheDocument();
  });

  it('opens options list on click', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} value="option1" onChange={dummyOnChange} />);

    const button = screen.getByRole('button', { name: /Опція 1/ });
    await user.click(button);

    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    (useClickOutside as jest.Mock).mockReturnValue([true, mockSetIsOpen]);

    render(<Select options={mockOptions} value="option1" onChange={handleChange} />);

    const option2Buttons = screen.getAllByText('Опція 2');
    await user.click(option2Buttons[0]);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe('option2');
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('hidden native select has correct value', () => {
    render(<Select options={mockOptions} value="option2" onChange={dummyOnChange} />);
    const hiddenSelect = screen.getByDisplayValue('Опція 2');
    expect(hiddenSelect).toHaveClass('opacity-0');
  });
});
