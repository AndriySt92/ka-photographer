import { act, renderHook } from '@testing-library/react';

import useWindowSize from './';

describe('useWindowSize', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  it('should return initial window size', () => {
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it('should update size when window resizes', () => {
    window.innerWidth = 800;
    window.innerHeight = 600;

    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 1200;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1200, height: 900 });
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useWindowSize());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('should handle multiple resize events correctly', () => {
    window.innerWidth = 800;
    window.innerHeight = 600;

    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 1024;
      window.innerHeight = 768;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1024, height: 768 });

    act(() => {
      window.innerWidth = 1920;
      window.innerHeight = 1080;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1920, height: 1080 });
  });
});
