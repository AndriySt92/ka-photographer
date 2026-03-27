import { act, renderHook } from '@testing-library/react';

import useMobileNav from './';

describe('useMobileNav', () => {
  it('initial state', () => {
    const { result } = renderHook(() => useMobileNav());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.activeSubmenu).toBeNull();
  });

  it('openMenu sets isOpen to true', () => {
    const { result } = renderHook(() => useMobileNav());
    act(() => {
      result.current.openMenu();
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.activeSubmenu).toBeNull();
  });

  it('closeMenu sets isOpen to false and activeSubmenu to null', () => {
    const { result } = renderHook(() => useMobileNav());

    act(() => {
      result.current.openMenu();
      result.current.toggleSubmenu('services');
    });
    expect(result.current.isOpen).toBe(true);
    expect(result.current.activeSubmenu).toBe('services');

    act(() => {
      result.current.closeMenu();
    });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.activeSubmenu).toBeNull();
  });

  it('toggleSubmenu toggles activeSubmenu', () => {
    const { result } = renderHook(() => useMobileNav());
    // Initially null
    act(() => {
      result.current.toggleSubmenu('services');
    });
    expect(result.current.activeSubmenu).toBe('services');

    act(() => {
      result.current.toggleSubmenu('services');
    });
    expect(result.current.activeSubmenu).toBeNull();

    act(() => {
      result.current.toggleSubmenu('about');
    });
    expect(result.current.activeSubmenu).toBe('about');
  });

  it('toggleSubmenu does not affect isOpen', () => {
    const { result } = renderHook(() => useMobileNav());
    expect(result.current.isOpen).toBe(false);
    act(() => {
      result.current.toggleSubmenu('services');
    });
    expect(result.current.isOpen).toBe(false);
  });
});
