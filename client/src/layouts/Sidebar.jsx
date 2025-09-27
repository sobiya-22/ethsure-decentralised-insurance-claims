import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ items = [], onLogout, topOffsetClass = 'top-16', widthClass = 'w-64', currentView = 'overview', isMobileOpen = false, onMobileClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sidebarContent = (
    <>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-transparent to-emerald-500/10 rounded-xl blur-xl opacity-50" />
      {/* Mobile Close Button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={onMobileClose}
          className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex flex-col h-full relative z-10">
        <nav className="flex-1 space-y-3 mt-4">
          {items.map((item, index) => (
            <div key={item.id} className={`transform transition-all duration-500 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'}`} style={{ transitionDelay: `${(index + 1) * 100}ms` }}>
              <button onClick={() => { item.onClick(); onMobileClose?.(); }} className={`group w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-white transition-all duration-300 ease-out relative overflow-hidden hover:translate-x-1 hover:scale-[1.02] hover:shadow-xl border-2 backdrop-blur-sm ${currentView === item.id ? 'border-blue-400/60 bg-gradient-to-r from-blue-500/20 to-blue-400/10 shadow-[0_8px_20px_rgba(96,165,250,0.15)]' : 'border-white/20 hover:border-blue-400/40 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-emerald-500/10'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/0 to-emerald-500/0 group-hover:from-blue-500/10 group-hover:via-blue-400/10 group-hover:to-emerald-500/10 transition-all duration-300 rounded-xl" />
                <div className="relative">
                  <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${currentView === item.id ? 'text-blue-300' : 'text-gray-300 group-hover:text-blue-300'} ${currentView === item.id ? 'drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : ''}`} />
                  {currentView === item.id && (
                    <div className="absolute inset-0 w-5 h-5">
                      <div className="absolute inset-0 bg-blue-400/30 rounded-full animate-ping" />
                    </div>
                  )}
                </div>
                <span className={`font-medium tracking-wide transition-all duration-300 relative ${currentView === item.id ? 'text-blue-100 font-semibold' : 'text-gray-200 group-hover:text-white'}`}>
                  {item.label}
                  <span className={`absolute bottom-[-2px] left-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300 ${currentView === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </span>
                {currentView === item.id && (
                  <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                )}
                <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-150">
                  <div className="absolute inset-0 bg-white/10 rounded-xl animate-ping" />
                </div>
              </button>
            </div>
          ))}
        </nav>
        <div className={`mt-auto transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${(items.length + 1) * 100}ms` }}>
          <button onClick={() => { onLogout(); onMobileClose?.(); }} className="group w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-white bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/50 hover:from-red-500/30 hover:to-red-600/30 hover:border-red-400/70 hover:shadow-[0_8px_20px_rgba(239,68,68,0.2)] transition-all duration-300 ease-out relative overflow-hidden hover:translate-x-1 hover:scale-[1.02] backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-300 rounded-xl" />
            <div className="relative">
              <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 text-red-300 group-hover:text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <div className="absolute inset-0 w-5 h-5">
                <div className="absolute inset-0 bg-red-400/20 rounded-full group-hover:animate-ping" />
              </div>
            </div>
            <span className="font-medium tracking-wide text-red-100 group-hover:text-white transition-all duration-300 relative">
              Log Out
              <span className="absolute bottom-[-2px] left-0 h-0.5 bg-gradient-to-r from-red-400 to-red-500 w-0 group-hover:w-full transition-all duration-300" />
            </span>
            <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-150">
              <div className="absolute inset-0 bg-white/10 rounded-xl animate-ping" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 ${topOffsetClass} z-40 h-[calc(100vh-4rem)] ${widthClass} flex-col glass border-r border-white/10 p-4 shadow-xl hidden md:flex ${isVisible ? 'animate-slideInLeft' : 'translate-x-[-100%] opacity-0'} transition-all duration-700 ease-out backdrop-blur-xl bg-gradient-to-b from-gray-900/80 via-gray-800/70 to-gray-900/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:via-transparent before:to-emerald-500/5 before:pointer-events-none hover:shadow-2xl hover:shadow-blue-500/10`}>
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 h-full w-72 flex-col glass border-r border-white/10 p-4 pt-24 shadow-2xl md:hidden transition-all duration-300 ease-out backdrop-blur-xl bg-gradient-to-b from-gray-900/98 via-gray-800/95 to-gray-900/98 before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:via-transparent before:to-emerald-500/5 before:pointer-events-none hover:shadow-3xl hover:shadow-blue-500/10 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
    </>
  );
};
export default Sidebar;