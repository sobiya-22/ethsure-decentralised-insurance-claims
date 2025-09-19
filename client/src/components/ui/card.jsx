import React from 'react';

const Card = ({ className = '', ...props }) => (
  <div className={`enhanced-card ${className}`} {...props} />
);

const CardHeader = ({ className = '', ...props }) => (
  <div className={`flex flex-col space-y-2 p-8 ${className}`} {...props} />
);

const CardTitle = ({ className = '', ...props }) => (
  <h3 className={`text-2xl font-bold leading-tight tracking-tight text-white ${className}`} {...props} />
);

const CardDescription = ({ className = '', ...props }) => (
  <p className={`text-base text-gray-300 leading-relaxed ${className}`} {...props} />
);

const CardContent = ({ className = '', ...props }) => (
  <div className={`p-8 pt-0 ${className}`} {...props} />
);

const CardFooter = ({ className = '', ...props }) => (
  <div className={`flex items-center p-8 pt-0 ${className}`} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
