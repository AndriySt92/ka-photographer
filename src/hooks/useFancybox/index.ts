import { useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

const fancyboxOptions = {
  dragToClose: true,
  hideScrollbar: false,

  Carousel: {
    transition: 'fade',

    Zoomable: {
      Panzoom: {
        maxScale: 0.6,
      },
    },

    Thumbs: {
      showOnStart: true,
    },

    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ['autoplay', 'fullscreen', 'close'],
      },
    },
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
