'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  text: string;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    text: '',
  });
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for smooth cursor follow
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }));
    };

    const handleMouseEnterHoverable = (e: Event) => {
      const target = e.target as HTMLElement;
      const hoverText = target.dataset.cursorText || 'VIEW';
      setCursorState((prev) => ({ ...prev, isHovering: true, text: hoverText }));
    };

    const handleMouseLeaveHoverable = () => {
      setCursorState((prev) => ({ ...prev, isHovering: false, text: '' }));
    };

    // Listen for mouse movements
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-hoverable], .hoverable');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterHoverable);
        el.addEventListener('mouseleave', handleMouseLeaveHoverable);
      });
    };

    // Initial setup and mutation observer for dynamic content
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Crosshair Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: cursorState.isHovering ? 2.5 : cursorState.isClicking ? 0.8 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        >
          {/* Crosshair */}
          {!cursorState.isHovering && (
            <>
              {/* Horizontal line */}
              <motion.div
                className="absolute bg-white"
                style={{
                  width: '20px',
                  height: '2px',
                  left: '-10px',
                  top: '-1px',
                }}
              />
              {/* Vertical line */}
              <motion.div
                className="absolute bg-white"
                style={{
                  width: '2px',
                  height: '20px',
                  left: '-1px',
                  top: '-10px',
                }}
              />
              {/* Center dot */}
              <motion.div
                className="absolute bg-hot-pink rounded-full"
                style={{
                  width: '4px',
                  height: '4px',
                  left: '-2px',
                  top: '-2px',
                }}
              />
            </>
          )}

          {/* Hover Circle with Text */}
          {cursorState.isHovering && (
            <motion.div
              className="absolute flex items-center justify-center rounded-full border-2 border-white bg-transparent"
              style={{
                width: '60px',
                height: '60px',
                left: '-30px',
                top: '-30px',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <span
                className="text-white text-xs font-mono font-bold tracking-wider"
                style={{ fontSize: '8px' }}
              >
                {cursorState.text}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Trail Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="w-2 h-2 bg-hot-pink rounded-full opacity-50"
          style={{
            marginLeft: '-4px',
            marginTop: '-4px',
          }}
          animate={{
            scale: cursorState.isClicking ? 2 : 1,
            opacity: cursorState.isHovering ? 0 : 0.5,
          }}
        />
      </motion.div>
    </>
  );
}
