import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import AgentContent from "@/components/Agent/AgentContent";
import AgentCustomerView from "@/components/Agent/AgentCustomerView";
import AgentClaimsView from "@/components/Agent/AgentClaimsView";
import CreatePolicyModal from "@/components/Agent/CreatePolicyModal";
import AddCustomerModal from "@/components/Agent/AddCustomerModal";
import KYCForm from "@/components/KYCForm";
import DocVault from "@/components/DocVault";
import { Home, Users, FileText, Folder } from "lucide-react";

const AgentDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
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

  const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview', onClick: () => setCurrentView('overview') },
    { id: 'customers', icon: Users, label: 'Customers', onClick: () => setCurrentView('customers') },
    { id: 'claims', icon: FileText, label: 'Claims', onClick: () => setCurrentView('claims') },
    { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
  ];

  const user = {
    name: agent.name,
    role: "Agent",
    email: "rajesh.sharma@ethsure.com",
    wallet: agent.wallet,
    company: "EthSure"
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'customers':
        return <AgentCustomerView />;
      case 'claims':
        return <AgentClaimsView />;
      case 'docvault':
        return <DocVault user={user} />;
      case 'create-policy':
        return <CreatePolicyModal isOpen={true} onClose={() => setCurrentView('overview')} customers={agent.customers} />;
      case 'add-customer':
        return <AddCustomerModal isOpen={true} onClose={() => setCurrentView('overview')} onCustomerAdded={(newCustomer) => setCustomers(prev => [...prev, newCustomer])} />;
      case 'kyc':
        return <KYCForm user={user} isOpen={true} onClose={() => setCurrentView('overview')} onSubmitKYC={(kycData) => { console.log('KYC submitted:', kycData); setCurrentView('overview'); }} />;
      case 'overview':
      default:
        return <AgentContent onNavigateToCustomers={() => setCurrentView('customers')} currentView={currentView} setCurrentView={setCurrentView} />;
    }
  };

  const isFullPageView = ['create-policy', 'add-customer', 'kyc'].includes(currentView);

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      user={user}
      widthClass="w-48"
      currentView={currentView}
      fullPageView={isFullPageView}
    >
      {renderCurrentView()}
    </DashboardLayout>
  );
};

export default AgentDashboard;
