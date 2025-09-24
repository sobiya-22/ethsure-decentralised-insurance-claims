import React from 'react';

const Button = ({ 
  className = '', 
  variant = 'default', 
  size = 'md', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-[#C6D9F7] hover:bg-[#B8D1F5] text-[#1f2937] shadow-lg hover:shadow-xl focus:ring-blue-500 font-semibold',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm',
    destructive: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-500',
    outline: 'border border-white/30 hover:bg-white/10 text-white hover:text-white',
    ghost: 'hover:bg-white/10 text-white'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props} 
    />
  );
};

export { Button };