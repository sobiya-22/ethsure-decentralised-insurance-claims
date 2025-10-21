import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, AlertCircle, Wallet, Building2, UserCheck, Award } from "lucide-react";
// import { defaultCompanyUser, getStatusColor, defaultAgentsData, defaultCustomersData, defaultPoliciesData, defaultRequestingPoliciesData, defaultClaimsData } from '@/constants/companyConstants';

const CompanyOverview = () => {
  const company = null;
  const agentsData = null;
  const customersData = null;
  const policiesData = null;
  const requestingPoliciesData = null;
  const claimsData = null;

  return (
    <div className="text-white w-full relative bg-transparent">
      <div className="px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
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

export default CompanyOverview;