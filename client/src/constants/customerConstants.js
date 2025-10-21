// Shared constants for Customer components to eliminate duplicates

// Common customer data
export const defaultCustomer = {
  name: "John Doe",
  wallet: "0x742d...d8b6",
  verified: false
};

// Common status color functions
export const getStatusColor = (status) => {
  const colors = {
    'Active': 'text-emerald-400 bg-emerald-400/20',
    'Pending': 'text-amber-400 bg-amber-400/20',
    'Expired': 'text-red-400 bg-red-400/20',
    'Approved': 'text-emerald-400 bg-emerald-400/20',
    'Under Review': 'text-blue-400 bg-blue-400/20',
    'Rejected': 'text-red-400 bg-red-400/20',
    'Completed': 'text-gray-300 bg-gray-700/50',
    'Verified': 'text-gray-300 bg-gray-700/50'
  };
  return colors[status] || 'text-gray-400 bg-gray-700/50';
};

export const getTypeColor = (type) => 'text-gray-300 bg-gray-700/50';

// Common CSS classes
export const commonClasses = {
  cardClass: "glass shine border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300",
  buttonClass: "border-white/20 text-white hover:bg-white/10"
};

// Common data arrays
export const defaultPolicies = [{
  id: 'POL-2024-001', name: 'Health Insurance Plus', type: 'Health', status: 'Active', premium: '₹120', coverage: '₹50,000', startDate: '2024-01-15', endDate: '2025-01-15',
  agent: { name: 'Rajesh Sharma', email: 'rajesh.sharma@ethsure.com', phone: '+1 (555) 123-4567' },
  benefits: ['Medical Coverage up to ₹50,000', 'Emergency Room Visits', 'Prescription Drug Coverage', 'Dental & Vision Care', 'Mental Health Services'],
  claims: [{ id: 'CLM-001', date: '2024-08-15', amount: '₹2,500', status: 'Approved', description: 'Emergency room visit' }, { id: 'CLM-002', date: '2024-09-02', amount: '₹850', status: 'Under Review', description: 'Prescription medication' }],
  documents: [{ name: 'Policy Document.pdf', type: 'Policy', uploaded: '2024-01-15', status: 'Verified' }, { name: 'Terms & Conditions.pdf', type: 'Legal', uploaded: '2024-01-15', status: 'Verified' }, { name: 'Coverage Details.pdf', type: 'Coverage', uploaded: '2024-01-15', status: 'Verified' }]
}];

export const defaultDocuments = [
  { name: "ID Proof.pdf", type: "Identity", uploaded: "2024-01-15", status: "Verified" },
  { name: "Medical Report.pdf", type: "Medical", uploaded: "2024-01-20", status: "Pending" },
];

export const defaultActivities = [
  { type: "Premium Payment", amount: "$120", date: "2025-09-15", status: "Completed" },
  { type: "Claim Submitted", reference: "#CLM-004", date: "2025-08-02", status: "Under Review" },
];

export const defaultPaymentHistory = [
  { id: "PAY-001", type: "Premium Payment", amount: "₹2,500", date: "Dec 15, 2023", status: "Completed", policy: "POL-2024-001" },
  { id: "PAY-002", type: "Premium Payment", amount: "₹2,500", date: "Nov 15, 2023", status: "Completed", policy: "POL-2024-001" },
  { id: "PAY-003", type: "Premium Payment", amount: "₹2,500", date: "Oct 15, 2023", status: "Completed", policy: "POL-2024-001" },
];