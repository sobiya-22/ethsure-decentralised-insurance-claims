import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Eye, Edit, Trash2, Plus, Search, Download, Home, FileText, Briefcase, Shield, Folder, X } from 'lucide-react';
import DashboardLayout from '@/context/layouts/DashboardLayout';

const CompanyAgentsView = ({ withLayout = false }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  const agentsData = [
    { id: 1, name: "Agent Smith", email: "smith@ethsure.com", phone: "+1-555-0123", location: "New York, NY", customers: 12, status: "Active", verified: true, performance: "95%", joinDate: "2023-01-15", totalPolicies: 45, totalClaims: 8, successRate: "98%" },
    { id: 2, name: "Agent Doe", email: "doe@ethsure.com", phone: "+1-555-0124", location: "Los Angeles, CA", customers: 9, status: "Active", verified: true, performance: "88%", joinDate: "2023-03-20", totalPolicies: 32, totalClaims: 5, successRate: "94%" },
    { id: 3, name: "Agent Johnson", email: "johnson@ethsure.com", phone: "+1-555-0125", location: "Chicago, IL", customers: 15, status: "Pending", verified: false, performance: "92%", joinDate: "2024-01-10", totalPolicies: 28, totalClaims: 3, successRate: "96%" },
    { id: 4, name: "Agent Brown", email: "brown@ethsure.com", phone: "+1-555-0126", location: "Miami, FL", customers: 7, status: "Active", verified: true, performance: "91%", joinDate: "2023-06-15", totalPolicies: 22, totalClaims: 4, successRate: "93%" },
    { id: 5, name: "Agent Wilson", email: "wilson@ethsure.com", phone: "+1-555-0127", location: "Seattle, WA", customers: 0, status: "Requesting", verified: false, performance: "N/A", joinDate: "2024-02-01", totalPolicies: 0, totalClaims: 0, successRate: "N/A" },
    { id: 6, name: "Agent Davis", email: "davis@ethsure.com", phone: "+1-555-0128", location: "Austin, TX", customers: 0, status: "Waiting Verification", verified: false, performance: "N/A", joinDate: "2024-02-05", totalPolicies: 0, totalClaims: 0, successRate: "N/A" },
    { id: 7, name: "Agent Miller", email: "miller@ethsure.com", phone: "+1-555-0129", location: "Denver, CO", customers: 0, status: "Requesting", verified: false, performance: "N/A", joinDate: "2024-02-10", totalPolicies: 0, totalClaims: 0, successRate: "N/A" }
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
      "Waiting Verification": "text-purple-400 bg-purple-500/20 border border-purple-500/30"
    };
    return colors[status] || "text-gray-400 bg-gray-700/50";
  };

  const uniqueLocations = useMemo(() => [...new Set(agentsData.map(agent => agent.location))].sort(), [agentsData]);
  const uniqueStatuses = useMemo(() => [...new Set(agentsData.map(agent => agent.status))].sort(), [agentsData]);

  const filteredAgents = useMemo(() => {
    return agentsData.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || agent.status === statusFilter;
      const matchesLocation = locationFilter === 'All' || agent.location === locationFilter;
      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [agentsData, searchTerm, statusFilter, locationFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setLocationFilter('All');
  };

  const content = (
    <div className="space-y-6 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg glass"><Users className="w-6 h-6 text-cyan-400" /></div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight"><span className="text-white">Agent</span> <span className="gradient-text">Management</span></h1>
              <p className="text-xl text-gray-300">Oversee all registered insurance agents</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">
            <Plus className="w-5 h-5 mr-2" />Add Agent
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Agents</p>
                <p className="text-2xl font-bold text-white">{agentsData.length}</p>
              </div>
              <Users className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-emerald-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Agents</p>
                <p className="text-2xl font-bold text-white">{agentsData.filter(a => a.status === 'Active').length}</p>
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
                <p className="text-2xl font-bold text-white">{agentsData.filter(a => a.status === 'Pending' || a.status === 'Waiting Verification').length}</p>
              </div>
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10 hover:border-purple-400/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Performance</p>
                <p className="text-2xl font-bold text-white">92%</p>
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
                  placeholder="Search agents by name, email, or location..."
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
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 min-w-[150px]"
              >
                <option value="All" className="bg-gray-800">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location} className="bg-gray-800">{location}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm">{filteredAgents.length} of {agentsData.length} agents</span>
              {(searchTerm || statusFilter !== 'All' || locationFilter !== 'All') && (
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

      {/* Agents List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {filteredAgents.length === agentsData.length ? 'All Agents' : `Filtered Agents (${filteredAgents.length})`}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="glass border-white/10 hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                      <p className="text-gray-400 text-sm">{agent.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(agent.status)}>{agent.status}</Badge>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>Phone: {agent.phone}</p>
                  <p>Location: {agent.location}</p>
                  <p>Customers: {agent.customers}</p>
                  <p>Performance: <span className="font-medium text-white">{agent.performance}</span></p>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Eye className="w-4 h-4 mr-2" />View
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Edit className="w-4 h-4 mr-2" />Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-400/20 text-red-300 hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-200 transition-all duration-200">
                    <Trash2 className="w-4 h-4 mr-2" />Delete
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
        widthClass="w-48"
        currentView="agents"
        fullPageView={false}
      >
        {content}
      </DashboardLayout>
    );
  }

  return content;
};
export default CompanyAgentsView;