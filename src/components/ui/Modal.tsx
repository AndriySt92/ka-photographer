import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { close } from '@/assets';
import { useEventListener } from '@/hooks';
import { modalVariants, overlayVariants } from '@/lib';

import { Button, Icon, Typography } from '..';

interface Props {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  withCloseButton?: boolean;
}

const Modal = ({ children, onClose, isOpen, title, withCloseButton = true }: Props) => {
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
            className="overlow-hidden fixed inset-0 z-[70] flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <div
              className="relative max-h-[95vh] w-fit max-w-[360px] overflow-y-auto rounded-2xl border border-secondary/90 bg-primary p-6 sm:mx-2 sm:max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {withCloseButton && (
                <Button
                  onClick={onClose}
                  intent="minimal"
                  aria-label="close modal"
                  aria-expanded={isOpen}
                  className="absolute right-2 top-2 z-10 rounded-lg bg-secondary/10 p-2 backdrop-blur-sm hover:scale-105 hover:bg-secondary/15"
                >
                  <Icon name="close" icon={close} size=" h-4 aspect-auto" />
                </Button>
              )}

              <div className="mb-6 border-b border-secondary/30 pb-3 pt-1 sm:pb-4 sm:pt-2">
                <Typography parentAs="h2" size="2xl" align="center" className="text-xl">
                  {title}
                </Typography>
              </div>
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
