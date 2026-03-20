import { act, renderHook } from '@testing-library/react';

import { useClickOutside } from './';

describe('useClickOutside', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useClickOutside({ current: null }, true));
    expect(result.current[0]).toBe(true);
  });

  it('does not close when clicking inside the referenced element', () => {
    const div = document.createElement('div');
    const ref = { current: div };
    const { result } = renderHook(() => useClickOutside(ref, true));

    act(() => {
      // Dispatch event on the element itself (inside)
      div.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    });

    expect(result.current[0]).toBe(true);
  });

  it('closes when clicking outside the referenced element', () => {
    const div = document.createElement('div');
    const ref = { current: div };
    const { result } = renderHook(() => useClickOutside(ref, true));

    act(() => {
      // Dispatch event on document body (outside)
      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    });

    expect(result.current[0]).toBe(false);
  });

  it('adds event listener only when isOpen is true', () => {
    const addSpy = jest.spyOn(document, 'addEventListener');
    const removeSpy = jest.spyOn(document, 'removeEventListener');

    const { result } = renderHook(() => useClickOutside({ current: null }, false));

    // Initially isOpen is false – no listener added
    expect(addSpy).not.toHaveBeenCalled();

    // Set isOpen to true
    act(() => {
      result.current[1](true);
    });
    expect(addSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function));

    // Set isOpen back to false – listener should be removed
    act(() => {
      result.current[1](false);
    });
    expect(removeSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function));
  });
});
