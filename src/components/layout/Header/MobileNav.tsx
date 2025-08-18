import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { burgerMenu, close } from '../../../assets/icons';
import { contactInfo } from '../../../config';
import { useMobileNav } from '../../../hooks';
import { fadeIn } from '../../../lib';
import type { NavItem } from '../../../types';
import { Button, ContactInfo, Icon } from '../../ui';

import Logo from './Logo';
import MobileNavItem from './MobileNavItem';

const panelVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

const overlayVariants = {
  hidden: { opacity: 0, pointerEvents: 'none' },
  visible: { opacity: 0.5, pointerEvents: 'auto' },
};

interface MobileNavProps {
  navigation: NavItem[];
}

const MobileNav = ({ navigation }: MobileNavProps) => {
  const { isOpen, activeSubmenu, toggleMenu, closeMenu, toggleSubmenu } = useMobileNav();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={toggleMenu}
        intent="minimal"
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="px-0 py-3 lg:hidden"
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
              className="fixed inset-0 z-40 h-screen bg-primary/80 lg:hidden"
            />

            {/* Sliding panel */}
            <motion.aside
              key="panel"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 z-50 h-screen bg-primary px-4 py-2 shadow-lg lg:hidden"
              aria-hidden={!isOpen}
            >
              <motion.div variants={fadeIn} className="flex h-full flex-col">
                {/* Header */}
                <div className="flex justify-between">
                  <Logo />
                  <Button intent="minimal" onClick={closeMenu} className="px-0 opacity-80">
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
                </nav>

                {/* Footer */}
                <div className="flex w-full flex-1 items-center">
                  <ContactInfo role="menu" items={contactInfo} />
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
