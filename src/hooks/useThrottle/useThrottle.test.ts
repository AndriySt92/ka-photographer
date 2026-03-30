import { act, renderHook } from '@testing-library/react';

import useThrottle from './';

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call callback immediately on first call', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 1000));

    act(() => {
      result.current('arg1', 'arg2');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should ignore calls within throttle delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 1000));

    act(() => {
      result.current('first');
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('first');

    act(() => {
      result.current('second');
    });
    // still within delay, should not call
    expect(callback).toHaveBeenCalledTimes(1);

    // Advance time by 500ms (still within)
    jest.advanceTimersByTime(500);
    act(() => {
      result.current('third');
    });
    expect(callback).toHaveBeenCalledTimes(1);

    // Advance to just after delay
    jest.advanceTimersByTime(500); // total 1000ms since first
    act(() => {
      result.current('fourth');
    });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('fourth');
  });

  it('should allow calls after delay passes', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 500));

    act(() => {
      result.current('first');
    });
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);
    act(() => {
      result.current('second');
    });
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(500);
    act(() => {
      result.current('third');
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should handle multiple arguments', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 1000));

    act(() => {
      result.current('a', 1, true);
    });
    expect(callback).toHaveBeenCalledWith('a', 1, true);
  });

  it('should update when callback changes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const { result, rerender } = renderHook(({ cb }) => useThrottle(cb, 1000), {
      initialProps: { cb: callback1 },
    });

    act(() => {
      result.current('test');
    });
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    // Change callback
    rerender({ cb: callback2 });

    jest.advanceTimersByTime(500); // still within 1000ms from first call
    act(() => {
      result.current('test2');
    });
    // Should not call because still within delay
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    // Advance past delay
    jest.advanceTimersByTime(500); // total 1000ms
    act(() => {
      result.current('test3');
    });
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith('test3');
  });

  it('should update when delay changes', () => {
    const callback = jest.fn();
    const { result, rerender } = renderHook(({ delay }) => useThrottle(callback, delay), {
      initialProps: { delay: 1000 },
    });

    act(() => {
      result.current('first');
    });
    expect(callback).toHaveBeenCalledTimes(1);

    // Change delay to 500
    rerender({ delay: 500 });

    act(() => {
      result.current('second');
    });
    expect(callback).toHaveBeenCalledTimes(1); // still throttled

    jest.advanceTimersByTime(500); // now 500ms since first
    act(() => {
      result.current('third');
    });
    // Now 500 >= 500, should call
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('third');
  });

  it('should not call callback if throttled function is not called', () => {
    const callback = jest.fn();
    renderHook(() => useThrottle(callback, 1000));
    expect(callback).not.toHaveBeenCalled();
  });
});
