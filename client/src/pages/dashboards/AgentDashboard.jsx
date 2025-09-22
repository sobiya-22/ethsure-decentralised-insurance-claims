import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from '../../context/layouts/DashboardLayout';
import AgentContent from "../../components/Agent/AgentContent";
import DocVault from "@/components/DocVault";
import { Home, Users, FileText, Folder } from "lucide-react";

import { getAllCustomers } from "../../api/customerAPI"; 
import { getUserByWallet } from "../../api/userAPI";     
//import { useWalletAddress } from "@/hooks/useWalletAddress";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletAddress } = useWalletAddress();

  const [currentView, setCurrentView] = useState("overview");
  const [customers, setCustomers] = useState([]);
  const [agent, setAgent] = useState(null);

  // ✅ Fetch agent & customers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentData = await getUserByWallet(walletAddress);
        setAgent(agentData);

        const customersData = await getAllCustomers();
        setCustomers(customersData);
      } catch (err) {
        console.error("Error fetching agent dashboard:", err);
      }
    };
    if (walletAddress) fetchData();
  }, [walletAddress]);

  const user = {
    name: agent?.name || "Agent",
    role: "Agent",
    email: agent?.email || "agent@ethsure.com",
    wallet: agent?.wallet || walletAddress,
    company: "EthSure",
  };

  const sidebarItems = [
    { id: "overview", icon: Home, label: "Overview", onClick: () => setCurrentView("overview") },
    { id: "customers", icon: Users, label: "Customers", onClick: () => navigate("/agent/customers") },
    { id: "claims", icon: FileText, label: "Claims", onClick: () => navigate("/agent/claims") },
    { id: "docvault", icon: Folder, label: "DocVault", onClick: () => setCurrentView("docvault") },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "docvault":
        return <DocVault user={user} />;
      default:
        return <AgentContent customers={customers} onNavigateToCustomers={() => navigate("/agent/customers")} />;
    }
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      user={user}
      widthClass="w-48"
      currentView={currentView}
      fullPageView={false}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AgentDashboard;
