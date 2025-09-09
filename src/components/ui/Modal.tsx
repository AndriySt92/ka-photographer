import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { close } from '@/assets/icons';
import { useEventListener } from '@/hooks';
import { cn, modalVariants, overlayVariants } from '@/lib';

import { Button } from './Button';
import Icon from './Icon';
import Typography from './Typography';

interface Props {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title: string;
}

const Modal = ({ children, onClose, isOpen, title }: Props) => {
  const modalRoot = useMemo(() => document.getElementById('modal-root')!, []);

  useEffect(() => {
    // Disable scrolling when the modal is open
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  // Add listener for keydown event
  useEventListener('keydown', handleEscape);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-70"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <div
              className={cn(
                'relative w-fit max-w-[360px] rounded-md border border-secondary/40 bg-primary p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] sm:mx-2 sm:max-w-xl sm:p-6',
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                onClick={onClose}
                intent="minimal"
                aria-label="close modal"
                aria-expanded={isOpen}
                className="absolute right-0 top-0 p-2 opacity-70"
              >
                <Icon name="close" icon={close} size=" h-5 lg:h-5 aspect-auto" />
              </Button>

              <Typography parentAs="h2" size="2xl" align="center" className="mb-2 sm:mb-4">
                {title}
              </Typography>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot,
  );
};

export default Modal;
