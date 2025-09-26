// Shared constants for Dashboard components to eliminate duplicates
import { Home, Users, FileText, Folder, Briefcase, Shield, CreditCard } from 'lucide-react';

// Common user data
export const defaultAgentUser = {
  name: "Rajesh Sharma",
  role: "Agent",
  email: "rajesh.sharma@ethsure.com",
  wallet: "0xA12B34C56D78E90F1234567890ABCDEF12345678",
  company: "EthSure"
};

export const defaultCompanyUser = {
  name: "Insurance Admin",
  role: "Company",
  email: "company@ethsure.com",
  wallet: "0x1234...abcd",
  company: "EthSure Insurance"
};

export const defaultCustomerUser = {
  name: "John Doe",
  role: "Customer",
  email: "john@example.com",
  wallet: "0x742d...d8b6",
  company: "EthSure Insurance"
};

export const defaultNomineeUser = {
  name: "Priya Verma",
  role: "Nominee",
  email: "priya@example.com",
  wallet: "0xabcd...0001",
  company: "EthSure Insurance"
};

// Common sidebar items
export const getAgentSidebarItems = (navigate, setCurrentView) => [
  { id: 'overview', icon: Home, label: 'Overview', onClick: () => setCurrentView('overview') },
  { id: 'customers', icon: Users, label: 'Customers', onClick: () => navigate('/agent/customers') },
  { id: 'claims', icon: FileText, label: 'Claims', onClick: () => navigate('/agent/claims') },
  { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
];

export const getCompanySidebarItems = (navigate, setCurrentView) => [
  { id: 'overview', icon: Home, label: 'Overview', onClick: () => setCurrentView('overview') },
  { id: 'agents', icon: Users, label: 'Agents', onClick: () => navigate('/company/agents') },
  { id: 'customers', icon: Briefcase, label: 'Customers', onClick: () => navigate('/company/customers') },
  { id: 'policies', icon: FileText, label: 'Policies', onClick: () => navigate('/company/policies') },
  { id: 'claims', icon: Folder, label: 'Claims', onClick: () => navigate('/company/claims') },
];

export const getCustomerSidebarItems = (setCurrentView) => [
  { id: 'overview', icon: Users, label: 'Overview', onClick: () => setCurrentView('overview') },
  { id: 'policies', icon: FileText, label: 'Policies', onClick: () => setCurrentView('policies') },
  { id: 'pay-emi', icon: CreditCard, label: 'Pay EMI', onClick: () => setCurrentView('pay-emi') },
  { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
];

export const getNomineeSidebarItems = (setCurrentView) => [
  { id: 'overview', icon: Shield, label: 'Overview', onClick: () => setCurrentView('overview') },
  { id: 'policies', icon: FileText, label: 'Policies', onClick: () => setCurrentView('policies') },
  { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => setCurrentView('docvault') },
];

// Common getCurrentView functions
export const getAgentCurrentView = (location, currentView) => {
  const path = location.pathname;
  if (path.includes('/customers')) return 'customers';
  if (path.includes('/claims')) return 'claims';
  return currentView;
};

export const getCompanyCurrentView = (location, currentView) => {
  const path = location.pathname;
  if (path.includes('/agents')) return 'agents';
  if (path.includes('/customers')) return 'customers';
  if (path.includes('/policies')) return 'policies';
  if (path.includes('/claims')) return 'claims';
  return currentView;
};

// Common data arrays
export const defaultCustomers = [
  { id: 1, name: "Alice Johnson", policy: "Health Insurance Premium", premium: "Ξ0.15/month", status: "Active" },
  { id: 2, name: "Bob Chen", policy: "Auto Insurance Comprehensive", premium: "Ξ0.08/month", status: "Active" },
  { id: 3, name: "Charlie Davis", policy: "Property Insurance Standard", premium: "Ξ0.22/month", status: "Pending" },
  { id: 4, name: "Diana Smith", policy: "Life Insurance", premium: "Ξ0.12/month", status: "Active" },
];

export const defaultNomineeData = {
  name: 'Priya Verma',
  email: 'priya@example.com',
  linkedPolicies: [
    { id: 'POL-1001', holder: 'John Doe', type: 'Health Insurance Plus', agent: 'Rajesh Sharma', status: 'active' },
    { id: 'POL-1027', holder: 'Jane Roe', type: 'Life Secure', agent: 'Anita Rao', status: 'active' },
  ],
};
