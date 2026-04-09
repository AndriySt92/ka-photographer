import { render, screen } from '@testing-library/react';
import { useMotionValue, useSpring } from 'framer-motion';

import { useEventListener, useInViewport, useThrottle } from '@/hooks';

import CursorFollower from './';

jest.mock('framer-motion', () => ({
  useMotionValue: jest.fn(() => ({
    set: jest.fn(),
  })),
  useSpring: jest.fn(() => ({})),
  motion: {
    div: jest.fn(({ children, style, className, ...props }) => (
      <div style={style} className={className} {...props}>
        {children}
      </div>
    )),
  },
}));

jest.mock('@/hooks', () => ({
  useEventListener: jest.fn(),
  useInViewport: jest.fn(),
  useThrottle: jest.fn((fn) => fn),
}));

const mockGetBoundingClientRect = (rect: DOMRect) => {
  const original = window.Element.prototype.getBoundingClientRect;
  window.Element.prototype.getBoundingClientRect = jest.fn(() => rect);
  return () => {
    window.Element.prototype.getBoundingClientRect = original;
  };
};

describe('CursorFollower', () => {
  const mockUseInViewport = useInViewport as jest.Mock;
  const mockUseEventListener = useEventListener as jest.Mock;
  const mockUseThrottle = useThrottle as jest.Mock;
  const mockUseMotionValue = useMotionValue as jest.Mock;
  const mockUseSpring = useSpring as jest.Mock;

  let mouseXMock: { set: jest.Mock };
  let mouseYMock: { set: jest.Mock };
  let springXMocK: unknown;
  let springYMocK: unknown;

  beforeEach(() => {
    jest.clearAllMocks();

    mouseXMock = { set: jest.fn() };
    mouseYMock = { set: jest.fn() };
    mockUseMotionValue.mockReturnValueOnce(mouseXMock).mockReturnValueOnce(mouseYMock);

    springXMocK = {};
    springYMocK = {};
    mockUseSpring.mockReturnValueOnce(springXMocK).mockReturnValueOnce(springYMocK);

    mockUseInViewport.mockReturnValue(false);
    mockUseThrottle.mockImplementation((fn) => fn);
    mockUseEventListener.mockImplementation((fn) => fn);
  });

  it('renders a container div with correct classes', () => {
    render(<CursorFollower />);
    const container = screen.getByTestId('cursor-follower-container');
    expect(container).toHaveClass(
      'pointer-events-none absolute inset-0 z-20 hidden overflow-hidden pointer-fine:block',
    );
  });

  it('renders the inner motion.div with initial styles', () => {
    render(<CursorFollower />);
    const motionDiv = screen.getByTestId('cursor-follower');
    expect(motionDiv).toBeInTheDocument();
    expect(motionDiv).toHaveClass('h-12 w-12 rounded-full opacity-40');
    expect(motionDiv).toHaveStyle('background-color: #1a00ff');
    expect(motionDiv).toHaveStyle('box-shadow: 0 0 20px 25px #1a00ff');
  });

  it('calls useInViewport with correct ref and options', () => {
    render(<CursorFollower />);
    expect(mockUseInViewport).toHaveBeenCalledTimes(1);
    const call = mockUseInViewport.mock.calls[0];
    expect(call[0].current).toBeInstanceOf(HTMLDivElement);
    expect(call[1]).toEqual({
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });
  });

  it('attaches event listeners only when isInSection is true', () => {
    mockUseInViewport.mockReturnValue(false);
    render(<CursorFollower />);
    expect(mockUseEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
      undefined,
      false,
    );
    expect(mockUseEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
      false,
    );

    mockUseEventListener.mockClear();
    mockUseInViewport.mockReturnValue(true);
    render(<CursorFollower />);
    expect(mockUseEventListener).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
      undefined,
      true,
    );
    expect(mockUseEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
      true,
    );
  });

  it('calls useThrottle with the mouse move and scroll handlers', () => {
    render(<CursorFollower />);
    expect(mockUseThrottle).toHaveBeenCalledTimes(2);
    expect(mockUseThrottle).toHaveBeenCalledWith(expect.any(Function), 50);
    expect(mockUseThrottle).toHaveBeenCalledWith(expect.any(Function), 50);
  });

  describe('mouse movement', () => {
    it('updates motion values when mouse moves inside container', () => {
      mockUseInViewport.mockReturnValue(true);
      let capturedMouseHandler: ((e: MouseEvent) => void) | undefined;
      mockUseEventListener.mockImplementation((eventName, handler) => {
        if (eventName === 'mousemove') capturedMouseHandler = handler;
      });

      render(<CursorFollower />);
      const restoreRect = mockGetBoundingClientRect(new DOMRect(100, 200, 300, 400));

      expect(capturedMouseHandler).toBeDefined();
      capturedMouseHandler!(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));

      expect(mouseXMock.set).toHaveBeenCalledWith(150 - 100 - 24);
      expect(mouseYMock.set).toHaveBeenCalledWith(250 - 200 - 24);

      restoreRect();
    });
  });

  describe('scroll handling', () => {
    it('updates cursor position on scroll', () => {
      mockUseInViewport.mockReturnValue(true);
      let capturedMouseHandler: ((e: MouseEvent) => void) | undefined;
      let capturedScrollHandler: (() => void) | undefined;
      mockUseEventListener.mockImplementation((eventName, handler) => {
        if (eventName === 'mousemove') capturedMouseHandler = handler;
        else if (eventName === 'scroll') capturedScrollHandler = handler;
      });

      render(<CursorFollower />);
      const restoreRect = mockGetBoundingClientRect(new DOMRect(100, 200, 300, 400));

      expect(capturedMouseHandler).toBeDefined();
      capturedMouseHandler!(new MouseEvent('mousemove', { clientX: 150, clientY: 250 }));

      mouseXMock.set.mockClear();
      mouseYMock.set.mockClear();

      expect(capturedScrollHandler).toBeDefined();
      capturedScrollHandler!();

      expect(mouseXMock.set).toHaveBeenCalledWith(150 - 100 - 24);
      expect(mouseYMock.set).toHaveBeenCalledWith(250 - 200 - 24);

      restoreRect();
    });
  });
});
