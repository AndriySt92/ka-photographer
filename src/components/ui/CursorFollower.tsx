import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spring effect to the mouse position
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 60 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 60 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if cursor is within the container
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX.set(x - 20);
        mouseY.set(y - 20);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {isVisible && (
        <motion.div
          className="absolute left-0 top-0 z-[9999] h-12 w-12 rounded-full opacity-40"
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
