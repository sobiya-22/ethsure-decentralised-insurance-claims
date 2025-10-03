// Shared constants for Company components to eliminate duplicates
import { Home, Users, FileText, Briefcase, Folder } from 'lucide-react';

// Common user data
export const defaultCompanyUser = {
  name: "Insurance Admin",
  role: "Company",
  email: "company@ethsure.com",
  wallet: "0x1234...abcd",
  company: "EthSure Insurance"
};

// Common sidebar items
export const getCompanySidebarItems = (navigate) => [
  { id: 'overview', icon: Home, label: 'Overview', onClick: () => navigate('/company-dashboard') },
  { id: 'agents', icon: Users, label: 'Agents', onClick: () => navigate('/company/agents') },
  { id: 'customers', icon: Briefcase, label: 'Customers', onClick: () => navigate('/company/customers') },
  { id: 'policies', icon: FileText, label: 'Policies', onClick: () => navigate('/company/policies') },
  { id: 'claims', icon: Folder, label: 'Claims', onClick: () => navigate('/company/claims') },
];

// Common status color functions
export const getStatusColor = (status) => {
  const colors = {
    "Active": "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
    "Pending": "text-amber-400 bg-amber-500/20 border border-amber-500/30",
    "Requesting": "text-blue-400 bg-blue-500/20 border border-blue-500/30",
    "Waiting Verification": "text-purple-400 bg-purple-500/20 border border-purple-500/30",
    "Approved": "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
    "Rejected": "text-red-300 bg-red-500/10 border border-red-400/20",
    "Expired": "text-red-400 bg-red-500/20 border border-red-500/30"
  };
  return colors[status] || "text-gray-400 bg-gray-700/50";
};

export const getTypeColor = (type) => {
  const colors = {
    "Life Insurance": "text-blue-400 bg-blue-500/20 border border-blue-500/30",
    "Health Insurance": "text-green-400 bg-green-500/20 border border-green-500/30",
    "Auto Insurance": "text-purple-400 bg-purple-500/20 border border-purple-500/30",
    "Property Insurance": "text-orange-400 bg-orange-500/20 border border-orange-500/30"
  };
  return colors[type] || "text-gray-400 bg-gray-700/50";
};

export const getPriorityColor = (priority) => {
  const colors = {
    "High": "text-red-400 bg-red-500/20 border border-red-500/30",
    "Medium": "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30",
    "Low": "text-green-400 bg-green-500/20 border border-green-500/30"
  };
  return colors[priority] || "text-gray-400 bg-gray-700/50";
};

// Common CSS classes
export const commonClasses = {
  inputClass: "pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20",
  selectClass: "px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 min-w-[150px]",
  cardClass: "glass border-white/10 hover:border-cyan-400/50 transition-all duration-300",
  buttonClass: "border-white/20 text-white hover:bg-white/10"
};

// Common data arrays
export const defaultAgentsData = [
  { id: 1, name: "Agent Smith", email: "smith@ethsure.com", phone: "+1-555-0123", location: "New York, NY", customers: 12, status: "Active", verified: true, performance: "95%", joinDate: "2023-01-15", totalPolicies: 45, totalClaims: 8, successRate: "98%" },
  { id: 2, name: "Agent Doe", email: "doe@ethsure.com", phone: "+1-555-0124", location: "Los Angeles, CA", customers: 9, status: "Active", verified: true, performance: "88%", joinDate: "2023-03-20", totalPolicies: 32, totalClaims: 5, successRate: "94%" },
  { id: 3, name: "Agent Johnson", email: "johnson@ethsure.com", phone: "+1-555-0125", location: "Chicago, IL", customers: 15, status: "Pending", verified: false, performance: "92%", joinDate: "2024-01-10", totalPolicies: 28, totalClaims: 3, successRate: "96%" },
  { id: 4, name: "Agent Brown", email: "brown@ethsure.com", phone: "+1-555-0126", location: "Miami, FL", customers: 7, status: "Active", verified: true, performance: "91%", joinDate: "2023-06-15", totalPolicies: 22, totalClaims: 4, successRate: "93%" },
  { id: 5, name: "Agent Wilson", email: "wilson@ethsure.com", phone: "+1-555-0127", location: "Seattle, WA", customers: 0, status: "Requesting", verified: false, performance: "N/A", joinDate: "2024-02-01", totalPolicies: 0, totalClaims: 0, successRate: "N/A" },
  { id: 6, name: "Agent Davis", email: "davis@ethsure.com", phone: "+1-555-0128", location: "Austin, TX", customers: 0, status: "Waiting Verification", verified: false, performance: "N/A", joinDate: "2024-02-05", totalPolicies: 0, totalClaims: 0, successRate: "N/A" },
  { id: 7, name: "Agent Miller", email: "miller@ethsure.com", phone: "+1-555-0129", location: "Denver, CO", customers: 0, status: "Requesting", verified: false, performance: "N/A", joinDate: "2024-02-10", totalPolicies: 0, totalClaims: 0, successRate: "N/A" }
];

