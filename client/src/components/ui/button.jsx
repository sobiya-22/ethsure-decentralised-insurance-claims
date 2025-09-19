import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:scale-105 active:scale-95';
  
  const variantClasses = {
    default: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl',
    destructive: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-current bg-transparent hover:bg-current hover:text-background backdrop-blur-sm',
    secondary: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent hover:bg-white/10 backdrop-blur-sm',
    link: 'underline-offset-4 hover:underline text-primary bg-transparent'
  };
  
  const sizeClasses = {
    default: 'h-12 py-3 px-6',
    sm: 'h-10 px-4 text-sm',
    lg: 'h-14 px-8 text-lg',
    icon: 'h-12 w-12'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export { Button };
