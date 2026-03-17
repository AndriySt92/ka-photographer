import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { burgerMenu, close, logout } from '@/assets';
import { Button, ContactInfo, Icon } from '@/components';
import { contactInfo } from '@/config';
import { useMobileNav } from '@/hooks';
import { fadeIn, overlayVariants } from '@/lib';
import type { NavItem } from '@/types';

import Logo from '../Logo';
import MobileNavItem from '../MobileNavItem';

const panelVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

interface MobileNavProps {
  navigation: NavItem[];
  onLogout: () => void;
  isLoggingOut: boolean;
  isAdmin: boolean;
}

const MobileNav = ({ navigation, isAdmin, onLogout, isLoggingOut }: MobileNavProps) => {
  const { isOpen, activeSubmenu, openMenu, closeMenu, toggleSubmenu } = useMobileNav();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={openMenu}
        intent="minimal"
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="px-0 py-2 lg:hidden"
        disabled={isOpen}
        data-testid="open-menu-button"
      >
        <Icon icon={burgerMenu} size="h-8 w-8" name="burgerMenu" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={closeMenu}
              className="fixed inset-0 z-[90] h-screen bg-primary/80 lg:hidden"
              data-testid="menu-overlay"
            />

            {/* Sliding panel */}
            <motion.aside
              key="panel"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 z-[100] h-screen bg-primary px-4 py-2 shadow-lg lg:hidden"
              aria-hidden={!isOpen}
              data-testid="menu-panel"
            >
              <motion.div
                variants={fadeIn}
                className="flex h-full flex-col"
                data-testid="menu-panel-content"
              >
                {/* Header */}
                <div className="flex justify-between">
                  <Logo />
                  <Button
                    intent="minimal"
                    onClick={closeMenu}
                    className="px-0 opacity-80"
                    data-testid="close-menu-button"
                  >
                    <Icon icon={close} name="close" size="w-6 h-6" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="mt-6">
                  {navigation.map((item) => (
                    <MobileNavItem
                      key={item.label}
                      item={item}
                      isActive={activeSubmenu === item.label}
                      toggleSubmenu={() => toggleSubmenu(item.label)}
                      closeMenu={closeMenu}
                    />
                  ))}

                  {/* Button logout*/}
                  {isAdmin && (
                    <div className="py-3">
                      <Button
                        onClick={() => onLogout()}
                        intent="minimal"
                        className="px-0 py-2 opacity-80 hover:opacity-100"
                        disabled={isLoggingOut}
                        data-testid="logout-button"
                      >
                        <Icon icon={logout} size="h-5 w-5" name="logout" />
                      </Button>
                    </div>
                  )}
                </nav>

                {/* Footer */}
                <div className="flex w-full flex-1 items-center">
                  <ContactInfo role="menu" items={contactInfo} data-testid="contact-info-menu" />
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default MobileNav;
