import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Folder, Eye, Shield, Search, X, Download, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { defaultCompanyUser, getCompanySidebarItems, getStatusColor, getTypeColor, defaultClaimsData, commonClasses } from '@/constants/companyConstants';

const ClaimManagement = ({ withLayout = false }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const claimsData = defaultClaimsData;
  const user = defaultCompanyUser;
  const sidebarItems = getCompanySidebarItems(navigate);

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
    <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
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
                  className={commonClasses.inputClass}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={commonClasses.selectClass}
              >
                <option value="All" className="bg-gray-800">All Statuses</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status} className="bg-gray-800">{status}</option>
                ))}
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={commonClasses.selectClass}
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
                <Button variant="outline" size="sm" onClick={clearFilters} className={commonClasses.buttonClass}>
                  <X className="w-4 h-4 mr-2" />Clear Filters
                </Button>
              )}
              <Button variant="outline" size="sm" className={commonClasses.buttonClass}>
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
                  <Button variant="outline" size="sm" className={commonClasses.buttonClass}>
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
        currentView="claims"
        fullPageView={false}
      >
        {content}
      </DashboardLayout>
    );
  }
  return content;
};
export default ClaimManagement;