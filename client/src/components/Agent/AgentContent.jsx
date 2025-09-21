import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Users, FileText, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp, Eye, Plus, UserPlus } from "lucide-react";
import CustomerDetailsModal from "./CustomerDetailsModal";

const AgentContent = ({ onNavigateToCustomers }) => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customers, setCustomers] = useState([
    { id: 1, name: "Alice Johnson", policy: "Health Insurance Premium", premium: "Ξ0.15/month", status: "Active" },
    { id: 2, name: "Bob Chen", policy: "Auto Insurance Comprehensive", premium: "Ξ0.08/month", status: "Active" },
    { id: 3, name: "Charlie Davis", policy: "Property Insurance Standard", premium: "Ξ0.22/month", status: "Pending" },
    { id: 4, name: "Diana Smith", policy: "Life Insurance", premium: "Ξ0.12/month", status: "Active" },
    { id: 5, name: "Eva Brown", policy: "Travel Insurance", premium: "Ξ0.05/month", status: "Active" },
    { id: 6, name: "Frank Wilson", policy: "Business Insurance", premium: "Ξ0.35/month", status: "Pending" },
  ]);

  const agent = {
    name: "Rajesh Sharma",
    wallet: "0xA12B34C56D78E90F1234567890ABCDEF12345678",
    verified: true,
    customers: customers,
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsCustomerModalOpen(true);
  };

  const handleCreatePolicy = () => {
    navigate('/agent/create-policy');
  };

  const handleAddCustomer = () => {
    navigate('/agent/add-customer');
  };

  const handleCustomerAdded = (newCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
  };

  const handleKYCSubmit = () => {
    navigate('/agent/kyc');
  };

  const stats = [
    { title: "Assigned Claims", value: "5", icon: FileText, change: "+2 this week", color: "from-blue-500/20 to-blue-400/20", iconColor: "text-blue-400" },
    { title: "Pending Reviews", value: "2", icon: Clock, change: "Priority queue", color: "from-amber-500/20 to-amber-400/20", iconColor: "text-amber-400" },
    { title: "Resolved Claims", value: "12", icon: CheckCircle, change: "+3 this month", color: "from-emerald-500/20 to-emerald-400/20", iconColor: "text-emerald-400" },
  ];

  const claims = [
    { id: "#CL-2024-001", user: "Alice Johnson", amount: "Ξ0.25", status: "Under Review", priority: "High", type: "Health" },
    { id: "#CL-2024-002", user: "Bob Chen", amount: "Ξ0.18", status: "Documentation Pending", priority: "Medium", type: "Auto" },
    { id: "#CL-2024-003", user: "Charlie Davis", amount: "Ξ0.35", status: "Ready for Approval", priority: "High", type: "Property" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review": return "text-gray-300 bg-gray-700/50";
      case "Documentation Pending": return "text-gray-300 bg-gray-700/50";
      case "Ready for Approval": return "text-gray-300 bg-gray-700/50";
      default: return "text-gray-400 bg-gray-700/50";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-gray-300 bg-gray-700/50";
      case "Medium": return "text-gray-300 bg-gray-700/50";
      case "Low": return "text-gray-300 bg-gray-700/50";
      default: return "text-gray-400 bg-gray-700/50";
    }
  };

  return (
    <div className="text-white w-full relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      
      <div className="relative z-10 space-y-6 pt-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  Agent <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Welcome back, {agent.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Verified Agent</span>
            </div>
            <Button variant="outline" className="flex items-center gap-2 glass">
              <Wallet className="w-4 h-4" />
              {agent.wallet.slice(0, 6)}...{agent.wallet.slice(-4)}
            </Button>
          </div>
        </div>

      {/* KYC Alert */}
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-400 mb-1">KYC Verification Pending</h3>
              <p className="text-white/80 text-sm mb-3">
                Complete your Know Your Customer verification to access advanced claim management features and higher approval limits.
              </p>
            </div>
              <Button 
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                onClick={handleKYCSubmit}
              >
                Complete KYC
              </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass shine group hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Claims Management - Takes 2 columns */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-bold">
                  <FileText className="w-5 h-5 font-bold" />
                  Claims Management
                </CardTitle>
                <Button variant="secondary" size="sm">
                  View All Claims
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claims.map((claim, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm text-gray-300">{claim.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(claim.priority)}`}>
                            {claim.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-white">{claim.user}</span>
                          <span className="text-sm text-white/60">{claim.type} Insurance</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-cyan-400">{claim.amount}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                            {claim.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          Review
                        </Button>
                        <Button size="sm">
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Customer Portfolio */}
          <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bold">
                <Users className="w-5 h-5 font-bold" />
                Customer Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agent.customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                    onClick={() => handleViewCustomer(customer)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white text-sm">{customer.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          customer.status === 'Active' ? 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/30' : 'text-gray-300 bg-gray-700/50'
                        }`}>
                          {customer.status}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCustomer(customer);
                          }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs mb-1">{customer.policy}</p>
                    <p className="text-gray-300 text-sm font-semibold">{customer.premium}</p>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-4" 
                  size="sm"
                  onClick={() => {
                    if (onNavigateToCustomers) {
                      onNavigateToCustomers();
                    }
                  }}
                >
                  View All Customers ({agent.customers.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-bold">
                <Plus className="w-5 h-5 font-bold" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="secondary" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={handleCreatePolicy}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Policy
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={handleAddCustomer}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
                <Button variant="destructive" className="w-full justify-start" size="sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>

      {/* Modals */}
      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
      />
      
    </div>
  );
};

export default AgentContent;