import { act, renderHook } from '@testing-library/react';

import useEventListener from './';

describe('useEventListener', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('adds event listener on mount when active', () => {
    const handler = jest.fn();
    const options = { passive: true };

    renderHook(() => useEventListener('click', handler, options, true));

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, options);
    expect(removeEventListenerSpy).not.toHaveBeenCalled();
  });

  it('does not add event listener when inactive', () => {
    const handler = jest.fn();

    renderHook(() => useEventListener('click', handler, undefined, false));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('removes event listener on unmount', () => {
    const handler = jest.fn();

    const { unmount } = renderHook(() => useEventListener('click', handler));

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).not.toHaveBeenCalled();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', handler, undefined);
  });

  it('removes and re-adds listener when handler changes', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    const { rerender } = renderHook(({ handler }) => useEventListener('click', handler), {
      initialProps: { handler: handler1 },
    });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler1, undefined);

    rerender({ handler: handler2 });

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', handler1, undefined);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler2, undefined);
  });

  it('removes and re-adds listener when options change', () => {
    const handler = jest.fn();
    const options1 = { capture: true };
    const options2 = { passive: true };

    const { rerender } = renderHook(({ options }) => useEventListener('click', handler, options), {
      initialProps: { options: options1 },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, options1);

    // Cast to any to bypass type checking (options can be any AddEventListenerOptions)
    rerender({ options: options2 as any });

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', handler, options1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, options2);
  });

  it('removes and re-adds listener when eventName changes', () => {
    const handler = jest.fn();

    const { rerender } = renderHook(({ eventName }) => useEventListener(eventName, handler), {
      initialProps: { eventName: 'click' as const },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, undefined);

    // Cast to any to allow changing the literal type
    rerender({ eventName: 'mousemove' as any });

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', handler, undefined);
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', handler, undefined);
  });

  it('removes listener when becomes inactive, and re-adds when becomes active', () => {
    const handler = jest.fn();

    const { rerender } = renderHook(
      ({ isActive }) => useEventListener('click', handler, undefined, isActive),
      { initialProps: { isActive: true } },
    );

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    rerender({ isActive: false });

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', handler, undefined);

    rerender({ isActive: true });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', handler, undefined);
  });

  it('calls handler when event is dispatched', () => {
    const handler = jest.fn();
    renderHook(() => useEventListener('resize', handler));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(Event));
  });
});
