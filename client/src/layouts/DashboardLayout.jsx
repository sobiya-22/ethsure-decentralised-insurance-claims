import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Profile from '@/components/Profile';

const DashboardLayout = ({ children, sidebarItems = [], user = { name: "John Doe", role: "Customer", email: "john.doe@example.com", wallet: "0x1234567890abcdef1234567890abcdef12345678", company: "EthSure Insurance" }, widthClass = "w-48", currentView = "overview", fullPageView = false }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');
  const handleProfileClick = () => setProfileOpen(true);
  const handleUpdateProfile = (updatedData) => console.log('Profile updated:', updatedData);

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <div className="fixed top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
      <Header user={user} onProfileClick={handleProfileClick} />
      <div className="flex">
        <Sidebar items={sidebarItems} onLogout={handleLogout} widthClass={widthClass} currentView={currentView} topOffsetClass="top-20" />
        {!profileOpen && !fullPageView && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-48'} p-8 pt-28`}>
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        )}
        {!profileOpen && fullPageView && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-48'} pt-20 p-8 overflow-y-auto max-h-screen`}>
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        )}
        {profileOpen && (
          <main className={`flex-1 ${widthClass === 'w-76' ? 'ml-76' : 'ml-48'} pt-20 p-8 overflow-y-auto max-h-screen`}>
            <div className="max-w-7xl mx-auto">
              <Profile user={user} onUpdateProfile={handleUpdateProfile} onClose={() => setProfileOpen(false)} />
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;