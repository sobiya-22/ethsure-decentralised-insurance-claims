import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Profile from '@/components/Profile';
import { Menu } from 'lucide-react';
import {useAuth} from '../context/AuthContext';
const DashboardLayout = ({ children, sidebarItems = [], user = { name: "John Doe", role: "Customer", email: "john.doe@example.com", wallet: "0x1234567890abcdef1234567890abcdef12345678", company: "EthSure Insurance" }, widthClass = "w-64", currentView = "overview", fullPageView = false }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async() => {
    await logout();
  };
  const handleProfileClick = () => setProfileOpen(true);
  const handleUpdateProfile = (updatedData) => console.log('Profile updated:', updatedData);

  return (
    <div className="min-h-screen relative pt-4">
      <div className="fixed inset-0 bg-grid opacity-100 pointer-events-none"></div>
      <div className="fixed top-20 left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed top-28 left-4 z-30 md:hidden p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 bg-gray-900/95 backdrop-blur-sm"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>
      
      <Header user={user} onProfileClick={handleProfileClick} />
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <Sidebar 
          items={sidebarItems} 
          onLogout={handleLogout} 
          widthClass={widthClass} 
          currentView={currentView} 
          topOffsetClass="top-20"
        />
        {!profileOpen && !fullPageView && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-60'} p-2 sm:p-4 lg:p-6 xl:p-8 pt-32 sm:pt-36 lg:pt-40 bg-transparent`}>
            <div className="max-w-full mx-auto no-scrollbar">{children}</div>
          </main>
        )}
        {!profileOpen && fullPageView && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-60'} pt-24 sm:pt-28 lg:pt-32 p-2 sm:p-4 lg:p-6 xl:p-8 overflow-hidden max-h-screen bg-transparent`}>
            <div className="max-w-full mx-auto no-scrollbar">{children}</div>
          </main>
        )}
        {profileOpen && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-60'} pt-24 sm:pt-28 lg:pt-32 p-2 sm:p-4 lg:p-6 xl:p-8 overflow-y-auto max-h-screen bg-transparent`}>
            <div className="max-w-8xl mx-auto">
              <Profile user={user} onUpdateProfile={handleUpdateProfile} onClose={() => setProfileOpen(false)} />
            </div>
          </main>
        )}
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:flex lg:hidden">
        <Sidebar 
          items={sidebarItems} 
          onLogout={handleLogout} 
          widthClass="w-56" 
          currentView={currentView} 
          topOffsetClass="top-20"
        />
        {!profileOpen && !fullPageView && (
          <main className="flex-1 ml-56 p-2 sm:p-4 pt-32 sm:pt-36 bg-transparent">
            <div className="max-w-full mx-auto no-scrollbar">{children}</div>
          </main>
        )}
        {!profileOpen && fullPageView && (
          <main className="flex-1 ml-56 pt-24 sm:pt-28 p-2 sm:p-4 overflow-hidden max-h-screen bg-transparent">
            <div className="max-w-full mx-auto no-scrollbar">{children}</div>
          </main>
        )}
        {profileOpen && (
          <main className="flex-1 ml-56 pt-24 sm:pt-28 p-2 sm:p-4 overflow-y-auto max-h-screen bg-transparent">
            <div className="max-w-6xl mx-auto">
              <Profile user={user} onUpdateProfile={handleUpdateProfile} onClose={() => setProfileOpen(false)} />
            </div>
          </main>
        )}
      </div>

      {/* Mobile/Small Tablet Layout */}
      <div className="md:hidden">
        {!profileOpen && !fullPageView && (
          <main className="p-2 xs:p-3 sm:p-4 pt-32 xs:pt-36 bg-transparent">
            <div className="max-w-full mx-auto no-scrollbar">{children}</div>
          </main>
        )}
        {!profileOpen && fullPageView && (
          <main className="pt-24 sm:pt-28 p-2 xs:p-3 sm:p-4 overflow-hidden max-h-screen bg-transparent">
            <div className="max-w-full mx-auto no-scrollbar">{children}</div>
          </main>
        )}
        {profileOpen && (
          <main className="pt-24 sm:pt-28 p-2 xs:p-3 sm:p-4 overflow-y-auto max-h-screen bg-transparent">
            <div className="max-w-full mx-auto">
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