import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertCircle, Search, X, Download, Eye, Shield, Clock, FileText } from 'lucide-react';
import ClaimPolicyModal from '@/components/ClaimPolicyModal';
import { userStore } from '@/context/userContext';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getStatusColor = (status) => {
  const colors = {
    'pending': 'border-amber-500/30 text-amber-400 bg-amber-500/20',
    'under_review': 'border-blue-500/30 text-blue-400 bg-blue-500/20',
    'approved': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/20',
    'rejected': 'border-red-500/30 text-red-400 bg-red-500/20',
    'paid': 'border-purple-500/30 text-purple-400 bg-purple-500/20'
  };
  return colors[status] || 'border-gray-500/30 text-gray-400 bg-gray-500/20';
};

const ClaimManagement = () => {
  const user = userStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [claimingPolicies, setClaimingPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaimingPolicies();
  }, [user]);

  const fetchClaimingPolicies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/policy/all-policies`, {
        params: {
          status: 'request-claim'
        }
      });
      
      if (response.data.success) {
        setClaimingPolicies(response.data.policies);
      }
    } catch (error) {
      console.error('Error fetching claiming policies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPolicy(null);
    fetchClaimingPolicies();
  };

  const uniqueStatuses = ['pending', 'under_review', 'approved', 'rejected', 'paid'];

  const filteredClaims = claimingPolicies.filter(policy => {
    const claimStatus = policy.claim_data?.claim_status || 'pending';
    const matchesSearch = 
      policy.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.claim_data?.claimant_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.claim_data?.claim_reason?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || claimStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  const stats = [
    {
      title: "Total Claims",
      value: claimingPolicies.length,
      icon: AlertCircle,
      color: "from-cyan-500/20 to-blue-400/20",
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-500/30"
    },
    {
      title: "Pending Claims",
      value: claimingPolicies.filter(p => p.claim_data?.claim_status === 'pending').length,
      icon: Clock,
      color: "from-amber-500/20 to-yellow-400/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/30"
    },
    {
      title: "Approved Claims",
      value: claimingPolicies.filter(p => p.claim_data?.claim_status === 'approved').length,
      icon: Shield,
      color: "from-emerald-500/20 to-green-400/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30"
    },
    {
      title: "Rejected Claims",
      value: claimingPolicies.filter(p => p.claim_data?.claim_status === 'rejected').length,
      icon: FileText,
      color: "from-red-500/20 to-red-400/20",
      iconColor: "text-red-300",
      borderColor: "border-red-500/30"
    }
  ];

  return (
    <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass">
              <AlertCircle className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-white">Claims</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Management</span>
              </h1>
              <p className="text-xl text-gray-300">Review and process insurance claims</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`backdrop-blur-xl glass shine hover:border-cyan-400/50 transition-all duration-300 group border rounded-2xl ${stat.borderColor}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} transition-all duration-300 shadow-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
                  placeholder="Search by customer, policy ID, claimant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400/50 transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:outline-none transition-all"
              >
                <option value="All" className="bg-gray-800">All Statuses</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status} className="bg-gray-800 capitalize">
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm">
                {filteredClaims.length} of {claimingPolicies.length} claims
              </span>
              {(searchTerm || statusFilter !== 'All') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300 py-3">
        <CardContent>
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto hide-scrollbar">
              <table className="w-full">
                <thead className="bg-white/5 sticky top-0 z-10 backdrop-blur-2xl">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Policy ID</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Customer</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Claimant</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Claim Reason</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Claim Amount</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Request Date</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-400">
                          <Clock className="w-12 h-12 opacity-50 animate-spin" />
                          <p className="text-lg font-medium">Loading claims...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredClaims.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center">
                        <div className="flex flex-col items-center gap-3 text-gray-400">
                          <AlertCircle className="w-12 h-12 opacity-50" />
                          <p className="text-lg font-medium">No Claims Found</p>
                          <p className="text-sm">
                            {searchTerm || statusFilter !== 'All'
                              ? 'No claims match your filters'
                              : 'Claim requests will appear here when submitted'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredClaims.map((policy) => (
                      <tr
                        key={policy._id}
                        className="border-t border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 text-white font-mono text-sm">
                          POL_{policy.onchain_policyID || policy._id?.slice(-6)}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={policy.customer?.profile_photo_url || '/default-avatar.png'}
                              alt={policy.fullName}
                              className="w-10 h-10 rounded-full object-cover border border-white/10"
                            />
                            <div>
                              <div className="text-white font-medium">{policy.fullName}</div>
                              <div className="text-gray-400 text-sm">{policy.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="text-white font-medium">
                            {policy.claim_data?.claimant_name || 'N/A'}
                          </div>
                          <div className="text-gray-400 text-sm capitalize">
                            {policy.claim_data?.claimant_type || 'N/A'}
                          </div>
                        </td>

                        <td className="p-4 text-white capitalize">
                          {policy.claim_data?.claim_reason?.replace('_', ' ') || 'N/A'}
                        </td>

                        <td className="p-4 text-emerald-400 font-semibold">
                          ₹{(policy.claim_data?.claim_amount || 0).toLocaleString()}
                        </td>

                        <td className="p-4 text-white text-sm">
                          {policy.claim_data?.claim_request_date
                            ? new Date(policy.claim_data.claim_request_date).toLocaleDateString()
                            : 'N/A'}
                        </td>

                        <td className="p-4">
                          <Badge className={getStatusColor(policy.claim_data?.claim_status || 'pending')}>
                            {(policy.claim_data?.claim_status || 'pending').replace('_', ' ')}
                          </Badge>
                        </td>

                        <td className="p-4">
                          <Button
                            size="sm"
                            onClick={() => handlePolicyClick(policy)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1.5" />
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <ClaimPolicyModal
        policy={selectedPolicy}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ClaimManagement;