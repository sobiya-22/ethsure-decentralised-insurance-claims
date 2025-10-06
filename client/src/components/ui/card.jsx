import React from 'react';

const Card = ({ className = '', ...props }) => (
  <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:bg-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] group m-1 relative overflow-hidden before:absolute before:inset-0 before:rounded-xl before:border before:border-transparent before:transition-all before:duration-300 hover:before:border-cyan-400/40 hover:before:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:before:animate-pulse ${className}`} {...props} />
);

const CardHeader = ({ className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 group-hover:bg-white/5 transition-all duration-300 rounded-t-xl ${className}`} {...props} />
);

const CardTitle = ({ className = '', ...props }) => (
  <h3 className={`text-lg sm:text-xl font-semibold leading-none tracking-tight text-white group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all duration-300 ${className}`} {...props} />
);

const CardDescription = ({ className = '', ...props }) => (
  <p className={`text-xs sm:text-sm text-white/70 group-hover:text-cyan-200/80 group-hover:drop-shadow-[0_0_4px_rgba(6,182,212,0.3)] transition-all duration-300 ${className}`} {...props} />
);

const CardContent = ({ className = '', ...props }) => (
  <div className={`p-4 sm:p-6 pt-0 ${className}`} {...props} />
);

const CardFooter = ({ className = '', ...props }) => (
  <div className={`flex items-center p-4 sm:p-6 pt-0 ${className}`} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };