import React from 'react';

const Sidebar = ({ items = [], onLogout, topOffsetClass = 'top-16', widthClass = 'w-76' }) => {
  return (
    <aside className={`hidden md:flex fixed left-0 ${topOffsetClass} z-40 h-[calc(100vh-4rem)] ${widthClass} flex-col glass border-r border-white/10 p-4 shadow-xl`}>
      <nav className="flex flex-col space-y-2 mt-2">
        {items.map(({ id, icon: Icon, label, onClick }) => (
          <button
            key={id}
            onClick={onClick}
            className="sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-lg glass text-white hover:bg-white/10 transition-all duration-300 border-[3px] border-white/25 hover:border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] focus-visible:outline-none"
          >
            {Icon ? <Icon className="w-5 h-5" /> : null}
            <span>{label}</span>
          </button>
        ))}
      </nav>
      {onLogout && (
        <div className="pt-4 mt-auto">
          <button onClick={onLogout} className="sidebar-logout w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg glass text-white hover:bg-red-500/20 border-[3px] border-red-500/60 hover:border-red-500/80 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:outline-none">
            <span>Log Out</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;



