import { useCallback, useState } from 'react';

const useMobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, []);

  const toggleSubmenu = useCallback((label: string) => {
    setActiveSubmenu((current) => (current === label ? null : label));
  }, []);

  return {
    isOpen,
    activeSubmenu,
    openMenu,
    closeMenu,
    toggleSubmenu,
  };
};

export default useMobileNav;
