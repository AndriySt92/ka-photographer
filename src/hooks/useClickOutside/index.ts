import { useEffect, useState } from 'react';

type RefType<T extends HTMLElement> = React.RefObject<T | null>;

export const useClickOutside = <T extends HTMLElement>(ref: RefType<T>, initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen] as const;
};

export default useClickOutside;
