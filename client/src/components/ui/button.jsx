import React from 'react';

const Button = ({ 
  className = '', 
  variant = 'default', 
  size = 'md', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98]';
  
  const variants = {
    default: 'bg-[#C6D9F7] hover:bg-[#B8D1F5] text-[#1f2937] shadow-lg hover:shadow-xl focus:ring-blue-500 font-semibold hover:shadow-2xl',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm hover:shadow-lg',
    destructive: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-500 hover:shadow-2xl',
    outline: 'border border-white/30 hover:bg-white/10 text-white hover:text-white hover:border-white/50 hover:shadow-lg',
    ghost: 'hover:bg-white/10 text-white hover:shadow-md'
  };
  
  const sizes = {
    sm: 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm',
    md: 'px-3 sm:px-4 py-1.5 sm:py-2 text-sm',
    lg: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props} 
    />
  );
};

export { Button };