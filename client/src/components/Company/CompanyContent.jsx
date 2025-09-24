import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, AlertCircle, Wallet, Building2, UserCheck, Award } from "lucide-react";

const CompanyContent = () => {
  const company = { name: "Insurance Admin", wallet: "0x1234...abcd" };
  
  const agentsData = [
    { id: 1, name: "Agent Smith", email: "smith@ethsure.com", phone: "+1-555-0123", location: "New York, NY", customers: 12, status: "Active", verified: true, performance: "95%", joinDate: "2023-01-15", totalPolicies: 45, totalClaims: 8, successRate: "98%" },
    { id: 2, name: "Agent Doe", email: "doe@ethsure.com", phone: "+1-555-0124", location: "Los Angeles, CA", customers: 9, status: "Active", verified: true, performance: "88%", joinDate: "2023-03-20", totalPolicies: 32, totalClaims: 5, successRate: "94%" },
    { id: 3, name: "Agent Johnson", email: "johnson@ethsure.com", phone: "+1-555-0125", location: "Chicago, IL", customers: 15, status: "Pending", verified: false, performance: "92%", joinDate: "2024-01-10", totalPolicies: 28, totalClaims: 3, successRate: "96%" },
    { id: 4, name: "Agent Brown", email: "brown@ethsure.com", phone: "+1-555-0126", location: "Miami, FL", customers: 7, status: "Active", verified: true, performance: "91%", joinDate: "2023-06-15", totalPolicies: 22, totalClaims: 4, successRate: "93%" },
    { id: 5, name: "Agent Wilson", email: "wilson@ethsure.com", phone: "+1-555-0127", location: "Seattle, WA", customers: 0, status: "Requesting", verified: false, performance: "N/A", joinDate: "2024-02-01", totalPolicies: 0, totalClaims: 0, successRate: "N/A" },
    { id: 6, name: "Agent Davis", email: "davis@ethsure.com", phone: "+1-555-0128", location: "Austin, TX", customers: 0, status: "Waiting Verification", verified: false, performance: "N/A", joinDate: "2024-02-05", totalPolicies: 0, totalClaims: 0, successRate: "N/A" },
    { id: 7, name: "Agent Miller", email: "miller@ethsure.com", phone: "+1-555-0129", location: "Denver, CO", customers: 0, status: "Requesting", verified: false, performance: "N/A", joinDate: "2024-02-10", totalPolicies: 0, totalClaims: 0, successRate: "N/A" }
  ];

  const customersData = [
    { id: 1, name: "John Doe", email: "john.doe@email.com", phone: "+1-555-1001", location: "New York, NY", policies: 3, totalPremium: "₹1,92,000", status: "Active", verified: true, joinDate: "2023-02-15", lastPayment: "2024-01-15", agent: { name: "Agent Smith", email: "smith@ethsure.com", phone: "+1-555-0123", verified: true, performance: "95%" }, customerPolicies: [{ id: 1, policyNumber: "POL-2024-001", type: "Life Insurance", premium: "₹16,000/month", coverage: "₹80,00,000", status: "Active", startDate: "2024-01-15", endDate: "2025-01-15" }, { id: 2, policyNumber: "POL-2024-002", type: "Health Insurance", premium: "₹12,000/month", coverage: "₹40,00,000", status: "Active", startDate: "2023-07-01", endDate: "2024-07-01" }] },
    { id: 2, name: "Jane Smith", email: "jane.smith@email.com", phone: "+1-555-1002", location: "Los Angeles, CA", policies: 2, totalPremium: "₹1,44,000", status: "Active", verified: true, joinDate: "2023-03-01", lastPayment: "2024-01-20", agent: { name: "Agent Doe", email: "doe@ethsure.com", phone: "+1-555-0124", verified: true, performance: "88%" }, customerPolicies: [{ id: 1, policyNumber: "POL-2024-003", type: "Auto Insurance", premium: "₹8,000/month", coverage: "₹16,00,000", status: "Active", startDate: "2024-01-01", endDate: "2025-01-01" }] },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@email.com", phone: "+1-555-1003", location: "Chicago, IL", policies: 1, totalPremium: "₹64,000", status: "Pending", verified: false, joinDate: "2024-01-25", lastPayment: "N/A", agent: { name: "Agent Johnson", email: "johnson@ethsure.com", phone: "+1-555-0125", verified: false, performance: "92%" }, customerPolicies: [] }
  ];

  const policiesData = [
    { id: 1, policyNumber: "POL-2024-001", type: "Life Insurance", customer: "John Doe", agent: "Agent Smith", premium: "₹16,000/month", coverage: "₹80,00,000", status: "Active", startDate: "2024-01-15", endDate: "2025-01-15" },
    { id: 2, policyNumber: "POL-2024-002", type: "Health Insurance", customer: "Jane Smith", agent: "Agent Doe", premium: "₹12,000/month", coverage: "₹40,00,000", status: "Active", startDate: "2023-07-01", endDate: "2024-07-01" },
    { id: 3, policyNumber: "POL-2024-003", type: "Auto Insurance", customer: "Mike Johnson", agent: "Agent Johnson", premium: "₹9,600/month", coverage: "₹20,00,000", status: "Active", startDate: "2024-02-01", endDate: "2025-02-01" },
    { id: 4, policyNumber: "POL-2024-004", type: "Property Insurance", customer: "Sarah Brown", agent: "Agent Brown", premium: "₹24,000/month", coverage: "₹1,60,00,000", status: "Active", startDate: "2023-12-01", endDate: "2024-12-01" }
  ];

  const requestingPoliciesData = [
    { id: 5, policyNumber: "POL-REQ-001", type: "Life Insurance", customer: "David Wilson", agent: "Agent Smith", premium: "₹14,400/month", coverage: "₹64,00,000", status: "Requesting", submittedDate: "2024-02-15" },
    { id: 6, policyNumber: "POL-REQ-002", type: "Health Insurance", customer: "Lisa Garcia", agent: "Agent Doe", premium: "₹17,600/month", coverage: "₹60,00,000", status: "Requesting", submittedDate: "2024-02-14" },
    { id: 7, policyNumber: "POL-REQ-003", type: "Auto Insurance", customer: "Robert Lee", agent: "Agent Johnson", premium: "₹7,600/month", coverage: "₹24,00,000", status: "Requesting", submittedDate: "2024-02-13" },
    { id: 8, policyNumber: "POL-REQ-004", type: "Property Insurance", customer: "Maria Rodriguez", agent: "Agent Brown", premium: "₹28,000/month", coverage: "₹2,00,00,000", status: "Requesting", submittedDate: "2024-02-12" }
  ];

  const claimsData = [
    { id: 1, claimNumber: "CLM-2024-001", customer: "John Doe", agent: "Agent Smith", policy: "POL-2024-001", type: "Life Insurance", amount: "₹40,00,000", status: "Approved", verified: true, submittedDate: "2024-01-10", processedDate: "2024-01-15" },
    { id: 2, claimNumber: "CLM-2024-002", customer: "Jane Smith", agent: "Agent Doe", policy: "POL-2024-002", type: "Health Insurance", amount: "₹8,00,000", status: "Pending", verified: false, submittedDate: "2024-01-20", processedDate: null },
    { id: 3, claimNumber: "CLM-2024-003", customer: "Mike Johnson", agent: "Agent Johnson", policy: "POL-2024-003", type: "Auto Insurance", amount: "₹4,00,000", status: "Rejected", verified: true, submittedDate: "2024-01-25", processedDate: "2024-01-28" },
    { id: 4, claimNumber: "CLM-2024-004", customer: "Sarah Brown", agent: "Agent Brown", policy: "POL-2024-004", type: "Property Insurance", amount: "₹20,00,000", status: "Pending", verified: false, submittedDate: "2024-02-01", processedDate: null }
  ];

  const getStatusColor = (status) => {
    const colors = {
      "Active": "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
      "Pending": "text-amber-400 bg-amber-500/20 border border-amber-500/30",
      "Requesting": "text-blue-400 bg-blue-500/20 border border-blue-500/30",
      "Waiting Verification": "text-purple-400 bg-purple-500/20 border border-purple-500/30",
      "Approved": "text-emerald-400 bg-emerald-500/20 border border-emerald-500/30",
      "Rejected": "text-red-300 bg-red-500/10 border border-red-400/20"
    };
    return colors[status] || "text-gray-400 bg-gray-700/50";
  };

  return (
    <div className="text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      <div className="relative z-10 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl glass"><Building2 className="w-8 h-8 text-cyan-400" /></div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                  <span className="text-white">Company</span> <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-xl text-gray-300">Welcome back, {company.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="text-white font-mono text-sm">{company.wallet}</p>
            </div>
            <div className="p-2 rounded-lg glass"><Wallet className="w-6 h-6 text-emerald-400" /></div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Agents</p>
                  <p className="text-3xl font-bold text-white">{agentsData.length}</p>
                  <p className="text-gray-300 text-sm">+2 this month</p>
                </div>
                <Users className="w-12 h-12 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Customers</p>
                  <p className="text-3xl font-bold text-white">{customersData.length}</p>
                  <p className="text-gray-300 text-sm">+12 this month</p>
                </div>
                <UserCheck className="w-12 h-12 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Requesting Review</p>
                  <p className="text-3xl font-bold text-white">{requestingPoliciesData.length}</p>
                  <p className="text-gray-300 text-sm">Awaiting approval</p>
                </div>
                <FileText className="w-12 h-12 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Claims</p>
                  <p className="text-3xl font-bold text-white">{claimsData.filter(c => c.status === 'Pending').length}</p>
                  <p className="text-gray-300 text-sm">Requires attention</p>
                </div>
                <AlertCircle className="w-12 h-12 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-yellow-400" />Top Performing Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentsData.slice(0, 3).map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{agent.name}</p>
                        <p className="text-gray-400 text-sm">{agent.customers} customers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{agent.performance}</p>
                      <p className="text-gray-400 text-xs">Performance</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertCircle className="w-5 h-5 text-red-300" />Recent Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimsData.slice(0, 3).map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div>
                      <p className="text-white font-medium">{claim.claimNumber}</p>
                      <p className="text-gray-400 text-sm">{claim.customer} - {claim.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{claim.amount}</p>
                      <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyContent;