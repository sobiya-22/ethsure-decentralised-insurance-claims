/**
 * Responsive Design Utilities
 * Helper functions for responsive behavior in React components
 */

// Detect if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Detect if device supports hover
export const supportsHover = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover)').matches;
};

// Detect if device is touch-capable
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return true; // Assume touch on SSR
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Detect viewport width breakpoints
export const getViewportSize = () => {
  if (typeof window === 'undefined') return { width: 1024, height: 768 };
  
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

// Check if current viewport matches a breakpoint
export const matchesBreakpoint = (breakpoint) => {
  if (typeof window === 'undefined') return false;
  
  const breakpoints = {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };
  
  return window.innerWidth >= breakpoints[breakpoint];
};

// Dynamic responsive classes based on viewport
export const getResponsiveClasses = (config) => {
  const baseClass = config.base || '';
  const responsiveClass = config.responsive || '';
  
  return `${baseClass} ${responsiveClass}`.trim();
};

// Convert pixel to responsive units
export const toResponsiveRem = (px) => {
  return (px / 16).toFixed(3) + 'rem';
};

// Generate responsive spacing
export const generateResponsiveSpacing = (config) => {
  const { xs, sm, md, lg, xl } = config;
  
  let spacing = '';
  if (xs) spacing += `xs:${xs} `;
  if (sm) spacing += `sm:${sm} `;
  if (md) spacing += `md:${md} `;
  if (lg) spacing += `lg:${lg} `;
  if (xl) spacing += `xl:${xl} `;
  
  return spacing.trim();
};

// Responsive font size helper
export const getResponsiveFontSize = (baseSize, scale = 1.2) => {
  const sizes = {
    xs: baseSize * 0.875,
    sm: baseSize * 0.75,
    md: baseSize,
    lg: baseSize * scale,
    xl: baseSize * (scale * 1.2)
  };
  
  return sizes;
};

// Dynamic classes for different device types
export const getDeviceClasses = () => {
  const classes = [];
  
  if (isTouchDevice()) classes.push('touch-device');
  if (!supportsHover()) classes.push('no-hover');
  if (prefersReducedMotion()) classes.push('reduced-motion');
  
  return classes.join(' ');
};

// Responsive component props generator
export const getResponsiveProps = (props, breakpoint) => {
  const responsiveProps = {};
  
  Object.keys(props).forEach(key => {
    const prop = props[key];
    if (typeof prop === 'object' && prop !== null) {
      // If it's an object with responsive values
      const value = prop[breakpoint] || prop.default;
      responsiveProps[key] = value;
    } else {
      responsiveProps[key] = prop;
    }
  });
  
  return responsiveProps;
};

// Safe area handling for mobile devices
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
    right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0'),
    bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
    left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0')
  };
};

// Dynamic responsive hook for React components
export const useResponsive = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      prefersReducedMotion: true,
      supportsHover: false,
      width: 1024,
      height: 768
    };
  }
  
  const width = window.innerWidth;
  
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isTouch: isTouchDevice(),
    prefersReducedMotion: prefersReducedMotion(),
    supportsHover: supportsHover(),
    width,
    height: window.innerHeight
  };
};

// Responsive media queries helper
export const mediaQuery = (breakpoint, size) => {
  if (typeof window === 'undefined') return false;
  
  const breakpoints = {
    xs: `(min-width: 320px)`,
    sm: `(min-width: 640px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 1024px)`,
    xl: `(min-width: 1280px)`,
    '2xl': `(min-width: 1536px)`
  };
  
  return window.matchMedia(breakpoints[breakpoint]).matches;
};

// Responsive grid helper utilities
export const getResponsiveColumns = (breakpoints) => {
  const { xs = 1, sm = 2, md = 3, lg = 4, xl = 5 } = breakpoints;
  
  return [
    xs === 1 ? '' : `grid-cols-${xs}`,
    sm !== xs ? `sm:grid-cols-${sm}` : '',
    md !== sm ? `md:grid-cols-${md}` : '',
    lg !== md ? `lg:grid-cols-${lg}` : '',
    xl !== lg ? `xl:grid-cols-${xl}` : ''
  ].filter(Boolean).join(' ');
};

// Enhanced mobile detection
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Performance-optimized responsive handlers
export const debounceResponsiveCallback = (callback, delay = 100) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay);
  };
};

// CSS-in-JS responsive helpers
export const createResponsiveStyles = (styles, breakpoint) => {
  const breakpoints = {
    xs: '(max-width: 639px)',
    sm: '(min-width: 640px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 1023px)',
    lg: '(min-width: 1024px) and (max-width: 1279px)',
    xl: '(min-width: 1280px)'
  };
  
  return styles[breakpoint] || styles.default || {};
};

export default {
  prefersReducedMotion,
  supportsHover,
  isTouchDevice,
  getViewportSize,
  matchesBreakpoint,
  getResponsiveClasses,
  toResponsiveRem,
  generateResponsiveSpacing,
  getResponsiveFontSize,
  getDeviceClasses,
  getResponsiveProps,
  getSafeAreaInsets,
  useResponsive,
  mediaQuery,
  getResponsiveColumns,
  isMobileDevice,
  debounceResponsiveCallback,
  createResponsiveStyles
};
