import { useEffect } from 'react';

export const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
  isActive = true,
) => {
  useEffect(() => {
    if (!isActive) return;

    window.addEventListener(eventName, handler, options);

    return () => {
      window.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, options, isActive]);
};

export default useEventListener;
