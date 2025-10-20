import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { X, LogOut } from "lucide-react";

const Sidebar = ({ items = [], isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const renderItems = items.map((item) => (
    <div
      key={item.id}
      className="transition-all duration-500 ease-out opacity-100"
    >
      <button
        onClick={() => {
          navigate(item.path);
          setIsOpen(false);
        }}
        className="group w-full flex items-center space-x-2 sm:space-x-2 px-3 sm:px-4 py-2.5 sm:py-3.5 
                   rounded-xl text-white transition-all duration-300 ease-out relative 
                   overflow-hidden border-2 border-white/20 hover:border-blue-400/40 
                   hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-emerald-500/10 
                   hover:shadow-lg"
      >
        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-blue-300 transition-all duration-300" />
        <span className="font-medium text-sm sm:text-base truncate flex-1">
          {item.label}
        </span>
      </button>
    </div>
  ));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 md:w-72 
          glass border-r border-white/10 p-3 pt-24 shadow-2xl 
          transition-transform duration-300 ease-out backdrop-blur-xl
          bg-gradient-to-b from-gray-900/98 via-gray-800/95 to-gray-900/98
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Close button */}
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Items */}
          <nav className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {renderItems}
          </nav>

          {/* Logout fixed at bottom */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="group w-full flex items-center space-x-2 px-4 py-3.5 rounded-xl text-white 
                         bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/50 
                         hover:from-red-500/30 hover:to-red-600/30 hover:border-red-400/70 
                         hover:shadow-lg transition-all duration-300 ease-out relative overflow-hidden 
                         hover:scale-[1.01]"
            >
              <LogOut className="w-5 h-5 text-red-300 group-hover:text-red-200" />
              <span className="font-medium text-red-100 group-hover:text-white">
                Log Out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
