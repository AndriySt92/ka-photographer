import type { ElementType } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type MotionProps, type Variants } from 'framer-motion';

import { cn } from '../../lib/';

const typographyVariants = cva('uppercase', {
  variants: {
    font: {
      primary: 'font-primary',
      secondary: 'font-secondary',
    },
    color: {
      dark: 'text-primary',
      light: 'text-secondary',
    },
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
      custom: '',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    font: 'primary',
    size: 'lg',
    color: 'light',
    weight: 'medium',
  },
});
type ParentTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'ul';
type ChildTag = 'p' | 'span' | 'li' | 'a';

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  parentAs?: ParentTag;
  childAs?: ChildTag;
  content?: string[];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animated?: boolean;
  childrenClasses?: Record<number, string>;
  parentMotionProps?: MotionProps;
  childrenVariants?: Variants;
}

const Typography = ({
  parentAs = 'div',
  childAs = 'p',
  size,
  color,
  weight,
  font = 'primary',
  style,
  className,
  childrenClasses = {},
  content,
  children,
  animated = false,
  parentMotionProps,
  childrenVariants,
}: TypographyProps) => {
  const Tag: ElementType = animated ? motion(parentAs) : parentAs;
  const ChildTag: ElementType = animated ? motion(childAs) : childAs;

  return (
    <Tag
      className={cn(typographyVariants({ size, color, weight, font }), className)}
      style={style}
      {...(animated ? parentMotionProps : {})}
    >
      {content
        ? content.map((child, index) => (
            <ChildTag
              key={index}
              className={childrenClasses[index] || ''}
              {...(animated && childrenVariants ? { variants: childrenVariants } : {})}
            >
              {child}
            </ChildTag>
          ))
        : children}
    </Tag>
  );
};

export default Typography;
