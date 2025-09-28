import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Profile from '@/components/Profile';
import { Menu } from 'lucide-react';
import useAuth from '../context/useAuth';
const DashboardLayout = ({ children, sidebarItems = [], user = { name: "John Doe", role: "Customer", email: "john.doe@example.com", wallet: "0x1234567890abcdef1234567890abcdef12345678", company: "EthSure Insurance" }, widthClass = "w-48", currentView = "overview", fullPageView = false }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async() => {
    await logout();
    console.log('clicked');
    navigate('/');
  };
  const handleProfileClick = () => setProfileOpen(true);
  const handleUpdateProfile = (updatedData) => console.log('Profile updated:', updatedData);

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <div className="fixed top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed top-28 left-4 z-30 md:hidden p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 bg-gray-900/95 backdrop-blur-sm"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>
      
      <Header user={user} onProfileClick={handleProfileClick} />
      
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        <Sidebar 
          items={sidebarItems} 
          onLogout={handleLogout} 
          widthClass={widthClass} 
          currentView={currentView} 
          topOffsetClass="top-20"
        />
        {!profileOpen && !fullPageView && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-48'} p-6 lg:p-8 pt-32`}>
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        )}
        {!profileOpen && fullPageView && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-48'} pt-20 p-6 lg:p-8 overflow-y-auto max-h-screen`}>
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        )}
        {profileOpen && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-48'} pt-20 p-6 lg:p-8 overflow-y-auto max-h-screen`}>
            <div className="max-w-7xl mx-auto">
              <Profile user={user} onUpdateProfile={handleUpdateProfile} onClose={() => setProfileOpen(false)} />
            </div>
          </main>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {!profileOpen && !fullPageView && (
          <main className="p-4 pt-32">
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        )}
        {!profileOpen && fullPageView && (
          <main className="pt-32 p-4 overflow-y-auto max-h-screen">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        )}
        {profileOpen && (
          <main className="pt-32 p-4 overflow-y-auto max-h-screen">
            <div className="max-w-7xl mx-auto">
              <Profile user={user} onUpdateProfile={handleUpdateProfile} onClose={() => setProfileOpen(false)} />
            </div>
          </main>
        )}
      </div>

      {/* Mobile Sidebar - Completely Separate */}
      <Sidebar 
        items={sidebarItems} 
        onLogout={handleLogout} 
        widthClass={widthClass} 
        currentView={currentView} 
        topOffsetClass="top-20"
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;