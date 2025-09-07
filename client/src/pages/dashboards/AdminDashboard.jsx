import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Admin Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Admin
              </span>
              <span className="text-white ml-2">Dashboard</span>
            </span>
          </div>

          {/* Admin Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Overview
            </button>
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Claims
            </button>
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Users
            </button>
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Reports
            </button>
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Settings
            </button>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              Welcome, <span className="text-white font-medium">Admin</span>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;