import { useEffect, useState } from 'react';

const useScrollToTopVisibility = (threshold = 500) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      if (currentScrollPos > threshold && isScrollingUp) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [prevScrollPos, threshold]);

  return showScrollTop;
};

export default useScrollToTopVisibility;
