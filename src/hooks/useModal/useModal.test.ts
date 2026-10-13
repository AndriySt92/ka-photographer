import { act, renderHook } from '@testing-library/react';

import useModal from './';

describe('useModal', () => {
  it('initializes with isOpenModal = false', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpenModal).toBe(false);
  });

  it('opens modal when openModal is called', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpenModal).toBe(true);
  });

  it('closes modal when closeModal is called', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpenModal).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isOpenModal).toBe(false);
  });

  it('does nothing when openModal is called multiple times (already open)', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
      result.current.openModal();
    });
    expect(result.current.isOpenModal).toBe(true);
  });

  it('does nothing when closeModal is called while already closed', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isOpenModal).toBe(false);
  });

  it('memoizes openModal and closeModal (stable references)', () => {
    const { result, rerender } = renderHook(() => useModal());

    const initialOpen = result.current.openModal;
    const initialClose = result.current.closeModal;

    rerender();

    expect(result.current.openModal).toBe(initialOpen);
    expect(result.current.closeModal).toBe(initialClose);
  });
});
