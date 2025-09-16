import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-sm';
  
  const variantClasses = {
    // Pastel light blue with dark text, subtle border and inner highlight
    default: 'bg-[#cfe3ff] text-black hover:bg-[#bcd8ff] border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.15)]',
    destructive: 'bg-red-500/90 text-white hover:bg-red-500 border border-white/10 shadow-sm shadow-red-500/20',
    outline: 'bg-white/5 text-white border border-white/20 hover:bg-white/10',
    secondary: 'bg-[#d6f5ea] text-black hover:bg-[#c8efe3] border border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.15)]',
    ghost: 'text-white hover:bg-white/10',
    link: 'underline-offset-4 hover:underline text-blue-300'
  };
  
  const sizeClasses = {
    default: 'h-10 py-2 px-5 rounded-full',
    sm: 'h-9 px-4 rounded-full',
    lg: 'h-12 px-8 rounded-full',
    icon: 'h-10 w-10 rounded-full'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export { Button };
