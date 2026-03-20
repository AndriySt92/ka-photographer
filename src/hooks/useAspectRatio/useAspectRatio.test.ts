import { act, renderHook } from '@testing-library/react';

import useAspectRatio from './';

describe('useAspectRatio', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  it('returns the initial aspect ratio', () => {
    window.innerWidth = 1920;
    window.innerHeight = 1080;
    const { result } = renderHook(() => useAspectRatio());

    expect(result.current).toBe(1920 / 1080);
  });

  it('updates when the window size changes', () => {
    window.innerWidth = 1920;
    window.innerHeight = 1080;
    const { result } = renderHook(() => useAspectRatio());

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(800 / 600);
  });

  it('removes the listener when unmounted', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useAspectRatio());
    unmount();

    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
