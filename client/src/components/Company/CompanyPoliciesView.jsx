import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Eye, Home, Users, Briefcase, Shield, Folder, Search, X, Download, Plus } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';

const CompanyPoliciesView = ({ withLayout = false }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const policiesData = [
    { id: 1, policyNumber: "POL-2024-001", type: "Life Insurance", customer: "John Doe", agent: "Agent Smith", premium: "₹16,000/month", coverage: "₹80,00,000", status: "Active", startDate: "2024-01-15", endDate: "2025-01-15" },
    { id: 2, policyNumber: "POL-2024-002", type: "Health Insurance", customer: "Jane Smith", agent: "Agent Doe", premium: "₹12,000/month", coverage: "₹40,00,000", status: "Active", startDate: "2023-07-01", endDate: "2024-07-01" },
    { id: 3, policyNumber: "POL-2024-003", type: "Auto Insurance", customer: "Mike Johnson", agent: "Agent Johnson", premium: "₹9,600/month", coverage: "₹20,00,000", status: "Active", startDate: "2024-02-01", endDate: "2025-02-01" },
    { id: 4, policyNumber: "POL-2024-004", type: "Property Insurance", customer: "Sarah Brown", agent: "Agent Brown", premium: "₹24,000/month", coverage: "₹1,60,00,000", status: "Active", startDate: "2023-12-01", endDate: "2024-12-01" }
  ];

  const requestingPoliciesData = [
    { id: 5, policyNumber: "POL-REQ-001", type: "Life Insurance", customer: "David Wilson", agent: "Agent Smith", premium: "₹14,400/month", coverage: "₹64,00,000", status: "Requesting", submittedDate: "2024-02-15", documents: ["Application Form", "Medical Report", "ID Proof"], priority: "High" },
    { id: 6, policyNumber: "POL-REQ-002", type: "Health Insurance", customer: "Lisa Garcia", agent: "Agent Doe", premium: "₹17,600/month", coverage: "₹60,00,000", status: "Requesting", submittedDate: "2024-02-14", documents: ["Application Form", "Health Declaration", "Bank Statement"], priority: "Medium" },
    { id: 7, policyNumber: "POL-REQ-003", type: "Auto Insurance", customer: "Robert Lee", agent: "Agent Johnson", premium: "₹7,600/month", coverage: "₹24,00,000", status: "Requesting", submittedDate: "2024-02-13", documents: ["Application Form", "Vehicle Registration", "Driver License"], priority: "Low" },
    { id: 8, policyNumber: "POL-REQ-004", type: "Property Insurance", customer: "Maria Rodriguez", agent: "Agent Brown", premium: "₹28,000/month", coverage: "₹2,00,00,000", status: "Requesting", submittedDate: "2024-02-12", documents: ["Application Form", "Property Deed", "Valuation Report"], priority: "High" }
  ];

  const user = { name: "Insurance Admin", role: "Company", email: "company@ethsure.com", wallet: "0x1234...abcd", company: "EthSure Insurance" };

  const sidebarItems = [
    { id: 'overview', icon: Home, label: 'Overview', onClick: () => navigate('/company-dashboard') },
    { id: 'agents', icon: Users, label: 'Agents', onClick: () => navigate('/company/agents') },
    { id: 'customers', icon: Briefcase, label: 'Customers', onClick: () => navigate('/company/customers') },
    { id: 'policies', icon: FileText, label: 'Policies', onClick: () => navigate('/company/policies') },
    { id: 'claims', icon: Folder, label: 'Claims', onClick: () => navigate('/company/claims') },
  ];

  const getStatusColor = (status) => {
    const colors = {
      "Active": "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
      "Pending": "text-amber-400 bg-amber-500/20 border border-amber-500/30",
      "Requesting": "text-blue-400 bg-blue-500/20 border border-blue-500/30",
      "Expired": "text-red-400 bg-red-500/20 border border-red-500/30"
    };
    return colors[status] || "text-gray-400 bg-gray-700/50";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "High": "text-red-300 bg-red-500/10 border border-red-400/20",
      "Medium": "text-amber-400 bg-amber-500/20 border border-amber-500/30",
      "Low": "text-green-400 bg-green-500/20 border border-green-500/30"
    };
    return colors[priority] || "text-gray-400 bg-gray-700/50";
  };

  const getTypeColor = (type) => {
    const colors = {
      "Life Insurance": "text-blue-400 bg-blue-500/20 border border-blue-500/30",
      "Health Insurance": "text-green-400 bg-green-500/20 border border-green-500/30",
      "Auto Insurance": "text-purple-400 bg-purple-500/20 border border-purple-500/30",
      "Property Insurance": "text-orange-400 bg-orange-500/20 border border-orange-500/30"
    };
    return colors[type] || "text-gray-400 bg-gray-700/50";
  };

  const allPolicies = [...policiesData, ...requestingPoliciesData];
  const uniqueTypes = useMemo(() => [...new Set(allPolicies.map(policy => policy.type))].sort(), [allPolicies]);
  const uniqueStatuses = useMemo(() => [...new Set(allPolicies.map(policy => policy.status))].sort(), [allPolicies]);

  const filteredPolicies = useMemo(() => {
    return allPolicies.filter(policy => {
      const matchesSearch = policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || policy.status === statusFilter;
      const matchesType = typeFilter === 'All' || policy.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [allPolicies, searchTerm, statusFilter, typeFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setTypeFilter('All');
  };

  const content = (
    <div className="space-y-6 pt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><FileText className="w-6 h-6 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight"><span className="text-white">Policy</span> <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">Oversee all insurance policies across the company</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Policies</p>
                <p className="text-2xl font-bold text-white">{allPolicies.length}</p>
              </div>
              <FileText className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-emerald-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Policies</p>
                <p className="text-2xl font-bold text-white">{policiesData.filter(p => p.status === 'Active').length}</p>
              </div>
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-blue-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Requesting Review</p>
                <p className="text-2xl font-bold text-white">{requestingPoliciesData.length}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-purple-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Premium</p>
                <p className="text-2xl font-bold text-white">₹1,09,200/month</p>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search policies by number, customer, agent, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 min-w-[150px]"
              >
                <option value="All" className="bg-gray-800">All Statuses</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status} className="bg-gray-800">{status}</option>
                ))}
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 min-w-[150px]"
              >
                <option value="All" className="bg-gray-800">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type} className="bg-gray-800">{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm">{filteredPolicies.length} of {allPolicies.length} policies</span>
              {(searchTerm || statusFilter !== 'All' || typeFilter !== 'All') && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="border-white/20 text-white hover:bg-white/10">
                  <X className="w-4 h-4 mr-2" />Clear Filters
                </Button>
              )}
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Policies List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {filteredPolicies.length === allPolicies.length ? 'All Policies' : `Filtered Policies (${filteredPolicies.length})`}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} className="glass border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{policy.policyNumber}</h3>
                    <p className="text-gray-400 text-sm">{policy.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getTypeColor(policy.type)}>{policy.type}</Badge>
                    <Badge variant="outline" className={getStatusColor(policy.status)}>{policy.status}</Badge>
                  </div>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>Customer: {policy.customer}</p>
                  <p>Agent: {policy.agent}</p>
                  <p>Premium: <span className="font-medium text-white">{policy.premium}</span></p>
                  <p>Coverage: <span className="font-medium text-white">{policy.coverage}</span></p>
                  {policy.status === 'Requesting' ? (
                    <>
                      <p>Submitted: <span className="font-medium text-white">{policy.submittedDate}</span></p>
                      <p>Priority: <Badge className={getPriorityColor(policy.priority)}>{policy.priority}</Badge></p>
                      <p>Documents: <span className="font-medium text-white">{policy.documents?.length || 0} files</span></p>
                    </>
                  ) : (
                    <p>Dates: {policy.startDate} - {policy.endDate}</p>
                  )}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Eye className="w-4 h-4 mr-2" />View Details
                  </Button>
                  {policy.status === 'Requesting' && (
                    <>
                      <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-400/20 text-red-300 hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-200 transition-all duration-200">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  if (withLayout) {
    return (
      <DashboardLayout
        sidebarItems={sidebarItems}
        user={user}
        currentView="policies"
        fullPageView={false}
      >
        {content}
      </DashboardLayout>
    );
  }

  return content;
};
export default CompanyPoliciesView;