export const defaultCustomersData = [
  { id: 1, name: "John Doe", email: "john.doe@email.com", phone: "+1-555-1001", location: "New York, NY", policies: 3, totalPremium: "₹1,92,000", status: "Active", verified: true, joinDate: "2023-02-15", lastPayment: "2024-01-15", agent: { name: "Agent Smith", email: "smith@ethsure.com", phone: "+1-555-0123", verified: true, performance: "95%" }, customerPolicies: [{ id: 1, policyNumber: "POL-2024-001", type: "Life Insurance", premium: "₹16,000/month", coverage: "₹80,00,000", status: "Active", startDate: "2024-01-15", endDate: "2025-01-15" }, { id: 2, policyNumber: "POL-2024-002", type: "Health Insurance", premium: "₹12,000/month", coverage: "₹40,00,000", status: "Active", startDate: "2023-07-01", endDate: "2024-07-01" }] },
  { id: 2, name: "Jane Smith", email: "jane.smith@email.com", phone: "+1-555-1002", location: "Los Angeles, CA", policies: 2, totalPremium: "₹1,44,000", status: "Active", verified: true, joinDate: "2023-03-01", lastPayment: "2024-01-20", agent: { name: "Agent Doe", email: "doe@ethsure.com", phone: "+1-555-0124", verified: true, performance: "88%" }, customerPolicies: [{ id: 1, policyNumber: "POL-2024-003", type: "Auto Insurance", premium: "₹8,000/month", coverage: "₹16,00,000", status: "Active", startDate: "2024-01-01", endDate: "2025-01-01" }] },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@email.com", phone: "+1-555-1003", location: "Chicago, IL", policies: 1, totalPremium: "₹64,000", status: "Pending", verified: false, joinDate: "2024-01-25", lastPayment: "N/A", agent: { name: "Agent Johnson", email: "johnson@ethsure.com", phone: "+1-555-0125", verified: false, performance: "92%" }, customerPolicies: [] }
];

export const defaultPoliciesData = [
  { id: 1, policyNumber: "POL-2024-001", type: "Life Insurance", customer: "John Doe", agent: "Agent Smith", premium: "₹16,000/month", coverage: "₹80,00,000", status: "Active", startDate: "2024-01-15", endDate: "2025-01-15" },
  { id: 2, policyNumber: "POL-2024-002", type: "Health Insurance", customer: "Jane Smith", agent: "Agent Doe", premium: "₹12,000/month", coverage: "₹40,00,000", status: "Active", startDate: "2023-07-01", endDate: "2024-07-01" },
  { id: 3, policyNumber: "POL-2024-003", type: "Auto Insurance", customer: "Mike Johnson", agent: "Agent Johnson", premium: "₹9,600/month", coverage: "₹20,00,000", status: "Active", startDate: "2024-02-01", endDate: "2025-02-01" },
  { id: 4, policyNumber: "POL-2024-004", type: "Property Insurance", customer: "Sarah Brown", agent: "Agent Brown", premium: "₹24,000/month", coverage: "₹1,60,00,000", status: "Active", startDate: "2023-12-01", endDate: "2024-12-01" }
];

export const defaultRequestingPoliciesData = [
  { id: 5, policyNumber: "POL-REQ-001", type: "Life Insurance", customer: "David Wilson", agent: "Agent Smith", premium: "₹14,400/month", coverage: "₹64,00,000", status: "Requesting", submittedDate: "2024-02-15", documents: ["Application Form", "Medical Report", "ID Proof"], priority: "High" },
  { id: 6, policyNumber: "POL-REQ-002", type: "Health Insurance", customer: "Lisa Garcia", agent: "Agent Doe", premium: "₹17,600/month", coverage: "₹60,00,000", status: "Requesting", submittedDate: "2024-02-14", documents: ["Application Form", "Health Declaration", "Bank Statement"], priority: "Medium" },
  { id: 7, policyNumber: "POL-REQ-003", type: "Auto Insurance", customer: "Robert Lee", agent: "Agent Johnson", premium: "₹7,600/month", coverage: "₹24,00,000", status: "Requesting", submittedDate: "2024-02-13", documents: ["Application Form", "Vehicle Registration", "Driver License"], priority: "Low" },
  { id: 8, policyNumber: "POL-REQ-004", type: "Property Insurance", customer: "Maria Rodriguez", agent: "Agent Brown", premium: "₹28,000/month", coverage: "₹2,00,00,000", status: "Requesting", submittedDate: "2024-02-12", documents: ["Application Form", "Property Deed", "Valuation Report"], priority: "High" }
];

export const defaultClaimsData = [
  { id: 1, claimNumber: "CLM-2024-001", customer: "John Doe", agent: "Agent Smith", policy: "POL-2024-001", type: "Life Insurance", amount: "₹40,00,000", status: "Approved", verified: true, submittedDate: "2024-01-10", processedDate: "2024-01-15" },
  { id: 2, claimNumber: "CLM-2024-002", customer: "Jane Smith", agent: "Agent Doe", policy: "POL-2024-002", type: "Health Insurance", amount: "₹8,00,000", status: "Pending", verified: false, submittedDate: "2024-01-20", processedDate: null },
  { id: 3, claimNumber: "CLM-2024-003", customer: "Mike Johnson", agent: "Agent Johnson", policy: "POL-2024-003", type: "Auto Insurance", amount: "₹4,00,000", status: "Rejected", verified: true, submittedDate: "2024-01-25", processedDate: "2024-01-28" },
  { id: 4, claimNumber: "CLM-2024-004", customer: "Sarah Brown", agent: "Agent Brown", policy: "POL-2024-004", type: "Property Insurance", amount: "₹20,00,000", status: "Pending", verified: false, submittedDate: "2024-02-01", processedDate: null }
];
