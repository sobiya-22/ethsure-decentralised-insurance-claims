import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import AgentContent from "@/components/Agent/AgentContent";
import { Home, Users, FileText, Folder } from "lucide-react";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customers, setCustomers] = useState([
    { id: 1, name: "Alice Johnson", policy: "Health Insurance Premium", premium: "Ξ0.15/month", status: "Active" },
    { id: 2, name: "Bob Chen", policy: "Auto Insurance Comprehensive", premium: "Ξ0.08/month", status: "Active" },
    { id: 3, name: "Charlie Davis", policy: "Property Insurance Standard", premium: "Ξ0.22/month", status: "Pending" },
    { id: 4, name: "Diana Smith", policy: "Life Insurance", premium: "Ξ0.12/month", status: "Active" },
  ]);

  const agent = {
    name: "Rajesh Sharma",
    wallet: "0xA12B34C56D78E90F1234567890ABCDEF12345678",
    verified: true,
    customers: customers,
  };

  const user = {
    name: agent.name,
    role: "Agent",
    email: "rajesh.sharma@ethsure.com",
    wallet: agent.wallet,
    company: "EthSure"
  };

  const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview', onClick: () => navigate('/agent-dashboard') },
    { id: 'customers', icon: Users, label: 'Customers', onClick: () => navigate('/agent/customers') },
    { id: 'claims', icon: FileText, label: 'Claims', onClick: () => navigate('/agent/claims') },
    { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => navigate('/agent/docvault') },
  ];

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.includes('/customers')) return 'customers';
    if (path.includes('/claims')) return 'claims';
    if (path.includes('/docvault')) return 'docvault';
    return 'overview';
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      user={user}
      widthClass="w-48"
      currentView={getCurrentView()}
      fullPageView={false}
    >
      <AgentContent onNavigateToCustomers={() => navigate('/agent/customers')} />
    </DashboardLayout>
  );
};

export default AgentDashboard;
