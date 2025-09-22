import React, { useState } from 'react';
import DashboardLayout from '@/context/layouts/DashboardLayout';
import NomineeContent from '@/components/Nominee/NomineeContent';
import DocVault from '@/components/DocVault';
import { Shield, FileText, Folder } from 'lucide-react';

const NomineeDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');

  const nominee = {
    name: 'Priya Verma',
    email: 'priya@example.com',
    linkedPolicies: [
      { id: 'POL-1001', holder: 'John Doe', type: 'Health Insurance Plus', agent: 'Rajesh Sharma', status: 'active' },
      { id: 'POL-1027', holder: 'Jane Roe', type: 'Life Secure', agent: 'Anita Rao', status: 'active' },
    ],
  };

  const sidebarItems = [
    { id: 'overview', icon: Shield, label: 'Overview', onClick: () => setCurrentView('overview') },
    { id: 'policies', icon: FileText, label: 'Policies', onClick: () => setCurrentView('policies') },
    { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
  ];

  const user = {
    name: nominee.name,
    role: 'Nominee',
    email: nominee.email,
    wallet: '0xabcd...0001',
    company: 'EthSure Insurance'
  };

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
      widthClass="w-48"
      currentView={currentView}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default NomineeDashboard;


