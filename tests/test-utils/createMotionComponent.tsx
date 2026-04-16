import type { JSX } from 'react';
import React from 'react';

interface MotionComponentProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

export const createMotionComponent = (tag: keyof JSX.IntrinsicElements) => {
  return jest.fn().mockImplementation(({ children, ...props }: MotionComponentProps) => {
    // All motion-specific props that should be filtered out
    const motionProps = [
      'initial',
      'animate',
      'exit',
      'whileHover',
      'whileTap',
      'whileFocus',
      'whileDrag',
      'whileInView',
      'viewport',
      'transition',
      'variants',
      'layout',
      'layoutId',
      'drag',
      'dragConstraints',
      'dragElastic',
      'dragMomentum',
      'dragPropagation',
      'onDrag',
      'onDragStart',
      'onDragEnd',
      'onDirectionLock',
      'onHoverStart',
      'onHoverEnd',
      'onTap',
      'onTapStart',
      'onTapCancel',
      'onPan',
      'onPanStart',
      'onPanEnd',
      'onPanSessionStart',
      'onViewportEnter',
      'onViewportLeave',
      'signal',
    ];

    // Build DOM props by including only non-motion props
    const domProps: Record<string, unknown> = {};
    for (const key in props) {
      if (!motionProps.includes(key)) {
        domProps[key] = props[key];
      }
    }

    return React.createElement(tag, domProps, children);
  });
};
