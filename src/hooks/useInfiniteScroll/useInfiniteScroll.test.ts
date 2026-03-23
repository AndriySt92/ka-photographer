import { renderHook } from '@testing-library/react';

import { useInViewport } from '..';

import useInfiniteScroll from './';

jest.mock('..', () => ({
  useInViewport: jest.fn(),
}));

describe('useInfiniteScroll', () => {
  const mockFetchNextPage = jest.fn();
  const defaultProps = {
    hasNextPage: true,
    isFetchingNextPage: false,
    fetchNextPage: mockFetchNextPage,
    rootMargin: '100px',
    threshold: 0.1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useInViewport as jest.Mock).mockReturnValue(false);
  });

  it('returns triggerRef and isInView', () => {
    const { result } = renderHook(() => useInfiniteScroll(defaultProps));
    expect(result.current).toHaveProperty('triggerRef');
    expect(result.current).toHaveProperty('isInView', false);
  });

  it('calls fetchNextPage when element comes into view', () => {
    const { rerender } = renderHook((props) => useInfiniteScroll(props), {
      initialProps: defaultProps,
    });

    // Initially not in view, fetch not called
    expect(mockFetchNextPage).not.toHaveBeenCalled();

    (useInViewport as jest.Mock).mockReturnValue(true);
    rerender(defaultProps); // trigger effect

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('does not call fetchNextPage when already fetching', () => {
    (useInViewport as jest.Mock).mockReturnValue(true);
    const props = { ...defaultProps, isFetchingNextPage: true };
    const { rerender } = renderHook((p) => useInfiniteScroll(p), {
      initialProps: props,
    });

    expect(mockFetchNextPage).not.toHaveBeenCalled();

    rerender(props);
    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('does not call fetchNextPage when hasNextPage is false', () => {
    (useInViewport as jest.Mock).mockReturnValue(true);
    const props = { ...defaultProps, hasNextPage: false };
    const { rerender } = renderHook((p) => useInfiniteScroll(p), {
      initialProps: props,
    });

    expect(mockFetchNextPage).not.toHaveBeenCalled();

    rerender(props);
    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('calls fetchNextPage only when condition becomes true', () => {
    const { rerender } = renderHook((p) => useInfiniteScroll(p), {
      initialProps: defaultProps,
    });

    // Not in view, no fetch
    expect(mockFetchNextPage).not.toHaveBeenCalled();

    // Set in view
    (useInViewport as jest.Mock).mockReturnValue(true);
    rerender(defaultProps);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    // Already in view, no additional call
    rerender(defaultProps);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    // Then out of view
    (useInViewport as jest.Mock).mockReturnValue(false);
    rerender(defaultProps);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('updates when dependencies change', () => {
    const { rerender } = renderHook((p) => useInfiniteScroll(p), {
      initialProps: defaultProps,
    });

    (useInViewport as jest.Mock).mockReturnValue(true);
    rerender(defaultProps);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    // Change hasNextPage to false while in view, should not trigger new fetch
    mockFetchNextPage.mockClear();
    rerender({ ...defaultProps, hasNextPage: false });
    expect(mockFetchNextPage).not.toHaveBeenCalled();

    // Change back to true
    rerender(defaultProps);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('passes rootMargin and threshold to useInViewport', () => {
    const rootMargin = '200px';
    const threshold = 0.5;
    const props = { ...defaultProps, rootMargin, threshold };

    renderHook(() => useInfiniteScroll(props));

    expect(useInViewport).toHaveBeenCalledWith(expect.any(Object), {
      root: null,
      rootMargin,
      threshold,
    });
  });
});
