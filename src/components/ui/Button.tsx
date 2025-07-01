import { type ElementType, forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type Variants } from 'framer-motion';

import { cn } from '../../lib';

const buttonVariants = cva(
  'rounded-full text-secondary transition-all duration-300 font-title uppercase hover:bg-accent/30',
  {
    variants: {
      intent: {
        primary: 'border border-secondary',
        secondary: 'bg-primary border border-secondary',
      },
      size: {
        textSm: 'px-5 py-2 lg:text-lg',
        textLg: 'px-5 py-2 lg:px-7 lg:py-3 lg:text-lg',
        iconSm: 'p-1 sm:p-2 h-10 w-10 lg:h-12 lg:w-12',
        iconLg: 'p-2 sm:p-3 h-14 w-14 lg:h-16 lg:w-16',
      },
    },
    compoundVariants: [
      // Scale for icon buttons
      {
        size: ['iconSm', 'iconLg'],
        class: 'hover:scale-110',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'textSm',
    },
  },
);

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
      isLoading,
      loadingText,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(buttonVariants({ intent, size, className }));

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
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {loadingText && <span>{loadingText}</span>}
          </span>
        ) : (
          children
        )}
      </Component>
    );
  },
);

Button.displayName = 'Button';
export const MButton = motion(Button);
