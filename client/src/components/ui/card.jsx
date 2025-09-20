import React from 'react';

const Card = ({ className = '', ...props }) => (
  <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:bg-white/10 ${className}`} {...props} />
);

const CardHeader = ({ className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

const CardTitle = ({ className = '', ...props }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight text-white ${className}`} {...props} />
);

const CardDescription = ({ className = '', ...props }) => (
  <p className={`text-sm text-white/70 ${className}`} {...props} />
);

const CardContent = ({ className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

const CardFooter = ({ className = '', ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };