import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Folder, Eye, Home, Users, Briefcase, Shield, FileText, Search, X, Download, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';

const CompanyClaimsView = ({ withLayout = false }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const claimsData = [
    { id: 1, claimNumber: "CLM-2024-001", customer: "John Doe", agent: "Agent Smith", policy: "POL-2024-001", type: "Life Insurance", amount: "₹40,00,000", status: "Approved", verified: true, submittedDate: "2024-01-10", processedDate: "2024-01-15" },
    { id: 2, claimNumber: "CLM-2024-002", customer: "Jane Smith", agent: "Agent Doe", policy: "POL-2024-002", type: "Health Insurance", amount: "₹8,00,000", status: "Pending", verified: false, submittedDate: "2024-01-20", processedDate: null },
    { id: 3, claimNumber: "CLM-2024-003", customer: "Mike Johnson", agent: "Agent Johnson", policy: "POL-2024-003", type: "Auto Insurance", amount: "₹4,00,000", status: "Rejected", verified: true, submittedDate: "2024-01-25", processedDate: "2024-01-28" },
    { id: 4, claimNumber: "CLM-2024-004", customer: "Sarah Brown", agent: "Agent Brown", policy: "POL-2024-004", type: "Property Insurance", amount: "₹20,00,000", status: "Pending", verified: false, submittedDate: "2024-02-01", processedDate: null }
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
      "Approved": "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
      "Pending": "text-amber-400 bg-amber-500/20 border border-amber-500/30",
      "Rejected": "text-red-300 bg-red-500/10 border border-red-400/20"
    };
    return colors[status] || "text-gray-400 bg-gray-700/50";
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

  const uniqueTypes = useMemo(() => [...new Set(claimsData.map(claim => claim.type))].sort(), [claimsData]);
  const uniqueStatuses = useMemo(() => [...new Set(claimsData.map(claim => claim.status))].sort(), [claimsData]);

  const filteredClaims = useMemo(() => {
    return claimsData.filter(claim => {
      const matchesSearch = claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           claim.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           claim.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || claim.status === statusFilter;
      const matchesType = typeFilter === 'All' || claim.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [claimsData, searchTerm, statusFilter, typeFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setTypeFilter('All');
  };

  const content = (
    <div className="space-y-6 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><AlertCircle className="w-6 h-6 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight"><span className="text-white">Claims</span> <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">Review and process insurance claims</p>
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
                <p className="text-gray-400 text-sm">Total Claims</p>
                <p className="text-2xl font-bold text-white">{claimsData.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-emerald-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved Claims</p>
                <p className="text-2xl font-bold text-white">{claimsData.filter(c => c.status === 'Approved').length}</p>
              </div>
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-amber-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Claims</p>
                <p className="text-2xl font-bold text-white">{claimsData.filter(c => c.status === 'Pending').length}</p>
              </div>
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-red-400/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rejected Claims</p>
                <p className="text-2xl font-bold text-white">{claimsData.filter(c => c.status === 'Rejected').length}</p>
              </div>
              <Shield className="w-8 h-8 text-red-300" />
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
                  placeholder="Search claims by number, customer, agent, or type..."
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
              <span className="text-gray-300 text-sm">{filteredClaims.length} of {claimsData.length} claims</span>
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

      {/* Claims List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {filteredClaims.length === claimsData.length ? 'All Claims' : `Filtered Claims (${filteredClaims.length})`}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClaims.map((claim) => (
            <Card key={claim.id} className="glass border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{claim.claimNumber}</h3>
                    <p className="text-gray-400 text-sm">{claim.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={claim.verified ? "border-emerald-500/30 text-emerald-400" : "border-amber-500/30 text-amber-400"}>
                      {claim.verified ? "Verified" : "Pending"}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(claim.status)}>
                      {claim.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>Customer: {claim.customer}</p>
                  <p>Agent: {claim.agent}</p>
                  <p>Policy: {claim.policy}</p>
                  <p>Type: {claim.type}</p>
                  <p>Amount: <span className="font-medium text-white">{claim.amount}</span></p>
                  <p>Submitted: {claim.submittedDate}</p>
                  {claim.processedDate && <p>Processed: {claim.processedDate}</p>}
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Eye className="w-4 h-4 mr-2" />View Details
                  </Button>
                  {claim.status === 'Pending' && (
                    <>
                      <Button size="sm" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-400/20 text-red-300 hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-200 transition-all duration-200">
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
        widthClass="w-48"
        currentView="claims"
        fullPageView={false}
      >
        {content}
      </DashboardLayout>
    );
  }
  return content;
};
export default CompanyClaimsView;