import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import AgentContent from "@/components/Agent/AgentContent";
import KYCForm from "@/components/KYCForm";
import DocVault from "@/components/DocVault";
import { FullPageLoader } from "@/components/ui/Loader";
import { Home, Users, FileText, Folder } from "lucide-react";
import { useAccount } from "wagmi";

import {
  getAgent,
  checkAgentKYCStatus,
  getAllAgents,
} from "../../services/agentAPI"; 

import { getAllCustomers } from "../../services/customerAPI";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address, isConnected } = useAccount();

  const [currentView, setCurrentView] = useState('overview');
  const [agent, setAgent] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentData = async () => {
      if (!isConnected || !address) {
        navigate("/");
        return;
      }

      try {
        // Get agent profile
        const agentRes = await getAgent(address.toLowerCase());
        const agentData = agentRes.data?.data;
        setAgent(agentData);

        // Check agent KYC status
        const kycRes = await checkAgentKYCStatus(address.toLowerCase());
        setKycStatus(kycRes.data?.kyc_status);

        if (kycRes.data?.kyc_status === "pending") {
          navigate("/agent/kyc");
          return;
        }

        // Fetch all customers for agent dashboard
        const customerRes = await getAllCustomers();
        setCustomers(customerRes.data?.data || []);

      } catch (err) {
        console.error("Error fetching agent data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentData();
  }, [isConnected, address, navigate]);

  // Handle URL query for direct DocVault navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const view = urlParams.get('view');
    if (view === 'docvault') {
      setCurrentView('docvault');
    }
  }, [location.search]);

  if (loading) return <FullPageLoader message="Loading your agent dashboard..." />;

  // Dynamic user object
  const user = {
    name: agent?.agent_name || agent?.name || "Agent",
    role: "Agent",
    email: agent?.agent_email || agent?.email || "agent@example.com",
    wallet: address,
    company: agent?.company || "EthSure",
  };

  const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview', onClick: () => setCurrentView('overview') },
    { id: 'customers', icon: Users, label: 'Customers', onClick: () => navigate('/agent/customers') },
    { id: 'claims', icon: FileText, label: 'Claims', onClick: () => navigate('/agent/claims') },
    { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
  ];

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.includes('/customers')) return 'customers';
    if (path.includes('/claims')) return 'claims';
    return currentView;
  };

  const renderContent = () => {
    switch (currentView) {
      case 'kyc':
        return (
          <KYCForm
            walletAddress={address}
            role="agent"
            onClose={() => setCurrentView('overview')}
            onSubmitKYC={(kycData) => {
              console.log('Agent KYC submitted:', kycData);
              setCurrentView('overview');
              // TODO: optionally refetch agent KYC after submission
            }}
          />
        );
      case 'docvault':
        return <DocVault user={user} />;
      default:
        return <AgentContent 
          agent={agent} 
          onNavigateToCustomers={() => navigate('/agent/customers')} 
          customers={customers} 
        />;
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
