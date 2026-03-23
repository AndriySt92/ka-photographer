import { act, renderHook } from '@testing-library/react';

import useInViewport from './';

describe('useInViewport', () => {
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockDisconnect: jest.Mock;
  let MockIntersectionObserver: jest.Mock;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();

    MockIntersectionObserver = jest.fn().mockImplementation((callback, options) => {
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        // Store callback and options to manually trigger later
        _callback: callback,
        _options: options,
      };
    });

    global.IntersectionObserver = MockIntersectionObserver as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns false initially', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useInViewport(ref));
    expect(result.current).toBe(false);
  });

  it('does not create observer if ref is null', () => {
    const ref = { current: null };
    renderHook(() => useInViewport(ref));
    expect(MockIntersectionObserver).not.toHaveBeenCalled();
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('creates observer and observes element on mount', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    renderHook(() => useInViewport(ref));

    expect(MockIntersectionObserver).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('passes options to IntersectionObserver', () => {
    const ref = { current: document.createElement('div') };
    const options = { threshold: 0.5, root: null, rootMargin: '10px' };
    renderHook(() => useInViewport(ref, options));

    expect(MockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options);
  });

  it('updates isInViewport when entry is intersecting', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useInViewport(ref));

    // Get the callback passed to IntersectionObserver
    const observerInstance = MockIntersectionObserver.mock.results[0].value;
    const callback = observerInstance._callback;

    act(() => {
      callback([{ isIntersecting: true }]);
    });
    expect(result.current).toBe(true);

    act(() => {
      callback([{ isIntersecting: false }]);
    });
    expect(result.current).toBe(false);
  });

  it('cleans up on unmount', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    const { unmount } = renderHook(() => useInViewport(ref));

    unmount();

    expect(mockUnobserve).toHaveBeenCalledWith(element);
    // According to the hook, it uses unobserve, not disconnect. But it should clean up correctly.
    expect(mockUnobserve).toHaveBeenCalledTimes(1);
  });

  it('re-creates observer when ref changes', () => {
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    const ref = { current: element1 };
    const { rerender } = renderHook(({ ref }) => useInViewport(ref), {
      initialProps: { ref },
    });

    expect(mockObserve).toHaveBeenCalledWith(element1);
    expect(mockObserve).toHaveBeenCalledTimes(1);

    // Change ref
    ref.current = element2;
    rerender({ ref });

    // Should unobserve old element and observe new one
    expect(mockUnobserve).toHaveBeenCalledWith(element1);
    expect(mockObserve).toHaveBeenCalledWith(element2);
    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it('updates when options change', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    const options1 = { threshold: 0.1 };
    const options2 = { threshold: 0.5 };

    const { rerender } = renderHook(({ options }) => useInViewport(ref, options), {
      initialProps: { options: options1 },
    });

    expect(MockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options1);
    expect(mockObserve).toHaveBeenCalledWith(element);
    expect(mockObserve).toHaveBeenCalledTimes(1);

    // Change options – should create new observer, unobserve old, observe new
    mockUnobserve.mockClear();
    mockObserve.mockClear();
    rerender({ options: options2 });

    expect(MockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options2);
    expect(mockUnobserve).toHaveBeenCalledWith(element);
    expect(mockObserve).toHaveBeenCalledWith(element);
  });
});
