import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib';

interface ErrorMessageProps {
  error?: string;
  className?: string;
  animationKey?: string;
  size?: 'sm' | 'lg';
}

const ErrorMessage = ({
  error,
  className,
  size = 'sm',
  animationKey = 'error-message',
}: ErrorMessageProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    lg: 'text-lg lg:text-xl',
  };

  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={cn('text-red-500', sizeClasses[size], className)}
          data-testid="error-message"
        >
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
