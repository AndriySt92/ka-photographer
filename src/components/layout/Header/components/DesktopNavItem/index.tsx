import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { NavLink } from '@/components';
import type { NavItem } from '@/types';

interface DesktopNavProps {
  item: NavItem;
}

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.28, ease: 'easeOut', staggerChildren: 0.03 },
  },
  exit: { opacity: 0, scale: 0.95, filter: 'blur(6px)', transition: { duration: 0.2 } },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.09, duration: 0.5 },
  }),
};

const DesktopNavItem = ({ item }: DesktopNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      data-testid="desktop-nav-item"
    >
      <NavLink
        key={item.path}
        to={item.path}
        font="secondary"
        className="flex h-full items-center px-3 py-3"
        data-testid="nav-link-main"
      >
        {item.label}
      </NavLink>

      {item.children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key={item.label}
              initial={reduced ? 'visible' : 'hidden'}
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              transition={{ duration: reduced ? 0 : 0.28, ease: 'easeInOut' }}
              className="absolute left-0 top-full z-[100] min-w-[200px] bg-black/65 shadow-md backdrop-blur-lg"
              data-testid="dropdown"
            >
              {item.children.map((child, i) => (
                <motion.div
                  key={child.path}
                  initial="hidden"
                  animate="visible"
                  variants={listItemVariants}
                  custom={i}
                  data-testid={`dropdown-item-${i}`}
                >
                  <NavLink
                    to={child.path}
                    font="secondary"
                    className="block p-3 "
                    onClick={() => setIsOpen(false)}
                    data-testid={`dropdown-link-${i}`}
                  >
                    {child.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default DesktopNavItem;
