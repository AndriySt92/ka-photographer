import type { ToastOptions } from 'react-toastify';
import { Slide } from 'react-toastify';

export const toastCommonOptions: ToastOptions = {
  position: 'top-right' as const,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'dark' as const,
  transition: Slide,
};

const toastConfig = {
  container: {
    ...toastCommonOptions,
    newestOnTop: true,
    pauseOnFocusLoss: false,
  },

  classes: {
    toast:
      'bg-gradient-to-r from-accent/40 py-5 to-primary backdrop-blur-lg rounded-none sm:rounded-lg border border-white/10 shadow-lg',
    progress: '!bg-accent',
  },

  defaults: {
    ...toastCommonOptions,
  },
};

export default toastConfig;
