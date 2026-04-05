export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0, 212, 255, 0.2)',
      '0 0 40px rgba(0, 212, 255, 0.4)',
      '0 0 20px rgba(0, 212, 255, 0.2)'
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const navSlideDown = {
  initial: { y: -80, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.3 } }
};

export const cursorBlink = {
  animate: {
    opacity: [1, 0, 1],
    transition: { duration: 1, repeat: Infinity }
  }
};

export const buttonPress = {
  tap: { scale: 0.95 },
  hover: { scale: 1.05 }
};
