import React, { createContext, useContext, useState } from 'react';

const TooltipContext = createContext({ open: false, setOpen: () => {} });

export const TooltipProvider = ({ children }) => children;

export const Tooltip = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = ({ asChild = false, children }) => {
  const { setOpen } = useContext(TooltipContext);
  const triggerProps = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  };
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps);
  }
  return (
    <button type="button" {...triggerProps} className="inline-flex">
      {children}
    </button>
  );
};

export const TooltipContent = ({ children, className = '' }) => {
  const { open } = useContext(TooltipContext);
  return (
    <div
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 transition-opacity duration-150 ${
        open ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      <div className="glass text-white text-xs px-2 py-1 rounded-md border border-white/10 whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};



