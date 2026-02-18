import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './';

jest.mock('@/components', () => ({
  Icon: jest.fn(({ name, icon, size, className }) => (
    <div
      data-testid="icon"
      data-name={name}
      data-icon={icon}
      data-size={size}
      className={className}
    >
      {name}
    </div>
  )),
  Typography: jest.fn(({ children, parentAs, size, className }) => {
    const Tag = parentAs || 'div';
    return (
      <Tag data-testid="typography" data-size={size} className={className}>
        {children}
      </Tag>
    );
  }),
  Button: jest.fn(({ children, onClick, type, disabled }) => (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )),
}));

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
