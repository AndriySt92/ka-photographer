import { act, renderHook } from '@testing-library/react';

import useScrollToTopVisibility from './';

describe('useScrollToTopVisibility', () => {
  const originalPageYOffset = window.pageYOffset;

  beforeEach(() => {
    // Reset pageYOffset before each test
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: originalPageYOffset,
    });
  });

  it('initial state is false', () => {
    const { result } = renderHook(() => useScrollToTopVisibility());
    expect(result.current).toBe(false);
  });

  it('does not show button when scroll below threshold even if scrolling up', () => {
    const { result } = renderHook(() => useScrollToTopVisibility(500));

    act(() => {
      // Simulate scroll to 200 (below threshold)
      window.pageYOffset = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('shows button when scroll above threshold and scrolling up', () => {
    const { result } = renderHook(() => useScrollToTopVisibility(500));

    // First, scroll down to 600 (above threshold) – should not show yet because scrolling down
    act(() => {
      window.pageYOffset = 600;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false); // still false because scrolling down

    // Now scroll up to 550 (still above threshold)
    act(() => {
      window.pageYOffset = 550;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true);
  });

  it('hides button when scrolling down while above threshold', () => {
    const { result } = renderHook(() => useScrollToTopVisibility(500));

    // First, go to 600 and then scroll up to 550 to show button
    act(() => {
      window.pageYOffset = 600;
      window.dispatchEvent(new Event('scroll'));
    });
    act(() => {
      window.pageYOffset = 550;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true);

    // Now scroll down to 600 again
    act(() => {
      window.pageYOffset = 600;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false);
  });

  it('handles threshold changes', () => {
    const { result, rerender } = renderHook(
      ({ threshold }) => useScrollToTopVisibility(threshold),
      { initialProps: { threshold: 500 } },
    );

    // Scroll to 600 (above old threshold)
    act(() => {
      window.pageYOffset = 600;
      window.dispatchEvent(new Event('scroll'));
    });
    // Not shown because scrolling down
    expect(result.current).toBe(false);

    // Scroll up to 550 – still above threshold, should show
    act(() => {
      window.pageYOffset = 550;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true);

    rerender({ threshold: 700 });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollToTopVisibility());

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
