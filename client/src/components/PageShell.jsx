import React from 'react';
import Navbar from '@/components/Navbar';

const PageShell = ({ children }) => {
  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 via-emerald-400/10 to-purple-500/20 blur-3xl" />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {children}
      </main>
    </div>
  );
};

export default PageShell;