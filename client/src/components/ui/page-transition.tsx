import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type TransitionType = 'fade' | 'slide' | 'zoom' | 'slide-up' | 'slide-down';

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
  type?: TransitionType;
  duration?: number;
}

export function PageTransition({ 
  children, 
  className = '', 
  type = 'fade', 
  duration = 0.5 
}: PageTransitionProps) {
  
  // Farklı animasyon türleri için varyantlar
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { x: -30, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 30, opacity: 0 }
    },
    zoom: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 }
    },
    'slide-up': {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -30, opacity: 0 }
    },
    'slide-down': {
      initial: { y: -30, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 30, opacity: 0 }
    }
  };

  const selectedVariant = variants[type];

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={{ 
        duration: duration, 
        ease: [0.25, 0.1, 0.25, 1.0] // cubic-bezier ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}