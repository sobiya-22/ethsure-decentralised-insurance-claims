import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import NomineeContent from '@/components/Nominee/NomineeContent';
import DocVault from '@/components/DocVault';
import { defaultNomineeUser, getNomineeSidebarItems, defaultNomineeData } from '@/constants/dashboardConstants';

const NomineeDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');

  const nominee = defaultNomineeData;
  const sidebarItems = getNomineeSidebarItems(setCurrentView);
  const user = defaultNomineeUser;

  const renderContent = () => {
    switch (currentView) {
      case 'docvault':
        return <DocVault user={user} />;
      default:
        return <NomineeContent />;
    }
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      user={user}
      currentView={currentView}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default NomineeDashboard;


