import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import type { NavItem } from '../../../types';

interface DesktopNavProps {
  item: NavItem;
}

const DesktopNavItem = ({ item }: DesktopNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to={item.path}
        className="h-full px-3 py-7 font-body text-lg uppercase text-secondary transition-colors duration-300 hover:bg-accent/50"
      >
        {item.label}
      </Link>

      {item.children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute left-0 top-[51.5px] z-50 min-w-[200px] bg-primary/65"
            >
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  to={child.path}
                  className="block px-4 py-3 font-body text-base font-medium uppercase text-secondary transition-colors duration-300 hover:bg-accent/50"
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default DesktopNavItem;
