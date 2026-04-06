import { fireEvent, render, screen } from '@testing-library/react';

import { useScrollToTopVisibility } from '@/hooks';

import ScrollToTopButton from './';

jest.mock('@/hooks', () => ({
  useScrollToTopVisibility: jest.fn(),
}));

const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', { value: mockScrollTo, writable: true });

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

jest.mock('@/assets', () => ({
  arrowTop: 'arrow-top-mock',
}));

jest.mock('@/lib', () => {
  const { mockCn } = jest.requireActual('tests');
  return { cn: mockCn };
});

describe('ScrollToTopButton', () => {
  const mockUseScrollToTopVisibility = useScrollToTopVisibility as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollTo.mockClear();
  });

  it('renders with visible classes when showScrollTop is true', () => {
    mockUseScrollToTopVisibility.mockReturnValue(true);
    render(<ScrollToTopButton />);

    const container = screen.getByTestId('scroll-to-top-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('translate-x-0', 'opacity-100');

    const background = screen.getByTestId('background');
    expect(background).toBeInTheDocument();

    const buttonMock = jest.requireMock('../Button').Button;
    expect(buttonMock).toHaveBeenCalled();
    const props = buttonMock.mock.calls[0][0];
    expect(props.size).toBe('iconLg');
    expect(props.intent).toBe('secondary');

    const icon = screen.getByTestId('icon-arrow-top');
    expect(icon).toHaveAttribute('data-size', 'h-9 lg:h-12 aspect-square');
    expect(icon).toHaveTextContent('arrow-top');
  });

  it('applies hidden classes when showScrollTop is false', () => {
    mockUseScrollToTopVisibility.mockReturnValue(false);
    render(<ScrollToTopButton />);

    const container = screen.getByTestId('scroll-to-top-container');
    expect(container).toHaveClass('translate-x-[170%]', 'opacity-0');
  });

  it('calls window.scrollTo with correct arguments when button is clicked', () => {
    mockUseScrollToTopVisibility.mockReturnValue(true);
    render(<ScrollToTopButton />);

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('calls cn function when rendering', () => {
    const cnMock = jest.requireMock('@/lib').cn;
    mockUseScrollToTopVisibility.mockReturnValue(true);
    render(<ScrollToTopButton />);

    expect(cnMock).toHaveBeenCalled();
  });
});
