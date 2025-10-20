import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserCheck, Eye, Home, Users, FileText, Briefcase, Shield, Folder, Search, X, Download } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';

const CustomerManagement = ({ withLayout = false }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [agentFilter, setAgentFilter] = useState('All');

  const customersData = [
    { id: 1, name: "John Doe", email: "john.doe@email.com", phone: "+1-555-1001", location: "New York, NY", policies: 3, totalPremium: "₹1,92,000", status: "Active", verified: true, joinDate: "2023-02-15", lastPayment: "2024-01-15", agent: { name: "Agent Smith", email: "smith@ethsure.com", phone: "+1-555-0123", verified: true, performance: "95%" }, customerPolicies: [{ id: 1, policyNumber: "POL-2024-001", type: "Life Insurance", premium: "₹16,000/month", coverage: "₹80,00,000", status: "Active", startDate: "2024-01-15", endDate: "2025-01-15" }, { id: 2, policyNumber: "POL-2024-002", type: "Health Insurance", premium: "₹12,000/month", coverage: "₹40,00,000", status: "Active", startDate: "2023-07-01", endDate: "2024-07-01" }] },
    { id: 2, name: "Jane Smith", email: "jane.smith@email.com", phone: "+1-555-1002", location: "Los Angeles, CA", policies: 2, totalPremium: "₹1,44,000", status: "Active", verified: true, joinDate: "2023-03-01", lastPayment: "2024-01-20", agent: { name: "Agent Doe", email: "doe@ethsure.com", phone: "+1-555-0124", verified: true, performance: "88%" }, customerPolicies: [{ id: 1, policyNumber: "POL-2024-003", type: "Auto Insurance", premium: "₹8,000/month", coverage: "₹16,00,000", status: "Active", startDate: "2024-01-01", endDate: "2025-01-01" }] },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@email.com", phone: "+1-555-1003", location: "Chicago, IL", policies: 1, totalPremium: "₹64,000", status: "Pending", verified: false, joinDate: "2024-01-25", lastPayment: "N/A", agent: { name: "Agent Johnson", email: "johnson@ethsure.com", phone: "+1-555-0125", verified: false, performance: "92%" }, customerPolicies: [] }
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
      "Pending": "text-amber-400 bg-amber-500/20 border border-amber-500/30"
    };
    return colors[status] || "text-gray-400 bg-gray-700/50";
  };

  const uniqueAgents = useMemo(() => [...new Set(customersData.map(customer => customer.agent.name))].sort(), [customersData]);
  const uniqueStatuses = useMemo(() => [...new Set(customersData.map(customer => customer.status))].sort(), [customersData]);

  const filteredCustomers = useMemo(() => {
    return customersData.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
      const matchesAgent = agentFilter === 'All' || customer.agent.name === agentFilter;
      return matchesSearch && matchesStatus && matchesAgent;
    });
  }, [customersData, searchTerm, statusFilter, agentFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setAgentFilter('All');
  };

  const content = (
    <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><UserCheck className="w-6 h-6 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight"><span className="text-white">Customer</span> <span className="gradient-text">Overview</span></h1>
              <p className="text-xl text-gray-300">View and manage all customers across the company</p>
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
                <p className="text-gray-400 text-sm">Total Customers</p>
                <p className="text-2xl font-bold text-white">{customersData.length}</p>
              </div>
              <UserCheck className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-emerald-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Customers</p>
                <p className="text-2xl font-bold text-white">{customersData.filter(c => c.status === 'Active').length}</p>
              </div>
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-amber-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Verification</p>
                <p className="text-2xl font-bold text-white">{customersData.filter(c => c.status === 'Pending').length}</p>
              </div>
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-purple-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Premium</p>
                <p className="text-2xl font-bold text-white">₹6,88,000</p>
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
                  placeholder="Search customers by name, email, or location..."
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
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 min-w-[150px]"
              >
                <option value="All" className="bg-gray-800">All Agents</option>
                {uniqueAgents.map(agent => (
                  <option key={agent} value={agent} className="bg-gray-800">{agent}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm">{filteredCustomers.length} of {customersData.length} customers</span>
              {(searchTerm || statusFilter !== 'All' || agentFilter !== 'All') && (
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

      {/* Customers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {filteredCustomers.length === customersData.length ? 'All Customers' : `Filtered Customers (${filteredCustomers.length})`}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="glass border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{customer.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                      <p className="text-gray-400 text-sm">{customer.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(customer.status)}>{customer.status}</Badge>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>Phone: {customer.phone}</p>
                  <p>Location: {customer.location}</p>
                  <p>Policies: {customer.policies}</p>
                  <p>Total Premium: <span className="font-medium text-white">{customer.totalPremium}</span></p>
                  <p>Agent: <span className="font-medium text-white">{customer.agent.name}</span></p>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Eye className="w-4 h-4 mr-2" />View Details
                  </Button>
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
        currentView="customers"
        fullPageView={false}
      >
        {content}
      </DashboardLayout>
    );
  }

  return content;
};
export default CustomerManagement;