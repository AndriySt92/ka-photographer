import { type ElementType, forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

import { buttonTextVariants, cn } from '@/lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-secondary transition-all duration-300 font-title uppercase disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        primary: 'border border-secondary',
        secondary:
          'bg-primary border border-secondary pointer-fine:hover:bg-accent/40 active:bg-accent/40',
        minimal: 'bg-transparent border-none',
      },
      size: {
        textSm: 'px-5 py-2 text-sm lg:text-base',
        textLg: 'px-5 py-2 lg:px-10 lg:py-3 text-base lg:text-lg xl:text-xl',
        iconSm: 'p-1 sm:p-2 h-10 w-10 lg:h-12 lg:w-12 flex-shrink-0',
        iconLg: 'p-1 sm:p-3 h-14 w-14 lg:h-16 lg:w-16 flex-shrink-0',
      },
    },
    compoundVariants: [
      {
        intent: ['primary', 'secondary'],
        class: 'hover:scale-105 active:scale-95',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'textSm',
    },
  },
);

const motionSpanProps = {
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'exit' as const,
  variants: buttonTextVariants,
  transition: {
    duration: 0.18,
    ease: 'easeInOut',
  },
  className: 'inline-flex items-center justify-center gap-2',
};

type ButtonAs = 'button' | typeof Link;

interface ButtonBaseProps extends VariantProps<typeof buttonVariants> {
  as?: ElementType;
  to?: string;
  className?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variants?: Variants;
  disabled?: boolean;
}

type ButtonProps<T extends ButtonAs> = (T extends 'button'
  ? React.ButtonHTMLAttributes<HTMLButtonElement>
  : LinkProps) &
  ButtonBaseProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps<ButtonAs>>(
  (
    {
      as: Component = 'button' as ElementType,
      intent,
      size,
      className,
      isLoading = false,
      loadingText,
      children,
      onClick,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(buttonVariants({ intent, size }), className);

    // Handle link
    if (Component === Link) {
      return (
        <Link
          className={baseClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as LinkProps)}
        >
          {children}
        </Link>
      );
    }

    // Regular button
    return (
      <Component
        className={baseClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        disabled={isLoading || disabled}
        aria-disabled={isLoading || disabled}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.span {...motionSpanProps} key="loading">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {loadingText && <span>{loadingText}</span>}
            </motion.span>
          ) : (
            <motion.span {...motionSpanProps} key="content">
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </Component>
    );
  },
);

Button.displayName = 'Button';
export const MButton = motion(Button);
