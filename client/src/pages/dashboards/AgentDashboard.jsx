import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import AgentContent from "@/components/Agent/AgentContent";
import DocVault from "@/components/DocVault";
import { Home, Users, FileText, Folder } from "lucide-react";
import { useAccount } from "wagmi";

import {
  getAgent,
  checkAgentKYCStatus,
  getAllAgents,
} from "../../services/agentAPI"; 

const AgentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address, isConnected } = useAccount();

  const [currentView, setCurrentView] = useState('overview');

  const [agent, setAgent] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);

   // Fetch agent and customers data
  useEffect(() => {
    const fetchAgentData = async () => {
      if (!isConnected || !address) {
        navigate("/");
        return;
      }

      try {
        // Get agent profile
        const agentRes = await getAgent(address);
        const agentData = agentRes.data?.data;
        setAgent(agentData);

        // Check agent KYC status
        const kycRes = await checkAgentKYCStatus(address);
        setKycStatus(kycRes.data?.kyc_status);

        if (kycRes.data?.kyc_status !== "verified") {
        navigate("/agent/kyc");
        return;
        }

        // Fetch customers handled by this agent
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

  // Handle navigation from other components that want to go to DocVault
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const view = urlParams.get('view');
    if (view === 'docvault') {
      setCurrentView('docvault');
    }
  }, [location.search]);

   if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

   // Dynamic user data
  const user = {
    name: agent?.name || "Agent",
    role: "Agent",
    email: agent?.email || "agent@example.com",
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
          }}
        />
      );
    case 'docvault':
      return <DocVault user={user} />;
    default:
      return <AgentContent onNavigateToCustomers={() => navigate('/agent/customers')} />;
  }
};

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      user={user}
      widthClass="w-48"
      currentView={getCurrentView()}
      fullPageView={false}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AgentDashboard;
