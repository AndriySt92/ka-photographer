import { useCallback, useRef } from 'react';

const useThrottle = <T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const lastCall = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay],
  );
};

export default useThrottle;
