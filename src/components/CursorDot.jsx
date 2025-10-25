import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateEnabled = (event) => {
      setIsEnabled(event.matches);
      if (!event.matches) {
        setIsVisible(false);
      }
    };

    updateEnabled(mediaQuery);
    mediaQuery.addEventListener('change', updateEnabled);

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return undefined;

    const handlePointerMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handlePointerDown = () => setIsActive(true);
    const handlePointerUp = () => setIsActive(false);
    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('mouseenter', handlePointerEnter);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('mouseenter', handlePointerEnter);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.35)] backdrop-blur-sm"
      animate={{
        x: position.x,
        y: position.y,
        scale: isActive ? 1.8 : 1,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.6 }}
    />
  );
}
