import React from 'react';

const Sidebar = ({ items = [], onLogout, topOffsetClass = 'top-16', widthClass = 'w-48' }) => {
  return (
    <aside className={`hidden md:flex fixed left-0 ${topOffsetClass} z-40 h-[calc(100vh-4rem)] ${widthClass} flex-col bg-[#0b1220]/80 backdrop-blur-md border-r border-white/10 p-4 shadow-xl`}>
      <nav className="flex flex-col space-y-2 mt-2">
        {items.map(({ id, icon: Icon, label, onClick }) => (
          <button
            key={id}
            onClick={onClick}
            className="w-full flex items-center gap-3 px-3 py-2 rounded border border-black/10 bg-[#cfe3ff] text-black hover:bg-[#bcd8ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.15)]"
          >
            {Icon ? <Icon className="w-5 h-5" /> : null}
            <span>{label}</span>
          </button>
        ))}
      </nav>
      {onLogout && (
        <div className="pt-4 mt-auto">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded bg-red-600/90 hover:bg-red-600 text-white">
            <span>Log Out</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;



