import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import CompanyContent from '@/components/Company/CompanyContent';
import { Users, FileText, Briefcase, Shield } from 'lucide-react';

const CompanyDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');

  const sidebarItems = [
    { id: 'overview', icon: Shield, label: 'Overview', onClick: () => setCurrentView('overview') },
    { id: 'agents', icon: Users, label: 'Agents', onClick: () => setCurrentView('agents') },
    { id: 'customers', icon: Briefcase, label: 'Customers', onClick: () => setCurrentView('customers') },
    { id: 'policies', icon: FileText, label: 'Policies', onClick: () => setCurrentView('policies') },
    { id: 'claims', icon: FileText, label: 'Claims', onClick: () => setCurrentView('claims') },
  ];

  const user = {
    name: 'Insurance Admin',
    role: 'Company',
    email: 'company@ethsure.com',
    wallet: '0x1234...abcd',
    company: 'EthSure Insurance'
  };

  const renderContent = () => {
    return <CompanyContent />;
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

export default CompanyDashboard;