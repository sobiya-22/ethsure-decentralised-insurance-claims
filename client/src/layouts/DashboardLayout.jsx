import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = ({ sidebarItems = [] }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="relative text-white flex flex-col md:flex-row">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid opacity-100 pointer-events-none"></div>
      <div className="fixed top-20 left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition backdrop-blur-sm bg-gray-900/95"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <Sidebar items={sidebarItems} isOpen={mobileOpen} setIsOpen={setMobileOpen} />
      <Header />
      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 transition-all duration-300">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pt-16" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
