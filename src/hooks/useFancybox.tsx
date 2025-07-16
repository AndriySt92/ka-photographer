import { useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

const fancyboxOptions = {
  Thumbs: true,
  Toolbar: true,
  closeButton: false,
  Images: {
    zoom: true,
  },
};

export const useFancybox = () => {
  useEffect(() => {
    NativeFancybox.bind('[data-fancybox]', fancyboxOptions);

    return () => {
      NativeFancybox.unbind('[data-fancybox]');
      NativeFancybox.close();
    };
  }, []);
};

export default useFancybox;
