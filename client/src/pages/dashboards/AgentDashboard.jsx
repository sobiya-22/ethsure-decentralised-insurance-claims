import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import AgentContent from "@/components/Agent/AgentContent";
import DocVault from "@/components/DocVault";
import { defaultAgentUser, getAgentSidebarItems, getAgentCurrentView, defaultCustomers } from "@/constants/dashboardConstants";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('overview');
  const [customers, setCustomers] = useState(defaultCustomers);
  const agent = { ...defaultAgentUser, verified: true, customers };
  const user = defaultAgentUser;
  const sidebarItems = getAgentSidebarItems(navigate, setCurrentView);

  // Handle navigation from other components that want to go to DocVault
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const view = urlParams.get('view');
    if (view === 'docvault') {
      setCurrentView('docvault');
    }
  }, [location.search]);

  const getCurrentView = () => getAgentCurrentView(location, currentView);

  const handleAddCustomer = () => {
    navigate('/agent/add-customer');
  };


  const renderContent = () => {
    switch (currentView) {
      case 'docvault':
        return <DocVault user={user} />;
      default:
        return (
          <AgentContent 
            onNavigateToCustomers={() => navigate('/agent/customers')}
            customers={customers}
            agent={agent}
            onCreatePolicy={() => navigate('/agent/create-policy')}
            onAddCustomer={handleAddCustomer}
            onKYCSubmit={() => navigate('/agent/kyc')}
          />
        );
    }
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

export default AgentDashboard;
