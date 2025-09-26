import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import CompanyContent from '@/components/Company/CompanyContent';
import { defaultCompanyUser, getCompanySidebarItems, getCompanyCurrentView } from '@/constants/dashboardConstants';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('overview');

  const user = defaultCompanyUser;
  const sidebarItems = getCompanySidebarItems(navigate, setCurrentView);

  // Handle navigation from other components that want to go to specific views
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const view = urlParams.get('view');
    if (view === 'agents') {
      setCurrentView('agents');
    } else if (view === 'customers') {
      setCurrentView('customers');
    } else if (view === 'policies') {
      setCurrentView('policies');
    } else if (view === 'claims') {
      setCurrentView('claims');
    }
  }, [location.search]);

  const getCurrentView = () => getCompanyCurrentView(location, currentView);

  const renderContent = () => {
    return <CompanyContent />;
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      user={user}
      currentView={getCurrentView()}
      fullPageView={false}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default CompanyDashboard;