import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);
  const lastPosition = useRef({ clientX: 0, clientY: 0 });

  const springX = useSpring(mouseX, { stiffness: 1000, damping: 60 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 60 });

  // Update the motion values based on current mouse position inside the container
  const updateCursorPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientX, clientY } = lastPosition.current;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Check if cursor is inside container to show
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      mouseX.set(x - 24); // Offset by half the cursor size
      mouseY.set(y - 24);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
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

  // Bind mouse and scroll events globally
  const bindEvents = useCallback(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
  }, [handleMouseMove, handleScroll]);

  // Unbind events and hide the follower
  const unbindEvents = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    setIsVisible(false);
  }, [handleMouseMove, handleScroll]);

  // Observe if the container is visible in the viewport
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        bindEvents();
      } else {
        unbindEvents();
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: '100px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
      unbindEvents();
    };
  }, [bindEvents, unbindEvents]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {isVisible && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-50 h-12 w-12 rounded-full opacity-40"
          style={{
            x: springX,
            y: springY,
            backgroundColor: '#1a00ff',
            boxShadow: '0 0 20px 25px #1a00ff',
          }}
        />
      )}
    </div>
  );
};

export default CursorFollower;
