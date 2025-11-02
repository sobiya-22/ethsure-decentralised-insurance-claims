// Shared constants for Agent components to eliminate duplicates
import { Home, Users, FileText, Folder } from 'lucide-react';

// Common user data
export const defaultAgentUser = {
  name: "Rajesh Sharma",
  role: "Agent", 
  email: "rajesh.sharma@ethsure.com",
  wallet: "0xA12B34C56D78E90F1234567890ABCDEF12345678",
  company: "EthSure"
};

// Common sidebar items
export const getAgentSidebarItems = (navigate) => [
  { id: 'overview', icon: Home, label: 'Overview', onClick: () => navigate('/agent-dashboard') },
  { id: 'customers', icon: Users, label: 'Customers', onClick: () => navigate('/agent/customers') },
  { id: 'claims', icon: FileText, label: 'Claims', onClick: () => navigate('/agent/claims') },
  { id: 'docvault', icon: Folder, label: 'DocVault', onClick: () => navigate('/agent-dashboard?view=docvault') },
];

// Common getCurrentView function
export const getAgentCurrentView = (location) => {
  const path = location.pathname;
  if (path.includes('/customers')) return 'customers';
  if (path.includes('/claims')) return 'claims';
  if (path.includes('/docvault')) return 'docvault';
  return 'overview';
};

// Common customer data
export const defaultCustomers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    policy: "Health Insurance Premium",
    premium: "Ξ0.15/month",
    status: "Active",
    joinDate: "2024-01-15",
    lastContact: "2024-01-20"
  },
  {
    id: 2,
    name: "Bob Chen",
    email: "bob.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    policy: "Auto Insurance Comprehensive",
    premium: "Ξ0.08/month",
    status: "Active",
    joinDate: "2024-02-01",
    lastContact: "2024-01-18"
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.davis@email.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    policy: "Property Insurance Standard",
    premium: "Ξ0.22/month",
    status: "Pending",
    joinDate: "2024-02-10",
    lastContact: "2024-02-10"
  },
  {
    id: 4,
    name: "Diana Smith",
    email: "diana.smith@email.com",
    phone: "+1 (555) 456-7890",
    location: "Miami, FL",
    policy: "Life Insurance",
    premium: "Ξ0.12/month",
    status: "Active",
    joinDate: "2024-01-25",
    lastContact: "2024-01-30"
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva.brown@email.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    policy: "Travel Insurance",
    premium: "Ξ0.05/month",
    status: "Active",
    joinDate: "2024-02-05",
    lastContact: "2024-02-08"
  }
];

// Common CSS classes
export const commonClasses = {
  inputClass: "mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-400",
  selectClass: "w-full mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
  cardClass: "glass border-white/10",
  buttonClass: "bg-emerald-600 hover:bg-emerald-700"
};

// Common utility functions
export const getStatusColor = (status) => {
  switch (status) {
    case "Active": return "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30";
    case "Pending": return "text-amber-400 bg-amber-500/20 border border-amber-500/30";
    case "Under Review": return "text-gray-300 bg-gray-700/50";
    case "agentApproved": return "text-yellow-300 bg-gray-700/50";
    case "Ready for Approval": return "text-gray-300 bg-gray-700/50";
    case "Approved": return "text-green-300 bg-green-700/50";
    case "Rejected": return "text-gray-300 bg-gray-700/50";
    default: return "text-gray-400 bg-gray-700/50";
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "High": return "text-gray-300 bg-gray-700/50";
    case "Medium": return "text-gray-300 bg-gray-700/50";
    case "Low": return "text-gray-300 bg-gray-700/50";
    default: return "text-gray-400 bg-gray-700/50";
  }
};