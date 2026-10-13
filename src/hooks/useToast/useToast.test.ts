import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';
import { renderHook } from '@testing-library/react';

import useToast from './';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    default: jest.fn(),
  },
}));

jest.mock('@/config', () => ({
  toastConfig: {
    defaults: { position: 'top-right', autoClose: 3000 },
  },
}));

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('showSuccess calls toast.success with message and merged options', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Success message';
    const customOptions = { autoClose: 5000 };

    result.current.showSuccess(message, customOptions);

    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(message, {
      position: 'top-right',
      autoClose: 5000,
    });
  });

  it('showError calls toast.error with message and merged options', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Error message';

    result.current.showError(message);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  });

  it('showWarning calls toast.warning with message and merged options', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Warning message';
    const customOptions = { position: 'bottom-center' };

    result.current.showWarning(message, customOptions as Partial<ToastOptions<unknown>>);

    expect(toast.warning).toHaveBeenCalledTimes(1);
    expect(toast.warning).toHaveBeenCalledWith(message, {
      position: 'bottom-center',
      autoClose: 3000,
    });
  });

  it('showInfo calls toast.info with message and merged options', () => {
    const { result } = renderHook(() => useToast());
    const message = 'Info message';

    result.current.showInfo(message);

    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  });

  it('showToast without custom options uses only defaults', () => {
    const { result } = renderHook(() => useToast());
    result.current.showSuccess('test');
    expect(toast.success).toHaveBeenCalledWith('test', {
      position: 'top-right',
      autoClose: 3000,
    });
  });

  it('multiple calls work independently', () => {
    const { result } = renderHook(() => useToast());
    result.current.showSuccess('s1');
    result.current.showError('e1');
    result.current.showWarning('w1');
    result.current.showInfo('i1');

    expect(toast.success).toHaveBeenCalledWith('s1', expect.any(Object));
    expect(toast.error).toHaveBeenCalledWith('e1', expect.any(Object));
    expect(toast.warning).toHaveBeenCalledWith('w1', expect.any(Object));
    expect(toast.info).toHaveBeenCalledWith('i1', expect.any(Object));
  });
});
