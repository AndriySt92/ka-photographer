import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './';

jest.mock('@/components', () => {
  const { MockTypography, MockButton, MockIcon } = jest.requireActual('tests');

  return {
    Button: MockButton,
    Icon: MockIcon,
    Typography: MockTypography,
  };
});

jest.mock('@/config', () => ({
  contactInfo: {},
  allPhotoCategories: [],
  homePhotos: [],
  navigation: [],
  reviews: [],
}));

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

const CheckboxAny = Checkbox as any;

describe('Checkbox', () => {
  const defaultProps = {
    label: 'Тестовий чекбокс',
    id: 'test-checkbox',
  };

  it('renders with label', () => {
    render(<Checkbox {...defaultProps} />);
    expect(screen.getByLabelText('Тестовий чекбокс')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render((<CheckboxAny {...defaultProps} onChange={handleChange} />) as any);
    await user.click(screen.getByLabelText('Тестовий чекбокс'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be checked', () => {
    render((<CheckboxAny {...defaultProps} checked={true} onChange={jest.fn()} />) as any);
    expect(screen.getByLabelText('Тестовий чекбокс')).toBeChecked();
  });
});
