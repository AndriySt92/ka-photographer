import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import BackgroundGradient from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
  };
});

describe('BackgroundGradient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a regular div by default (non-animated)', () => {
    render(<BackgroundGradient />);

    const element = screen.getByTestId('background-gradient');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('DIV');
    expect(motion.div).not.toHaveBeenCalled();
  });

  it('applies default gradient and opacity class', () => {
    render(<BackgroundGradient />);

    const element = screen.getByTestId('background-gradient');

    expect(element).toHaveClass('z-5', 'absolute', 'h-full', 'w-full', 'opacity-40');
    expect(element).toHaveStyle({
      background: 'linear-gradient(90deg, #1a00ff 0%, transparent 100%)',
    });
  });

  it('applies custom className and style', () => {
    const customClass = 'my-custom-class';
    const customStyle = { background: 'red', opacity: 0.5 };
    render(<BackgroundGradient className={customClass} style={customStyle} />);

    const element = screen.getByTestId('background-gradient');

    expect(element).toHaveClass(customClass);
    expect(element).toHaveStyle(customStyle);
  });

  it('renders motion.div when animated is true', () => {
    render(<BackgroundGradient animated={true} />);

    expect(motion.div).toHaveBeenCalledTimes(1);

    const motionElement = screen.getByTestId('background-gradient');
    expect(motionElement).toBeInTheDocument();
  });

  it('passes motionProps to motion.div when animated', () => {
    const motionProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1 },
    };
    render(<BackgroundGradient animated={true} motionProps={motionProps} />);

    expect(motion.div).toHaveBeenCalledWith(expect.objectContaining(motionProps), undefined);
  });

  it('does not pass motionProps to regular div', () => {
    const motionProps = { initial: { opacity: 0 } };
    render(<BackgroundGradient animated={false} motionProps={motionProps} />);

    const element = screen.getByTestId('background-gradient');
    expect(element).not.toHaveAttribute('initial');
  });
});
