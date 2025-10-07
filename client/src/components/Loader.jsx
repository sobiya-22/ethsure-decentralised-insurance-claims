import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-white/10`}></div>
        
        {/* Inner spinning ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 animate-spin absolute top-0 left-0`}></div>
        
        {/* Center dot */}
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse absolute top-0 left-0 flex items-center justify-center`}>
          <div className="w-1/3 h-1/3 rounded-full bg-white animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

// Full page loader
export const FullPageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="text-center space-y-6">
        {/* Main loader */}
        <div className="relative mx-auto">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-white/10"></div>
          
          {/* Spinning ring */}
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 border-b-purple-500 animate-spin absolute top-0 left-0"></div>
          
          {/* Center logo */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse absolute top-0 left-0 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{message}</h3>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline loader for buttons and small components
export const InlineLoader = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-white/30 border-t-cyan-400 rounded-full animate-spin"></div>
      <span className="text-sm text-gray-300">Loading...</span>
    </div>
  );
};

// Card loader for content areas
export const CardLoader = () => {
  return (
    <div className="glass p-6 rounded-xl">
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-32 animate-pulse"></div>
            <div className="h-3 bg-white/5 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="h-3 bg-white/10 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-8 bg-white/10 rounded w-24 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
