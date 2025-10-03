import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { NavLink } from '@/components';
import type { NavItem } from '@/types';

interface DesktopNavProps {
  item: NavItem;
}

const DesktopNavItem = ({ item }: DesktopNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink
        key={item.path}
        to={item.path}
        font="secondary"
        className="flex h-full items-center px-3 py-3"
      >
        {item.label}
      </NavLink>

      {item.children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute left-0 top-full z-50 min-w-[200px] bg-primary/85 shadow-md backdrop-blur-3xl backdrop-filter"
            >
              {item.children.map((item) => (
                <NavLink key={item.path} to={item.path} font="secondary" className="block p-3 ">
                  {item.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default DesktopNavItem;
