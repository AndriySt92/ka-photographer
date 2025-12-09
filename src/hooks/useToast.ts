import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

import { toastConfig } from '@/config';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = 'info',
    options?: Partial<ToastOptions>,
  ) => {
    const mergedOptions: ToastOptions = {
      ...toastConfig.defaults,
      ...options,
    };

    switch (type) {
      case 'success':
        toast.success(message, mergedOptions);
        break;
      case 'error':
        toast.error(message, mergedOptions);
        break;
      case 'warning':
        toast.warning(message, mergedOptions);
        break;
      case 'info':
        toast.info(message, mergedOptions);
        break;
      default:
        toast(message, mergedOptions);
    }
  };

  return {
    showSuccess: (message: string, options?: Partial<ToastOptions>) =>
      showToast(message, 'success', options),
    showError: (message: string, options?: Partial<ToastOptions>) =>
      showToast(message, 'error', options),
    showWarning: (message: string, options?: Partial<ToastOptions>) =>
      showToast(message, 'warning', options),
    showInfo: (message: string, options?: Partial<ToastOptions>) =>
      showToast(message, 'info', options),
  };
};

export default useToast;
