import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, FileText, AlertCircle, CheckCircle, Clock, Wallet, TrendingUp, Building2, UserCheck } from "lucide-react";

const CompanyContent = () => {
  const company = { name: "Insurance Admin", wallet: "0x1234...abcd", verified: true };
  const stats = [
    { title: "Total Policies", value: "120", icon: Shield, change: "+5 this month", color: "from-gray-600 to-gray-500" },
    { title: "Active Agents", value: "8", icon: Users, change: "All verified", color: "from-gray-600 to-gray-500" },
    { title: "Total Claims", value: "45", icon: FileText, change: "12 pending", color: "from-gray-600 to-gray-500" },
  ];
  const claimsData = [
    { month: "July", claims: "10", paid: "Ξ2.5", rejected: "1" },
    { month: "June", claims: "15", paid: "Ξ3.1", rejected: "2" },
    { month: "May", claims: "12", paid: "Ξ2.8", rejected: "1" },
  ];
  const agents = [
    { name: "Agent Smith", customers: 12, status: "Active", performance: "95%" },
    { name: "Agent Doe", customers: 9, status: "Active", performance: "88%" },
    { name: "Agent Johnson", customers: 15, status: "Pending", performance: "92%" },
  ];
  const upcomingEMIs = [
    { customer: "John Doe", agent: "Agent Smith", amount: "$120", dueDate: "2025-10-15" },
    { customer: "Jane Roe", agent: "Agent Doe", amount: "$85", dueDate: "2025-10-18" },
    { customer: "Mike Wilson", agent: "Agent Johnson", amount: "$150", dueDate: "2025-10-20" },
  ];

  return (
    <div className="min-h-screen text-white w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 blur-3xl" />
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg glass"><Building2 className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Company <span className="gradient-text">Dashboard</span></h1>
                <p className="text-xl text-gray-300">Welcome back, {company.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Verified Company</span>
            </div>
            <Button variant="outline" className="flex items-center gap-2 glass">
              <Wallet className="w-4 h-4" />{company.wallet}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass shine group hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/60 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 font-bold"><FileText className="w-5 h-5 font-bold" />Claims Analytics</CardTitle>
                  <Button variant="secondary" size="sm">View Full Report</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-3 px-4 text-white font-medium">Month</th>
                        <th className="py-3 px-4 text-white font-medium">Claims</th>
                        <th className="py-3 px-4 text-white font-medium">Paid (ETH)</th>
                        <th className="py-3 px-4 text-white font-medium">Rejected</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimsData.map((data, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-white">{data.month}</td>
                          <td className="py-3 px-4 text-white">{data.claims}</td>
                          <td className="py-3 px-4 text-emerald-400 font-medium">{data.paid}</td>
                          <td className="py-3 px-4 text-red-400 font-medium">{data.rejected}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 font-bold"><Users className="w-5 h-5 font-bold" />Agent Management</CardTitle>
                  <Button variant="secondary" size="sm">Manage All Agents</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-white font-medium">{agent.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'Active' ? 'text-gray-300 bg-gray-700/50' : 'text-gray-300 bg-gray-700/50'}`}>{agent.status}</span>
                        </div>
                        <p className="text-white/60 text-sm">{agent.customers} customers • {agent.performance} performance</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="destructive">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass shine hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold"><UserCheck className="w-5 h-5 font-bold" />Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">{agent.name}</span>
                        <span className="text-white/60 text-xs">{agent.performance}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-gray-600 to-gray-500 h-2 rounded-full transition-all duration-300" style={{ width: agent.performance }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Upcoming EMI Dues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEMIs.map((emi, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white font-medium text-sm">{emi.customer}</p>
                        <p className="text-white/60 text-xs">{emi.agent} • {emi.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-xs">{emi.dueDate}</p>
                        <span className="text-amber-400 text-xs font-medium">Due Soon</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyContent;