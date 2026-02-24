import { type ElementType, memo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type MotionProps, type Variants } from 'framer-motion';

import { cn, fadeIn } from '@/lib';

const typographyVariants = cva('uppercase leading-[0.8]', {
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
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-sm xl:text-base',
      lg: 'text-sm sm:text-base xl:text-lg',
      xl: 'sm:text-lg xl:text-xl',
      '2xl': 'text-base sm:text-lg xl:text-2xl',
      '3xl': 'text-lg sm:text-xl lg:text-2xl xl:text-3xl',
      '4xl': 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
      '5xl': 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl',
      '6xl': 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl',
      extraLarge: 'text-[40px] sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[160px] tracking-wider',
      custom: '',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
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
    align: 'left',
  },
});
type ParentTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'ul' | 'span';
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

const Typography = memo(
  ({
    parentAs = 'div',
    childAs = 'p',
    size,
    color,
    weight,
    align,
    font,
    style,
    className,
    childrenClasses = {},
    content,
    children,
    animated = false,
    parentMotionProps = { variants: fadeIn },
    childrenVariants,
  }: TypographyProps) => {
    const Tag: ElementType = animated ? motion(parentAs) : parentAs;
    const ChildTag: ElementType = animated ? motion(childAs) : childAs;

    return (
      <Tag
        className={cn(typographyVariants({ size, color, weight, font, align }), className)}
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
  },
  // Always skip re-render to prevent animation from restarting
  () => true,
);

export default Typography;
