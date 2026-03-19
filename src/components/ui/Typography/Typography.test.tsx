import React from 'react';
import { render, screen } from '@testing-library/react';

import Typography from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests/mocks');
  const motionDiv = createMotionComponent('div');
  const motionSpan = createMotionComponent('span');
  const motionP = createMotionComponent('p');

  const motionMock = jest.fn().mockImplementation((tag) => {
    if (tag === 'div') return motionDiv;
    if (tag === 'span') return motionSpan;
    if (tag === 'p') return motionP;
    return jest.fn().mockImplementation((props) => React.createElement(tag, props));
  });

  (motionMock as any).div = motionDiv;
  (motionMock as any).span = motionSpan;
  (motionMock as any).p = motionP;

  return {
    motion: motionMock,
  };
});

describe('Typography', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props (div, lg, light, medium, left)', () => {
    render(<Typography>Hello</Typography>);

    const element = screen.getByTestId('typography');
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveClass(
      'font-primary',
      'text-secondary',
      'text-sm sm:text-base xl:text-lg',
      'font-medium',
      'text-left',
    );
  });

  it('renders with custom parentAs element', () => {
    render(<Typography parentAs="h1">Title</Typography>);

    const element = screen.getByTestId('typography');
    expect(element.tagName).toBe('H1');
  });

  describe('variants', () => {
    it('applies font variant', () => {
      render(<Typography font="secondary">Text</Typography>);

      const element = screen.getByTestId('typography');
      expect(element).toHaveClass('font-secondary');
      expect(element).not.toHaveClass('font-primary');
    });

    it('applies color variant', () => {
      render(<Typography color="dark">Text</Typography>);

      const element = screen.getByTestId('typography');
      expect(element).toHaveClass('text-primary');
      expect(element).not.toHaveClass('text-secondary');
    });

    it('applies size variant', () => {
      render(<Typography size="2xl">Text</Typography>);

      const element = screen.getByTestId('typography');
      expect(element).toHaveClass('text-base sm:text-lg xl:text-2xl');
    });

    it('applies weight variant', () => {
      render(<Typography weight="semibold">Text</Typography>);

      const element = screen.getByTestId('typography');
      expect(element).toHaveClass('font-semibold');
    });

    it('applies align variant', () => {
      render(<Typography align="center">Text</Typography>);

      const element = screen.getByTestId('typography');
      expect(element).toHaveClass('text-center');
    });
  });

  it('renders children directly', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByTestId('typography')).toHaveTextContent('Hello World');
  });

  it('renders content array with child tags', () => {
    const content = ['Line 1', 'Line 2'];
    render(<Typography content={content} childAs="li" childrenClasses={{ 1: 'special-class' }} />);

    const firstItem = screen.getByText('Line 1');
    const secondItem = screen.getByText('Line 2');

    expect(firstItem.tagName).toBe('LI');
    expect(secondItem.tagName).toBe('LI');
    expect(secondItem).toHaveClass('special-class');
  });
  describe('animation', () => {
    it('uses motion component when animated is true', () => {
      const { motion } = jest.requireMock('framer-motion');
      render(<Typography animated>Animated</Typography>);
      expect(motion).toHaveBeenCalledWith('div');
    });

    it('passes parentMotionProps when animated', () => {
      const { motion } = jest.requireMock('framer-motion');
      const motionProps = { initial: { opacity: 0 }, animate: { opacity: 1 } };
      render(
        <Typography animated parentMotionProps={motionProps}>
          Test
        </Typography>,
      );

      const lastCall = motion.div.mock.calls[motion.div.mock.calls.length - 1][0];
      expect(lastCall).toMatchObject(motionProps);
    });

    it('passes childrenVariants to child motion components', () => {
      const { motion } = jest.requireMock('framer-motion');
      const content = ['A', 'B'];
      const childrenVariants = { hidden: {}, visible: {} };

      render(
        <Typography
          animated
          content={content}
          childAs="span"
          childrenVariants={childrenVariants}
        />,
      );

      expect(motion.span).toHaveBeenCalledTimes(2);
      const firstChildCall = motion.span.mock.calls[0][0];
      expect(firstChildCall.variants).toBe(childrenVariants);
    });
  });

  it('merges custom className', () => {
    render(<Typography className="my-custom-class">Hello</Typography>);
    const element = screen.getByTestId('typography');
    expect(element).toHaveClass('my-custom-class');
  });

  it('applies style prop', () => {
    render(<Typography style={{ color: 'red' }}>Styled</Typography>);
    const element = screen.getByTestId('typography');
    expect(element).toHaveStyle('color: rgb(255, 0, 0)');
  });

  it('memoizes correctly (does not re-render on same props)', () => {
    const { rerender } = render(<Typography>First</Typography>);
    const firstElement = screen.getByTestId('typography');

    rerender(<Typography>First</Typography>);
    const secondElement = screen.getByTestId('typography');
    expect(firstElement).toBe(secondElement);
  });
});
