import { useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import { useEventListener, useInViewport, useThrottle } from '@/hooks';

const OFFSET = 24;

const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 60 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 60 });

  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ clientX: 0, clientY: 0 });

  // Update the motion values based on current mouse position inside the container
  const updateCursorPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientX, clientY } = lastPosition.current;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    mouseX.set(x - OFFSET); // Offset by half the cursor size
    mouseY.set(y - OFFSET);
  }, [mouseX, mouseY]);

  // Save mouse position on move and update follower
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      lastPosition.current = { clientX: e.clientX, clientY: e.clientY };
      updateCursorPosition();
    },
    [updateCursorPosition],
  );

  // On scroll, recheck the follower position
  const handleScroll = useCallback(() => {
    updateCursorPosition();
  }, [updateCursorPosition]);

  // Observe if the container is visible in the viewport
  const isInSection = useInViewport(containerRef, {
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  });

  // Throttle the handlers
  const throttledMouseMove = useThrottle(handleMouseMove, 50);
  const throttledScroll = useThrottle(handleScroll, 50);

  // Attach the listeners only when inside the section (isInSection = true)
  useEventListener('mousemove', throttledMouseMove, undefined, isInSection);
  useEventListener('scroll', throttledScroll, { passive: true }, isInSection);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden pointer-fine:block"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 h-12 w-12 rounded-full opacity-40"
        style={{
          x: springX,
          y: springY,
          backgroundColor: '#1a00ff',
          boxShadow: '0 0 20px 25px #1a00ff',
        }}
      />
    </div>
  );
};

export default CursorFollower;
